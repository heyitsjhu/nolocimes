import { LOCAL_STORAGE_KEY, STORE_KEYS } from 'const';
import { deepClone } from 'utils';

import setNextState from '../setNextState';

const initialState = {
  [STORE_KEYS.ACCEPTED_COOKIES]: false,
  [STORE_KEYS.IS_DARK_MODE]: true,
  [STORE_KEYS.IS_INTERACTIVE]: false,
  [STORE_KEYS.IS_ON_MOBILE]: false,
  [STORE_KEYS.LANGUAGE]: 'en',
  [STORE_KEYS.VIEWED_INTRO]: false,
};

export const UPDATE_SITE_SETTINGS = 'UPDATE_SITE_SETTINGS';

export const updateSiteSettings = (firstLevel, secondLevel, thirdLevel, payload) => {
  return { type: UPDATE_SITE_SETTINGS, firstLevel, secondLevel, thirdLevel, payload };
};

export default (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case UPDATE_SITE_SETTINGS:
      newState = setNextState(newState, action);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      break;
    default:
      break;
  }

  return newState;
};
