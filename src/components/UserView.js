import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductsCard from './ProductsCard';

export default function UserView({ productsData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  if (
    productsData &&
    productsData.product &&
    Array.isArray(productsData.product)
  ) {
    const productsArr = productsData.product
      .filter((product) => product.isActive === true)
      .map((product, index) => (
        <Col
          key={product._id}
          xs={12}
          sm={6}
          md={4}
          lg={2}
          className="mb-3 mx-2 mx-md-4"
        >
          <ProductsCard productProp={product} key={product._id} />
        </Col>
      ));

    setProducts(productsArr);
  } 
}, [productsData]);

  const groupCards = (cards, groupSize) => {
    const grouped = [];
    for (let i = 0; i < cards.length; i += groupSize) {
      grouped.push(cards.slice(i, i + groupSize));
    }
    return grouped;
  };

  const groupedProducts = groupCards(products, 4);

  return (
    <>
      {groupedProducts.map((group, index) => (
        <Row key={index} className="justify-content-center">
          {group}
        </Row>
      ))}
    </>
  );
}
