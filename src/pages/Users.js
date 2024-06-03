import React, { useEffect, useState } from 'react';
import api from '../services/api'; 
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setusers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchusers();
  }, []);

  const fetchusers = async () => {
    try {                                                                                                                                                                                                                                                                                   
      const response = await api.get('/users/profiles');
      setusers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      alert('User deleted successfully');
      fetchusers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Profiles
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.firstName+" "+user.lastName}</TableCell>
                <TableCell>{user.accountType}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                  <Button onClick={() => navigate(`/users/${user._id}`)}>Edit</Button>
                  <Button onClick={() => handleDelete(user._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Users;
