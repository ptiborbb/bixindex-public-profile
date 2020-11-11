import { FC } from 'react';
import { Award } from '../../award/award';
import classes from './awards.module.scss';

interface AwardsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  awards: any[]; //TODO missing typings
}

export const Awards: FC<AwardsProps> = ({ awards }) => {
  return (
    <div className={classes.awards}>
      {awards.map((award, i) => (
        <div key={i}>
          {i > 0 && <div className={classes.separator}></div>}
          <Award image={award.image} date={award.year} title={award.title} description={award.text} link={award.link} />
        </div>
      ))}
    </div>
  );
};
