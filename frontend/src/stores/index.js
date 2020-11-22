import React from 'react';
import AppProvider from './providers/appProvider';
import BlogProvider from './providers/blogProvider';

const AppStores = ({ children }) => {
  return (
    <AppProvider>
      <BlogProvider>{children}</BlogProvider>
    </AppProvider>
  );
};

export { AppContext } from './providers/appProvider';
export { BlogContext } from './providers/blogProvider';

export default AppStores;
