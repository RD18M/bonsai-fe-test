import {
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS,
  GET_VARIANT,
  IS_FETCHING,
  FETCH_FILTERED_PRODUCTS,
  SELECTED_VARIANT,
} from './types';

export const setShowVariant = {
  type: GET_VARIANT,
};

export const setSelectedVariant = <T extends object>(payload: T | object = {}) => ({
  type: SELECTED_VARIANT,
  payload,
});

export const getFilteredProduct = <T>(payload: T) => ({
  type: FETCH_FILTERED_PRODUCTS,
  payload,
});

export const setProducts = <T>(payload: T) => ({
  type: FETCH_PRODUCTS,
  payload,
});

export const setErrorFetch = <T>(payload: T) => ({
  type: FETCH_PRODUCTS_ERROR,
  payload,
});

export const setFetching = <T>(payload: T) => ({
  type: IS_FETCHING,
  payload,
});

export const getProducts = (url: string, options: object = {}) => {
  return async (dispatch: any) => {
    dispatch(setFetching(true));
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const data = await response.json();
        dispatch(setProducts(data.products));
      } else {
        dispatch(setErrorFetch(new Error(response.statusText)));
      }

      dispatch(setFetching(false));
    } catch (err) {
      dispatch(setFetching(false));
      dispatch(setErrorFetch(err));
    }
  };
};
