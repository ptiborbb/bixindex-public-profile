import { IProduct, IService } from '@codingsans/bixindex-common';
import { FC } from 'react';
import classes from './product.module.scss';

type ProductProps = IProduct & IService;

export const Product: FC<ProductProps> = ({ name, mainCategory, subCategory, priceRange, description }) => {
  return (
    <div className={classes.product}>
      <div className={classes.details}>
        <div className={classes.mainDetails}>
          <div className={classes.name}>{name}</div>
          <div className={classes.categories}>
            {mainCategory} | {subCategory}
          </div>
        </div>
        <div className={classes.subDetails}>
          <div className={classes.priceLabel}>Árazás</div>
          <div className={classes.price}>{priceRange}</div>
        </div>
      </div>

      <div className={classes.descriptionLabel}>Leírás</div>
      <div className={classes.description}>{description}</div>
    </div>
  );
};
