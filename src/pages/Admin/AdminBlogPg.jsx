import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Alert, Button, Modal } from 'react-bootstrap';
import { getBlogpgApi, approveBlogApi, rejectBlogApi, deleteBlogApi } from '../../services/allApis';
import { toast } from 'react-toastify';
import base_url from '../../services/base_url';

function AdminBlogPg() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const result = await getBlogpgApi(id);
      if (result.status === 200) {
        setBlog(result.data);
      }
    } catch (error) {
      toast.error("Failed to load blog details.");
    }
  };

  const handleApprove = async () => {
    try {
      const result = await approveBlogApi(id);
      if (result.status === 200) {
        toast.success("Blog approved successfully");
        fetchBlog();
      }
    } catch (error) {
      toast.error("Approval failed.");
    }
  };

  const handleReject = async () => {
    try {
      const result = await rejectBlogApi(id);
      if (result.status === 200) {
        toast.warning("Blog rejected.");
        fetchBlog();
      }
    } catch (error) {
      toast.error("Rejection failed.");
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteBlogApi(id);
      if (result.status === 200) {
        toast.success("Blog deleted.");
        navigate('/admin/totalblogs');
      }
    } catch (error) {
      toast.error("Failed to delete blog.");
    }
  };

  const statusColor = blog?.status === 'Approved'
    ? 'success'
    : blog?.status === 'Rejected'
    ? 'danger'
    : 'warning';

  return (
    <>
     <div className="container mt-4 mb-5">
      <Link to="/admin/totalblogs" className="btn btn-outline-secondary mb-3">
        <i className="fa-solid fa-arrow-left"></i> Back
      </Link>

      {blog ? (
        <>
          <h1 className="fw-bold">{blog.title}</h1>
          <div className="text-muted mb-2">
            Published on {new Date(blog.createdAt).toDateString()} by <strong>{blog.userId?.username || 'Anonymous'}</strong>
          </div>
          <div className="mb-3">
            <span className={`badge bg-${statusColor}`}>Status: {blog.status}</span>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="mb-3">
              {blog.tags.map((tag, i) => (
                <span key={i} className="badge bg-secondary me-2">{tag}</span>
              ))}
            </div>
          )}

          {blog.image && (
            <img
              src={`${base_url}/uploaded/${blog.image}`}
              alt="Blog"
              className="img-fluid rounded shadow mb-4"
              style={{ width: '100%', height: '500px', objectFit: 'cover' }}
            />
          )}

          <p>{blog.content}</p>

          {/* Action Buttons */}
          <div className="d-flex gap-3 my-4">
            {blog.status !== 'Approved' && (
              <Button variant="success" onClick={handleApprove}>Approve</Button>
            )}
            {blog.status !== 'Rejected' && (
              <Button variant="warning" onClick={handleReject}>Reject</Button>
            )}
            <Button variant="danger" onClick={() => setShowDeleteConfirm(true)}>Delete</Button>

            <div className="ms-auto text-muted">
              <i className="fa-solid fa-thumbs-up me-1"></i> {blog.likes || 0} Likes &nbsp;
              {/* <i className="fa-solid fa-share me-1"></i> {blog.shares?.length || 0} Shares */}
            </div>
          </div>

          {/* Reported Info */}
          {blog.report && blog.reportDetails && (
            <Alert variant="danger">
              <Alert.Heading>This blog has been reported</Alert.Heading>
              <p><strong>Reason:</strong> {blog.report.reason}</p>
              {blog.reportDetails.additionalComments && (
                <p><strong>Comment:</strong> {blog.reportDetails.additionalComments}</p>
              )}
              <p><strong>Reported by:</strong> {blog.reportDetails.user}</p>
            </Alert>
          )}
        </>
      ) : (
        <h5 className="text-center text-warning">Loading Blog...</h5>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog permanently?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
    
    </>
  )
}

export default AdminBlogPg