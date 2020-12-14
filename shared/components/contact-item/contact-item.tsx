import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import { FC } from 'react';
import classes from './contact-item.module.scss';

interface ContactItemProps {
  image: string;
  name: string;
  email: string;
  phone: string;
}

export const ContactItem: FC<ContactItemProps> = ({ image, name, email, phone }) => {
  return (
    <div className={classes.contactItem}>
      <div className={classes.contactImage}>
        {image && (
          <>
            <img alt={name} src={image} />
          </>
        )}
      </div>
      <div className={classes.contactData}>
        <div className={classes.name}>{name}</div>
        <div className={classes.email}>
          {email && (
            <>
              <EmailIcon className={classes.icon} /> {email}
            </>
          )}
        </div>
        <div className={classes.phone}>
          {phone && (
            <>
              <PhoneIcon className={classes.icon} /> {phone}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
