import React, { useContext, useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import UserContext from '../UserContext';

const UserViewOrder = ({ ordersData, fetchData }) => {
  console.log('Received ordersData:', ordersData);
  const { user } = useContext(UserContext);
  const [userOrders, setUserOrders] = useState([]);
 const [productDetails, setProductDetails] = useState({});
  useEffect(() => {
    setUserOrders(Array.isArray(ordersData.yourOrder) ? ordersData.yourOrder : []);
  }, [ordersData]);

  console.log('userOrders:', userOrders);

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
    userOrders.forEach((order) => {
      order.productsOrdered.forEach((product) => {
        if (!productDetails[product.productId]) {
          fetchProductDetails(product.productId);
        }
      });
    });
  }, [userOrders, productDetails]);

  return (
    <div>
      <h1>Your Orders</h1>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total Price</th>
            <th>Products Ordered</th>
            <th>Status</th>
            <th>Ordered On</th>
          </tr>
        </thead>
        <tbody>
          {userOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>₱{order.totalPrice.toFixed(2)}</td>
              <td>
                <ul>
                  {order.productsOrdered.map((product) => (
                    <li key={product.productId}>
                      {productDetails[product.productId] && (
                        <>
                          {productDetails[product.productId]} - Quantity: {product.quantity} - Subtotal: ₱{product.subtotal.toFixed(2)}
                          <br />
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{order.status}</td>
              <td>{new Date(order.orderedOn).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserViewOrder;
