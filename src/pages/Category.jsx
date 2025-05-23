import React, { useEffect, useState } from 'react';
import { Accordion, Card, Badge, Row, Col } from 'react-bootstrap';
import { getAllBlogApi } from '../services/allApis';
import base_url from '../services/base_url';
import { Link } from 'react-router-dom';

function Category() {
    const [groupedBlogs, setGroupedBlogs] = useState({});

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        const result = await getAllBlogApi();
        if (result.status === 200) {
            const approvedBlogs = result.data.filter(blog => blog.isApproved);
            const grouped = {};
            approvedBlogs.forEach(blog => {
                const category = blog.category || 'Uncategorized';
                if (!grouped[category]) grouped[category] = [];
                grouped[category].push(blog);
            });
            setGroupedBlogs(grouped);
        }
    };

    return (
        <>
            <div className="container mt-5">
                <div className="container-fluid mt-3">

                    <Link to="/dash" className="btn btn-outline-secondary rounded-circle">
                        <i className="fa-solid fa-arrow-left text-dark"></i>
                    </Link>
                </div>
                <h2 className="text-center mb-4">Explore by Category</h2>

                <Accordion defaultActiveKey="0">
                    {Object.entries(groupedBlogs).map(([category, blogs], index) => (
                        <Accordion.Item eventKey={index.toString()} key={category} className="mb-3 shadow-sm">
                            <Accordion.Header>
                                <h5 className="mb-0">
                                    <Badge bg="primary" className="me-2">{blogs.length}</Badge>
                                    {category}
                                </h5>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Row xs={1} md={2} lg={3} className="g-4">
                                    {blogs.map(blog => (
                                        <Col key={blog._id}>
                                            <Card className="h-100 shadow-sm">
                                                <Card.Img variant="top" src={`${base_url}/uploaded/${blog.image}`} className="h-50 object-fit-cover" />
                                                <Card.Body>
                                                    <Card.Title>{blog.title}</Card.Title>
                                                    <Card.Text className="text-truncate">{blog.shortdescrptn}</Card.Text>
                                                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                                        <i className="fa-solid fa-user me-1"></i>
                                                        {blog.userId?.username || 'Unknown'}
                                                    </p>
                                                    <Link to={`/blogpg/${blog._id}`} className="btn btn-sm btn-outline-success rounded-pill">
                                                        Read More
                                                    </Link>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </>
    );
}

export default Category;
