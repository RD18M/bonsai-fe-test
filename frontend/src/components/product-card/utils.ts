import { IProduct, IVariants } from './models';

export const isNotValidVariant = (variant: IVariants) => {
  return variant.quantity <= 0 && variant.isDiscontinued;
};

export const isProductOutOfStock = (product: IProduct, checkVariant: any) => {
  return product.isDiscontinued && product.variants.every(checkVariant);
};
