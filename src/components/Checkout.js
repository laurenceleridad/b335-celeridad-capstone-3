import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems, onCancelCheckout }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate the total price whenever cartItems change
    setTotalPrice(calculateTotal(cartItems));
  }, [cartItems]);

  const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.subtotal, 0);
  };

  const handlePlaceOrder = async () => {
    try {
      // TODO: Make a request to your server to create an order
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (response.ok) {
        // Order created successfully
        Swal.fire({
          icon: 'success',
          title: 'Order Placed Successfully!',
          text: 'Thank you for shopping with us.',
        }).then(() => {
          // Redirect to a success page or any other desired route
          navigate('/order-success');
        });
      } else {
        // Handle error, show error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Something went wrong during checkout.',
        });
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error, show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong during checkout.',
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Checkout</h2>
            <p>Total Price: ₱{totalPrice.toFixed(2)}</p>
            <Button variant="primary" onClick={() => handlePlaceOrder()}>
              Place Order
            </Button>
            <Button variant="danger" onClick={onCancelCheckout} style={{ marginLeft: '10px' }}>
              Cancel Checkout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;