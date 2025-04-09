import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
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
    "Clinic", "Dishwasher", "Fireplace",
    "Floor Coverings", "Internet", "Park",
    "School", "Supermarket/Store", "Transportation Hub"
  ];

  const facilities = [
    { name: "FC", value: "Ceiling Fan(s), Central" },
    { name: "Acres", value: "14" },
    { name: "Acres Source", value: "20" },
    { name: "Cross Streets", value: "Stall Shower" }
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
          <h1 className="mb-4">{property.bhk_type}</h1>
          {property.image_url && (
            <img
              src={`data:image/jpeg;base64,${property.image_url}`}
              alt={property.bhk_type}
              className="img-fluid rounded shadow mb-4"
            />
          )}

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h4>Property Information</h4>
              <hr />
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Owner:</strong> {property.ownerName}</p>
              <p><strong>Deposit:</strong> ₹{property.depositPrice}</p>
              <p><strong>Contact:</strong> {property.ownerContact}</p>
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
              <h4>Facilities</h4>
              <hr />
              <ul className="list-unstyled">
                {facilities.map((facility, idx) => (
                  <li key={idx}>
                    <FaCheckCircle className="text-success me-2" />
                    <strong>{facility.name}:</strong> {facility.value}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm p-3">
            <h4 className="mb-3">Agent Info</h4>
            <p><strong>Name:</strong> Praveen Kumar</p>
            <p><strong>Email:</strong> praveen@gmail.com</p>
            <p><strong>Phone:</strong> +91 98786 78956</p>
            <p><strong>Specialization:</strong> Luxury Homes</p>
            <Button variant="primary" onClick={() => setShowForm(true)}>Contact Owner</Button>
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
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default PropertyDetails;
