import * as TYPES from '../types';

export const updateAppState = (firstLevelKey, secondLevelKey, thirdLevelKey, payload) => {
  return { type: TYPES.UPDATE_APP_STATE, firstLevelKey, secondLevelKey, thirdLevelKey, payload };
};
