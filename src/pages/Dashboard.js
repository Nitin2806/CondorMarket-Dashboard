// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';

function Dashboard() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to Condor Market!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
            <Typography variant="h6">Products</Typography>
            <Typography>View and manage your products</Typography>
            <Button component={Link} to="/products" variant="contained" color="primary" style={{ marginTop: '8px' }}>
              Go to Products
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
            <Typography variant="h6">Orders</Typography>
            <Typography>View and manage orders</Typography>
            <Button component={Link} to="/orders" variant="contained" color="primary" style={{ marginTop: '8px' }}>
              Go to Orders
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
            <Typography variant="h6">Users</Typography>
            <Typography>View and manage users</Typography>
            <Button component={Link} to="/users" variant="contained" color="primary" style={{ marginTop: '8px' }}>
              Go to Users
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
