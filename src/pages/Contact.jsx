import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ContactApi } from '../services/allApis'; // adjust path as needed
import Footer from '../components/Footer';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      // Pass formData to your ContactApi function (adjust ContactApi to accept data)
      const response = await ContactApi(formData);

      if (response.status === 200) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // reset form
      } else {
        toast.error(response.data.message || 'Failed to send message');
      }
    } catch (error) {
      toast.error('Error sending message');
    }
  };

  return (
    <>
      <div className="my-5">
        <h2 className="text-center mb-4 fw-bold">Get in Touch</h2>

        <Row>
          <Col md={5} className="mb-4">
            <Card className="shadow-sm border-0 mb-3">
              <Card.Body>
                <h4 className="mb-3">Contact Information</h4>
                <p><i className="fas fa-map-marker-alt me-2 text-danger"></i><strong>Address:</strong> 123 Main Street, YourCity, Country</p>
                <p><i className="fas fa-phone me-2 text-success"></i><strong>Phone:</strong> +1 (123) 456-7890</p>
                <p><i className="fas fa-envelope me-2 text-primary"></i><strong>Email:</strong> contact@yourdomain.com</p>
              </Card.Body>
            </Card>

            <Card className="shadow-sm border-0">
              <Card.Body className="p-0">
                <div style={{ width: '100%', height: '300px', overflow: 'hidden', borderRadius: '8px' }}>
                  <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.28137759755!2d-74.24789647692793!3d40.69740344217724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18c2b1b3%3A0x4213b8b584ded444!2sNew%20York%20City%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1716362611409!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </Card.Body>
            </Card>
          </Col>


          <Col md={7}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h4 className="mb-3">Send Us a Message</h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
