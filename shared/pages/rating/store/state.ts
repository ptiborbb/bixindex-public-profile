import { ICheckPartnerRegistrationResponse } from '@codingsans/bixindex-common';

export interface IRatingState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any; // TODO missing typings
  partner: ICheckPartnerRegistrationResponse;
}

export const initialRatingState: IRatingState = {
  form: null,
  partner: null,
};
