import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';
import AddProduct from './AddProduct'; // Import the AddProduct component

export default function AdminView({ productsData, fetchData }) {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); // New state variable

  useEffect(() => {
    if (Array.isArray(productsData.product) && productsData.product.length > 0) {
      const productsArr = productsData.product.map((product) => (
        <tr key={product._id}>
          <td>{product._id}</td>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td className={product.isActive ? 'text-success' : 'text-danger'}>
            {product.isActive ? 'Available' : 'Unavailable'}
          </td>
          <td>
            <EditProduct product={product._id} fetchData={fetchData} />
          </td>
          <td>
            <ArchiveProduct productId={product._id} fetchData={fetchData} isActive={product.isActive} />
          </td>
        </tr>
      ));

      setProducts(productsArr);
    } else {
      console.error('Invalid productsData:', productsData);
    }
  }, [productsData]);

  return (
  <>
    <Container>
      <h1 className="text-center mt-4 mb-2">Admin Dashboard</h1>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button variant="success" className="my-3 mx-2" onClick={() => setShowAddForm(true)}>
            Add Product
          </Button>
          <Link to="/orders">
              <Button variant="success" className="my-3">
                Go to all user Orders
              </Button>
            </Link>
        </Col>
      </Row>

      <AddProduct show={showAddForm} fetchData={fetchData} onClose={() => setShowAddForm(false)} />
    </Container>

    <Table striped bordered hover responsive>
      <thead>
        <tr className="text-center">
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Availability</th>
          <th colSpan="2">Actions</th>
        </tr>
      </thead>

      <tbody>{products}</tbody>
    </Table>
  </>
);
}
