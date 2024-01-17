import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import PreviewProduct from '../components/PreviewProduct';

export default function ProductView() {
  const { productId } = useParams();
  const [productData, setProductData] = useState({});
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProductData(data.product);
      });
  }, [productId]);

  const handleBuyClick = () => {
    // Navigate to AddToCart with product details
    navigate('/add-to-cart', {
      state: {
        productId: productId,
        ...productData,
      },
    });
  };

  return (
    <Container className="mt-5 d-flex justify-content-center align-items-center">
      {Object.keys(productData).length > 0 && (
        <PreviewProduct data={productData} breakPoint={user.id !== null ? 8 : 12} handleBuyClick={handleBuyClick} />
      )}
    </Container>
  );
}
