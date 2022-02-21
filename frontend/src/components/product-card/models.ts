export interface IProduct {
  id: string;
  name: string;
  isDiscontinued: boolean;
  variants: IVariants[];
  description: string;
  defaultImage: string;
}

export interface IVariants {
  id: string;
  image: string;
  isDiscontinued: boolean;
  priceCents: number;
  quantity: number;
  selectableOptions: ISelectableOptions[];
}

export interface ISelectableOptions {
  type: string;
  value: string;
}
