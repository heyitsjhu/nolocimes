import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import { IS_DEV } from 'const';

import anbuReducer from './anbu';
import candleMonkeysReducer from './candleMonkeys';
import contentReducer from './contentful';
import coronavirusReducer from './coronavirus';
import notificationsReducer from './notifications';
import particleCanvasReducer from './particleCanvas';
import projectNolocimesReducer from './projectNolocimes';
import siteSettingsReducer from './siteSettings';

const middlewareConfig = {
  // silences warning for non-serializable data in store,
  // like functions, etc (e.g., notification's onClick)
  serializableCheck: false,
};

const logger = createLogger({
  predicate: (getState, action) => !action.type.includes('__rtkq'),
  collapsed: true,
});

const middlewares = [];

if (IS_DEV) {
  middlewares.push(logger);
}

export const reducers = {
  anbu: anbuReducer,
  candleMonkeys: candleMonkeysReducer,
  content: contentReducer,
  coronavirus: coronavirusReducer,
  notifications: notificationsReducer,
  particleCanvas: particleCanvasReducer,
  projectNolocimes: projectNolocimesReducer,
  siteSettings: siteSettingsReducer,
};

export default configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware(middlewareConfig).concat(middlewares),
  reducer: reducers,
});
