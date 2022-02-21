import { getStockLimitPerCartItem } from './utils';

describe('getStockLimitPerCartItem', () => {
  it('should return an array of boolean values based off of the items quantity whether it is out of stock or not', () => {
    const item = {
      id: '123',
      image: 'https://image.com',
      isDiscontinued: false,
      priceCents: 123123,
      quantity: 1,
      selectableOptions: [],
    };

    const mergedVariantsInCart = {
      '123': {
        ...item,
      },
    };

    const stockLimitPerCartItem = getStockLimitPerCartItem(item, mergedVariantsInCart);

    expect(stockLimitPerCartItem).toEqual([false]);
  });
});
