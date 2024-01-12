import './App.css';
import AppNavbar from './components/AppNavbar';
// import Banner from "./components/Banner";
import Home from "./pages/Home";
import {Container} from 'react-bootstrap';
import Register from './pages/Register';



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

  const [user, setUser] = useState({id: null, isAdmin: null});

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
    fetch(`http://localhost:4002/users/details`, {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('access') }`
      }
    })
    .then(res => res.json())
    .then(data => {
        if(typeof data._id !== "undefined"){
          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          })
        }
        else{
          setUser({
            id: null,
            isAdmin: null
          })
        }
    })
  },[])


  return (
    <UserProvider value = {{user, setUser, unsetUser}}>
      <Router>
        <Container fluid>
          <AppNavbar />
          <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
             


          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
