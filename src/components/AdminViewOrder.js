import React, { useEffect, useState } from 'react';
import '../App.css'; // Create a CSS file (AdminViewOrder.css) for styling

const AdminViewOrder = ({ ordersData, fetchOrdersForAdmin }) => {
  const [productDetails, setProductDetails] = useState({});
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    setAllOrders(Array.isArray(ordersData.allOrder) ? ordersData.allOrder : []);
  }, [ordersData]);

  useEffect(() => {
    // Fetch product details for each product in each order
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

    // Fetch details for each product in each order
    const fetchDetailsForAllOrders = async () => {
      for (const order of ordersData.allOrder) {
        for (const product of order.productsOrdered) {
          if (!productDetails[product.productId]) {
            await fetchProductDetails(product.productId);
          }
        }
      }
    };

    // Check if ordersData is available before attempting to fetch details
    if (ordersData.allOrder && ordersData.allOrder.length > 0) {
      fetchDetailsForAllOrders();
      setAllOrders(ordersData.allOrder);
    }
  }, [ordersData, productDetails]);

  return (
    <div className="table-container">
      <h1>All Orders</h1>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Total Price</th>
            <th>Products Ordered</th>
            <th>Status</th>
            <th>Ordered On</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.length > 0 ? (
            allOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId}</td>
                <td>₱{order.totalPrice.toFixed(2)}</td>
                <td>
                  <ul>
                    {order.productsOrdered.map((product) => (
                      <li key={product._id}>
                        {productDetails[product.productId]} - Quantity: {product.quantity} - Subtotal: ₱{product.subtotal.toFixed(2)}
                        <br />
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.status}</td>
                <td>{new Date(order.orderedOn).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No orders available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminViewOrder;
