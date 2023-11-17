export enum AppThemes {
  light = 'light',
  dark = 'dark',
}

export interface ICategoryTemplate {
  title: String;
}

export interface ICategory extends ICategoryTemplate {
  _id: String;
}

export interface IProductTemplate {
  title: String;
  description: String;
  price: Number;
  categories: ICategory[];
}

export interface IProduct extends IProductTemplate {
  _id: String;
}
