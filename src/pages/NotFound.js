import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import notFoundImage from '../assets/NotFoundImage.svg'; 

function NotFound() {
  return (
    <Container sx={{ textAlign: 'center', marginTop: 8 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img
          src={notFoundImage}
          alt="Page Not Found"
          style={{ maxWidth: '100%', height: 'auto', marginBottom: 32 }}
        />
        <Typography variant="h4" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 4 }}
          component={Link}
          to="/"
        >
          Go Back to Home
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound;
