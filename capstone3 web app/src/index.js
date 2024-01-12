// Entry point

// npm install -g create-react-app@latest
// npx create-react-app your-app-name
// npm install react-bootstrap bootstrap
// npm install react-router-dom

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// const name = "John Smith";
// const user = {
//                 firstName: 'Jane',
//                 lastName: 'Smith'
//             };

// function formatName(){
//   return user.firstName + ' ' + user.lastName;
// }

// const element = <h1>Hello, {formatName()}</h1>;

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(element);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


