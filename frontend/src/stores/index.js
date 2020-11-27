import React from 'react';
import AppProvider from './providers/appProvider';
import ContentProvider from './providers/contentProvider';

const AppStores = ({ children }) => {
  return (
    <AppProvider>
      <ContentProvider>{children}</ContentProvider>
    </AppProvider>
  );
};

export { AppContext } from './providers/appProvider';
export { ContentContext } from './providers/contentProvider';

export default AppStores;
