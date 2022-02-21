import { FC, Fragment, memo, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartVariant, mergeVariantsInCart } from '../store/actions';
import { setSelectedVariant } from '../store/actions/productActions';
import { RootState } from '../store/reducer';

import './product-variant.styles.css';

interface IProductVariantProps {
  productName: string;
  variants: {
    id: string;
    image: string;
    isDiscontinued: boolean;
    priceCents: number;
    quantity: number;
    selectableOptions: { type: string; value: string }[];
  }[];
  onClose: () => void;
}

const ProductVariant: FC<IProductVariantProps> = ({
  variants,
  onClose,
  productName,
}): ReactElement => {
  const dispatch = useDispatch();

  const { selectedVariant } = useSelector((state: RootState) => state.productReducer);
  const { variantsInCart, mergedVariantsInCart } = useSelector(
    (state: RootState) => state.cartReducer,
  );

  const stockLimit = selectedVariant.quantity <= mergedVariantsInCart[selectedVariant.id]?.length;

  const onAddToCart = () => {
    dispatch(addToCartVariant(selectedVariant));
    dispatch(mergeVariantsInCart(variantsInCart));
  };

  return (
    <div className="product-variant-container">
      <div className="product-variant-card">
        <button onClick={onClose}>×</button>
        <div className="product-variant-parent-product-name">{productName}</div>
        <div className="product-variant-price">
          ${selectedVariant.priceCents / 100} (QTY.{' '}
          {selectedVariant.quantity - (mergedVariantsInCart[selectedVariant.id]?.length ?? 0)})
        </div>
        <div className="product-variant-card-image-container">
          {variants.map((variant) => {
            return (
              <Fragment key={variant.id}>
                <img
                  src={variant.image}
                  alt="variant logo"
                  onClick={() => {
                    const selectedVariant = {
                      ...variant,
                      name: productName,
                    };

                    dispatch(setSelectedVariant(selectedVariant));
                  }}
                />
              </Fragment>
            );
          })}
        </div>
        <div className="product-variant-selectable-options-container">
          <div className="product-variant-selectable-options-title">OPTIONS:</div>
          {selectedVariant.selectableOptions.map((option: any, idx: number) => {
            return (
              <div key={idx} className="product-variant-selectable-options-list">
                <div>{option.type}</div>
                <div>{option.value}</div>
              </div>
            );
          })}
        </div>
        <img
          src={selectedVariant.image}
          alt="selected logo"
          className="product-variant-card-selected-image"
        />
        <div className="product-variant-add-to-card-button">
          <button onClick={onAddToCart} disabled={stockLimit}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductVariant);
