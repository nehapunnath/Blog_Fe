import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Footer from '../components/Footer';

function About() {
  return (
    <>
      <div className="bg-light py-5">
        <Container>
          <h1 className="text-center fw-bold mb-4">About Our Platform</h1>
          <p className="text-center text-muted mb-5">
            Our platform is a space where creators write freely, readers engage meaningfully, and content thrives responsibly.
          </p>

          <Row className="align-items-center mb-5">
            <Col md={6}>
              <img
                src="https://media.istockphoto.com/id/480187760/photo/female-novelist-writing-on-the-laptop.jpg?s=612x612&w=0&k=20&c=xcmnzlkoTIE00DX8MvuRZPAKCNV8-gxBBVcZNJRq_uU=" // You can replace with a relevant image
                
                className="shadow-sm img-fluid rounded"
              />
            </Col>
            <Col md={6}>
              <h3 className="fw-semibold">Why We Exist</h3>
              <p>
                Blogging is more than just writing — it's sharing knowledge, building communities,
                and voicing change. We created this platform to support those ideals and give everyone a stage to speak their truth.
              </p>
            </Col>
          </Row>

          <Row className="text-center mb-5">
            <Col md={4}>
              <h5 className="fw-bold">🛠 Built with</h5>
              <p>MERN Stack (MongoDB, Express, React, Node.js)</p>
            </Col>
            <Col md={4}>
              <h5 className="fw-bold">🌍 Our Values</h5>
              <p>Freedom of Expression, Respect, Simplicity, and Creativity</p>
            </Col>
            <Col md={4}>
              <h5 className="fw-bold">🚀 Goals</h5>
              <p>Support creators, promote quality content, and create safe online communities.</p>
            </Col>
          </Row>

          <div className="text-center text-muted">
            <small>&copy; {new Date().getFullYear()} Your Blog Platform. All rights reserved.</small>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default About;
