import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = (ref, handler) => {
  const location = useLocation();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, 0); // TODO: animate the scroll
    }
  }, [ref, handler, location.pathname]);
};
