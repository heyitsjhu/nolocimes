import React, { createContext, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import themeMapping from 'theme';

export const ThemeContext = createContext({
  darkMode: true,
  setDarkMode: null,
});

// TODO: Switching between modes seem to create new stylesheets which can be problematic if a user continuously alternatives between the two modes non-stop.
const ThemeProvider = props => {
  const [darkMode, setDarkMode] = useState(true);
  const theme = themeMapping[darkMode ? 'dark' : 'light']();
  const contextValue = { darkMode, setDarkMode };

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
