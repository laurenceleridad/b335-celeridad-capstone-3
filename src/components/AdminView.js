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
    <Container className="mt-5 d-flex justify-content-center align-items-center">
      <div className="text-center"> {/* Center-align content */}
        <h1>Admin Dashboard</h1>
  
        <div className="my-3">
          <Button variant="success" className="mx-2" onClick={() => setShowAddForm(true)}>
            Add Product
          </Button>
          <Link to="/orders">
            <Button variant="success" className="mx-2">
              Go to all user Orders
            </Button>
          </Link>
        </div>
  
        <AddProduct show={showAddForm} fetchData={fetchData} onClose={() => setShowAddForm(false)} />
  
        <Table striped bordered hover responsive className="mt-3">
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
      </div>
    </Container>
  );
}
  