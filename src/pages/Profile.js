import { useState, useEffect, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserContext from '../UserContext';
import { useNavigate, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ResetPassword from '../components/ResetPassword';
import UpdateProfile from '../components/UpdateProfile';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [details, setDetails] = useState({});
  const [detailsLoaded, setDetailsLoaded] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.user) {
          setUser(data.user); // Assuming data is the entire user object
          setDetails(data.user);
        } else {
          Swal.fire({
            title: 'Something went wrong',
            icon: 'error',
            text: 'Something went wrong, kindly contact us for assistance.',
          });
        }
      })
      .finally(() => {
        setDetailsLoaded(true); // Set detailsLoaded to true when details are fetched
      });
  }, [setUser, setDetails]);

  if (!detailsLoaded) {
    return null; // Render nothing until details are loaded
  }

  return (
    <>
      {user.id !== null ? (
        <>
          <Row>
            <Col className="p-5 bg-primary text-white">
              <h1 className="my-5">Profile</h1>
              <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
              <hr />
              <h4>Contacts</h4>
              <ul>
                <li>Email: {details.email}</li>
                <li>Mobile No: {details.mobileNo}</li>
              </ul>
            </Col>
          </Row>
          <Row>
            <ResetPassword />
            <UpdateProfile user={details} updateUser={setUser} />
          </Row>
        </>
      ) : (
        <Navigate to="/products" />
      )}
    </>
  );
}

