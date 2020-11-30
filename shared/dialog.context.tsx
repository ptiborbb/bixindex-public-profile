import React, { createContext, FC, useContext, useRef, useState } from 'react';
import { BixDialog, IDialogOptions } from './components/bix-dialog/bix-dialog';

const DialogContext = createContext<(options: IDialogOptions) => Promise<void>>(undefined);

export const useDialog = (): ((options: IDialogOptions) => Promise<void>) => useContext(DialogContext);

export const DialogServiceProvider: FC = ({ children }) => {
  const [dialogState, setDialogState] = useState<IDialogOptions | null>(null);

  const awaitingPromiseRef = useRef<{
    resolve: () => void;
    reject: () => void;
  }>();

  const openDialog = (options: IDialogOptions): Promise<void> => {
    setDialogState(options);
    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleClose = (): void => {
    if (dialogState.catchOnCancel && awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject();
    }

    setDialogState(null);
  };

  const handleSubmit = (): void => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve();
    }

    setDialogState(null);
  };

  return (
    <>
      <DialogContext.Provider value={openDialog}>
        {children}
        <BixDialog open={Boolean(dialogState)} onSubmit={handleSubmit} onClose={handleClose} {...dialogState} />
      </DialogContext.Provider>
    </>
  );
};
