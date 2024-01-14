import { useEffect, useState, useContext } from 'react';
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
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <>
      <SearchByPrice onSearchResults={handleSearchResults} />
      {searchResults.length > 0 ? (
        <>
          {searchResults.map((product) => (
            <ProductsCard key={product._id} productProp={product} />
          ))}
        </>
      ) : (
        <>
          {user.isAdmin === true ? (
            <AdminView productsData={products} fetchData={fetchData} />
          ) : (
            <UserView productsData={products} />
          )}
        </>
      )}
    </>
  );
}
