import React from 'react';
import { Col, Table, Button, Image } from 'react-bootstrap';

export default function PreviewProduct({ data, breakPoint, handleBuyClick }) {
  const { _id, name, description, price } = data;
  const imagePath = `/images/${_id}.png`;

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
              <td colSpan="2" className="text-center">
                <Button variant="primary" onClick={handleBuyClick} style={{ width: '100%' }}>
                  Buy
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Col>
  );
}
