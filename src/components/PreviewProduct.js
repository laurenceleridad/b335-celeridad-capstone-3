import React from 'react';
import { Col, Table, Button, Image } from 'react-bootstrap';

export default function PreviewProduct({ data, breakPoint, handleBuyClick }) {
  const { _id, name, description, price } = data;
  const imagePath = `/images/${_id}.png`;

  return (
    <Col xs={12} md={breakPoint}>
      <Table bordered>
        <tbody>
          <tr>
            {breakPoint === 6 ? (
              <td className={`order-${breakPoint === 6 ? 'last' : 'first'}`}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Image
                    src={imagePath}
                    style={{
                      marginBottom: '1rem',
                      objectFit: 'contain',
                      width: '100%', // Ensure the image takes up 100% width
                      maxWidth: '100%', // Ensure the image doesn't exceed its natural size
                    }}
                    alt={name}
                    fluid
                  />
                  <Table>
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
              </td>
            ) : (
              <>
                <td className={`order-${breakPoint === 12 ? 'last' : 'first'}`} style={{ width: '50%' }}>
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      src={imagePath}
                      style={{ height: '300px', objectFit: 'contain', width: '100%', maxWidth: '100%' }}
                      alt={name}
                      fluid
                    />
                  </div>
                </td>
                <td>
                  <Table>
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
                </td>
              </>
            )}
          </tr>
        </tbody>
      </Table>
    </Col>
  );
}

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
