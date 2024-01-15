import React, { useEffect, useState, useContext } from 'react';
import OrderCard from '../components/OrderCard';
import AdminViewOrder from '../components/AdminViewOrder';
import UserViewOrder from '../components/UserViewOrder';
import UserContext from '../UserContext';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    let fetchUrl = user.isAdmin
      ? `${process.env.REACT_APP_API_URL}/users/all-orders`
      : `${process.env.REACT_APP_API_URL}/users/my-orders`;

    const storedOrders = localStorage.getItem('orders');

    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
      setIsLoading(false);
    } else {
      fetch(fetchUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setOrders(data);
            localStorage.setItem('orders', JSON.stringify(data));
          } else {
            setOrders([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
          setOrders([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {user.isAdmin === true ? (
            <AdminViewOrder ordersData={orders} fetchOrdersForAdmin={fetchData} />
          ) : (
            <UserViewOrder ordersData={orders} />
          )}
        </>
      )}
    </>
  );
};

export default Order;
