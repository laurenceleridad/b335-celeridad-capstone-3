import { useEffect, useState, useContext } from 'react';
import ProductsCard from '../components/ProductsCard';
import UserContext from '../UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import SearchByPrice from '../components/SearchByPrice';
import { Row, Col } from 'react-bootstrap'; // Import Row and Col from react-bootstrap

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
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div>
      <SearchByPrice onSearchResults={handleSearchResults} />
      {searchResults.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4"> 
          {searchResults.map((product) => (
            <Col key={product._id} style={{ marginBottom: '1rem' }}>
              <ProductsCard productProp={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <>
          {user.isAdmin === true ? (
            <AdminView productsData={products} fetchData={fetchData} />
          ) : (
            <UserView productsData={products} />
          )}
        </>
      )}
    </div>
  );
}
