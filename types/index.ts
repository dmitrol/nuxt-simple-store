export enum AppThemes {
  light = 'light',
  dark = 'dark',
}

export interface ICategoryTemplate {
  title: string;
}

export interface ICategory extends ICategoryTemplate {
  _id: string;
}

export interface IProductTemplate {
  title: string;
  description: string;
  price: number;
  categories: ICategory[];
}

export interface IProduct extends IProductTemplate {
  _id: string;
}

export interface IBasketItem {
  product: IProduct;
  quantity: number;
}
