import React from 'react';

const OrderCard = ({ orderProp }) => {
  // Check if orderProp is undefined
  if (!orderProp) {
    return null; // or display a loading message or handle it in another way
  }

  // Destructure properties from orderProp
  const { _id, userId, totalPrice, productsOrdered } = orderProp;

  return (
    <div className="order-card">
      <h3>Order ID: {_id}</h3>
      <p>
        <strong>User ID:</strong> {userId}
      </p>
      <p>
        <strong>Total Price:</strong> ₱{totalPrice.toFixed(2)}
      </p>
      <p>
        <strong>Products Ordered:</strong>
      </p>
      <ul>
        {productsOrdered.map((product) => (
          <li key={product.productId}>
            {product.productName} - Quantity: {product.quantity} - Subtotal: ₱{product.subtotal.toFixed(2)}
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
};

export default OrderCard;
