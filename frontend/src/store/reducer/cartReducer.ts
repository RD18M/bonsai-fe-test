import { IVariants } from '../../components/product-card/models';
import {
  ADD_TO_CART_VARIANT,
  IS_OPEN,
  REMOVE_ALL_FROM_CART_VARIANT,
  MERGE_VARIANTS_IN_CART,
  REMOVE_FROM_CART_VARIANT,
} from '../actions/types';

interface IInitialState {
  isOpen: boolean;
  variantsInCart: any[];
  mergedVariantsInCart: object | any;
}

const initialState: IInitialState = {
  isOpen: false,
  variantsInCart: [],
  mergedVariantsInCart: {},
};

const cartsReducer = (state = initialState, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case IS_OPEN:
      return { ...state, isOpen: !state.isOpen };
    case ADD_TO_CART_VARIANT:
      return {
        ...state,
        variantsInCart: [...state.variantsInCart, action.payload],
      };
    case MERGE_VARIANTS_IN_CART:
      return {
        ...state,
        mergedVariantsInCart: state.variantsInCart.reduce((variants: [], variant: any) => {
          if (!variants[variant.id]) {
            return { ...variants, [variant.id]: [variant] };
          } else {
            return { ...variants, [variant.id]: [...variants[variant.id], variant] };
          }
        }, {}),
      };
    case REMOVE_FROM_CART_VARIANT:
      return {
        ...state,
        get variantsInCart() {
          const filteredVariants = (removeItem: boolean) => {
            const isVariantID = (el: IVariants) =>
              removeItem ? el.id === action.payload : el.id !== action.payload;

            if (removeItem) {
              const filteredVariant = state.variantsInCart.filter(isVariantID);
              filteredVariant.pop();
              return filteredVariant;
            }

            return state.variantsInCart.filter(isVariantID);
          };

          return [...filteredVariants(false), ...filteredVariants(true)];
        },
      };
    case REMOVE_ALL_FROM_CART_VARIANT:
      return {
        ...state,
        variantsInCart: state.variantsInCart.filter(
          (variant: IVariants) => variant.id !== action.payload,
        ),
      };
    default:
      return state;
  }
};

export default cartsReducer;
