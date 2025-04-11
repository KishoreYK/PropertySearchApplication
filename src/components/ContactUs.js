import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaPhone, FaCommentDots, FaVideo, FaEnvelope } from 'react-icons/fa';
import contactImage from '../assets/contactUs.jpg';
import Footer from '../components/Footer';
const contactOptions = [
  { icon: <FaPhone />, title: 'Call', info: '+91 98765 43210', buttonText: 'Call now' },
  { icon: <FaCommentDots />, title: 'Chat', info: '+91 78765 43211', buttonText: 'Chat now' },
  { icon: <FaVideo />, title: 'Video Call', info: '+91 87645 43212', buttonText: 'Video Call now' },
  { icon: <FaEnvelope />, title: 'Message', info: '+91 92345 76213', buttonText: 'Message now' },
];

const ContactUs = () => {
  return (
    <Container fluid className="py-5 bg-light">
      <Row className="align-items-center">
        <Col lg={6} className="mb-4 mb-lg-0">
          <h2 className="mb-3 fw-bold">Easy to contact us</h2>
          <p className="mb-4 text-muted">
            We are always ready to help by providing the best services for you.
            We believe a good place to live can make your life better.
          </p>
          <Row>
            {contactOptions.map((option, idx) => (
              <Col sm={6} className="mb-4" key={idx}>
                <Card className="text-center shadow-sm h-100">
                  <Card.Body>
                    <div className="mb-3 text-primary" style={{ fontSize: '2rem' }}>
                      {option.icon}
                    </div>
                    <Card.Title>{option.title}</Card.Title>
                    <Card.Text>{option.info}</Card.Text>
                    <Button variant="primary">{option.buttonText}</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col lg={6} className="d-flex justify-content-center">
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <img
              src={contactImage}
              alt="Contact Us"
              className="img-fluid rounded shadow"
            />
          </div>
        </Col>
      </Row>
      <Footer/>
    </Container>
  );
};

export default ContactUs;
