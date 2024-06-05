import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/users/login', { email, password });
      console.log(response.data);

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('email', user.email);
      localStorage.setItem('username', user.username);

      handleLogin();
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <h1 className="mb-4">Sign In</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-2">
              Sign In
            </Button>
            <Button variant="outline-secondary" className="w-100" onClick={handleCreateAccount}>
              Create Account
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
