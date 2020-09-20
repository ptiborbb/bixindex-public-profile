import Head from 'next/head';
import { FC, useMemo, useState } from 'react';
import logo from '../../../public/bix_logo.svg';
import { CompanyFrame } from '../../components/company-frame/company-frame';
import { CompanyHeader } from '../../components/company-header/company-header';
import { CompanySearch } from '../../components/company-search/company-search';
import { Header } from '../../components/header/header';
import classes from './public-profile.module.scss';

interface PublicProfileProps {
  publicProfile: any;
}

export const PublicProfile: FC<PublicProfileProps> = (props) => {
  const publicProfile = useMemo(() => props?.publicProfile, [props]);
  const [activeFragment, setFragment] = useState(() => 'reviews');
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
        />
      </Head>
      {publicProfile && (
        <>
          <div className={classes.headerBlock}>
            <div className={classes.container}>
              <Header logoPath={logo} />
            </div>
            <div className={classes.divider}></div>
            <div className={classes.container}>
              <CompanySearch />
            </div>
            <div className={classes.container}>
              <CompanyHeader
                title={publicProfile.profile.name}
                logoPath={publicProfile.profile.logo}
                companyType={publicProfile.profile.type}
                activate={(fragment) => setFragment(fragment)}
              />
            </div>
          </div>
          <div className={classes.frameFix}>
            <div className={classes.container}>
              <CompanyFrame
                activeFragment={activeFragment}
                rating={publicProfile.rating}
                profile={publicProfile.profile}
                awards={publicProfile.awards}
                articles={publicProfile.articles}
                productsAndServices={publicProfile.productsAndServices}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
