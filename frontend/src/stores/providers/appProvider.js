import { PARTICLE_CANVAS_DEFAULTS, STORE_KEYS } from 'const';
import DLError from 'models/DLError';
import { deepClone } from 'utils';

import createStore from '../storeCreator';
import * as TYPES from '../types';

const initialState = {
  [STORE_KEYS.BUSINESS_CARD]: { show: false },
  [STORE_KEYS.PARTICLE_CANVAS]: PARTICLE_CANVAS_DEFAULTS,
  [STORE_KEYS.SITE_SETTINGS]: { darkMode: true },
  [STORE_KEYS.SPLASH_LOGO]: { started: false, playing: false, finished: true },
};

const staticState = {
  [STORE_KEYS.BUSINESS_CARD]: { show: false },
  [STORE_KEYS.PARTICLE_CANVAS]: PARTICLE_CANVAS_DEFAULTS,
  [STORE_KEYS.SITE_SETTINGS]: { darkMode: true },
  [STORE_KEYS.SPLASH_LOGO]: { started: false, playing: false, finished: true },
};

const reducer = (state, action) => {
  const newState = deepClone(state);

  switch (action.type) {
    case 'SET_LOADING':
      newState[action.key].loading = action.payload;
      break;
    case 'UPDATE_APP_STATE':
      if (!action.firstLevelKey || !action.secondLevelKey) return state;

      if (!action.secondLevelKey && action.payload) {
        // payload is implied to replace data at firstLevelKey
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

      break;
    case TYPES.UPDATE_SPLASH_LOGO:
      if (action.payload === 'start') {
        newState.splashLogo = {
          ...newState.splashLogo,
          started: true,
          playing: true,
        };
      } else if (action.payload === 'finish') {
        newState.splashLogo = {
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
