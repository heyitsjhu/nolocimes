import { useLocation } from 'react-router-dom';
import { ROUTES } from 'const';

/**
 * Returns true if pathname matches home route.
 * @returns {boolean}
 */
export const useIsHome = () => {
  const location = useLocation();
  const isHome = location.pathname === ROUTES.HOME;

  return isHome;
};
