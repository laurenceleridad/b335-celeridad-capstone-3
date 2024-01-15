// CartTable.js

import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

const CartTable = ({ cartItems, onRemove, onUpdate, onClear, setCartItems }) => {
  const [productDetails, setProductDetails] = useState({});

  // Helper function to fetch product details
  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`);
      const data = await response.json();

      if (response.ok) {
        setProductDetails((prevDetails) => ({
          ...prevDetails,
          [productId]: data.product.name, // Store product name in productDetails state
        }));
      } else {
        console.error('Failed to fetch product details');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  // Fetch product details when cartItems change
  useEffect(() => {
    cartItems.forEach((item) => {
      if (!productDetails[item.productId]) {
        fetchProductDetails(item.productId);
      }
    });
  }, [cartItems, productDetails]);

  const handleQuantityChange = (productId, newQuantity) => {
    onUpdate(productId, newQuantity);
  };

  return (
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
            <td>${item.subtotal.toFixed(2)}</td>
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
            <strong>${calculateTotal(cartItems).toFixed(2)}</strong>
          </td>
        </tr>
        <tr>
          <td colSpan="5" style={{ textAlign: 'left' }}>
            <Button variant="danger" onClick={onClear}>
              Clear Cart
            </Button>
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};

const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.subtotal, 0);
};

export default CartTable;

// import React from 'react';
// import { Table, Button } from 'react-bootstrap';

// const CartTable = ({ cartItems, onRemove, onUpdate, onClear, setCartItems }) => {
//   const handleQuantityChange = (productId, newQuantity) => {
//     onUpdate(productId, newQuantity);
//   };

//   return (
//     <Table striped bordered hover style={{ width: '80%', margin: 'auto', fontSize: '14px' }}>
//       <thead>
//         <tr>
//           <th style={{ width: '30%' }}>Product Name</th>
//           <th style={{ width: '10%' }}>Quantity</th>
//           <th style={{ width: '10%' }}>Subtotal</th>
//           <th colSpan="3" style={{ width: '20%' }}>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {cartItems.map((item) => (
//           <tr key={item.productId}>
//             <td>{item.cart.name || 'Product Name Not Available'}</td>
//             <td>
//               <Button variant="secondary" onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>
//                 -
//               </Button>
//               <span style={{ margin: '0 0.5rem' }}>{item.quantity}</span>
//               <Button variant="secondary" onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>
//                 +
//               </Button>
//             </td>
//             <td>${item.subtotal.toFixed(2)}</td>
//             <td>
//               <Button variant="danger" onClick={() => onRemove(item.productId)}>
//                 Remove
//               </Button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//       <tfoot>
//         <tr>
//           <td colSpan="2" style={{ textAlign: 'right', paddingRight: '1rem' }}>
//             <strong>Total:</strong>
//           </td>
//           <td colSpan="3">
//             <strong>${calculateTotal(cartItems).toFixed(2)}</strong>
//           </td>
//         </tr>
//         <tr>
//           <td colSpan="5" style={{ textAlign: 'left' }}>
//             <Button variant="danger" onClick={onClear}>
//               Clear Cart
//             </Button>
//           </td>
//         </tr>
//       </tfoot>
//     </Table>
//   );
// };

// const calculateTotal = (cartItems) => {
//   return cartItems.reduce((total, item) => total + item.subtotal, 0);
// };

// export default CartTable;
