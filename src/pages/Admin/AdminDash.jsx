import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, ListGroup, Badge, Container, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAllUsersForAdmin,
  getAllBlogsForAdminApi,
  getTotalLikesForAdmin,
  getReportedCountForAdmin,
  getCategoryBreakdownForAdmin,
  getTrendingTopicForAdmin,
  getMessageApi,
} from '../../services/allApis';

function AdminDash() {
  const [userCount, setUserCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [reportedCount, setReportedCount] = useState(0);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const users = await getAllUsersForAdmin();
      if (users?.data) setUserCount(users.data.length);

      const blogs = await getAllBlogsForAdminApi();
      if (blogs?.data) setBlogCount(blogs.data.length);

      const likes = await getTotalLikesForAdmin();
      if (likes?.data) setTotalLikes(likes.data.totalLikes);

      const reports = await getReportedCountForAdmin();
      if (reports?.data?.count !== undefined) setReportedCount(reports.data.count);

      const categories = await getCategoryBreakdownForAdmin();
      if (categories?.data) setCategoryBreakdown(categories.data);

      const trending = await getTrendingTopicForAdmin();
      if (trending?.data) setTrendingTopics(trending.data);

      const res = await getMessageApi();
      if (res?.data) setMessages(res.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      {/* Header */}
      <header className="bg-dark text-light p-3 d-flex justify-content-between align-items-center">
        <h3 className="mb-0">
          <i className="fas fa-tools me-2"></i>Admin Dashboard
        </h3>
        <Button variant="outline-light" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt me-1"></i> Logout
        </Button>
      </header>

      {/* Main Content */}
      <main className="container-fluid p-4" style={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
        {/* Welcome */}
        <Card className="mb-4 shadow-sm text-white" style={{ background: 'linear-gradient(135deg, #2c3e50, #3498db)' }}>
          <Card.Body>
            <h4>Welcome Back, <span className="fw-bold">Admin!</span></h4>
            <p>Monitor your platform statistics and manage content here.</p>
          </Card.Body>
        </Card>

        {/* Stats */}
        <Row xs={1} md={4} className="g-4 mb-4">
          <Col>
            <Card bg="dark" text="white" className="shadow h-100">
              <Card.Body>
                <Card.Title><i className="fas fa-users me-2"></i>Total Users</Card.Title>
                <h2>{userCount}</h2>
                <Link to="/admin/user" className="btn btn-outline-light btn-sm mt-2">Manage Users</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="info" text="white" className="shadow h-100">
              <Card.Body>
                <Card.Title><i className="fas fa-blog me-2"></i>Total Blogs</Card.Title>
                <h2>{blogCount}</h2>
                <Link to="/admin/totalblogs" className="btn btn-outline-light btn-sm mt-2">View Blogs</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="success" text="white" className="shadow h-100">
              <Card.Body>
                <Card.Title><i className="fas fa-heart me-2"></i>Total Likes</Card.Title>
                <h2>{totalLikes}</h2>
                <Link to="/admin/likes" className="btn btn-outline-light btn-sm mt-2">View Likes</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="danger" text="white" className="shadow h-100">
              <Card.Body>
                <Card.Title><i className="fas fa-flag me-2"></i>Reported Blogs</Card.Title>
                <h2>{reportedCount}</h2>
                <Link to="/admin/reported" className="btn btn-outline-light btn-sm mt-2">View Reports</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Category & Trending */}
        <Row xs={1} md={2} className="g-4 mb-4">
          <Col>
            <Card className="shadow h-100">
              <Card.Body>
                <Card.Title><i className="fas fa-layer-group me-2 text-primary"></i>Category Breakdown</Card.Title>
                <ListGroup variant="flush">
                  {categoryBreakdown.length > 0 ? (
                    categoryBreakdown.map((cat, idx) => (
                      <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                        <Badge bg="secondary" pill>{cat._id || 'Uncategorized'}</Badge>
                        <span className="fw-bold text-primary">{cat.count}</span>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <p className="text-muted text-center">
                      <i className="fas fa-spinner fa-spin me-2"></i>Loading categories...
                    </p>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card className="shadow h-100">
              <Card.Body>
                <Card.Title><i className="fas fa-bolt me-2 text-warning"></i>Trending Topics</Card.Title>
                <ListGroup variant="flush">
                  {trendingTopics.length > 0 ? (
                    trendingTopics.map((topic, idx) => {
                      let icon = "fa-star";
                      let badge = "secondary";
                      if (idx === 0) [icon, badge] = ["fa-crown", "warning"];
                      else if (idx === 1) [icon, badge] = ["fa-fire", "danger"];
                      else if (idx === 2) [icon, badge] = ["fa-chart-line", "info"];
                      else if (idx === 3) [icon, badge] = ["fa-bolt", "primary"];
                      else if (idx === 4) [icon, badge] = ["fa-star", "success"];

                      return (
                        <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                          <span><i className={`fas ${icon} me-2 text-${badge}`}></i>{topic._id || 'Uncategorized'}</span>
                          <Badge bg={badge} pill>{topic.totalLikes} Likes</Badge>
                        </ListGroup.Item>
                      );
                    })
                  ) : (
                    <p className="text-muted text-center">No trending topics</p>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Messages */}
        <Card className="shadow mt-4">
          <Card.Body>
            <Card.Title><i className="fas fa-envelope me-2 text-success"></i>Recent Messages</Card.Title>
            {loadingMessages ? (
              <div className="text-center py-3"><Spinner animation="border" /></div>
            ) : messages.length === 0 ? (
              <Alert variant="info" className="mt-3">No recent messages.</Alert>
            ) : (
              <ListGroup variant="flush">
                {messages.slice(0, 5).map((msg, idx) => (
                  <ListGroup.Item key={idx} className="d-flex flex-column">
                    <div className="d-flex justify-content-between">
                      <span><i className="fas fa-user me-2 text-primary"></i>{msg.name}</span>
                      <small className="text-muted">{new Date(msg.submittedAt).toLocaleString()}</small>
                    </div>
                    <div className="text-muted">
                      <i className="fas fa-envelope me-2 text-danger"></i>{msg.email}
                    </div>
                    <div className="mt-2"><i className="fas fa-comment-dots me-2 text-success"></i>{msg.message}</div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
            <div className="mt-3 text-end">
              <Link to="/admin/messages" className="btn btn-outline-success btn-sm">
                View All Messages
              </Link>
            </div>
          </Card.Body>
        </Card>
      </main>
    </>
  );
}

export default AdminDash;
