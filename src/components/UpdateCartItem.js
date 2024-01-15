import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function UpdateCartItem({ product, fetchData }) {
  // State for the cart item update modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // State for form inputs
  const [quantity, setQuantity] = useState(product.quantity);

  // Function to open the update cart item modal
  const openUpdateModal = () => {
    setShowUpdateModal(true);
  };

  // Function to close the update cart item modal
  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  // Function to handle cart item update
  const handleUpdateCartItem = async (e) => {
    e.preventDefault();

    try {
      const updateData = {
        productId: product.productId,
        quantity: quantity,
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/update-cart-quantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (data.updatedQuantity) {
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          text: 'Cart Item Successfully Updated',
        });
        fetchData(); // Fetch updated cart data
        closeUpdateModal(); // Close the modal
      } else {
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: 'Failed to update cart item. Please try again.',
        });
        closeUpdateModal(); // Close the modal
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={openUpdateModal}>
        Update Cart Item
      </Button>

      <Modal show={showUpdateModal} onHide={closeUpdateModal}>
        <Form onSubmit={handleUpdateCartItem}>
          <Modal.Header closeButton>
            <Modal.Title>Update Cart Item</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeUpdateModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Update Item
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
