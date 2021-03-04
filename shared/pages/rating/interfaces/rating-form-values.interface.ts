import { ELoginOrRegister } from '../../../enums/login-or-register';
import { ICompanyFormQuestionMapped } from './questions.interface';

export interface IRatingFormValues {
  satisfaction: string;
  nps: number;
  answers: ICompanyFormQuestionMapped[];
  positive: string;
  negative: string;
  comment: string;
  ratedProductOrService: string;
  reference: string;
  auth: {
    loginOrRegister: ELoginOrRegister;
    firstname?: string;
    lastname?: string;
    email: string;
    phone?: string;
    password: string;
    confirmPassword?: string;
    policy?: boolean;
  };
  visibility: 'VISIBLE' | 'HIDDEN';
}
