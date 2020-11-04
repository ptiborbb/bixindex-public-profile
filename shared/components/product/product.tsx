import { IProduct, IService } from '@codingsans/bixindex-common';
import { Avatar } from '@material-ui/core';
import { Attachment } from '@material-ui/icons';
import React, { FC, useState } from 'react';
import { useTranslate } from '../../translate.context';
import { BixModal } from '../bix-modal/bix-modal';
import classes from './product.module.scss';

type ProductProps = IProduct & IService;

export const Product: FC<ProductProps> = ({ name, mainCategory, subCategory, priceRange, description, image }) => {
  const { t } = useTranslate();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  return (
    <div className={classes.product}>
      <div className={classes.details}>
        <div className={classes.mainDetails}>
          <div className={classes.name}>{name}</div>
          <div className={classes.categories}>
            {t(`MAIN_CATEGORIES.${mainCategory}`)} | {t(`SUBCATEGORIES.${subCategory}`)}
          </div>
        </div>
        <div className={classes.subDetails}>
          <div className={classes.priceLabel}>Árazás</div>
          <div className={classes.price}>{priceRange}</div>
        </div>
      </div>

      <div className={classes.descriptionLabel}>Leírás</div>
      <div className={classes.description}>{description}</div>
      {image && (
        <>
          <div className={classes.descriptionLabel}>Kép</div>
          <div className={classes.attachmentWrapper} onClick={() => setIsImageModalOpen(true)}>
            <Avatar className={classes.attachment} variant="square" src={image}>
              <Attachment fontSize="large" />
            </Avatar>
          </div>
          <BixModal open={isImageModalOpen} onClose={() => setIsImageModalOpen(false)}>
            <img className={classes.modalImage} src={image} />
          </BixModal>
        </>
      )}
    </div>
  );
};
