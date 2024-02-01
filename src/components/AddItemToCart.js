import React from 'react';
import { Col, Table, Button, Image, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import { useState, useEffect, useContext } from 'react';

export default function PreviewProduct({ data, breakPoint, addToCart }) {
  const { _id, name, description, price } = data;
  const imagePath = `/images/${_id}.png`;
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(UserContext);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  return (
    <Col xs={12} md={breakPoint}>
      <div className="d-flex flex-column">
        <div className={`order-${breakPoint === 6 ? 'last' : 'first'}`}>
          <Image
            src={imagePath}
            style={{
              marginBottom: '1rem',
              objectFit: 'contain',
              width: '100%',
              height: '300px',
              maxWidth: '100%',
            }}
            alt={name}
            fluid
          />
        </div>
        <Table bordered>
          <tbody>
            <tr>
              <td colSpan="2" className="text-center">
                Product Details
              </td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{description}</td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>P {price}</td>
            </tr>
            <tr>
              <td>
                Quantity:
              </td>
              <td>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <Button variant="outline-secondary btn-sm" onClick={decreaseQuantity}>
                      -
                    </Button>
                  </div>
                  <Form.Control type="text" value={quantity} readOnly />
                  <div className="input-group-append">
                    <Button variant="outline-secondary btn-sm" onClick={increaseQuantity}>
                      +
                    </Button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="text-center">
                 {user.id !== null ? (
                <Button variant="primary" block onClick={() => addToCart(quantity)} style={{ width: '100%' }}>
                  Add to Cart
                </Button>
              ) : (
                <Link className="btn btn-danger btn-block" to="/login" style={{ width: '100%' }}>
                  Login to buy
                </Link>
              )}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Col>
  );
}