import { TFunction } from 'next-i18next';
import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';
import { useTranslate } from '../../translate.context';
import classes from './search-examples.module.scss';

interface SearchExamplesProps {
  examples?: unknown[];
  mapper?: (example: unknown) => string;
}

export const SearchExamples: FC<SearchExamplesProps> = ({
  examples = defaultExamples,
  mapper: _mapper = defaultMapper,
}) => {
  const { t } = useTranslate();
  const router = useRouter();
  // should be changed once this component is actually in use
  const mapper = useCallback(getMapper(_mapper, t), [t, _mapper]);
  return (
    <div className={classes.searchExamples}>
      <b>{t('COMPANY_SEARCH.QUICK_SEARCH.LABEL')}</b>
      {examples.map((example, i) => (
        <span
          key={example as string}
          onClick={async () => {
            await router.push('/cegkereso/[searchText]', `/cegkereso/${mapper(example)}`);
          }}
        >
          {mapper(example)}
          {i < examples.length && `, `}
        </span>
      ))}
    </div>
  );
};

const defaultExamples = Array.from({ length: 4 }, (_, i) => i + 1);
const defaultMapper = (example: unknown, t: TFunction): string => t(t(`COMPANY_SEARCH.QUICK_SEARCH.S_${example}`));
const getMapper = <T extends (...args: any[]) => string>(mapper: T, t: TFunction): SearchExamplesProps['mapper'] =>
  mapper === defaultMapper ? (v) => mapper(v, t) : mapper;
