import React, { useEffect, useState } from 'react';
import api from '../services/api'; 
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
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

  const handleDelete = async (id) => {
    try {
      await api.delete(`/orders/${id}`);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button onClick={() => navigate(`/orders/${order._id}`)}>Edit</Button>
                  <Button onClick={() => handleDelete(order._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Orders;
