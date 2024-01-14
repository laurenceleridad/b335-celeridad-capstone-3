import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchByPrice = ({ onSearchResults }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = () => {
    if (!minPrice || !maxPrice || isNaN(minPrice) || isNaN(maxPrice)) {
      // Handle invalid input
      console.error('Invalid input. Both minPrice and maxPrice are required.');
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/products/SearchByPrice`, {
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
          // Handle the case where there is an error from the backend
          console.error('Error searching for products:', data.error);
        } else {
          // Pass the search results to the parent component
          onSearchResults(data.products);
        }
      })
      .catch((error) => {
        // Handle network errors or other exceptions
        console.error('Error searching for products:', error);
      });
  };

  return (
    <div>
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
      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchByPrice;
