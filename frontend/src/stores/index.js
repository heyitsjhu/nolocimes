import React from 'react';
import AppProvider from './providers/appProvider';
import ContentProvider from './providers/contentProvider';
import CoronavirusProvider from './providers/coronavirusProvider';

const AppStores = ({ children }) => {
  return (
    <AppProvider>
      <ContentProvider>
        <CoronavirusProvider>{children}</CoronavirusProvider>
      </ContentProvider>
    </AppProvider>
  );
};

export { AppContext } from './providers/appProvider';
export { ContentContext } from './providers/contentProvider';
export { CoronavirusContext } from './providers/coronavirusProvider';

export default AppStores;
