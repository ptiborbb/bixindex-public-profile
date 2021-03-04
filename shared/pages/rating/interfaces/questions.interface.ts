export interface ICompanyFormQuestion {
  id: string;
  text: string;
  value: string;
}

export type ICompanyFormQuestionMapped = Required<Omit<ICompanyFormQuestion, 'value'>> &
  Partial<Pick<ICompanyFormQuestion, 'value'>>;
