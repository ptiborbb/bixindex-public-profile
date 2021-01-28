import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { FC } from 'react';
import { useTranslate } from '../../translate.context';

export enum DialogType {
  CONFIRM = 'confirm',
  ALERT = 'alert',
}
export interface IDialogOptions {
  catchOnCancel?: boolean;
  variant: DialogType;
  title: JSX.Element | string;
  text: JSX.Element | string;
  submitButtonLabel?: string;
  closeButtonLabel?: string;
  headerColor?: string;
  buttonClasses?: string;
}

interface IDialogProps extends IDialogOptions {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

export const BixDialog: FC<IDialogProps> = ({
  open,
  variant,
  text,
  title,
  submitButtonLabel,
  closeButtonLabel,
  onSubmit,
  onClose,
  headerColor,
  buttonClasses,
}) => {
  const { t } = useTranslate();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      disableBackdropClick
    >
      <DialogTitle id="dialog-title" style={{ backgroundColor: headerColor }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">{text}</DialogContentText>
      </DialogContent>
      <DialogActions className="pb-3 px-3 justify-content-center justify-content-lg-end">
        {variant === DialogType.CONFIRM && (
          <Button onClick={onClose} color="primary" autoFocus>
            {closeButtonLabel || t('DIALOG.BUTTON_CANCEL')}
          </Button>
        )}

        <Button onClick={onSubmit} color="primary" className={buttonClasses}>
          {submitButtonLabel || t('DIALOG.BUTTON_OK')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
