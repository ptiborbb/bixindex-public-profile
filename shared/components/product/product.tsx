import { FC } from 'react';
import classes from './product.module.scss';

interface ProductProps {}

export const Product: FC<ProductProps> = (props) => {
  return <div className={classes.product}>{JSON.stringify({ props })}</div>;
};
