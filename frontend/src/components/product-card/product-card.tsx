import { FC, ReactElement } from 'react';

import './product-card.styles.css';

export interface IProduct {
  id: string;
  name: string;
  isDiscontinued: boolean;
  variants: Array<object>;
  description: string;
  defaultImage: string;
}

interface IProductCardProps {
  product: IProduct;
}

const ProductCard: FC<IProductCardProps> = ({ product }): ReactElement => {
  console.log({ product });

  return (
    <div className="product-card-container">
      {/* <img src={imageSrc} /> */}
      <div className="product-card-details">
        {/* <span className="product-name">{name} </span>
        <span className="product-description"> {description} </span> */}
      </div>
    </div>
  );
};

export default ProductCard;
