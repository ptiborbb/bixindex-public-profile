import { IBixindexClient } from '@codingsans/bixindex-common';
import { Dispatch } from 'react';
import {
  checkPartnerRegistration,
  checkPartnerRegistrationFail,
  checkPartnerRegistrationSuccess,
  getForm,
  getFormFail,
  getFormSuccess,
  submitNPS,
  submitNPSFail,
  submitNPSSuccess,
  submitReview,
  submitReviewFail,
  submitReviewSuccess
} from '../pages/rating/store/actions';

export interface IRatingService {
  getFormByID: (companyFormID: string, locale: string) => void;
  submitReview: (rating: unknown) => Promise<void>;
  submitNps: (rating: unknown) => Promise<void>;
  checkPartnerRegistration: (partnerID: string, formID: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ratingServiceFactory = (bixClient: IBixindexClient, dispatch: Dispatch<any>): IRatingService => {
  return {
    getFormByID: (companyFormID, locale) => {
      dispatch(getForm({ companyFormID }));
      bixClient.publicProfile.profile
        .getFormByID(companyFormID, locale)
        .then((form) => dispatch(getFormSuccess({ form })))
        .catch((error) => dispatch(getFormFail({ error })));
    },
    submitReview: (rating) => {
      dispatch(submitReview({ rating }));
      return bixClient.publicProfile.profile
        .submitReview(rating)
        .then(() => {
          dispatch(submitReviewSuccess());
        })
        .catch((error) => {
          dispatch(submitReviewFail({ error }));
          throw error;
        });
    },
    submitNps: (rating) => {
      dispatch(submitNPS({ rating }));
      return bixClient.publicProfile.profile
        .submitNps(rating)
        .then(() => {
          dispatch(submitNPSSuccess());
        })
        .catch((error) => {
          dispatch(submitNPSFail());
          throw error;
        });
    },
    checkPartnerRegistration: (partnerID, formID) => {
      dispatch(checkPartnerRegistration({ partnerID, formID }));
      bixClient.publicProfile.profile
        .checkPartnerRegistration(partnerID, formID)
        .then((partner) => dispatch(checkPartnerRegistrationSuccess({ partner })))
        .catch((error) => dispatch(checkPartnerRegistrationFail({ error })));
    },
  };
};
