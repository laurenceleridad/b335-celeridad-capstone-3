import React from 'react';
import { Button } from 'react-bootstrap';

const CartItem = ({ item, onRemove }) => {
  return (
    <tr>
      <td>{item.productId}</td>
      <td>{item.quantity}</td>
      <td>₱{item.subtotal.toFixed(2)}</td>
      <td>
        <Button variant="danger" onClick={() => onRemove(item.productId)}>
          Remove
        </Button>
      </td>
    </tr>
  );
};

export default CartItem;
