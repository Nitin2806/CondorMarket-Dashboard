import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/orders/${deleteOrderId}`);
      fetchOrders();
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true);
    setDeleteOrderId(id);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <Container>
      <h4>Orders</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.customer.name}</td>
              <td>{order.totalAmount}</td>
              <td>{order.status}</td>
              <td>
                <Button variant="info" onClick={() => navigate(`/orders/${order._id}`)}>Edit</Button>
                <Button variant="danger" onClick={() => handleShowDeleteModal(order._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this order?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Orders;
