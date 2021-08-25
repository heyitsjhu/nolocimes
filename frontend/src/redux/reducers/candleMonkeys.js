import { STORE_KEYS } from 'const';
import { deepClone } from 'utils';

import setNextState from '../setNextState';
import { staticStockData } from '../static';

const isDev = process.env.NODE_ENV === 'development';

export const initialState = {
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
};

const staticState = {
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
};

export const UPDATE_CANDLE_MONKEYS = 'UPDATE_CANDLE_MONKEYS';

export const updateCandleMonkeys = (firstLevel, secondLevel, thirdLevel, payload) => {
  return { type: UPDATE_CANDLE_MONKEYS, firstLevel, secondLevel, thirdLevel, payload };
};

export default (state = isDev && staticState ? staticState : initialState, action) => {
  let newState = deepClone(state);

  switch (action.type) {
    case UPDATE_CANDLE_MONKEYS:
      newState = setNextState(newState, action);
      break;
    default:
      break;
  }

  return newState;
};
