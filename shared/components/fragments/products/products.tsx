import { FC } from 'react';
import { Product } from '../../product/product';
import classes from './products.module.scss';

interface ProductsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productsAndServices: any[];
}
// TODO missing typings

export const Products: FC<ProductsProps> = ({ productsAndServices }) => {
  return (
    <div className={classes.products}>
      {productsAndServices.map((product, i) => (
        <div key={i}>
          {i > 0 && <div className={classes.separator}></div>}
          <Product {...product} priceRange={product.pricing} />
        </div>
      ))}
    </div>
  );
};
