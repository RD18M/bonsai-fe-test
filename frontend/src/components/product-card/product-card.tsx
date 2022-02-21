import { FC, ReactElement } from 'react';
import ProductVariant from './product-variant';

import './product-card.styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { getFilteredProduct, getProducts, setShowVariant } from '../store/actions';
import { setSelectedVariant } from '../store/actions/productActions';

export interface IProduct {
  id: string;
  name: string;
  isDiscontinued: boolean;
  variants: {
    id: string;
    image: string;
    isDiscontinued: boolean;
    priceCents: number;
    quantity: number;
    selectableOptions: { type: string; value: string }[];
  }[];
  description: string;
  defaultImage: string;
}

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
      : dispatch(getProducts('http://localhost:8000/products'));

    dispatch(setSelectedVariant());
    dispatch(setShowVariant);
  };

  const isNotValidVariant = (variant: any) => {
    return variant.quanty <= 0 && variant.isDiscontinued;
  };

  const isProductOutOfStock = (product: IProduct) => {
    return product.isDiscontinued && product.variants.every(isNotValidVariant);
  };

  return (
    <>
      <div className="product-card-container" onClick={() => onToggleProductVariant(true)}>
        <img src={defaultImage} alt="Product Logo" />
        <div className="product-card-details">
          <span className="product-name">{name}</span>
          <span className="product-description">{description}</span>
        </div>
        {isProductOutOfStock(product) && <div className="product-label">Out of Stock</div>}
      </div>
      {showVariant && (
        <ProductVariant
          variants={variants}
          onClose={() => onToggleProductVariant(false)}
          productName={name}
        />
      )}
    </>
  );
};

export default ProductCard;
