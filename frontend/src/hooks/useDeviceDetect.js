import { useState } from 'react';
import { useMobileOrientation, useDeviceSelectors } from 'react-device-detect';

import { useEventListener } from 'hooks/useEventListener';

/**
 *
 * @returns
 */
export const useDeviceDetect = () => {
  const {
    isLandscape: initialIsLandscape,
    isPortrait: initialIsPortrait,
    orientation: initialOrientation,
  } = useMobileOrientation();
  const [selectors, data] = useDeviceSelectors(window.navigator.userAgent);
  const [isLandscape, setIsLandscape] = useState(initialIsLandscape);
  const [isPortrait, setIsPortrait] = useState(initialIsPortrait);
  const [orientation, setOrientation] = useState(initialOrientation);

  useEventListener('resize', () => {
    if (window.innerWidth > window.innerHeight) {
      !isLandscape && setIsLandscape(true);
      isPortrait && setIsPortrait(false);
      orientation === 'portrait' && setOrientation('landscape');
    } else {
      !isPortrait && setIsPortrait(true);
      isLandscape && setIsLandscape(false);
      orientation === 'landscape' && setOrientation('portrait');
    }
  });

  return {
    ...selectors,
    ...data,
    ...{ isLandscape, isPortrait, orientation },
  };
};
