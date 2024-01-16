import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const SearchByPrice = ({ onSearchResults }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = () => {
    // Reset error message
    setError(null);

    if (!minPrice || !maxPrice || isNaN(minPrice) || isNaN(maxPrice)) {
      setError('Invalid input. Both minPrice and maxPrice are required and must be valid numbers.');
      return;
    }

    // Check if minPrice is greater than maxPrice
    if (parseFloat(minPrice) > parseFloat(maxPrice)) {
      setError('Invalid input. Min Price should be less than or equal to Max Price.');
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/products/searchByPrice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ minPrice, maxPrice }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setError(`Error searching for products: ${data.error}`);
        } else {
          onSearchResults(data.products);
        }
      })
      .catch((error) => {
        setError(`Error searching for products: ${error.message}`);
      });
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group>
        <Form.Label>Min Price:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Max Price:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </Form.Group>
      <Button className="mt-3" variant="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchByPrice;
