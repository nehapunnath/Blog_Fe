import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getAllBlogApi } from '../services/allApis';
import base_url from '../services/base_url';
import { toast } from 'react-toastify';

function Dashboard() {
    const [collapsed, setCollapsed] = useState(true);
    const [sortOption, setSortOption] = useState("newest");
    const nav = useNavigate();

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
        console.log('Sidebar collapsed:', !collapsed); // Debugging log
    };

    const [user, setUser] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            setUser(sessionStorage.getItem('user'));
        } else {
            setUser("");
        }
    }, []);

    useEffect(() => {
        getData();
    }, [sortOption]);

    const [allBlogs, setAllBlogs] = useState([]);

    const getData = async () => {
        const result = await getAllBlogApi();
        console.log(result);
        if (result.status === 200) {
            const approvedBlogs = result.data.filter(blog => blog.isApproved);
            const sortedBlogs = [...approvedBlogs].sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return sortOption === "newest" ? dateB - dateA : dateA - dateB;
            });
            setAllBlogs(sortedBlogs);
        }
    };

    const handleLogout = async () => {
        sessionStorage.clear();
        toast.error("Logged Out!!");
        nav('/');
    };

    // Define navbar height and sidebar widths
    const navbarHeight = '60px'; // Matches the Header height
    const sidebarWidthCollapsed = '100px';
    const sidebarWidthExpanded = '220px';

    return (
        <div style={{ paddingTop: navbarHeight }}>
            <Header />
            <div className="d-flex">
                {/* Sidebar */}
                <div
                    className={`bg-dark text-light p-3 ${collapsed ? 'collapsed' : ''}`}
                    style={{
                        position: 'fixed',
                        top: navbarHeight,
                        left: 0,
                        width: collapsed ? sidebarWidthCollapsed : sidebarWidthExpanded,
                        height: `calc(100vh - ${navbarHeight})`,
                        zIndex: 1000,
                        transition: 'width 0.3s ease',
                        borderRight: '2px solid dark', // Debugging border
                    }}
                >
                    <Button variant="light" className="mb-3" onClick={toggleSidebar}>
                        {collapsed ? <i className="fa-solid fa-bars"></i> : <i className="fa-solid fa-arrow-left"></i>}
                    </Button>
                    {!collapsed && (
                        <>
                            <h4 className="text-center mb-4">User Panel</h4>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="bg-dark text-light border-0">
                                    <Link to={'/dash'} style={{ textDecoration: 'none' }} className="text-light">
                                        <i className="fa-solid fa-home me-2"></i> Dashboard
                                    </Link>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-dark text-light border-0">
                                    <Link className="text-light" to={'/myblog'} style={{ textDecoration: 'none' }}>
                                        <i className="fa-solid fa-pencil-alt me-2"></i> My Blogs
                                    </Link>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-dark text-light border-0">
                                    <Link className="text-light" to={'/category'} style={{ textDecoration: 'none' }}>
                                        <i className="fa-solid fa-list me-2"></i> Category
                                    </Link>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-dark text-light border-0">
                                    <Link className="text-light" to={'/notification'} style={{ textDecoration: 'none' }}>
                                        <i className="fa-solid fa-bell me-2"></i> Notifications
                                    </Link>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-dark text-light border-0">
                                    <Link className="text-light" to={'/profile'} style={{ textDecoration: 'none' }}>
                                        <i className="fa-solid fa-user me-2"></i> Profile
                                    </Link>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-dark text-light border-0 p-0">
                                    <button
                                        onClick={handleLogout}
                                        className="w-100 text-start text-light bg-dark border-0 py-2 px-3 d-flex align-items-center"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <i className="fa-solid fa-sign-out-alt me-2"></i> Logout
                                    </button>
                                </ListGroup.Item>
                            </ListGroup>
                        </>
                    )}
                </div>

                {/* Main Content */}
                <div
                    className="p-3"
                    style={{
                        marginLeft: collapsed ? sidebarWidthCollapsed : sidebarWidthExpanded,
                        width: `calc(100% - ${collapsed ? sidebarWidthCollapsed : sidebarWidthExpanded})`,
                        minHeight: `calc(100vh - ${navbarHeight})`,
                        transition: 'margin-left 0.3s ease, width 0.3s ease',
                        borderLeft: '2px solid dark', // Debugging border
                    }}
                >
                    <Card className="mb-4 p-3 shadow" style={{ background: 'linear-gradient(135deg, #667eea 0%, rgb(223, 191, 255) 100%)', color: 'white' }}>
                        <h4>
                            Welcome Back, <span className="text-warning fw-bold">{user} !</span>
                        </h4>
                        <p>Check your latest blog posts and activity here.</p>
                    </Card>

                    <Row>
                        <Col>
                            <Card className="shadow mt-4">
                                <Card.Body>
                                    <Card.Title>Start Your Blogging Journey</Card.Title>
                                    <Card.Text>Share your thoughts and stories with the world. Your voice matters!</Card.Text>
                                    <Link className="btn btn-success" to={'/myblog'}>Start Writing Blogs</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <h2>Explore Blogs</h2>
                        <select
                            className="form-select w-auto"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="newest">Latest to Oldest</option>
                            <option value="oldest">Oldest to Latest</option>
                        </select>
                    </div>

                    {allBlogs.length > 0 ? (
                        <Row xs={1} md={3} className="g-4">
                            {allBlogs.map(item => (
                                <Col key={item._id}>
                                    <Card
                                        style={{
                                            width: '100%', // Make card width responsive
                                            maxWidth: '25rem', // Limit max width
                                            marginTop: '20px',
                                            height: '30rem',
                                            overflow: 'hidden',
                                            borderTopLeftRadius: '1rem',
                                            borderTopRightRadius: '1rem',
                                        }}
                                        className="shadow"
                                    >
                                        <Card.Img variant="top" src={`${base_url}/uploaded/${item.image}`} className="h-50" />
                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Card.Text>{item.shortdescrptn}</Card.Text>
                                            {item.userId?.username && (
                                                <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                                    <i className="fa-solid fa-user me-1"></i> <strong>{item.userId?.username}</strong>
                                                </p>
                                            )}
                                            <Link className="btn btn-outline-success rounded-pill" to={`/blogpg/${item._id}`}>
                                                Read More
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <h4 className="text-center text-danger">No Blogs Yet...!!!</h4>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;