import { IVariants } from '../product-card/models';

export const getStockLimitPerCartItem = (item: IVariants, mergedVariantsInCart: any) => {
  return Object.keys(mergedVariantsInCart).map(
    (variant) => item.quantity <= mergedVariantsInCart[variant].length,
  );
};
