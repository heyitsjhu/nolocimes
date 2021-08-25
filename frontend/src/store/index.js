import React, { createContext, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { DEFAULT_NOTISTACK_PROPS } from 'const';
import { useCopy } from 'hooks/useCopy';
import themeMapping from 'theme';

import { setupListeners } from '@reduxjs/toolkit/query';
import store from '../redux/reducers';

setupListeners(store.dispatch);

export const ThemeContext = createContext({
  darkMode: true,
  setDarkMode: null,
});

const ApplicationProviders = ({ children }) => {
  const { t } = useCopy();
  const [darkMode, setDarkMode] = useState(true);
  const theme = themeMapping[darkMode ? 'dark' : 'light']();
  const contextValue = { darkMode, setDarkMode };
  const notistackRef = useRef();

  const notistackAction = key => (
    <Button color="inherit" size="small" onClick={() => notistackRef.current.closeSnackbar(key)}>
      {t('common.dismiss')}
    </Button>
  );

  return (
    <Provider store={store}>
      <SnackbarProvider
        ref={notistackRef}
        // action={key => notistackAction(key)}
        {...DEFAULT_NOTISTACK_PROPS}
      >
        <ThemeContext.Provider value={contextValue}>
          <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </ThemeContext.Provider>
      </SnackbarProvider>
    </Provider>
  );
};

export default ApplicationProviders;
