import { useContext, useEffect, useState } from 'react';

import { CartContext } from './cart-context';

import Cart from './components/cart/cart';
import ProductCard, { IProduct } from './components/product-card/product-card';
import Navigation from './components/navigation/navigation';

import './App.css';

const App = () => {
  const { isOpen } = useContext(CartContext);

  const [isFetching, setIsFetching] = useState<boolean>();
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setIsFetching(true);
    fetch('http://localhost:8000/products')
      .then((data) => {
        if (!data.ok) {
          setError(new Error(data.statusText));
          return;
        }

        return data.json();
      })
      .then(({ products }) => {
        setIsFetching(false);
        setProducts(products);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <Navigation />
      {isOpen ? <Cart /> : null}
      <div className="products-listing">
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          products?.map((productItem) => <ProductCard key={productItem.id} product={productItem} />)
        )}
      </div>
    </div>
  );
};

export default App;
