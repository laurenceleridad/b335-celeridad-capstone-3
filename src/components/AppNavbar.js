
import {Container, Nav, Navbar} from 'react-bootstrap'; 
import {Link, NavLink} from 'react-router-dom';
// - Modules are treated as objects and object deconstruction may be applied in order to shorten the syntax when importing modules from same packages

import { useContext } from 'react';
import UserContext from '../UserContext'



export default function AppNavbar(){
	// state
	// const [user, setUser] = useState(localStorage.getItem("access"));
	// console.log(user);

	const { user } = useContext(UserContext);

	return(
		<Navbar expand="lg" className="bg-body-tertiary">
	      <Container fluid>
	        <Navbar.Brand as={Link} to = "/">FragmanHubPH</Navbar.Brand>
	        <Navbar.Toggle aria-controls="basic-navbar-nav" />
	        <Navbar.Collapse id="basic-navbar-nav">
	          <Nav className="me-auto">
	            <Nav.Link as={NavLink} to="/" >Home</Nav.Link>
	            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
	             {user.id !== null ? (
	                       user.isAdmin ? (
	                         <>
	                           <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
	                           <Nav.Link as={NavLink} to="/addProduct">Add Product</Nav.Link>
	                            <Nav.Link as={NavLink} to="/orders">All Orders</Nav.Link>
	                           <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
	                         </>
	                       ) : (
	                         <>
	                           <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
	                           <Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
	                            <Nav.Link as={NavLink} to="/orders">Your Orders</Nav.Link>
	                           <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
	                         </>
	                       )
	                     ) : (
	                       <>
	                         <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
	                         <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
	                       </>
	                     )}
	            
	          </Nav>
	        </Navbar.Collapse>
	      </Container >
	    </Navbar>
	)
}