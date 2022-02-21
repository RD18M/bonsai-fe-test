import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../store/actions/cartActions';
import { RootState } from '../store/reducer';
import './navigation.styles.css';

const Navigation = () => {
  const dispatch = useDispatch();

  const toggleCart = () => dispatch(setOpen);

  const variantsInCart = useSelector((state: RootState) => state.cartReducer.variantsInCart);

  return (
    <nav className="navigation-bar">
      <div className="cart-icon" onClick={toggleCart}>
        Cart({variantsInCart.length})
      </div>
    </nav>
  );
};

export default Navigation;
