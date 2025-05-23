import React, { useEffect, useState } from 'react';
import { Card, Badge, Button, Spinner, Row, Col, Modal } from 'react-bootstrap';
import { getReportedBlogsForAdmin, deleteBlogApi } from '../../services/allApis';
import { Link } from 'react-router-dom';

function ReportedBlogs() {
  const [reportedBlogs, setReportedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);


  useEffect(() => {
    fetchReportedBlogs();
  }, []);

  const fetchReportedBlogs = async () => {
    try {
      const result = await getReportedBlogsForAdmin();
      console.log(result);
      if (result?.data) {
        setReportedBlogs(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch reported blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowConfirm = (blogId) => {
    setSelectedBlogId(blogId);
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const result = await deleteBlogApi(selectedBlogId);
      if (result?.status === 200) {
        setReportedBlogs(prev => prev.filter(blog => blog._id !== selectedBlogId));
      }
    } catch (err) {
      console.error("Failed to delete blog:", err);
    } finally {
      setShowConfirm(false);
      setSelectedBlogId(null);
    }
  };


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container py-4">
      <Link to="/admin/dash" className="btn btn-outline-secondary mb-3">
        <i className="fa-solid fa-arrow-left"></i> Back
      </Link>
      <h2 className="fw-bold mb-4">
        <i className="fas fa-flag me-2"></i>Reported Blogs
      </h2>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : reportedBlogs.length === 0 ? (
        <p className="text-muted">No reported blogs found.</p>
      ) : (
        <Row xs={1} md={2} lg={2} className="g-4">
          {reportedBlogs.map(item => (
            <Col >
              <Card className="shadow-sm h-100" style={{ borderRadius: '10px' }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: '1.25rem', color: '#333' }}>
                    {item.title}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
                    by {item.userId?.username || 'Unknown'} ·{' '}
                    <Badge bg="info" style={{ padding: '5px 10px' }}>
                      {item.category}
                    </Badge>
                  </Card.Subtitle>
                  <Card.Text className="mt-2" style={{ color: '#555', fontSize: '0.95rem' }}>
                    {item.content.slice(0, 150)}...
                  </Card.Text>
                  {item.reports && item.reports.length > 0 ? (
                    item.reports.map(item => (
                      <Card
                        className="mb-2 p-3"

                        style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}
                      >
                        <div style={{ fontSize: '0.85rem', color: '#333' }}>
                          <div>
                            <strong>Reported by:</strong> {item.user?.username || 'Unknown'}
                          </div>
                          <div>
                            <strong>Reason:</strong>{' '}
                            <Badge bg="danger" style={{ padding: '4px 8px' }}>
                              {item.reason}
                            </Badge>
                          </div>
                          {item.additionalComments && (
                            <div>
                              <strong>Comments:</strong> {item.additionalComments}
                            </div>
                          )}
                          <div>
                            <strong>Reported on:</strong>{' '}
                            {formatDate(item.createdAt)}
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                      No reports available.
                    </p>
                  )}
                </Card.Body>
                <Card.Footer className="text-end bg-white border-0">
                  <Button variant="danger" size="sm" onClick={() => handleShowConfirm(item._id)}>
                    Delete Blog
                  </Button>

                  <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                        Cancel
                      </Button>
                      <Button variant="danger" onClick={handleDeleteConfirmed}>
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>


                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default ReportedBlogs;