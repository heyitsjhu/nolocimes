import * as TYPES from '../types';

export const updateAppState = (firstLevelKey, secondLevelKey, payload) => {
  return { type: TYPES.UPDATE_APP_STATE, firstLevelKey, secondLevelKey, payload };
};

export const updateSplashLogo = payload => {
  return { type: TYPES.UPDATE_SPLASH_LOGO, payload };
};
