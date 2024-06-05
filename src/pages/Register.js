import React, { useState } from 'react';
import { Container, Typography, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    accountType: 'customer'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/register', formData);
      console.log(response.data);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
         <h4>Register</h4>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" name="username" value={formData.username} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" name="firstName" value={formData.firstName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" name="lastName" value={formData.lastName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter address" name="address" value={formData.address} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="accountType">
              <Form.Label>Account Type</Form.Label>
              <Form.Select name="accountType" value={formData.accountType} onChange={handleChange}>
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="mb-3">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
