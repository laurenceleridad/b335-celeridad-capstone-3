import { useState, useEffect, useContext } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddProduct({ show, onClose, fetchData }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // input states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  function addProduct(e) {
    // prevent submit event's default behavior
    e.preventDefault();

    let token = localStorage.getItem('access');

    fetch(`${process.env.REACT_APP_API_URL}/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.error) {
          Swal.fire({
            icon: 'error',
            title: data.error,
          });
        } else if (data.savedProduct) {
          Swal.fire({
            icon: 'success',
            title: 'Product Added',
          });

          onClose(); // Close the modal after successful submission
          fetchData(); // Fetch updated data
          navigate('/products');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong',
          });

          onClose(); // Close the modal on failure
          navigate('/products');
        }
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });

    setName('');
    setDescription('');
    setPrice(0);
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => addProduct(e)}>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              required
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="my-3">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
