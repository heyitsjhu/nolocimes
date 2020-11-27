import { STORE_KEYS } from 'const';
import DLError from 'models/DLError';
import { deepClone } from 'utils';

import createStore from '../storeCreator';
import * as TYPES from '../types';

const initialState = {
  [STORE_KEYS.ASSETS]: [],
  [STORE_KEYS.IMAGES]: [],
  [STORE_KEYS.POSTS]: [],
};

const staticState = {
  [STORE_KEYS.ASSETS]: [],
  [STORE_KEYS.IMAGES]: [],
  [STORE_KEYS.POSTS]: [],
};

const reducer = (state, action) => {
  const newState = deepClone(state);

  switch (action.type) {
    case TYPES.FETCH_CONTENT_ASSETS:
      newState[STORE_KEYS.ASSETS] = action.payload;
      break;
    case TYPES.FETCH_CONTENT_POSTS:
      newState[STORE_KEYS.POSTS] = action.payload;
      break;
    case TYPES.FETCH_CONTENT_IMAGES:
      newState[STORE_KEYS.IMAGES] = action.payload;
      break;
    default:
      throw new DLError('Did not find match for reducer action: ' + action.type);
  }

  return newState;
};

const [ContentContext, ContentProvider] = createStore(initialState, reducer, staticState);

export { ContentContext };
export default ContentProvider;
