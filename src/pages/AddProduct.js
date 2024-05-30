import React, { useState } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, TextField, Button, MenuItem, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categories = {
  "Mobiles": ["Screen Size", "Battery", "Camera", "Processor","Storage"],
  "Laptops": ["Screen Size", "Battery", "Processor", "RAM", "Storage"],
  "Cameras": ["Resolution", "Battery", "Lens Type"],
  "Clothing": ["Size", "Color", "Material"],
  "Tablets": ["Screen Size", "Battery", "Processor", "RAM", "Storage", "Camera", "Operating System"],
  "Smartwatches": ["Screen Size", "Battery Life", "Water Resistance", "Connectivity", "Sensors", "Operating System"],
  "Televisions": ["Screen Size", "Resolution", "Smart TV Features", "Refresh Rate", "Ports", "Display Type"],
  "Headphones": ["Type", "Connectivity", "Battery Life", "Noise Cancellation", "Frequency Response", "Microphone"],
  "Refrigerators": ["Capacity", "Energy Rating", "Type", "Frost Free", "Compressor Type", "Shelves Material"],
  "Washing Machines": ["Capacity", "Type", "Energy Rating", "Wash Programs", "Spin Speed", "Inverter Technology"],
  "Microwave Ovens": ["Capacity", "Type", "Power Consumption", "Control Type", "Pre-set Menus", "Child Lock"],
  "Electric Shavers": ["Type", "Battery Life", "Charging Time", "Waterproof", "Attachments", "Blade Material"],
  "Hair Dryers": ["Power", "Heat Settings", "Speed Settings", "Cool Shot Button", "Attachments", "Cord Length"],
};


const AddProduct = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    image:'',
    description: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
    specifications: {},
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSpecChange = (e, spec) => {
    setFormData({
      ...formData,
      specifications: {
        ...formData.specifications,
        [spec]: e.target.value,
      },
    });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setFormData({ ...formData, category: e.target.value, specifications: {} });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/products', formData);
      navigate('/products');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
      <Paper>
        <form onSubmit={handleAddProduct}>
          <Grid container spacing={2} style={{ padding: '20px' }}>
            <Grid item xs={6}>
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="image"
                label="Image URL"
                value={formData.image}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="price"
                label="Price"
                value={formData.price}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="brand"
                label="Brand"
                value={formData.brand}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="stock"
                label="Stock"
                value={formData.stock}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                name="category"
                label="Category"
                value={category}
                onChange={handleCategoryChange}
                fullWidth
              >
                {Object.keys(categories).map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {categories[category] && categories[category].map((spec) => (
              <Grid item xs={6} key={spec}>
                <TextField
                  name={spec}
                  label={spec}
                  value={formData.specifications[spec] || ''}
                  onChange={(e) => handleSpecChange(e, spec)}
                  fullWidth
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProduct;
