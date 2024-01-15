import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductsCard({ productProp }) {
  const { _id, name, description, price, image } = productProp;
  const imagePath = `/images/${_id}.png`;

  return (
    <Card className="productCard hover-effect" style={{ width: '15rem', margin: '1rem' }}>
      <Card.Img variant="top" src={imagePath} style={{ height: '200px', objectFit: 'contain' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ height: '50px', overflow: 'hidden' }}>{name}</Card.Title>

        {/* Set a fixed height for the description */}
        <Card.Subtitle className="mt-2" style={{ height: '20px', overflow: 'hidden' }}>
          Description:
        </Card.Subtitle>

        <Card.Text style={{ height: '100px', overflow: 'hidden' }}>{description}</Card.Text>

        {/* Wrap price and "View Product" button in a div */}
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <Card.Subtitle>Price:</Card.Subtitle>
          <Card.Text>{price}</Card.Text>
        </div>

        <Link className="btn btn-primary btn-block mt-3" to={`/products/${_id}`}>
          View Product
        </Link>
      </Card.Body>
    </Card>
  );
}