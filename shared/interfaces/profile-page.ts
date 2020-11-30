import { ECompanyTypes, IProduct, IRating, IService, IUser } from '@codingsans/bixindex-common';

export interface RatingItem {
  name: string;
  logo: string;
  value: number;
  date: string;
  nps?: number;
  positive?: string;
  negative?: string;
  summary?: string;
  reply: {
    user: Pick<IUser, "id" | "image" | "name">;
    replyText: string;
  }
}

export interface ProfilePage {
  profile: {
    id: string;
    companyID: string;
    defaultFormID?: string;
    fb?: string;
    insta?: string;
    linkedin?: string;
    tiktok?: string;
    website?: string;
    name: string;
    type: ECompanyTypes;
    logo?: string;
    details: {
      employees: {
        value: number;
        change?: string;
      };
      yearlyIncome: {
        value: number;
        change?: string;
      };
      taxNumber: string;
      address: string;
      mainProfile: string;
    };
    contacts: [
      {
        name: string;
        email?: string;
        phone?: string;
        image?: string;
      },
    ];
  };
  awards: {
    image: string;
    date: Date;
    title: string;
    description: string;
  }[];
  articles: {
    date: Date;
    title: string;
    type: string;
    content: string;
    link?: string;
  }[];
  productsAndServices: (IProduct & IService)[];
  ratings: {
    items: RatingItem[];
    count: number;
    countsByValue: number[];
  };
  stats: {
    index: {
      ratingCount: number;
      score: number;
      ratings: number[];
    };
    indexDetails?: [
      {
        label: string;
        index: {
          ratingCount: number;
          score: number;
          ratings: [
            {
              label: string;
              score: string;
            },
          ];
        };
      },
    ];
  };
  npsRates: number[];
  lastRating: IRating;
}
