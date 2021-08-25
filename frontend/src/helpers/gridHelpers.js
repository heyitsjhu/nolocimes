import { STORE_KEYS } from 'const';

export const getGridLayout = (gridState, type) => {
  return gridState[STORE_KEYS.LAYOUT_DEFAULTS][type];
};

export const getViewWidgets = (gridState, type) => {
  return gridState[STORE_KEYS.WIDGET_DEFAULTS][type];
};
