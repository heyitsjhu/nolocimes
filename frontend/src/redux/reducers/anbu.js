import { ANBU_SAMPLE_USER, STORE_KEYS } from 'const';
import { deepClone } from 'utils';

import setNextState from '../setNextState';

const initialState = {
  [STORE_KEYS.ACCOUNT]: {
    [STORE_KEYS.ADDRESS]: ANBU_SAMPLE_USER,
    [STORE_KEYS.BALANCE]: 0,
  },
  [STORE_KEYS.ANBU_COIN]: {
    [STORE_KEYS.BLOCK_TRANSACTION_LIMIT]: 2,
    [STORE_KEYS.CHAIN]: [],
    [STORE_KEYS.DIFFICULTY]: 1,
    [STORE_KEYS.TRANSACTIONS_QUEUE]: [],
    [STORE_KEYS.MINING_REWARD]: 100,
  },
  [STORE_KEYS.CONSOLE_OUTPUTS]: [],
  [STORE_KEYS.TUTORIAL_OUTPUTS]: ['pages.AnbuBlockchain.tutorial.1'],
  [STORE_KEYS.SETTINGS]: {
    [STORE_KEYS.BLOCK_TRANSACTION_LIMIT]: 2,
    [STORE_KEYS.DIFFICULTY]: 1,
    [STORE_KEYS.MINING_REWARD]: 100,
    [STORE_KEYS.TUTORIAL_COMPLETED]: false,
    [STORE_KEYS.TUTORIAL_STEP]: 1,
    [STORE_KEYS.TUTORIAL_SKIPPED]: false,
    [STORE_KEYS.TUTORIAL_MAX_STEP]: 8,
  },
};

export const UPDATE_ANBU_BLOCKCHAIN = 'UPDATE_ANBU_BLOCKCHAIN';
export const RESET_ANBU_BLOCKCHAIN = 'RESET_ANBU_BLOCKCHAIN';

export const updateAnbuBlockchain = (firstLevel, secondLevel, thirdLevel, payload) => {
  return { type: UPDATE_ANBU_BLOCKCHAIN, firstLevel, secondLevel, thirdLevel, payload };
};

export const resetAnbuBlockchain = (resetSettings = false) => {
  return { type: RESET_ANBU_BLOCKCHAIN, resetSettings };
};

export default (state = initialState, action) => {
  let newState = deepClone(state);

  switch (action.type) {
    case UPDATE_ANBU_BLOCKCHAIN:
      newState = setNextState(newState, action);
      break;
    case RESET_ANBU_BLOCKCHAIN:
      newState = {
        ...state,
        [STORE_KEYS.ACCOUNT]: initialState[STORE_KEYS.ACCOUNT],
        [STORE_KEYS.ANBU_COIN]: initialState[STORE_KEYS.ANBU_COIN],
        [STORE_KEYS.CONSOLE_OUTPUTS]: [
          {
            message: 'pages.AnbuBlockchain.console.blockchainResetted',
            options: {},
          },
        ],
        [STORE_KEYS.SETTINGS]: action.resetSettings
          ? initialState[STORE_KEYS.SETTINGS]
          : {
              ...state[STORE_KEYS.SETTINGS],
              [STORE_KEYS.BLOCK_TRANSACTION_LIMIT]:
                initialState[STORE_KEYS.SETTINGS][STORE_KEYS.BLOCK_TRANSACTION_LIMIT],
              [STORE_KEYS.DIFFICULTY]: initialState.settings[STORE_KEYS.DIFFICULTY],
              [STORE_KEYS.MINING_REWARD]: initialState.settings[STORE_KEYS.MINING_REWARD],
            },
      };
      break;
    default:
      break;
  }

  return newState;
};
