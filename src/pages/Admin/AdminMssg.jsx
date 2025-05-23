import React, { useEffect, useState } from 'react';
import { Card, Spinner, Container, Alert, Button, Row, Col } from 'react-bootstrap';
import { getMessageApi } from '../../services/allApis';
import { Link } from 'react-router-dom';

function AdminMssg() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await getMessageApi();
      if (res?.data?.length > 0) {
        setMessages(res.data);
      } else {
        setError('No messages found.');
      }
    } catch (err) {
      setError('Failed to fetch messages.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">📥 Contact Messages</h3>
        <Link to="/admin/dash">
          <Button variant="outline-secondary">
            <i className="fa-solid fa-arrow-left me-2"></i>Back to Dashboard
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        messages.map((msg, idx) => (
          <Card key={idx} className="mb-4 shadow-sm border-0">
            <Card.Body>
              <Row>
                <Col md={8}>
                  <h5 className="fw-bold">
                    <i className="fas fa-user me-2 text-primary"></i> {msg.name}
                  </h5>
                  <p className="text-muted mb-1">
                    <i className="fas fa-envelope me-2 text-danger"></i> {msg.email}
                  </p>
                  <p className="mb-0">
                    <i className="fas fa-comment-dots me-2 text-success"></i> {msg.message}
                  </p>
                </Col>
                <Col md={4} className="text-end">
                  <small className="text-muted">
                    <i className="fa-regular fa-clock me-2"></i>
                    {new Date(msg.submittedAt).toLocaleString()}
                  </small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}

export default AdminMssg;
