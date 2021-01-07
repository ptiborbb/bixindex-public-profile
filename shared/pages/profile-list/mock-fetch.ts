import * as faker from 'faker';

interface FeaturedCategoryCompanySummary {
  companyId: string;
  companyName: string;
  companyAlias: string;
  profileId: string;
  profileName: string;
  bixValue: number;
  ratingCount: number;
}

export interface FeaturedCategoryWithCompanies {
  category: string;
  mainHighlight: boolean;
  count: number;
  companies: FeaturedCategoryCompanySummary[];
}

export const getMockFeaturedCategories = (): Promise<{ highlightedCategories: FeaturedCategoryWithCompanies[] }> =>
  Promise.resolve({
    highlightedCategories: Array.from({ length: faker.random.number({ min: 7, max: 15 }) }, categoryFactory),
  });

export const getMockResponse = (): FeaturedCategoryWithCompanies[] =>
  Array.from({ length: faker.random.number({ min: 7, max: 15 }) }, categoryFactory);

export const mockCards: FeaturedCategoryWithCompanies[] = [
  {
    category: 'yoo',
    count: 1,
    mainHighlight: true,
    companies: [
      {
        companyId: `${Math.random()}`,
        companyName: 'Test company nam 1',
        companyAlias: 'Test company alias 1',
        profileId: `${Math.random()}`,
        profileName: 'Test profile name 1',
        bixValue: 9.2,
        ratingCount: 71,
      },
      {
        companyId: `${Math.random()}`,
        companyName: 'Test company nam 2',
        companyAlias: 'Test company alias 2',
        profileId: `${Math.random()}`,
        profileName: 'Test profile name 2',
        bixValue: 9.2,
        ratingCount: 71,
      },
    ],
  },
  {
    category: 'yo2',
    count: 0,
    mainHighlight: false,
    companies: [],
  },
];

const companySummaryFactory = (): FeaturedCategoryCompanySummary => ({
  companyId: faker.random.uuid(),
  companyName: faker.company.companyName(),
  companyAlias: faker.random.alpha(),
  profileId: faker.random.uuid(),
  profileName: faker.company.companyName(),
  bixValue: faker.random.number({ min: 150, max: 1000 }) / 100,
  ratingCount: faker.random.number({ min: 0, max: 150 }),
});

const categoryFactory = (): FeaturedCategoryWithCompanies => {
  const count = faker.random.number({ min: 0, max: 100 });
  return {
    category: faker.lorem.word(),
    mainHighlight: Math.random() > 0.6,
    count,
    companies: Array.from({ length: Math.min(10, count) }, () => companySummaryFactory()),
  };
};
