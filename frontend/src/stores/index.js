import React, { useRef } from 'react';
import { SnackbarProvider } from 'notistack';
import Button from '@material-ui/core/Button';

import { DEFAULT_NOTISTACK_PROPS } from 'const';
import { useCopy } from 'hooks/useCopy';

import AppProvider from './providers/appProvider';

const AppStores = ({ children }) => {
  const { t } = useCopy();
  const notistackRef = useRef();

  const notistackAction = key => (
    <Button color="inherit" size="small" onClick={() => notistackRef.current.closeSnackbar(key)}>
      {t('common.dismiss')}
    </Button>
  );

  return (
    <AppProvider>
      <SnackbarProvider
        ref={notistackRef}
        // action={key => notistackAction(key)}
        {...DEFAULT_NOTISTACK_PROPS}
      >
        {children}
      </SnackbarProvider>
    </AppProvider>
  );
};

export { AppContext } from './providers/appProvider';
export default AppStores;
