import { EHttpStatus, IUser } from '@codingsans/bixindex-common';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useApp } from '../../../app.context';
import { ELoginOrRegister } from '../../../enums/login-or-register';
import { EReviewValues } from '../../../enums/review-values';
import { ProfilePage } from '../../../interfaces/profile-page';
import { IAuthService } from '../../../services/auth.service';
import { IRatingService } from '../../../services/rating.service';
import { useTranslate } from '../../../translate.context';
import { IRatingFormValues } from '../interfaces/rating-form-values.interface';
import { useFormDetails } from './use-form-details';

export const useSubmitRating: () => (
  values: IRatingFormValues,
  setSubmitting: (isSubmitting: boolean) => void,
  notifyUser: () => Promise<void>,
) => Promise<void> = () => {
  const { companyFormID, productOrServiceID, partnerID, isNps, by, companyAlias } = useFormDetails();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslate();
  const {
    ratingService,
    authService,
    state: {
      publicProfile: { profilePage },
      auth: { user },
    },
  } = useApp();
  const router = useRouter();
  return async (values, setSubmitting, notifyUser) => {
    try {
      await authenticateUserBeforeSubmitting({ values, user, authService });
      await submitRatingOrNps({
        companyFormID,
        partnerID,
        isNps,
        productOrServiceID,
        profilePage,
        ratingService,
        user,
        values,
      });
      await notifyUser();
      await router.push(`/bix-profil/[companyAlias]?by=${by}`, `/bix-profil/${companyAlias}?by=${by}`);
    } catch (error) {
      console.error(error);
      if (error?.response?.status === EHttpStatus.UNAUTHORIZED) {
        enqueueSnackbar(t(`COMMON.ERROR.UNAUTHORIZED`), { variant: 'error' });
      } else {
        const errorDetail = error?.response?.data?.details?.entityName || 'UNKNOWN_ERROR';
        enqueueSnackbar(t(`COMMON.ERROR.${errorDetail}`), { variant: 'error' });
      }
      setSubmitting(false);
    }
  };
};

const authenticateUserBeforeSubmitting: (input: {
  values: IRatingFormValues;
  user: IUser;
  authService: IAuthService;
}) => Promise<void> = async ({ user, authService, values }) => {
  if (user) {
    return;
  }
  if (values.auth.loginOrRegister === ELoginOrRegister.LOGIN) {
    await authService.login(values.auth.email, values.auth.password);
  } else {
    await authService.register(
      `${values.auth.firstname} ${values.auth.lastname}`,
      values.auth.email,
      values.auth.password,
      `+${values.auth.phone}`,
    );
  }
};

const submitRatingOrNps: (input: {
  values: IRatingFormValues;
  ratingService: IRatingService;
  profilePage: ProfilePage;
  isNps: boolean;
  user: IUser;
  companyFormID: string;
  productOrServiceID: string;
  partnerID: string;
}) => Promise<void> = async ({
  ratingService,
  values,
  isNps,
  profilePage,
  user,
  companyFormID,
  productOrServiceID,
  partnerID,
}) => {
  if (isNps) {
    const parsedRating = {
      companyID: profilePage.profile.companyID,
      rating: values.nps,
      visibility: values.visibility,
      comment: values.comment,
      userID: user.id,
    };
    await ratingService.submitNps(parsedRating);
  } else {
    const parsedRating = {
      satisfaction: parseFloat(values.satisfaction),
      nps: values.nps,
      companyFormID,
      summary: values.comment,
      positive: values.positive,
      negative: values.negative,
      ratedProductOrService: values.ratedProductOrService || productOrServiceID,
      reference: values.reference,
      visibility: values.visibility,
      partnerID,
      answers: values.answers
        .filter((answer) => answer.value !== EReviewValues.NO_EXPERIENCE)
        .map((answer) => ({
          questionID: answer.id,
          value: parseFloat(answer.value),
        })),
    };
    await ratingService.submitReview(parsedRating);
  }
};
