import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductsCard({ productProp }) {
  const { _id, name, description, price, image } = productProp;
  const imagePath = `/images/${_id}.png`;

  return (
    <Card className="productCard" style={{ width: '15rem', margin: '1rem' }}>
      <Card.Img variant="top" src={imagePath} style={{ height: '200px', objectFit: 'contain' }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>Description:</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Price:</Card.Subtitle>
        <Card.Text>{price}</Card.Text>
        <Link className="btn btn-primary" to={`/products/${_id}`}>
          View Product
        </Link>
      </Card.Body>
    </Card>
  );
}
