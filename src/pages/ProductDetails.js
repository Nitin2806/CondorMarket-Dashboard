import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, ListGroup, Button, Form } from 'react-bootstrap';
import api from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image:'',
    description: '',
    price: '',
    category: '',
    brand: '',
    specifications: {},
    stock: '',
    ratings: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setFormData({
          name: response.data.name,
          image:response.data.image,
          description: response.data.description,
          price: response.data.price,
          category: response.data.category,
          brand: response.data.brand,
          specifications: response.data.specifications,
          stock: response.data.stock,
          ratings: response.data.ratings,
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.specifications) {
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, formData);
      alert('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      <h4>Product Details</h4>
      <ListGroup>
        <ListGroup.Item><strong>Category:</strong> {product.category}</ListGroup.Item>
        <ListGroup.Item><strong>Image:</strong> {product.image}</ListGroup.Item>
        <ListGroup.Item><strong>Brand:</strong> {product.brand}</ListGroup.Item>
        <ListGroup.Item><strong>Price:</strong> ${product.price}</ListGroup.Item>
        <ListGroup.Item><strong>Description:</strong> {product.description}</ListGroup.Item>
      </ListGroup>
      <h6 style={{ marginTop: '1rem' }}>Specifications</h6>
      <ListGroup>
        {Object.entries(product.specifications).map(([specKey, value]) => (
          <ListGroup.Item key={specKey}><strong>{specKey}:</strong> {value}</ListGroup.Item>
        ))}
        <ListGroup.Item><strong>Stock:</strong> {product.stock}</ListGroup.Item>
        <ListGroup.Item><strong>Ratings:</strong> {product.ratings}</ListGroup.Item>
      </ListGroup>
      <h4 style={{ marginTop: '1rem' }}>Reviews</h4>
      <ListGroup>
        {product.reviews.map((review) => (
          <ListGroup.Item key={review._id}><strong>{review.user}</strong> - {review.comment} - {review.rating} stars</ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="image" value={formData.image} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
        </Form.Group>
        {Object.keys(formData.specifications).map((specKey) => (
           <Form.Group>
          <Form.Label>{specKey}</Form.Label>
            <Form.Control
              key={specKey}
              label={specKey}
              name={specKey}
              value={formData.specifications[specKey]}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            </Form.Group>
          ))}
        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form>
    </Container>
  );
};

export default ProductDetails;
