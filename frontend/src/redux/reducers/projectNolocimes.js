import { LOCAL_STORAGE_NOLOCIMES_KEY, STORE_KEYS } from 'const';
import setNextState from '../setNextState';

const initialState = {
  [STORE_KEYS.GAME_STARTED]: false,
};

export const UPDATE_PROJECT_NOLOCIMES = 'UPDATE_PROJECT_NOLOCIMES';

export const updateProjectNolocimes = (firstLevel, secondLevel, thirdLevel, payload) => {
  return { type: UPDATE_PROJECT_NOLOCIMES, firstLevel, secondLevel, thirdLevel, payload };
};

export default (state = initialState || {}, action) => {
  let newState = state;

  switch (action.type) {
    case UPDATE_PROJECT_NOLOCIMES:
      newState = setNextState(newState, action);

      localStorage.setItem(LOCAL_STORAGE_NOLOCIMES_KEY, JSON.stringify(newState));
      break;
    default:
      break;
  }

  return newState;
};
