import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Dashboard() {
  return (
    <Container>
      <h4 className="my-4">Welcome to Condor Market!</h4>
      <Row>
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center mb-4">
            <Card.Body>
              <Card.Title>Products</Card.Title>
              <Card.Text>View and manage your products</Card.Text>
              <Button as={Link} to="/products" variant="primary">
                Go to Products
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center mb-4">
            <Card.Body>
              <Card.Title>Orders</Card.Title>
              <Card.Text>View and manage orders</Card.Text>
              <Button as={Link} to="/orders" variant="primary">
                Go to Orders
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center mb-4">
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Card.Text>View and manage users</Card.Text>
              <Button as={Link} to="/users" variant="primary">
                Go to Users
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
