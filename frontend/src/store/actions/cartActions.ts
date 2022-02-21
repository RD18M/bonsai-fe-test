import {
  ADD_TO_CART_VARIANT,
  IS_OPEN,
  MERGE_VARIANTS_IN_CART,
  REMOVE_ALL_FROM_CART_VARIANT,
  REMOVE_FROM_CART_VARIANT,
} from './types';

export const setOpen = {
  type: IS_OPEN,
};

export const addToCartVariant = <T>(payload: T) => ({
  type: ADD_TO_CART_VARIANT,
  payload,
});

export const mergeVariantsInCart = <T>(payload: T) => ({
  type: MERGE_VARIANTS_IN_CART,
  payload,
});

export const removeFromCartVariant = <T>(payload: T) => ({
  type: REMOVE_FROM_CART_VARIANT,
  payload,
});

export const removeAllFromCartVariant = <T>(payload: T) => ({
  type: REMOVE_ALL_FROM_CART_VARIANT,
  payload,
});
