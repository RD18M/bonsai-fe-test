import {
  GET_VARIANT,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS,
  IS_FETCHING,
  FETCH_FILTERED_PRODUCTS,
  SELECTED_VARIANT,
} from '../actions/types';

interface IInitialState {
  showVariant: boolean;
  selectedVariant: object;
  products: any[];
  error: string;
  isFetching: boolean;
}

const initialState: IInitialState = {
  showVariant: false,
  selectedVariant: {},
  products: [],
  error: '',
  isFetching: false,
};

const productsReducer = (state = initialState, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case GET_VARIANT:
      return { ...state, showVariant: !state.showVariant };
    case SELECTED_VARIANT:
      return {
        ...state,
        selectedVariant:
          state.products.length && !Object.keys(state.selectedVariant).length
            ? {
                id: state.products[0].variants[0].id,
                image: state.products[0].variants[0].image,
                isDiscontinued: state.products[0].variants[0].isDiscontinued,
                priceCents: state.products[0].variants[0].priceCents,
                name: state.products[0].name,
                quantity: state.products[0].variants[0].quantity,
                selectableOptions: state.products[0].variants[0].selectableOptions,
              }
            : action.payload,
      };
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload };
    case FETCH_FILTERED_PRODUCTS:
      return {
        ...state,
        products: state.products.filter((product: any) => product.id === action.payload),
      };
    case FETCH_PRODUCTS_ERROR:
      return { ...state, error: action.payload };
    case IS_FETCHING:
      return { ...state, isFetching: action.payload };
    default:
      return state;
  }
};

export default productsReducer;
