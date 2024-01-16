import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';
import AddProduct from '../pages/AddProduct'; // Import the AddProduct component

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
      <h1 className="text-center my-4"> Admin Dashboard</h1>

      {/* Button to open AddProduct form */}
      <Button variant="primary" className="my-3" onClick={() => setShowAddForm(true)}>
        Add Product
      </Button>

      {/* AddProduct component */}
      <AddProduct show={showAddForm} fetchData={fetchData} onClose={() => setShowAddForm(false)} />

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
