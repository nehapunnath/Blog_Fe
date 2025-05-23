import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { approveBlogApi, getAllBlogsForAdminApi, rejectBlogApi } from '../../services/allApis'
import base_url from '../../services/base_url'

function AdminTBlogs() {
    const [allBlogs, setAllBlogs] = useState([])
    const [filter, setFilter] = useState("All")

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const result = await getAllBlogsForAdminApi();
        console.log(result)
        if (result.status === 200) {
            setAllBlogs(result.data)
        }
    }

    const handleApprove = async (id) => {
        try {
            const res = await approveBlogApi(id);
            if (res.status === 200) {
                getData(); // refresh list
            }
        } catch (err) {
            console.error("Approve failed", err);
        }
    };

    const handleReject = async (id) => {
        try {
            const res = await rejectBlogApi(id);
            if (res.status === 200) {
                getData(); // refresh list
            }
        } catch (err) {
            console.error("Reject failed", err);
        }
    };

    const filteredBlogs = allBlogs.filter((item) => {
        if (filter === "All") return true;
        return (item.status || "Pending") === filter;
    });

    return (
        <>
            <div className="container-fluid py-5 m-4">
                <Link to="/admin/dash" className="btn btn-outline-secondary mb-3">
                        <i className="fa-solid fa-arrow-left"></i> Back
                      </Link>

            {/* Filter Dropdown */}
            <div className="d-flex justify-content-end align-items-center px-4 mb-3">
                
                {/* <label className="me-2 fw-semibold">Filter by Status:</label> */}
                <select
                    className="form-select w-auto"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>

            <div className="px-4 pb-4">
                {
                    filteredBlogs.length > 0 ?
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {filteredBlogs.map(item => (
                                <Col key={item._id}>
                                    <Card className="shadow rounded-4 border-0 h-100">
                                        <div style={{ height: '180px', overflow: 'hidden', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
                                            <Card.Img
                                                src={`${base_url}/uploaded/${item.image}`}
                                                alt={item.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <Card.Body className="d-flex flex-column justify-content-between">
                                            <div>
                                                <Card.Title className="fw-bold fs-5">{item.title}</Card.Title>
                                                <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                                                    {item.shortdescrptn?.length > 100 ? `${item.shortdescrptn.slice(0, 100)}...` : item.shortdescrptn}
                                                </Card.Text>
                                            </div>

                                            {item.userId?.username && (
                                                <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>
                                                    <i className="fa-solid fa-user me-2"></i><strong>{item.userId.username}</strong>
                                                </p>
                                            )}

                                            <div className="d-flex justify-content-between align-items-center my-2">
                                                {/* Status Badge */}
                                                <span className={`badge px-3 py-2 rounded-pill text-uppercase fw-semibold ${item.status === 'Approved'
                                                    ? 'bg-success'
                                                    : item.status === 'Rejected'
                                                        ? 'bg-danger'
                                                        : 'bg-warning text-dark'
                                                    }`}>
                                                    {item.status || 'Pending'}
                                                </span>

                                                {/* Action Buttons (Pending Only) */}
                                                {(!item.status || item.status === 'Pending') && (
                                                    <div>
                                                        <button className="btn btn-outline-success btn-sm me-2" onClick={() => handleApprove(item._id)}>
                                                            {/* <i className="fa-solid fa-check"></i> */}Approve
                                                        </button>
                                                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleReject(item._id)}>
                                                            {/* <i className="fa-solid fa-xmark"></i> */}Reject
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            <Link to={`/admin/blogpg/${item._id}`} className="btn btn-primary btn-sm mt-2 w-100">
                                                Read Blog
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        :
                        <h4 className='text-center text-muted'>No {filter} blogs found.</h4>
                }
            </div>
            </div>

        </>
    )
}

export default AdminTBlogs
