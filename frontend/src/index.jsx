// import './wdyr';
import React from 'react';
import ReactDOM from 'react-dom';
import { debugContextDevtool } from 'react-context-devtool';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import ApplicationProviders from 'stores';
import ThemeProvider from 'stores/providers/themeProvider';

import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <ApplicationProviders>
      <ThemeProvider>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ApplicationProviders>
  </React.StrictMode>,
  container
);

// For development, enables use of React Context DevTool Chrome Extension
debugContextDevtool(container, {
  disable: process.env.NODE_ENV === 'production',
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
