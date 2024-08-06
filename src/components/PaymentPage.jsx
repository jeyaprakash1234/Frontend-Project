import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './payment.css';

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Payment details submitted!');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Payment</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCardNumber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="Enter your card number"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCardName">
                  <Form.Label>Cardholder Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    placeholder="Enter cardholder name"
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formExpiryDate">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formCvv">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="CVV"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Text className="form-text mt-3 d-block">
                  <strong>Important:</strong> This payment method is card only. Please ensure the work is completed before making a payment through the website or by cash in hand.
                </Form.Text>

                <Button variant="primarys" type="submit" className="w-100 mt-3">
                  Submit Payment
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
