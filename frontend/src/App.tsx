import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/cart/cart';
import ProductCard from './components/product-card/product-card';
import Navigation from './components/navigation/navigation';
import { RootState } from './components/store/reducer';
import { getProducts } from './components/store/actions';
import { IProduct } from './components/product-card/models';

import './App.css';

const App = () => {
  const { isOpen } = useSelector((state: RootState) => state.cartReducer);
  const { products, error, isFetching } = useSelector((state: RootState) => state.productReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(process.env.REACT_APP_PRODUCTS_API as string));
  }, [dispatch]);

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
          products?.map((productItem: IProduct) => (
            <ProductCard key={productItem.id} product={productItem} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
