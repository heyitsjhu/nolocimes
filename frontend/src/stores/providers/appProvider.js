import { ANBU_SAMPLE_USER, LOCAL_STORAGE_KEY, PARTICLE_CANVAS_DEFAULTS, STORE_KEYS } from 'const';
import DLError from 'models/DLError';
import { deepClone } from 'utils';
import { c19data } from 'utils/staticData';

import createStore from '../storeCreator';
import * as TYPES from '../types';
import { staticStockData } from '../static';

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
      [STORE_KEYS.NARRATIVE_STEP]: 1,
    },
  },
  [STORE_KEYS.BLOG]: { activeTag: 'all', tags: ['all', 'tag1', 'tag2', 'tag3'] },
  [STORE_KEYS.CANDLE_MONKEYS]: {
    [STORE_KEYS.LAYOUT_DEFAULTS]: {
      [STORE_KEYS.COMPANY]: [
        { i: 'dwewjhe', x: 0, y: 0, w: 12, h: 2, static: true },
        { i: 'acqboib', x: 0, y: 2, w: 3, h: 4, static: true },
        { i: 'ifgeuji', x: 0, y: 6, w: 3, h: 2, static: true },
        { i: 'hjksdfs', x: 0, y: 8, w: 3, h: 3, static: true },
        { i: 'cmxfduq', x: 3, y: 2, w: 6, h: 8, static: true },
        { i: 'rlghwgy', x: 9, y: 2, w: 3, h: 4, static: true },
        { i: 'bbgyrcx', x: 9, y: 6, w: 3, h: 4, static: true },
        { i: 'osdibtl', x: 9, y: 10, w: 3, h: 4, static: true },
        { i: 'urmvits', x: 3, y: 10, w: 6, h: 8, static: true },
        { i: 'vvmlooc', x: 0, y: 18, w: 9, h: 8, static: true },
        { i: 'uvqqvfx', x: 9, y: 14, w: 3, h: 10, static: true },
        { i: 'eyjnpvi', x: 0, y: 26, w: 9, h: 24, static: true },
        { i: 'tfcoovg', x: 0, y: 50, w: 9, h: 12, static: true },
      ],
    },
    [STORE_KEYS.WIDGET_DEFAULTS]: {
      [STORE_KEYS.COMPANY]: [
        { key: 'dwewjhe', type: 'companyHeader' },
        { key: 'acqboib', type: 'companyPriceBox' },
        { key: 'ifgeuji', type: 'companyOHLC' },
        { key: 'hjksdfs', type: 'companyPerformance' },
        { key: 'cmxfduq', type: 'companyPriceChart' },
        { key: 'rlghwgy', type: 'companyEarnings' },
        { key: 'bbgyrcx', type: 'companyDividends' },
        { key: 'osdibtl', type: 'companyAnalystRecommendations' },
        { key: 'urmvits', type: 'companyAdvancedStats' },
        { key: 'vvmlooc', type: 'companyNews' },
        { key: 'uvqqvfx', type: 'companyPeersGroup' },
        { key: 'eyjnpvi', type: 'companyFundamentals' },
        { key: 'tfcoovg', type: 'companyProfile' },
      ],
    },
    [STORE_KEYS.STOCK_DATA]: {
      advancedStats: {},
      analystRecommendations: [],
      balancesheet: {},
      cashflow: {},
      company: {},
      dividends: [],
      earnings: {},
      estimates: {},
      income: {},
      intradayPrices: [],
      logo: {},
      news: [],
      peers: [],
      quote: {},
    },
  },
  [STORE_KEYS.CONTENT]: {
    [STORE_KEYS.ASSETS]: [],
    [STORE_KEYS.IMAGES]: [],
    [STORE_KEYS.POSTS]: [],
    [STORE_KEYS.TAGS]: [],
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
  [STORE_KEYS.NOTIFICATION]: {
    buttonText: null,
    message: null,
    severity: 'info',
    show: false,
  },
  [STORE_KEYS.PARTICLE_CANVAS]: PARTICLE_CANVAS_DEFAULTS,
  [STORE_KEYS.SITE_SETTINGS]: {
    [STORE_KEYS.ACCEPTED_COOKIES]: false,
    [STORE_KEYS.IS_DARK_MODE]: true,
    [STORE_KEYS.IS_INTERACTIVE]: false,
    [STORE_KEYS.IS_ON_MOBILE]: false,
    [STORE_KEYS.VIEWED_INTRO]: false,
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
      [STORE_KEYS.NARRATIVE_STEP]: 1,
    },
  },
  [STORE_KEYS.BLOG]: { activeTag: 'all', tags: ['all', 'tag1', 'tag2', 'tag3'] },
  [STORE_KEYS.CANDLE_MONKEYS]: {
    [STORE_KEYS.LAYOUT_DEFAULTS]: {
      [STORE_KEYS.COMPANY]: [
        { i: 'dwewjhe', x: 0, y: 0, w: 12, h: 2, static: true },
        { i: 'acqboib', x: 0, y: 2, w: 3, h: 4, static: true },
        { i: 'ifgeuji', x: 0, y: 6, w: 3, h: 2, static: true },
        { i: 'hjksdfs', x: 0, y: 8, w: 3, h: 3, static: true },
        { i: 'cmxfduq', x: 3, y: 2, w: 6, h: 8, static: true },
        { i: 'rlghwgy', x: 9, y: 2, w: 3, h: 4, static: true },
        { i: 'bbgyrcx', x: 9, y: 6, w: 3, h: 4, static: true },
        { i: 'osdibtl', x: 9, y: 10, w: 3, h: 4, static: true },
        { i: 'urmvits', x: 3, y: 10, w: 6, h: 8, static: true },
        { i: 'vvmlooc', x: 0, y: 18, w: 9, h: 8, static: true },
        { i: 'uvqqvfx', x: 9, y: 14, w: 3, h: 10, static: true },
        { i: 'eyjnpvi', x: 0, y: 26, w: 9, h: 24, static: true },
        { i: 'tfcoovg', x: 0, y: 50, w: 9, h: 12, static: true },
      ],
    },
    [STORE_KEYS.WIDGET_DEFAULTS]: {
      [STORE_KEYS.COMPANY]: [
        { key: 'dwewjhe', type: 'companyHeader' },
        { key: 'acqboib', type: 'companyPriceBox' },
        { key: 'ifgeuji', type: 'companyOHLC' },
        { key: 'hjksdfs', type: 'companyPerformance' },
        { key: 'cmxfduq', type: 'companyPriceChart' },
        { key: 'rlghwgy', type: 'companyEarnings' },
        { key: 'bbgyrcx', type: 'companyDividends' },
        { key: 'osdibtl', type: 'companyAnalystRecommendations' },
        { key: 'urmvits', type: 'companyAdvancedStats' },
        { key: 'vvmlooc', type: 'companyNews' },
        { key: 'uvqqvfx', type: 'companyPeersGroup' },
        { key: 'eyjnpvi', type: 'companyFundamentals' },
        { key: 'tfcoovg', type: 'companyProfile' },
      ],
    },
    [STORE_KEYS.STOCK_DATA]: staticStockData,
  },
  [STORE_KEYS.CONTENT]: {
    [STORE_KEYS.ASSETS]: [],
    [STORE_KEYS.IMAGES]: [],
    [STORE_KEYS.POSTS]: [],
    [STORE_KEYS.TAGS]: [],
  },
  [STORE_KEYS.CORONAVIRUS]: {
    [STORE_KEYS.CONTROL_PANEL]: {
      chartMetric: 'cases_new',
      countriesToFetch: [],
      selectedCountry: 'USA',
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
    [STORE_KEYS.ACCEPTED_COOKIES]: false,
    [STORE_KEYS.IS_DARK_MODE]: true,
    [STORE_KEYS.IS_INTERACTIVE]: false,
    [STORE_KEYS.IS_ON_MOBILE]: false,
    [STORE_KEYS.VIEWED_INTRO]: false,
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
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState[STORE_KEYS.SITE_SETTINGS]));
      }
      break;
    default:
      throw new DLError('Did not find match for reducer action: ' + action.type);
  }

  return newState;
};

const [AppContext, AppProvider] = createStore(
  'Application Context',
  initialState,
  reducer,
  staticState
);

export { AppContext };
export default AppProvider;
