import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartTable from '../components/CartTable';
// import CartItemOperations from '../components/CartItemOperations';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [product, setProduct] = useState(null); // Initialize product as null
  const [quantity] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items and set them in the state
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/get-cart`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        });

        if (response.ok) {
          const cartData = await response.json();
          setCartItems(cartData.YourCart.cartItems);

          // Assuming you have a product in the cart, set the product state
          if (cartData.YourCart.cartItems.length > 0) {
            setProduct(cartData.YourCart.cartItems[0].product);
          }
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

const handleUpdate = async (productId, quantity) => {
    try {
      const updateData = {
        productId: productId,
        quantity: quantity,
      };

      const updatedCartItem = await fetch(`${process.env.REACT_APP_API_URL}/users/update-cart-quantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify(updateData),
      });

      const updatedCartItemData = await updatedCartItem.json();

      if (updatedCartItemData.updatedQuantity) {
        setCartItems(updatedCartItemData.updatedQuantity.cartItems);
        // You might want to show a success message to the user
      } else {
        // Handle the case where the update was not successful
        console.error('Update failed:', updatedCartItemData);
        // You might want to show an error message to the user
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  

  const handleRemove = async (productId) => {
    try {
      const removedCartItem = await fetch(`${process.env.REACT_APP_API_URL}/users/${productId}/remove-from-cart`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });

      const removedCartItemData = await removedCartItem.json();

      if (removedCartItemData.updatedCartItems) {
        setCartItems(removedCartItemData.updatedCartItems.cartItems);
        // You might want to show a success message to the user
      } else {
        // Handle the case where the removal was not successful
        console.error('Removal failed:', removedCartItemData);
        // You might want to show an error message to the user
      }
    } catch (error) {
      console.error('Error removing cart item:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleClear = async () => {
    try {
      const clearedCart = await fetch(`${process.env.REACT_APP_API_URL}/users/clear-cart`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });

      const clearedCartData = await clearedCart.json();

      if (clearedCartData.updatedCart) {
        setCartItems(clearedCartData.updatedCart.cartItems);
        // You might want to show a success message to the user
      } else {
        // Handle the case where the clearance was not successful
        console.error('Clearance failed:', clearedCartData);
        // You might want to show an error message to the user
      }
    } catch (error) {
      console.error('Error clearing cart items:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
     <div>
    <h1 className="my-5 text-center">Your Cart</h1>
    {cartItems.length > 0 ? (
      <>
        <CartTable
          cartItems={cartItems}
          onRemove={handleRemove}
          onUpdate={handleUpdate}  // Pass the handleUpdate function
          onClear={handleClear}
          setCartItems={setCartItems}
        />
      </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
