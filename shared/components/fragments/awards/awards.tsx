import { FC } from 'react';
import { Award } from '../../award/award';
import classes from './awards.module.scss';

interface AwardsProps {
  awards: Record<string, string & Date>[];
}

export const Awards: FC<AwardsProps> = ({ awards }) => {
  return (
    <div className={classes.awards}>
      {awards.map((award, i) => (
        <div key={i}>
          {i > 0 && <div className={classes.separator}></div>}
          <Award image={award.image} date={award.title} title={award.title} description={award.description} />
        </div>
      ))}
    </div>
  );
};
