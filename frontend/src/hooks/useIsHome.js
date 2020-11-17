import { useLocation } from 'react-router-dom';
import { ROUTES } from 'const';

export const useIsHome = () => {
  const location = useLocation();
  const isHome = location.pathname === ROUTES.HOME;

  return isHome;
};
