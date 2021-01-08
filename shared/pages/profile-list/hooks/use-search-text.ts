import { useRouter } from 'next/router';

export const useSearchText = (): string => (useRouter().query.searchText as string) || '';
