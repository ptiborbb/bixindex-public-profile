import { Grade } from '@material-ui/icons';
import Link from 'next/link';
import { FC } from 'react';
import classes from './entry-card.module.scss';

interface EntryCardProps {
  companyName: string;
  companyAlias: string;
  profileName: string;
  bixValue: number;
  ratingCount: number;
}

export const EntryCard: FC<EntryCardProps> = ({ bixValue, ratingCount, companyName, companyAlias, profileName }) => {
  return (
    <>
      <Container>
        <Link href={`/bix-profil/[companyAlias]?by=ALIAS`} as={`/bix-profil/${companyAlias}?by=ALIAS`} passHref>
          <a>
            <CompanyInfo profileName={profileName} companyName={companyName} />
          </a>
        </Link>
        <RatingInfo score={bixValue} count={ratingCount} />
      </Container>
      <Divider />
    </>
  );
};

const Container: FC = ({ children }) => <div className={classes.container}> {children} </div>;
const CompanyInfo: FC<{ companyName: string; profileName: string }> = ({ companyName, profileName }) => (
  <div className={classes.company}>
    <h5> {companyName} </h5>
    <p> {profileName} </p>
  </div>
);
const RatingInfo: FC<{ score: number; count: number }> = ({ count, score }) => (
  <div className={classes.rating}>
    <Grade className={classes.star} fontSize="default" />
    <span className={classes.score}> {score} </span>
    <span>{`(${count})`}</span>
  </div>
);
const Divider: FC = () => <div className={classes.divider} />;
