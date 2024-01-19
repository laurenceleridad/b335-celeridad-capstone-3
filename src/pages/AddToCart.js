import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import AddItemToCart from '../components/AddItemToCart';

export default function AddToCart() {
  const { state } = useLocation();
  const [product, setProduct] = useState(state ? state : null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(UserContext);
  const imagePath = `/images/${product ? product.productId : '65799ecaee2e7bc8d688f308'}.png`;
  const navigate = useNavigate();

  const addToCart = () => {
    if (!product || !product.productId) {
      console.error('Product or product ID is null');
      return;
    }

    const cartItem = {
      productId: product.productId,
      quantity: quantity,
    };

    const cartItemsArray = [cartItem];

    const requestBody = {
      cartItems: cartItemsArray,
    };

    fetch(`${process.env.REACT_APP_API_URL}/users/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === 'Items added to the cart successfully') {
          Swal.fire({
            title: 'Successful',
            icon: 'success',
            text: 'Item/s added to your cart',
          })
          navigate('/cart');
        } else if (data === 'Action Forbidden') {
          Swal.fire({
            title: 'Admin enrollment error',
            icon: 'error',
            text: 'Admin is not allowed to enroll',
          });
        } else {
          Swal.fire({
            title: 'Something went wrong',
            icon: 'error',
            text: 'Please try again.',
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // ... handle other errors
      });
  };

  useEffect(() => {
    // Fetch product information based on the product ID passed from the location state
    if (product && product.productId) {
      fetch(`${process.env.REACT_APP_API_URL}/products/${product.productId}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.product.name);
          setDescription(data.product.description);
          setPrice(data.product.price);
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          // Handle the error (e.g., show a message to the user)
        });
    }
  }, [product]);


  return (
    <Container className="mt-5 d-flex justify-content-center align-items-center">
      {Object.keys(product).length > 0 && (
        <AddItemToCart data={product} breakPoint={user.id !== null ? 8 : 12} addToCart={addToCart} />
      )}
    </Container>
  );
}