import './App.css';
import AppNavbar from './components/AppNavbar';
// import Banner from "./components/Banner";

import {Container} from 'react-bootstrap';
import Home from "./pages/Home";
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Products from './pages/Products'
import Profile from './pages/Profile'
import ProductView from './pages/ProductView'
import AddToCart from './pages/AddToCart'
import AddProduct from './pages/AddProduct';
import Error from './pages/Error';





// npm install react-router-dom
// react-router-dom is a library for handling navigation and routing in React applications
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {UserProvider} from "./UserContext";

/*
  <Router> serves as a container for the entire routing logic
  <Routes> is a container for organizing multiple <Route> components
  <Route> is used to define a specific route, specifying the path and the component to render when that path is matched
*/
function App() {
  const [user, setUser] = useState({ id: null, isAdmin: null });

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    console.log("State: ");
    console.log(user); // checks the state
    console.log("Local storage")
    console.log(localStorage); // checks the localStorage
  },[user]);

  useEffect(() => {
    const accessToken = localStorage.getItem('access');

    if (accessToken) {
      fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (typeof data.user._id !== "undefined") {
            setUser({
              id: data.user._id,
              isAdmin: data.user.isAdmin,
            });
          } else {
            setUser({
              id: null,
              isAdmin: null,
            });
          }
        });
    }
  }, []);


  return (
    <UserProvider value = {{user, setUser, unsetUser}}>
      <Router>
        <Container fluid>
          <AppNavbar />
          <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path ="/login" element={<Login />} />
              <Route path ="/logout" element={<Logout />} />
              <Route path ="/products" element={<Products />} />
              <Route path ="/profile" element={<Profile />} />
              <Route path ="/addProduct" element={<AddProduct />} />
              <Route path ="/products/:productId" element={<ProductView />} />
              <Route path ="/add-to-cart" element={<AddToCart />} />

              <Route path="*" element={<Error />} />


          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
