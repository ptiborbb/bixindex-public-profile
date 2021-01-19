import { useRouter } from 'next/router';
import { IDOrAlias } from '../enums/id-or-alias';

export interface CompanyIdentity {
  alias: string;
  by: IDOrAlias;
}

export const useCompanyIdentity = (fallback: CompanyIdentity = defaultIdentity): CompanyIdentity => {
  const alias = (useRouter().query.companyAlias ?? fallback.alias) as string;
  const queryBy = useRouter().query.by;
  const by = (queryBy && Object.values(IDOrAlias).some((val) => val === queryBy) ? queryBy : fallback.by) as IDOrAlias;
  return {
    alias,
    by,
  };
};

export const defaultIdentity: CompanyIdentity = {
  alias: '',
  by: IDOrAlias.ALIAS,
};
