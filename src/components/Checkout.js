// CheckoutModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Container, Row, Col, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutModal = ({ showModal, onCancelCheckout, cartItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    // Fetch product details for each item in the cart
    const fetchProductDetails = async (productId) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`);
        const data = await response.json();

        if (response.ok) {
          setProductDetails((prevDetails) => ({
            ...prevDetails,
            [productId]: data.product.name,
          }));
        } else {
          console.error(`Failed to fetch product details for productId: ${productId}`);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    // Fetch details for each product in the cart
    cartItems.forEach((item) => {
      if (!productDetails[item.productId]) {
        fetchProductDetails(item.productId);
      }
    });
  }, [cartItems, productDetails]);
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
    <Modal show={showModal} onHide={onCancelCheckout} centered>
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="d-flex align-items-center justify-content-center h-100">
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h2>Checkout</h2>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.productId}>
                        <td>{productDetails[item.productId]}</td>
                        <td>{item.quantity}</td>
                        <td>₱{item.subtotal.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <p>
                  <strong>Total Price:</strong> ₱{totalPrice.toFixed(2)}
                </p>
                <Button variant="primary" onClick={handlePlaceOrder}>
                  Place Order
                </Button>
                <Button
                  variant="danger"
                  onClick={onCancelCheckout}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};


export default CheckoutModal;
