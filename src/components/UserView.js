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
        .map((product) => (
          <Col key={product._id} xs={12} sm={6} lg={4} xl={3} className="mb-3">
            <ProductsCard productProp={product} key={product._id} />
          </Col>
        ));

      setProducts(productsArr);
    }
  }, [productsData]);

  return <Row className="g-4">{products}</Row>;
}