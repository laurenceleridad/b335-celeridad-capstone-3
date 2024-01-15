import React from 'react';
import { Table, Button } from 'react-bootstrap';
import CartItem from './CartItem';
// import CartItemOperations from './CartItemOperations';

const CartTable = ({ cartItems, onRemove, onUpdate, onClear, setCartItems }) => {
  return (
    <Table striped bordered hover style={{ width: '80%', margin: 'auto', fontSize: '14px' }}>
      <thead>
        <tr>
          <th style={{ width: '30%' }}>Product ID</th>
          <th style={{ width: '10%' }}>Quantity</th>
          <th style={{ width: '10%' }}>Subtotal</th>
          <th colSpan="2" style={{ width: '10%' }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <tr key={item.productId}>
            <td>{item.productId}</td>
            <td>{item.quantity}</td>
            <td>${item.subtotal.toFixed(2)}</td>
            <td colSpan="2">
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
          <td colSpan="2">
            <strong>${calculateTotal(cartItems).toFixed(2)}</strong>
          </td>
        </tr>
        <tr>
          <td colSpan="4" style={{ textAlign: 'left' }}>
            <Button variant="danger" onClick={onClear}>
              Clear Cart
            </Button>
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};

// Helper function to calculate the total
const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.subtotal, 0);
};

export default CartTable;

// <CartItemOperations
              //   onUpdate={onUpdate}
              //   setCartItems={setCartItems}
              //   product={item.product}
              //   quantity={item.quantity}
              // />