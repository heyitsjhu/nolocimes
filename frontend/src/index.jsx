// import './wdyr';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import ApplicationProviders from 'store';

import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <ApplicationProviders>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ApplicationProviders>
  </React.StrictMode>,
  container
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// TODO: Setup a function to send web vitals to a logging service
reportWebVitals(console.log);
