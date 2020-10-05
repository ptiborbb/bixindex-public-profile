import { IBixindexClient } from '@codingsans/bixindex-common';
import { Dispatch } from 'react';
import { getPublicProfile, getPublicProfileSuccess, getPublicProfileFail } from '../pages/public-profile/store/actions';
import { ProfilePage } from '../interfaces/profile-page';
import {
  getForm,
  getFormFail,
  getFormSuccess,
  submitReview,
  submitReviewFail,
  submitReviewSuccess,
} from '../pages/rating/store/actions';

export interface IRatingService {
  getFormByID: (companyFormID: string, locale: string) => void;
  submitReview: (rating: unknown) => void;
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
      bixClient.publicProfile.profile
        .submitReview(rating)
        .then(() => {
          dispatch(submitReviewSuccess());
        })
        .catch((error) => {
          dispatch(submitReviewFail({ error }));
        });
    },
  };
};
