import { TFunction } from 'next-i18next';
import Link from 'next/link';
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
  // should be changed once this component is actually in use
  const mapper = useCallback(getMapper(_mapper, t), [t, _mapper]);
  return (
    <div className={classes.searchExamples}>
      <b>{t('COMPANY_SEARCH.QUICK_SEARCH.LABEL')}</b>
      {examples.map((example, i) => (
        <Link key={example as string} href={`/cegkereso/${mapper(example)}`}>
          <a>
            {mapper(example)}
            {i < examples.length && `, `}
          </a>
        </Link>
      ))}
    </div>
  );
};

const defaultExamples = Array.from({ length: 4 }, (_, i) => i + 1);
const defaultMapper = (example: unknown, t: TFunction): string => t(t(`COMPANY_SEARCH.QUICK_SEARCH.S_${example}`));
const getMapper = <T extends (...args: any[]) => string>(mapper: T, t: TFunction): SearchExamplesProps['mapper'] =>
  mapper === defaultMapper ? (v) => mapper(v, t) : mapper;
