import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">FragmanHubPH</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className="text-light">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products" className="text-light">
              Products
            </Nav.Link>
            {user.id !== null ? (
              user.isAdmin ? (
                <>
                  <Nav.Link as={NavLink} to="/profile" className="text-light">
                    Profile
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/orders" className="text-light">
                    All Orders
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/logout" className="text-light">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/profile" className="text-light">
                    Profile
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/cart" className="text-light">
                    Cart
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/orders" className="text-light">
                    Your Orders
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/logout" className="text-light">
                    Logout
                  </Nav.Link>
                </>
              )
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" className="text-light">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="text-light">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
