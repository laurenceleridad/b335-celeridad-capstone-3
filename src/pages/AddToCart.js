import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddToCart() {
  const { state } = useLocation();
  const [product, setProduct] = useState(state ? state : null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(UserContext);
  const imagePath = `/images/${product ? product.productId : '65799ecaee2e7bc8d688f308'}.png`;

  const addToCart = () => {
    if (!product || !product.productId) {
      console.error('Product or product ID is null');
      return;
    }

    const cartItem = {
      productId: product.productId,
      quantity: quantity,
    };

    const cartItemsArray = [cartItem];

    const requestBody = {
      cartItems: cartItemsArray,
    };

    fetch(`${process.env.REACT_APP_API_URL}/users/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === 'Items added to the cart successfully') {
          Swal.fire({
            title: 'Successful',
            icon: 'success',
            text: 'Item/s added to your cart',
          });
        } else if (data === 'Action Forbidden') {
          Swal.fire({
            title: 'Admin enrollment error',
            icon: 'error',
            text: 'Admin is not allowed to enroll',
          });
        } else {
          Swal.fire({
            title: 'Something went wrong',
            icon: 'error',
            text: 'Please try again.',
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // ... handle other errors
      });
  };

  useEffect(() => {
    // Fetch product information based on the product ID passed from the location state
    if (product && product.productId) {
      fetch(`${process.env.REACT_APP_API_URL}/products/${product.productId}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.product.name);
          setDescription(data.product.description);
          setPrice(data.product.price);
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          // Handle the error (e.g., show a message to the user)
        });
    }
  }, [product]);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card className="productCard" style={{ width: '15rem', margin: '1rem' }}>
            <Card.Img variant="top" src={imagePath} style={{ height: '200px', objectFit: 'contain' }} />
            <Card.Body className="text-center">
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle>Description:</Card.Subtitle>
              <Card.Text>{description}</Card.Text>
              <Card.Subtitle>Price:</Card.Subtitle>
              <Card.Text>PhP {price}</Card.Text>

              {/* Quantity spinner */}
              <Form.Group controlId="quantity">
                <Form.Label>Quantity:</Form.Label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <Button variant="outline-secondary btn-sm" onClick={decreaseQuantity}>
                      -
                    </Button>
                  </div>
                  <Form.Control type="text" value={quantity} readOnly />
                  <div className="input-group-append">
                    <Button variant="outline-secondary btn-sm" onClick={increaseQuantity}>
                      +
                    </Button>
                  </div>
                </div>
              </Form.Group>

              {user.id !== null ? (
                <Button variant="primary" block="true" onClick={addToCart}>
                  Add to Cart
                </Button>
              ) : (
                <Link className="btn btn-danger btn-block" to="/login">
                  Login to buy
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
