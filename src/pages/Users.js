import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import api from '../services/api'; 
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users/profiles');
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true);
    setDeleteUserId(id);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <Container>
      <h4>User Profiles</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Type</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.accountType}</td>
              <td>{user.address}</td>
              <td>
                <Button variant="info" onClick={() => navigate(`/users/${user._id}`)}>Edit</Button>
                <Button variant="danger" onClick={() => handleShowDeleteModal(user._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteUserId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Users;
