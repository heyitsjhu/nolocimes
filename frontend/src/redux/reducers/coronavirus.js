import { STORE_KEYS } from 'const';
import { staticC19Data } from 'utils/staticData';
import { deepClone } from 'utils';

import setNextState from '../setNextState';

const isDev = process.env.NODE_ENV === 'development';

const initialState = {
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
  [STORE_KEYS.LATEST_TOTALS]: [],
  [STORE_KEYS.STATISTICS]: [],
};

const staticState = {
  [STORE_KEYS.CONTROL_PANEL]: {
    chartMetric: 'cases_new',
    countriesToFetch: [],
    selectedCountry: 'USA',
    selectedCountries: ['USA'],
    showGlobalTotals: false,
  },
  [STORE_KEYS.COUNTRIES]: staticC19Data.countries,
  [STORE_KEYS.HISTORY]: staticC19Data.history || {
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
  [STORE_KEYS.LATEST_TOTALS]: staticC19Data.latestTotals,
  [STORE_KEYS.STATISTICS]: staticC19Data.statistics,
};

export const UPDATE_CORONAVIRUS = 'UPDATE_CORONAVIRUS';

export const updateCoronavirus = (firstLevel, secondLevel, thirdLevel, payload) => {
  return { type: UPDATE_CORONAVIRUS, firstLevel, secondLevel, thirdLevel, payload };
};

export default (state = isDev && staticState ? staticState : initialState, action) => {
  let newState = deepClone(state);

  switch (action.type) {
    case UPDATE_CORONAVIRUS:
      newState = setNextState(newState, action);
      break;
    default:
      break;
  }

  return newState;
};
