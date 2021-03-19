import { STORE_KEYS } from 'const';

const {
  CANDLE_MONKEYS,
  COMPANY,
  DEFAULTS,
  USER,
  LAYOUT_DEFAULTS,
  VIEW_LAYOUTS,
  VIEW_WIDGETS,
  WIDGET_DEFAULTS,
} = STORE_KEYS;

export const getGridLayout = (appState, type) => {
  return appState[CANDLE_MONKEYS][LAYOUT_DEFAULTS][type];
};

export const getViewWidgets = (appState, type) => {
  return appState[CANDLE_MONKEYS][WIDGET_DEFAULTS][type];
};
