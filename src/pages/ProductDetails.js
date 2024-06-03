import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api'; 
import { Container, Typography, Paper, List, ListItem, ListItemText, TextField, Button, Divider } from '@mui/material';

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
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>
      <Paper style={{ padding: 16 }}>
        <List>
          <ListItem>
            <ListItemText primary="Category" secondary={product.category} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Image" secondary={product.image} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Brand" secondary={product.brand} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Price" secondary={`$${product.price}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Description" secondary={product.description} />
          </ListItem>
          <Divider />
          <Typography variant="h6" gutterBottom style={{ paddingLeft: 16, paddingTop: 16 }}>
            Specifications
          </Typography>
          {Object.keys(product.specifications).map((specKey) => (
            <ListItem key={specKey}>
              <ListItemText primary={specKey} secondary={product.specifications[specKey]} />
            </ListItem>
          ))}
          <ListItem>
            <ListItemText primary="Stock" secondary={product.stock} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Ratings" secondary={product.ratings} />
          </ListItem>
          <Divider />
          <Typography variant="h6" gutterBottom style={{ paddingLeft: 16, paddingTop: 16 }}>
            Reviews
          </Typography>
          {product.reviews.map((review) => (
            <ListItem key={review._id}>
              <ListItemText primary={review.user} secondary={`${review.comment} - ${review.rating} stars`} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
           <TextField
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {Object.keys(formData.specifications).map((specKey) => (
            <TextField
              key={specKey}
              label={specKey}
              name={specKey}
              value={formData.specifications[specKey]}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          ))}
          <TextField
            label="Stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ratings"
            name="ratings"
            value={formData.ratings}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
            Update Product
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
