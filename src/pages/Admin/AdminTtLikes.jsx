import React, { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { getAllBlogsApi } from '../../services/allApis';
import { toast } from 'react-toastify';
import { getAllBlogsForAdminApi } from '../../services/allApis';

function AdminTtLikes() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const result = await getAllBlogsForAdminApi(); // This should fetch all blogs
            if (result.status === 200) {
                // Sort blogs by likes descending
                const sorted = result.data.sort((a, b) => (b.likes || 0) - (a.likes || 0));
                setBlogs(sorted);
            } else {
                toast.error("Failed to fetch blogs");
            }
        } catch (error) {
            toast.error("Error loading blogs");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="container mt-4 mb-5">
                <Link to="/admin/dash" className="btn btn-outline-secondary mb-3">
                    <i className="fa-solid fa-arrow-left"></i> Back
                </Link>
                <h2 className="mb-4 fw-bold">Total Likes Overview</h2>
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : blogs.length === 0 ? (
                    <p className="text-muted">No blogs available.</p>
                ) : (
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Likes</th>
                                <th>Published On</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog, index) => (
                                <tr key={blog._id}>
                                    <td>{index + 1}</td>
                                    <td>{blog.title}</td>
                                    <td>{blog.userId?.username || 'Unknown'}</td>
                                    <td>{blog.likes || 0}</td>
                                    <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <Link to={`/admin/blogpg/${blog._id}`} className="btn btn-sm btn-outline-primary">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </>
    )
}

export default AdminTtLikes