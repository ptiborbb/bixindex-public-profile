import { IProduct, IService } from '@codingsans/bixindex-common';
import { Avatar } from '@material-ui/core';
import { Attachment, Edit } from '@material-ui/icons';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { useTranslate } from '../../translate.context';
import { BixModal } from '../bix-modal/bix-modal';
import classes from './product.module.scss';

interface ProductExtraProps {
  companyFormID: string;
  companyAlias: string;
  by: string;
}

type ProductProps = IProduct & IService & ProductExtraProps;

export const Product: FC<ProductProps> = ({
  id,
  name,
  mainCategory,
  subCategory,
  priceRange,
  description,
  image,
  specialty,
  companyAlias,
  companyFormID,
  by,
}) => {
  const { t } = useTranslate();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <>
      <div className={classes.product}>
        <div className={classes.details}>
          <div className={classes.mainDetails}>
            <div className={classes.name}>{name}</div>
            <div className={classes.categories}>
              {t(`MAIN_CATEGORIES.${mainCategory}`)} | {t(`SUBCATEGORIES.${subCategory}`)}
            </div>
          </div>
          {priceRange && (
            <div className={classes.subDetails}>
              <div className={classes.priceLabel}>Árazás</div>
              <div className={classes.price}>{priceRange}</div>
            </div>
          )}
        </div>
        <div className={classes.specialty}>{specialty}</div>

        {description && (
          <>
            <div className={classes.descriptionLabel}>Leírás</div>
            <div className={classes.description}>{description}</div>
          </>
        )}
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
      <>
        <div className={`d-flex justify-content-between align-items-center flex-wrap ${classes.serviceReview}`}>
          <span className={`${classes.question} mb-3 mb-lg-0`}>{t('PRODUCT.DID_YOU_USE_THIS')}</span>
          <Link
            href={{
              pathname: '/bix-profil/[companyAlias]/ertekeles/[companyFormID]',
              query: { by: by, productOrServiceID: id },
            }}
            as={`/bix-profil/${companyAlias}/ertekeles/${companyFormID}`}
            passHref
          >
            <a type="button" className={classes.companyWriteReview}>
              {t('COMPANY_SEARCH.WRITE_REVIEW')} <Edit className={classes.reviewIcon} />
            </a>
          </Link>
        </div>
      </>
    </>
  );
};
