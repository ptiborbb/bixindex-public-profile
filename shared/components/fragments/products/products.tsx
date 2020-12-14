import { useRouter } from 'next/router';
import { FC } from 'react';
import { Product } from '../../product/product';
import classes from './products.module.scss';

interface ProductsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productsAndServices: any[];
  companyFormID: string;
}
// TODO missing typings

export const Products: FC<ProductsProps> = ({ productsAndServices, companyFormID }) => {
  const router = useRouter();
  const companyAlias = router.query.companyAlias;
  const by = (router.query.by as 'ID' | 'ALIAS') || 'ALIAS';
  return (
    <div className={classes.products}>
      {productsAndServices.map((product, i) => (
        <div key={i}>
          {i > 0 && <div className={classes.separator}></div>}
          <Product
            {...product}
            priceRange={product.pricing}
            specialty={product.speciality}
            companyFormID={companyFormID}
            companyAlias={companyAlias}
            by={by}
          />
        </div>
      ))}
    </div>
  );
};
