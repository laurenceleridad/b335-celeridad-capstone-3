import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

const UpdateProfile = ({ user, updateUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update only the specified field and leave others unchanged
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if there are no changes
    if (
      formData.firstName === user.firstName &&
      formData.lastName === user.lastName &&
      formData.mobileNo === user.mobileNo
    ) {
      Swal.fire({
        title: 'No Changes',
        icon: 'info',
        text: 'No changes detected. Please input your changes.',
      });
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Failed to update profile') {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Failed to update profile. Please try again.',
          });
        } else {
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: 'Profile updated successfully.',
          });
          // Update the user state with the new user details
          updateUser(data);
        }
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: 'Failed to update profile. Please try again.',
        });
      });
  };

  return (
    <Container>
      <Row className="mt-5">
        <Form onSubmit={handleSubmit}>
          <h1 className="my-5">Update Profile</h1>
          <Form.Group>
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mobile Number:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your mobile number"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default UpdateProfile;
