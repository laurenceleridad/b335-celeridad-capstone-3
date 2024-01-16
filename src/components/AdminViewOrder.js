import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../App.css';

const AdminViewOrder = ({ ordersData, fetchOrdersForAdmin }) => {
  const [productDetails, setProductDetails] = useState({});
  const [allOrders, setAllOrders] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [orderIdToUpdate, setOrderIdToUpdate] = useState(null);

  const getStatusClass = (status) => {
    return status === 'Done' ? 'text-success' : 'text-danger';
  };

  const handleUpdateStatus = (orderId) => {
    setOrderIdToUpdate(orderId);
    setShowConfirmationModal(true);
  };

  const confirmUpdateStatus = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${orderIdToUpdate}/update-status`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      console.log('Response from server:', responseData);

      if (!response.ok) {
        throw new Error(`Failed to update order status: ${response.status}`);
      }

      // Update the order status locally
      setAllOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderIdToUpdate ? { ...order, status: 'Done' } : order))
      );

      // Close the confirmation modal
      setShowConfirmationModal(false);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    setAllOrders(Array.isArray(ordersData.allOrder) ? ordersData.allOrder : []);
  }, [ordersData]);

  useEffect(() => {
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

    const fetchDetailsForAllOrders = async () => {
      for (const order of ordersData.allOrder) {
        for (const product of order.productsOrdered) {
          if (!productDetails[product.productId]) {
            await fetchProductDetails(product.productId);
          }
        }
      }
    };

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
            <th>Actions</th>
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
                <td className={getStatusClass(order.status)}>{order.status}</td>
                <td>{new Date(order.orderedOn).toLocaleString()}</td>
                <td>
                  {order.status !== 'Done' && (
                    <Button variant="success" onClick={() => handleUpdateStatus(order._id)}>
                      Mark as Done
                    </Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No orders available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to mark this order as done?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmUpdateStatus}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminViewOrder;
