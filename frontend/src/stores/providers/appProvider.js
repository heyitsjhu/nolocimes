import { LOCAL_STORAGE_KEY, PARTICLE_CANVAS_DEFAULTS, STORE_KEYS } from 'const';
import DLError from 'models/DLError';
import { deepClone } from 'utils';

import createStore from '../storeCreator';
import * as TYPES from '../types';

const initialState = {
  [STORE_KEYS.BUSINESS_CARD]: { show: false },
  [STORE_KEYS.LOCAL_STORAGE]: { introViewed: false },
  [STORE_KEYS.PARTICLE_CANVAS]: PARTICLE_CANVAS_DEFAULTS,
  [STORE_KEYS.SITE_SETTINGS]: { darkMode: true },
  [STORE_KEYS.SPLASH_LOGO]: { started: false, playing: false, finished: false },
};

const staticState = {
  [STORE_KEYS.BUSINESS_CARD]: { show: false },
  [STORE_KEYS.LOCAL_STORAGE]: { introViewed: false },
  [STORE_KEYS.PARTICLE_CANVAS]: PARTICLE_CANVAS_DEFAULTS,
  [STORE_KEYS.SITE_SETTINGS]: { darkMode: true },
  [STORE_KEYS.SPLASH_LOGO]: { started: false, playing: false, finished: false },
};

const reducer = (state, action) => {
  const newState = deepClone(state);

  switch (action.type) {
    case TYPES.UPDATE_APP_STATE:
      if (!action.firstLevelKey && !action.secondLevelKey) return state;

      if (!action.secondLevelKey && action.payload) {
        newState[action.firstLevelKey] = {
          ...newState[action.firstLevelKey],
          ...action.payload,
        };
      } else if (
        action.secondLevelKey &&
        typeof action.payload !== 'boolean' &&
        typeof action.payload !== 'number'
      ) {
        // secondLevelKey is implied to replace data at firstLevelKey
        newState[action.firstLevelKey] = {
          ...newState[action.firstLevelKey],
          ...action.secondLevelKey,
        };
      } else {
        newState[action.firstLevelKey] = {
          ...newState[action.firstLevelKey],
          [action.secondLevelKey]: action.payload,
        };
      }

      // update client's local storage object
      if (action.firstLevelKey === STORE_KEYS.LOCAL_STORAGE && action.payload) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState.localStorage));
      }

      break;
    case TYPES.UPDATE_SPLASH_LOGO:
      if (action.payload === 'started') {
        newState.splashLogo = {
          ...newState.splashLogo,
          started: true,
          playing: true,
        };
      } else if (action.payload === 'finished') {
        newState.splashLogo = {
          ...newState.splashLogo,
          started: false,
          playing: false,
          finished: true,
        };
      }
      break;
    default:
      throw new DLError('Did not find match for reducer action: ' + action.type);
  }

  return newState;
};

const [AppContext, AppProvider] = createStore(initialState, reducer, staticState);

export { AppContext };
export default AppProvider;
