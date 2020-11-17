import AppProvider from './providers/appProvider';

const AppStores = ({ children }) => {
  return <AppProvider>{children}</AppProvider>;
};

export { AppContext } from './providers/appProvider';
export default AppStores;
