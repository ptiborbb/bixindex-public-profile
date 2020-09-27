import { ECompanyTypes, EProductTypes, IProduct, IProfile, IService } from '@codingsans/bixindex-common';
import { ReviewStatsProps } from '../components/fragments/reviews/components/review-stats/review-stats';

export const mockData = (): any =>
  ({
    profile: {
      fb: 'google.com',
      insta: 'google.com',
      linkedin: 'google.com',
      website: 'bixindex.hu',
      name: 'Bizalmi Kör Kft.',
      type: ECompanyTypes.COMPANY,
      logo: 'https://placekitten.com/200/200',

      details: {
        employees: {
          value: 10,
          change: 'up',
        },
        yearlyIncome: {
          value: 100000000,
          change: 'down',
        },
        taxNumber: '14780846-2-43',
        address: '1095. Soroksári út 48. 10. ép. 2. em. 20',
        mainProfile: 'Rendezvényszervezés',
      },
      products: [
        { name: 'mrd+ vezetői klub' },
        { name: 'bizalom gála' },
        { name: 'bix' },
        { name: 'TOP Vezetői klub' },
      ],
      services: [{ name: 'értékesítés' }, { name: 'marketing' }],
      contacts: [
        {
          name: 'Letenovics - Nagy Roland',
          email: 'roland.letenovics@bizalmikor.hu',
          phone: '+36 30 2203 203',
          image: 'https://placekitten.com/200/200',
        },
      ],
    },
    rating: {
      value: 8.96,
      count: 85,
    },
    awards: [
      {
        image: 'https://placekitten.com/300/200',
        date: new Date().toJSON(),
        title: 'Title',
        description: 'Description',
      },
      {
        image: 'https://placekitten.com/300/200',
        date: new Date().toJSON(),
        title: 'Title',
        description: 'Description',
      },
    ],

    articles: [
      {
        votes: 243,
        date: new Date().toJSON(),
        title: 'Title',
        type: 'Sajto',
        content: 'Content',
        link: 'https://google.com',
      },
      {
        votes: 243,
        date: new Date().toJSON(),
        title: 'Title',
        type: 'Sajto',
        content: 'Content',
        link: 'https://google.com',
      },
    ],
    productsAndServices: [
      {
        id: '1',
        description: 'product1',
        name: 'product1',
        mainCategory: 'main1',
        subCategory: 'sub1',
        pricing: '1000',
        productType: EProductTypes.PRODUCT,
        speciality: 'spec1',
      },
      {
        id: '2',
        description: 'product2',
        name: 'product2',
        mainCategory: 'main2',
        subCategory: 'sub2',
        pricing: '2000',
        productType: EProductTypes.PRODUCT,
        speciality: 'spec2',
      },
      {
        id: '3',
        description: 'service1',
        name: 'service1',
        mainCategory: 'main1',
        subCategory: 'sub1',
        pricing: '1000',
        speciality: 'spec1',
      },
      {
        id: '4',
        description: 'service2',
        name: 'service2',
        mainCategory: 'main2',
        subCategory: 'sub2',
        pricing: '2000',
        speciality: 'spec2',
      },
    ],
    stats: {
      index: {
        ratingCount: 45,
        score: 8.9,
        ratings: {
          excellent: 30,
          good: 10,
          mediocre: 3,
          bad: 2,
        },
      },
      indexDetails: [
        {
          label: 'megrendelők',
          index: {
            ratingCount: 45,
            score: 8.9,
            ratings: {
              excellent: 30,
              good: 10,
              mediocre: 3,
              bad: 2,
            },
          },
        },
        {
          label: 'beszállítók',
          index: {
            ratingCount: 45,
            score: 8.9,
            ratings: {
              excellent: 30,
              good: 10,
              mediocre: 3,
              bad: 2,
            },
          },
        },
      ],
      tags: ['Legendás szolgátatás', 'Profik', 'Pontos, tartják a határidőket'],
    },
    npsRates: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  } as {
    rating: {
      value: number;
      count: number;
    };
    profile: IProfile;
    awards: any[];
    articles: any[];
    productsAndServices: (IProduct | IService)[];
    stats: ReviewStatsProps;
    npsRates: [number, number, number, number, number, number, number, number, number, number, number];
  });
