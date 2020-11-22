import { useEffect } from 'react';
import * as Utils from 'utils';

const elementsToTriggerClose = [
  Utils.getElId('site', 'particle-canvas'),
  Utils.getElId('site', 'header'),
  Utils.getElId('site', 'footer'),
];

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        !elementsToTriggerClose.includes(event.target.id)
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
