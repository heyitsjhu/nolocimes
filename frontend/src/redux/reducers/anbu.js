import { ANBU_SAMPLE_USER, STORE_KEYS } from 'const';
import { deepClone } from 'utils';

import setNextState from '../setNextState';

const initialState = {
  [STORE_KEYS.ACCOUNT]: { [STORE_KEYS.ADDRESS]: ANBU_SAMPLE_USER, [STORE_KEYS.BALANCE]: 0 },
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
    [STORE_KEYS.NARRATIVE_MAX_STEP]: 6,
    [STORE_KEYS.NARRATIVE_STEP]: 0,
    [STORE_KEYS.SKIP_TUTORIAL]: false,
    [STORE_KEYS.TUTORIAL_COMPLETED]: false,
  },
};

export const UPDATE_ANBU_BLOCKCHAIN = 'UPDATE_ANBU_BLOCKCHAIN';
export const RESET_ANBU_BLOCKCHAIN = 'RESET_ANBU_BLOCKCHAIN';

export const updateAnbuBlockchain = (firstLevel, secondLevel, thirdLevel, payload) => {
  return { type: UPDATE_ANBU_BLOCKCHAIN, firstLevel, secondLevel, thirdLevel, payload };
};

export const resetAnbuBlockchain = () => {
  return { type: RESET_ANBU_BLOCKCHAIN };
};

export default (state = initialState, action) => {
  let newState = deepClone(state);

  switch (action.type) {
    case UPDATE_ANBU_BLOCKCHAIN:
      newState = setNextState(newState, action);
      break;
    case RESET_ANBU_BLOCKCHAIN:
      newState = initialState;
      break;
    default:
      break;
  }

  return newState;
};
