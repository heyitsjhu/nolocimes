import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import anbuReducer from './anbu';
import candleMonkeysReducer from './candleMonkeys';
import contentReducer from './contentful';
import coronavirusReducer from './coronavirus';
import notificationsReducer from './notifications';
import particleCanvasReducer from './particleCanvas';
import siteSettingsReducer from './siteSettings';

const middlewareConfig = {
  // silences warning for non-serializable data in store,
  // like functions, etc (e.g., notification's onClick)
  serializableCheck: false,
};

const logger = createLogger({
  predicate: (getState, action) => !action.type.includes('__rtkq/focused'),
  collapsed: true,
});

export const reducers = {
  anbu: anbuReducer,
  candleMonkeys: candleMonkeysReducer,
  content: contentReducer,
  coronavirus: coronavirusReducer,
  notifications: notificationsReducer,
  particleCanvas: particleCanvasReducer,
  siteSettings: siteSettingsReducer,
};

export default configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware(middlewareConfig).concat(logger),
  reducer: reducers,
});
