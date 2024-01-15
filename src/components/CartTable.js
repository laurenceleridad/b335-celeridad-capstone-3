// CartTable.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Checkout from './Checkout';

const CartTable = ({ cartItems, onRemove, onUpdate, onClear }) => {
  const [productDetails, setProductDetails] = useState({});
  const [checkoutMode, setCheckoutMode] = useState(false);

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

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      onUpdate(productId, newQuantity);
    }
  };

  const handleCheckoutButtonClick = () => {
    setCheckoutMode(true);
  };

  const handleCancelCheckout = () => {
    setCheckoutMode(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.subtotal, 0);
  };

  return (
    <div>
      <Table striped bordered hover style={{ width: '80%', margin: 'auto', fontSize: '14px' }}>
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Product Name</th>
            <th style={{ width: '10%' }}>Quantity</th>
            <th style={{ width: '10%' }}>Subtotal</th>
            <th colSpan="3" style={{ width: '20%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.productId}>
              <td>{productDetails[item.productId] || 'Product Name Not Available'}</td>
              <td>
                <Button variant="secondary" onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>
                  -
                </Button>
                <span style={{ margin: '0 0.5rem' }}>{item.quantity}</span>
                <Button variant="secondary" onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>
                  +
                </Button>
              </td>
              <td>₱{item.subtotal.toFixed(2)}</td>
              <td>
                <Button variant="danger" onClick={() => onRemove(item.productId)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" style={{ textAlign: 'right', paddingRight: '1rem' }}>
              <strong>Total:</strong>
            </td>
            <td colSpan="3">
              <strong>₱{calculateTotal(cartItems).toFixed(2)}</strong>
            </td>
          </tr>
          <tr>
            <td colSpan="5" style={{ textAlign: 'left' }}>
              <Button variant="danger" onClick={onClear}>
                Clear Cart
              </Button>
              <Button variant="primary" style={{ marginLeft: '10px' }} onClick={handleCheckoutButtonClick}>
                Checkout
              </Button>
            </td>
          </tr>
        </tfoot>
      </Table>

      {checkoutMode && (
        <Checkout
          showModal={checkoutMode}
          onCancelCheckout={handleCancelCheckout}
          cartItems={cartItems}
        />
      )}
    </div>
  );
};

export default CartTable;

