import { FC, memo, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCartVariant,
  mergeVariantsInCart,
  removeAllFromCartVariant,
  removeFromCartVariant,
} from '../store/actions';
import { setSelectedVariant } from '../store/actions/productActions';
import { RootState } from '../store/reducer';
import { ICartItem } from './models';

import './cart-item.styles.css';
interface ICartItemProps {
  cartItem: ICartItem;
  count: number;
  position: number;
  stockLimitPerCartItem: any;
}

const CartItem: FC<ICartItemProps> = ({
  cartItem,
  count,
  position,
  stockLimitPerCartItem,
}): ReactElement => {
  const { name, image, priceCents, id } = cartItem;

  const dispatch = useDispatch();

  const { variantsInCart } = useSelector((state: RootState) => state.cartReducer);

  const onAddOrRemoveFromCart = (add: boolean) => {
    add ? dispatch(addToCartVariant(cartItem)) : dispatch(removeFromCartVariant(id));

    dispatch(mergeVariantsInCart(variantsInCart));
    dispatch(setSelectedVariant(cartItem));
  };

  const stockLimit = stockLimitPerCartItem(cartItem)[position];

  return (
    <div className="cart-item-container">
      <div className="cart-item-count">{count}</div>
      <img src={image} alt="variant logo" />
      <div className="cart-item-details">
        <span>{name}</span>
        <span> price: ${priceCents / 100} </span>
        <span className="cart-item-details-buttons-container">
          <button onClick={() => onAddOrRemoveFromCart(true)} disabled={stockLimit}>
            +
          </button>
          <button onClick={() => onAddOrRemoveFromCart(false)}>-</button>
        </span>
      </div>
      <div>
        <button
          onClick={() => {
            dispatch(removeAllFromCartVariant(id));
            dispatch(mergeVariantsInCart(variantsInCart));
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default memo(CartItem);
