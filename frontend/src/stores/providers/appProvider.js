import { STORE_KEYS } from 'const';
import DLError from 'models/DLError';
import { deepClone } from 'utils';

import createStore from '../storeCreator';
import * as TYPES from '../types';

const initialState = {
  test: 'hidldsajfkl',
  [STORE_KEYS.SPLASH_LOGO]: { started: false, playing: false, finished: false },
};

const staticState = {
  test: 'im static',
  [STORE_KEYS.SPLASH_LOGO]: { started: false, playing: false, finished: false },
};

const reducer = (state, action) => {
  const newState = deepClone(state);

  switch (action.type) {
    case 'SET_LOADING':
      newState[action.key].loading = action.payload;
      break;
    case 'UPDATE_STORE':
      if (!action.outerKey || !action.innerKey) return state;
      newState[action.outerKey] = {
        ...newState[action.outerKey],
        [action.innerKey]: action.payload,
      };
      break;
    case TYPES.UPDATE_SPLASH_LOGO:
      if (action.payload === 'start') {
        newState.splashLogo = {
          ...newState.splashLogo,
          started: true,
          playing: true,
        };
      } else if (action.payload === 'finish') {
        newState.splashLogo = {
          started: false,
          playing: false,
          finished: true,
        };
      }
      break;
    default:
      throw new DLError('Did not find match for reducer action: ' + action.type);
  }

  return newState;
};

const [AppContext, AppProvider] = createStore(initialState, reducer, staticState);

export { AppContext };
export default AppProvider;
