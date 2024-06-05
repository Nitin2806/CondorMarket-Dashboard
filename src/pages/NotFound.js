import React from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import notFoundImage from '../assets/NotFoundImage.svg';

function NotFound() {
  return (
    <Container className="text-center mt-5">
      <Image src={notFoundImage} alt="Page Not Found" fluid className="mb-4" />
      <h4 className="mb-3">404 - Page Not Found</h4>
      <p className="mb-4">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Button variant="primary" as={Link} to="/">
        Go Back to Home
      </Button>
    </Container>
  );
}

export default NotFound;
