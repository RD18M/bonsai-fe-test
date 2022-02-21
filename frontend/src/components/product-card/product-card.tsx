import { FC, ReactElement } from 'react';
import ProductVariant from './product-variant';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { getFilteredProduct, getProducts, setShowVariant } from '../store/actions';
import { setSelectedVariant } from '../store/actions/productActions';
import { IProduct } from './models';
import { isProductOutOfStock, isNotValidVariant } from './utils';

import './product-card.styles.css';
interface IProductCardProps {
  product: IProduct;
}

const ProductCard: FC<IProductCardProps> = ({ product }): ReactElement => {
  const { defaultImage, description, name, variants, id } = product;

  const dispatch = useDispatch();

  const { showVariant } = useSelector((state: RootState) => state.productReducer);

  const onToggleProductVariant = (open: boolean) => {
    open
      ? dispatch(getFilteredProduct(id))
      : dispatch(getProducts(process.env.REACT_APP_PRODUCTS_API as string));

    dispatch(setSelectedVariant());
    dispatch(setShowVariant);
  };

  return (
    <>
      <div className="product-card-container" onClick={() => onToggleProductVariant(true)}>
        <img src={defaultImage} alt="Product Logo" />
        <div className="product-card-details">
          <span className="product-name">{name}</span>
          <span className="product-description">{description}</span>
        </div>
        {isProductOutOfStock(product, isNotValidVariant) && (
          <div className="product-label">Out of Stock</div>
        )}
      </div>
      {showVariant && (
        <ProductVariant
          variants={variants}
          onClose={() => onToggleProductVariant(false)}
          isProductOutOfStock={isProductOutOfStock}
          product={product}
          productName={name}
        />
      )}
    </>
  );
};

export default ProductCard;
