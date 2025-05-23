import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Form } from 'react-bootstrap';
import { approveBlogApi, getAllBlogsForAdminApi, rejectBlogApi } from '../../services/allApis';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await getAllBlogsForAdminApi();
    if (response.status === 200) {
      setBlogs(response.data);
    }
  };

  const handleApprove = async (id) => {
    const response = await approveBlogApi(id);
    if (response.status === 200) {
      toast.success('Blog approved');
      fetchBlogs();
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);


  const handleReject = async (id) => {
    try {
      const response = await rejectBlogApi(id);
      if (response.status === 200) {
        toast.error('Blog rejected');
        fetchBlogs();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to reject blog');
    }
  };


  return (
    <>

      {/* <div className="d-flex justify-content-between align-items-center p-4">
        <Link to="/admin/dash" className="btn btn-outline-secondary rounded-circle">
          <i className="fa-solid fa-arrow-left text-dark"></i>
        </Link>
      </div> */}

      <div className="container-fluid py-5 m-4">
        <Link to="/admin/dash" className="btn btn-outline-secondary mb-3">
                <i className="fa-solid fa-arrow-left"></i> Back
              </Link>
        <div className="d-flex justify-content-between mb-4">
          <h2>Manage Blogs</h2>
          {/* <Form className="d-flex" style={{ maxWidth: '300px' }}>
            <Form.Control type="search" placeholder="Search blogs..." className="me-2" />
            <Button variant="primary">Search</Button>
          </Form> */}
        </div>

        <Card className="shadow-sm">
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                  {/* <th>Likes</th> */}
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={blog._id}>
                    <td>{index + 1}</td>
                    <td>{blog.title}</td>
                    <td>{blog.userId?.username || 'Unknown'}</td>
                    <td>
                      <span className={`badge ${blog.isApproved ? 'bg-success' : 'bg-warning'}`}>
                        {blog.isApproved ? 'Published' : 'Pending'}
                      </span>
                    </td>
                    {/* <td>{blog.likes}</td> */}
                    <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                    <td>
                      
                        {blog.status === 'Pending' ? (
                          <>
                            <Button variant="success" size="sm" className="me-2" onClick={() => handleApprove(blog._id)}>Approve</Button>
                            <Button variant="danger" size="sm" onClick={() => handleReject(blog._id)}>Reject</Button>
                          </>
                        ) : (
                          <span className={`fw-bold ${blog.status === 'Approved' ? 'text-success' : 'text-danger'}`}>
                            {blog.status}
                          </span>
                        )}
                      

                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default AdminBlogs;
