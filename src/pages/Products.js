import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import api from '../services/api'; 
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products/');
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const trimDescription = (description) => {
    if (description.length > 90) {
      return description.substring(0, 90) + '...';
    }
    return description;
  };

  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true);
    setDeleteProductId(id);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <Container>
      <h4>Products</h4>
      <Button variant="primary" onClick={() => navigate('/addproducts')}>
        Add Product
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{trimDescription(product.description)}</td>
              <td>{product.price}</td>
              <td>
                <Button variant="info" onClick={() => navigate(`/products/${product._id}`)}>Edit</Button>
                <Button variant="danger" onClick={() => handleShowDeleteModal(product._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteProductId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Products;