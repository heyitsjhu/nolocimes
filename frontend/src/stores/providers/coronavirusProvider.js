import { STORE_KEYS } from 'const';
import DLError from 'models/DLError';
import { deepClone } from 'utils';

import createStore from '../storeCreator';
import * as TYPES from '../types';
import { c19data } from 'utils/staticData';

const initialState = {
  [STORE_KEYS.CONTROL_PANEL]: {
    chartMetric: 'cases_new',
    countriesToFetch: [],
    selectedCountries: ['USA', 'Brazil', 'Italy', 'S-Korea', 'Spain'],
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
};

const staticState = {
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
};

const reducer = (state, action) => {
  let newState = deepClone(state);

  switch (action.type) {
    case TYPES.UPDATE_CORONAVIRUS_STATE:
      if (!action.firstLevelKey && !action.secondLevelKey) return state;

      if (!action.secondLevelKey) {
        newState[action.firstLevelKey] = action.payload;
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
    default:
      throw new DLError('Did not find match for reducer action: ' + action.type);
  }

  return newState;
};

const [CoronavirusContext, CoronavirusProvider] = createStore(initialState, reducer, staticState);

export { CoronavirusContext };
export default CoronavirusProvider;
