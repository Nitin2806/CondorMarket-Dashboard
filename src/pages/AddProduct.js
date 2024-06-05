import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const categories = {
  "Mobiles": ["Screen Size", "Battery", "Camera", "Processor", "Storage"],
  "Laptops": ["Screen Size", "Battery", {"Processor": ["Intel", "AMD"]}, {"RAM": ["8GB", "16GB", "32GB"]}, "Storage"],
  "Cameras": ["Resolution", "Battery", "Lens Type"],
  "Clothing": ["Size", "Color", "Material", {"Style": ["Casual", "Formal", "Sportswear"]}, {"Gender": ["Men", "Women", "Unisex"]}],
  "Tablets": ["Screen Size", "Battery", {"Processor": ["Intel", "AMD"]}, {"RAM": ["8GB", "16GB", "32GB"]}, "Storage", "Camera", "Operating System"],
  "Smartwatches": ["Screen Size", "Battery Life", "Water Resistance", "Connectivity", "Sensors", "Operating System"],
  "Televisions": ["Screen Size", "Resolution", "Smart TV Features", {"Refresh Rate": ["60Hz", "120Hz", "180Hz"]}, "Ports", "Display Type"],
  "Headphones": ["Type", "Connectivity", "Battery Life", "Noise Cancellation", "Frequency Response", "Microphone"],
  "Refrigerators": ["Capacity", "Energy Rating", "Type", "Frost Free", "Compressor Type", "Shelves Material"],
  "Washing Machines": ["Capacity", {"Type": ["Top Load", "Front Load"]}, "Energy Rating", {"Wash Programs": ["Normal", "Heavy Duty", "Delicates"]}, "Spin Speed", "Inverter Technology"],
  "Microwave Ovens": ["Capacity", "Type", "Power Consumption", "Control Type", "Pre-set Menus", "Child Lock"],
  "Electric Shavers": ["Type", "Battery Life", "Charging Time", "Waterproof", "Attachments", "Blade Material"],
  "Hair Dryers": ["Power", "Heat Settings", "Speed Settings", "Cool Shot Button", "Attachments", "Cord Length", {"Hair Type": ["Straight", "Curly", "Wavy"]}],
};


const AddProduct = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    image: '',
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
      await api.post('/products', formData);
      navigate('/products');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <h4>Add Product</h4>
      <Form onSubmit={handleAddProduct}>
        <Row>
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="image">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" name="image" value={formData.image} onChange={handleInputChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleInputChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" name="price" value={formData.price} onChange={handleInputChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control type="text" name="brand" value={formData.brand} onChange={handleInputChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="text" name="stock" value={formData.stock} onChange={handleInputChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" name="category" value={category} onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                {Object.keys(categories).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        {category &&
  categories[category] &&
  categories[category].map((spec, index) => (
    <Row key={index}>
      <Col>
        {typeof spec === 'object' ? (
          <Form.Group controlId={Object.keys(spec)[0]}>
            <Form.Label>{Object.keys(spec)[0]}</Form.Label>
            <Form.Control
              as="select"
              name={Object.keys(spec)[0]}
              value={formData.specifications[Object.keys(spec)[0]] || ''}
              onChange={(e) => handleSpecChange(e, Object.keys(spec)[0])}
            >
              <option value="">Select {Object.keys(spec)[0]}</option>
              {spec[Object.keys(spec)[0]].map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        ) : (
          <Form.Group controlId={spec}>
            <Form.Label>{spec}</Form.Label>
            <Form.Control
              type="text"
              name={spec}
              value={formData.specifications[spec] || ''}
              onChange={(e) => handleSpecChange(e, spec)}
            />
          </Form.Group>
        )}
      </Col>
    </Row>
  ))}
        <Button variant="primary" type="submit">Add Product</Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
