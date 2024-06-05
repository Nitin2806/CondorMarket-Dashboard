import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Container, Form, Button, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      customer: {
        ...prevOrder.customer,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/orders/${id}`, order);
      navigate('/orders');
    } catch (err) {
      console.error(err);
    }
  };

  if (!order) return <div>Loading...</div>;

  return (
    <Container className="mt-5">
      <h4>Order Details</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col} controlId="customerName">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={order.customer.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="customerEmail">
          <Form.Label>Customer Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={order.customer.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="customerAddress">
          <Form.Label>Customer Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={order.customer.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="customerPhone">
          <Form.Label>Customer Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={order.customer.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="totalAmount">
          <Form.Label>Total Amount</Form.Label>
          <Form.Control
            type="text"
            name="totalAmount"
            value={order.totalAmount}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={order.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default OrderDetails;
