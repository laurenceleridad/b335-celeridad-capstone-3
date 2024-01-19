import { useEffect, useState, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import ProductsCard from '../components/ProductsCard';
import UserContext from '../UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import SearchByPrice from '../components/SearchByPrice';

export default function Products() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = () => {
    let fetchUrl = user.isAdmin
      ? `${process.env.REACT_APP_API_URL}/products/all`
      : `${process.env.REACT_APP_API_URL}/products/`;

    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setProducts([]);
      });
  };

  const handleSearchResults = (results) => {
    setProducts([]); // Clear existing products when new search results are available
    setSearchResults(results);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <Row>
      {/* Show search only for non-admin users */}
      {user && !user.isAdmin && (
        <Col xs={12} md={2}>
          <SearchByPrice onSearchResults={handleSearchResults} />
        </Col>
      )}

      <Col xs={12} md={user && !user.isAdmin ? 10 : 12}>
        {searchResults.length > 0 ? (
          <Row className="g-4">
            {searchResults.map((product) => (
              <Col key={product._id} xs={12} sm={6} lg={4} xl={3} className="mb-3">
                <ProductsCard key={product._id} productProp={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <>
            {user && user.isAdmin === true ? (
              <AdminView productsData={products} fetchData={fetchData} />
            ) : (
              <UserView productsData={products} />
            )}
          </>
        )}
      </Col>
    </Row>
  );
}
