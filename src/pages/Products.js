import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products/');
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      fetchProducts();
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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/addproducts')}>
        Add Product
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{trimDescription(product.description)}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Button onClick={() => navigate(`/products/${product._id}`)}>Edit</Button>
                  <Button onClick={() => handleDelete(product._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Products;
