import React, { useEffect, useState } from 'react';
import api from '../services/api'; 
import { Container, Table, Button, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/users/${id}`); 
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user)
      await api.put(`/users/${id}`, user); 
      navigate('/users');
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Container>
      <h4>Edit User</h4>
      <div style={{ padding: 16 }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" name="username" value={user.username} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" name="address" value={user.address} onChange={handleChange} />
          </div>
          <Button type="submit" variant="primary" className="mb-3">Save</Button>
        </form>
      </div>
    </Container>
  );
};

export default UserDetails;
