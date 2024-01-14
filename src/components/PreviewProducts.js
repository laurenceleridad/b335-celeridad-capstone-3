import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Product(props){

	const { data, breakPoint } = props;

	const { _id, name, description, price } = data;

	return(
		//breakPoint prop na pinasa then nareceive sa previewCourses
		//props may laman na breakPoint
		//breakPoint may value na two
		//if medium devices 2 columns ang maooccupy nya
		<Col xs={12} md={breakPoint}>
			<Card className = "cardHighlight mx-2">
				<Card.Body>
					<Card.Title className="text-center">
						<Link to={`/products/${_id}`}>{name}</Link>
						<Card.Text>{description}</Card.Text>
					</Card.Title>
				</Card.Body>
				<Card.Footer>
					<h5 className="text-center">P {price}</h5>
					<Link className="btn btn-primary d-block" to={`/products/${_id}`}>Details</Link>
				</Card.Footer>
			</Card>
		</Col>
	)
}