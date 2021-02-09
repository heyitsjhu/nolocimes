import { ANBU_SAMPLE_USER, LOCAL_STORAGE_KEY, PARTICLE_CANVAS_DEFAULTS, STORE_KEYS } from 'const';
import DLError from 'models/DLError';
import { deepClone } from 'utils';
import { c19data } from 'utils/staticData';

import createStore from '../storeCreator';
import * as TYPES from '../types';

export const initialState = {
  [STORE_KEYS.ANBU_BLOCKCHAIN]: {
    [STORE_KEYS.ACCOUNT]: { address: ANBU_SAMPLE_USER, balance: 0 },
    [STORE_KEYS.ANBU_COIN]: {
      [STORE_KEYS.CHAIN]: [],
      [STORE_KEYS.DIFFICULTY]: 0,
      [STORE_KEYS.TRANSACTIONS_QUEUE]: [],
      [STORE_KEYS.MINING_REWARD]: 0,
    },
    [STORE_KEYS.SETTINGS]: {
      [STORE_KEYS.CURRENT_STEP]: 1,
      [STORE_KEYS.DIFFICULTY]: 1,
      [STORE_KEYS.MINING_REWARD]: 100,
    },
  },
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
};

const staticState = {
  [STORE_KEYS.ANBU_BLOCKCHAIN]: {
    [STORE_KEYS.ACCOUNT]: { address: ANBU_SAMPLE_USER, balance: 0 },
    [STORE_KEYS.ANBU_COIN]: {
      [STORE_KEYS.CHAIN]: [],
      [STORE_KEYS.DIFFICULTY]: 0,
      [STORE_KEYS.TRANSACTIONS_QUEUE]: [],
      [STORE_KEYS.MINING_REWARD]: 0,
    },
    [STORE_KEYS.SETTINGS]: {
      [STORE_KEYS.BLOCK_SIZE]: 2,
      [STORE_KEYS.CURRENT_STEP]: 1,
      [STORE_KEYS.DIFFICULTY]: 1,
      [STORE_KEYS.MINING_REWARD]: 100,
    },
  },
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
};

const reducer = (state, action) => {
  let newState = deepClone(state);
  const firstKeyMissing = !action.firstLevelKey && typeof action.firstLevelKey === 'undefined';
  const secondKeyMissing = !action.secondLevelKey && typeof action.secondLevelKey === 'undefined';
  const thirdKeyMissing = !action.thirdLevelKey && typeof action.thirdLevelKey === 'undefined';
  const payloadMissing = !action.payload && typeof action.payload === 'undefined';

  switch (action.type) {
    case TYPES.UPDATE_APP_STATE:
      if (firstKeyMissing && secondKeyMissing && thirdKeyMissing) return newState;
      if (payloadMissing) return newState;

      // payload replaces the data on first level key
      if (action.firstLevelKey && secondKeyMissing && thirdKeyMissing) {
        newState[action.firstLevelKey] =
          action.payload === STORE_KEYS.RESET ? initialState[action.firstLevelKey] : action.payload;
      } // payload replaces the data on first level key
      else if (action.firstLevelKey && action.secondLevelKey && thirdKeyMissing) {
        newState[action.firstLevelKey] = {
          ...newState[action.firstLevelKey],
          [action.secondLevelKey]:
            action.payload === STORE_KEYS.RESET
              ? initialState[action.firstLevelKey][action.secondLevelKey]
              : action.payload,
        };
      } // payload replaces the data on third level key
      else if (action.firstLevelKey && action.secondLevelKey && action.thirdLevelKey) {
        newState[action.firstLevelKey] = {
          ...newState[action.firstLevelKey],
          [action.secondLevelKey]: {
            ...newState[action.firstLevelKey][action.secondLevelKey],
            [action.thirdLevelKey]:
              action.payload === STORE_KEYS.RESET
                ? initialState[action.firstLevelKey][action.secondLevelKey][action.thirdLevelKey]
                : action.payload,
          },
        };
      }

      // update client's local storage object if relevant data changes
      if (action.firstLevelKey === STORE_KEYS.SITE_SETTINGS) {
        console.log('ajsfklajsfk');
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState[STORE_KEYS.SITE_SETTINGS]));
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
