import { I18n, TFunction } from 'next-i18next';
import { createContext, useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface ITranslate {
  t: TFunction;
  i18n: I18n;
}

export const TranslateContext = createContext<ITranslate>({ t: null, i18n: null });
export const useTranslate = (): ITranslate => useContext(TranslateContext);
