import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = (ref, handler) => {
  const location = useLocation();

  useEffect(() => {
    ref && ref.current && ref.current.scrollTo(0, 0); // TODO: animate the scroll
    handler && handler();
  }, [ref, handler, location.pathname]);

  return ref;
};
