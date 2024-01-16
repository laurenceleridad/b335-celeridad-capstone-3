import { Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (email !== '' && password !== '') {
  //     setIsActive(true);
  //   } else {
  //     setIsActive(false);
  //   }
  // }, [email, password]);

  function loginUser(event) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => res.json())
      .then((data) => {
        console.log('Server Response:', data);

        if (data.access) {
          localStorage.setItem('access', data.access);
          retrieveUserDetails(data.access);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thank you for logging in',
            showConfirmButton: false,
            timer: 1500,
          });

          // Use navigate to programmatically navigate to the desired route
          navigate('/products');
        } else if (data.error === 'No Email Found') {
          Swal.fire({
            icon: 'error',
            title: 'No Email Found',
            text: 'Please register first. Thank you.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Email and password do not match',
            text: 'Incorrect password',
          });
        } 
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to login',
          text: error.message,
        });
        console.error('Error:', error);
      })
      .finally(() => {
        setEmail('');
        setPassword('');
      });
  }



const retrieveUserDetails = (token) => {
  fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // Assuming your backend sends user details with '_id' and 'isAdmin'
      setUser({
        id: data.user._id,
        isAdmin: data.user.isAdmin,
      });

      console.log(user);
    })
    .catch((error) => console.error('Error fetching user details:', error));
};

  return user.id !== null ? (
    <Navigate to="/products" />
  ) : (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Form onSubmit={(event) => loginUser(event)}>
            <h1 className="my-5">Login</h1>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Form.Group>
            <Button className="mt-3" variant="primary" type="submit" id="submitBtn">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
