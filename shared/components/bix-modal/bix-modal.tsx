import { Modal } from '@material-ui/core';
import { CSSProperties, FC, useState } from 'react';
import classes from './bix-modal.module.scss';

interface IBixModalProps {
  title?: string;
  open: boolean;
  onClose: (result?: unknown) => void;
}

function getModalStyle(): CSSProperties {
  const top = 50;
  const left = 50;

  return {
    position: 'fixed',
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export const BixModal: FC<IBixModalProps> = ({ children, title, open, onClose }) => {
  const [modalStyle] = useState(getModalStyle);

  return (
    <Modal open={open} onClose={() => onClose()}>
      <div style={modalStyle}>
        {title && <div className={classes.modalTitle}>{title}</div>}
        <div className={classes.modalBody}>{children}</div>
      </div>
    </Modal>
  );
};
