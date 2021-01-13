import { LOCAL_STORAGE_KEY, PARTICLE_CANVAS_DEFAULTS, STORE_KEYS } from 'const';
import DLError from 'models/DLError';
import { deepClone } from 'utils';
import { c19data } from 'utils/staticData';

import createStore from '../storeCreator';
import * as TYPES from '../types';

const initialState = {
  [STORE_KEYS.BLOG]: { activeTag: 'all', tags: ['all', 'tag1', 'tag2', 'tag3'] },
  [STORE_KEYS.CONTENT]: {
    [STORE_KEYS.ASSETS]: [],
    [STORE_KEYS.IMAGES]: [],
    [STORE_KEYS.POSTS]: [],
  },
  [STORE_KEYS.PARTICLE_CANVAS]: PARTICLE_CANVAS_DEFAULTS,
  [STORE_KEYS.NOTIFICATION]: {
    buttonText: null,
    message: null,
    severity: 'info',
    show: false,
  },
  [STORE_KEYS.CORONAVIRUS]: {
    [STORE_KEYS.CONTROL_PANEL]: {
      chartMetric: 'cases_new',
      countriesToFetch: [],
      selectedCountries: ['USA'],
      showGlobalTotals: false,
    },
    [STORE_KEYS.COUNTRIES]: [],
    [STORE_KEYS.HISTORY]: {
      cases_new: [],
      cases_1M_pop: [],
      cases_active: [],
      cases_critical: [],
      cases_recovered: [],
      cases_total: [],
      deaths_new: [],
      deaths_1M_pop: [],
      deaths_total: [],
      tests_1M_pop: [],
      tests_total: [],
      population: [],
      _retrievedCountries: [],
    },
    [STORE_KEYS.IS_LOADING]: false,
    [STORE_KEYS.LAST_UPDATED]: null,
  },
  [STORE_KEYS.SITE_SETTINGS]: {
    cookiesAccepted: false,
    darkMode: true,
    introViewed: false,
    isInteractive: false,
    userIsOnMobile: false,
  },
  [STORE_KEYS.SPLASH_LOGO]: { started: false, playing: false, finished: false },
};

const staticState = {
  [STORE_KEYS.BLOG]: { activeTag: 'all', tags: ['all', 'tag1', 'tag2', 'tag3'] },
  [STORE_KEYS.CONTENT]: {
    [STORE_KEYS.ASSETS]: [],
    [STORE_KEYS.IMAGES]: [],
    [STORE_KEYS.POSTS]: [],
  },
  [STORE_KEYS.CORONAVIRUS]: {
    [STORE_KEYS.CONTROL_PANEL]: {
      chartMetric: 'cases_new',
      countriesToFetch: [],
      selectedCountries: ['USA'],
      showGlobalTotals: false,
    },
    [STORE_KEYS.COUNTRIES]: c19data.countries,
    [STORE_KEYS.HISTORY]: c19data.history,
    [STORE_KEYS.IS_LOADING]: false,
    [STORE_KEYS.LAST_UPDATED]: null,
  },
  [STORE_KEYS.NOTIFICATION]: {
    buttonText: null,
    message: null,
    severity: 'info',
    show: false,
  },
  [STORE_KEYS.PARTICLE_CANVAS]: PARTICLE_CANVAS_DEFAULTS,
  [STORE_KEYS.SITE_SETTINGS]: {
    cookiesAccepted: false,
    darkMode: true,
    introViewed: false,
    isInteractive: false,
    userIsOnMobile: false,
  },
  [STORE_KEYS.SPLASH_LOGO]: { started: false, playing: false, finished: false },
};

const reducer = (state, action) => {
  let newState = deepClone(state);

  switch (action.type) {
    case TYPES.UPDATE_APP_STATE:
      if (!action.firstLevelKey && !action.secondLevelKey) return newState;

      if (action.secondLevelKey === STORE_KEYS.RESET) {
        newState[action.firstLevelKey] = initialState[action.firstLevelKey];
      } else if (!action.secondLevelKey && action.payload) {
        newState[action.firstLevelKey] = {
          ...newState[action.firstLevelKey],
          ...action.payload,
        };
      } else {
        newState[action.firstLevelKey] = {
          ...newState[action.firstLevelKey],
          [action.secondLevelKey]: action.payload,
        };
      }

      // update client's local storage object
      if (action.firstLevelKey === STORE_KEYS.SITE_SETTINGS) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState[STORE_KEYS.SITE_SETTINGS]));
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
