import { get } from 'lodash/fp';
import { useRouter } from 'next/router';

export const useFormDetails: () => {
  companyFormID: string;
  productOrServiceID?: string;
  partnerID?: string;
  companyAlias: string;
  by: 'ID' | 'ALIAS';
  isNps: boolean;
} = () => ({
  companyFormID: get('query.companyFormID', useRouter()),
  partnerID: get('query.partnerID', useRouter()),
  productOrServiceID: get('query.productOrServiceID', useRouter()),
  companyAlias: get('query.companyAlias', useRouter()),
  by: get('query.by', useRouter()) ?? 'ALIAS',
  isNps: get('query.companyFormID', useRouter()) === 'nps',
});
