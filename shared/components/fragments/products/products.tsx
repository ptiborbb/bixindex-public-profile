import { FC } from 'react';
import classes from './products.module.scss';

interface ProductsProps {}

export const Products: FC<ProductsProps> = () => {
  return <div className={classes.products}>PRODUCTS</div>;
};
