import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import { FaCheckCircle, FaStar } from 'react-icons/fa';
import '../styles/PropertyDetails.css'; // Optional for overrides

const PropertyDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [tenantName, setTenantName] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [tenantEmail, setTenantEmail] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        let propertyData;

        if (location.state && location.state.property) {
          propertyData = location.state.property;
        } else {
          const response = await axios.get(`http://localhost:8080/api/properties/get/${id}`);
          propertyData = response.data;
        }

        setProperty(propertyData);
        setRating((Math.random() * 2 + 3).toFixed(1)); // random rating between 3.0 and 5.0
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property details:', error);
        setError('Failed to load property details. Please try again.');
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, location.state]);

  const amenities = [
    "Air Conditioning", "Barbeque", "Built-In Wardrobes",
    "Dishwasher", "Fireplace", "Internet",
    "Park Nearby", "Gated Security", "Elevator"
  ];

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const tenantData = {
        name: tenantName,
        phone: tenantPhone,
        email: tenantEmail,
        propertyId: id,
      };
      await axios.post('http://localhost:8080/api/agents/interested-tenants', tenantData);
      alert('Your interest has been submitted successfully.');
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit your interest. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) return <div className="text-danger text-center mt-5">{error}</div>;
  if (!property) return <div className="text-center mt-5">No property details found.</div>;

  return (
    <Container className="py-5">
      <Row>
        <Col md={8}>
          <h1 className="mb-3">{property.bhk_type}</h1>

          {property.image_url && (
            <img
              src={`data:image/jpeg;base64,${property.image_url}`}
              alt={property.bhk_type}
              className="img-fluid rounded shadow mb-4"
            />
          )}

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h4>Overview</h4>
              <hr />
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Price:</strong> ₹{property.depositPrice}</p>
              <p><strong>Status:</strong> {property.propertyStatus}</p>
              <p><strong>Description:</strong> {property.description || 'No description available.'}</p>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h4>Amenities</h4>
              <hr />
              <Row>
                {amenities.map((item, idx) => (
                  <Col md={6} key={idx} className="mb-2 d-flex align-items-center">
                    <FaCheckCircle className="text-success me-2" />
                    {item}
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h4>Location Map</h4>
              <hr />
              <div className="ratio ratio-16x9">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                  title="Google Maps"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm p-3 mb-4">
            <h4 className="mb-3">Owner Info</h4>
            <p><strong>Name:</strong> {property.ownerName}</p>
            <p><strong>Email:</strong> {property.ownerName}@gmail.com</p>
            <p><strong>Phone:</strong> {property.ownerContact}</p>
            <Button
              variant="primary"
              onClick={() => setShowForm(true)}
              className="mx-auto block text-center text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-2xl shadow-md transition duration-200"
            >
              Contact Owner
            </Button>

          </Card>

          <Card className="shadow-sm p-3">
            <h4 className="mb-2">Rating</h4>
            <div className="d-flex align-items-center">
              <FaStar className="text-warning me-1" />
              <h5 className="mb-0">{rating} / 5</h5>
              <Badge bg="success" className="ms-2">Verified</Badge>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Contact Owner Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contact Owner</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitForm}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email ID</Form.Label>
              <Form.Control
                type="email"
                value={tenantEmail}
                onChange={(e) => setTenantEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={tenantPhone}
                onChange={(e) => setTenantPhone(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex gap-2">
              <Button variant="secondary" className="px-4 py-2 fw-semibold" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="px-4 py-2 fw-semibold">
                Submit
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default PropertyDetails;
