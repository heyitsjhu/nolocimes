import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

const MockTheme = ({ children }) => {
  const theme = createMuiTheme({ shared: {} });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MockTheme;
