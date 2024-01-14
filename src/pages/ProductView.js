import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function ProductView() {
  const { productId } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const imagePath = `/images/${productId}.png`;

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
      });
  }, [productId]);

  const handleBuyClick = () => {
    // Navigate to AddToCart with product details
    navigate('/add-to-cart', {
      state: {
        productId: productId,
        name: name,
        description: description,
        price: price,
      },
    });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card className="productCard" style={{ width: '15rem', margin: '1rem' }}>
            <Card.Img variant="top" src={imagePath} style={{ height: '200px', objectFit: 'contain' }} />
            <Card.Body className="text-center">
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle>Description:</Card.Subtitle>
              <Card.Text>{description}</Card.Text>
              <Card.Subtitle>Price:</Card.Subtitle>
              <Card.Text>PhP {price}</Card.Text>

              <Button variant="primary" block="true" onClick={handleBuyClick}>
                Buy
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
