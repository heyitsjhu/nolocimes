import { STORE_KEYS } from 'const';
import DLError from 'models/DLError';
import { deepClone } from 'utils';

import createStore from '../storeCreator';
import * as TYPES from '../types';

const initialState = {
  [STORE_KEYS.POSTS]: [],
};

const staticState = {
  [STORE_KEYS.POSTS]: [],
};

const reducer = (state, action) => {
  const newState = deepClone(state);

  switch (action.type) {
    case TYPES.FETCH_BLOG_POSTS:
      newState[STORE_KEYS.POSTS] = action.payload;
      break;
    default:
      throw new DLError('Did not find match for reducer action: ' + action.type);
  }

  return newState;
};

const [BlogContext, BlogProvider] = createStore(initialState, reducer, staticState);

export { BlogContext };
export default BlogProvider;
