import { useMemo } from 'react';
import CartItem from '../cart-item/cart-item';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../store/actions';

import './cart.styles.css';
import { RootState } from '../store/reducer';

const Cart = () => {
  const dispatch = useDispatch();

  const { variantsInCart, mergedVariantsInCart } = useSelector(
    (state: RootState) => state.cartReducer,
  );

  const closeCart = () => dispatch(setOpen);

  const totalPrice = variantsInCart.reduce((total, { priceCents }) => total + priceCents / 100, 0);

  const stockLimitPerCartItem = useMemo(() => {
    return (item: any) =>
      Object.keys(mergedVariantsInCart).map(
        (variant) => item.quantity <= mergedVariantsInCart[variant].length,
      );
  }, [mergedVariantsInCart]);

  return (
    <div className="cart-modal">
      <div className="cart-container">
        <button className="close-button" onClick={closeCart}>
          →
        </button>
        <div className="cart-items-container">
          {Object.values(mergedVariantsInCart).map((item: any, idx) => {
            return (
              <CartItem
                key={idx}
                position={idx}
                cartItem={item[0]}
                count={item.length}
                stockLimitPerCartItem={stockLimitPerCartItem}
              />
            );
          })}
        </div>
        <div className="total-container">
          <span>Total: ${Math.round(totalPrice * 100) / 100}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
