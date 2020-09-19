import { ECompanyTypes, IProfile } from '@codingsans/bixindex-common';

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
  } as {
    rating: {
      value: number;
      count: number;
    };
    profile: IProfile;
    awards: any[];
    articles: any[];
  });
