import { isNotValidVariant, isProductOutOfStock } from './utils';

describe('isProductOutOfStock', () => {
  it('should return a true if product is discontinued, variant is discontinued and quantity is 0', () => {
    const variant = {
      id: '123',
      image: 'http://image.com',
      isDiscontinued: true,
      priceCents: 123,
      quantity: 0,
      selectableOptions: [],
    };

    const product = {
      id: '312',
      name: 'Hello World',
      isDiscontinued: true,
      variants: [],
      description: 'Description',
      defaultImage: 'http://image.com',
    };

    const value = isProductOutOfStock(product, () => isNotValidVariant(variant));

    expect(value).toBe(true);
  });
});
