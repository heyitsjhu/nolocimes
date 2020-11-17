import { UPDATE_SPLASH_LOGO } from '../types';

export const updateSplashLogo = payload => {
  return { type: UPDATE_SPLASH_LOGO, payload };
};
