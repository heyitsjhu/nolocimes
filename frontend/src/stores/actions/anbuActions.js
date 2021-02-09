import anbuApi from 'api/anbu';
import { STORE_KEYS } from 'const';
import Logger from 'utils/logger';
import * as TYPES from '../types';

export const updateAnbuState = (secondLevelKey, thirdLevelKey, payload) => {
  return {
    type: TYPES.UPDATE_APP_STATE,
    firstLevelKey: STORE_KEYS.ANBU_BLOCKCHAIN,
    secondLevelKey,
    thirdLevelKey,
    payload,
  };
};

export const initializeAnbuCoin = async (difficulty, miningReward) => {
  const anbuCoin = await anbuApi.createAnbuBlockchain(difficulty, miningReward);

  return updateAnbuState(STORE_KEYS.ANBU_COIN, undefined, anbuCoin);
};

export const getBalanceOfAddress = async address => {
  const account = await anbuApi.getBalanceOfAddress(address);

  return updateAnbuState(STORE_KEYS.ACCOUNT, undefined, account);
};

export const createTransaction = async (sender, recipient, amount) => {
  const anbuCoin = await anbuApi.addTransaction(sender, recipient, amount).then(anbuApi.getDetails);

  return updateAnbuState(STORE_KEYS.ANBU_COIN, undefined, anbuCoin);
};

export const mineTransactionsQueue = async miningRewardAddress => {
  const anbuCoin = await anbuApi
    .mineTransactionsQueue(miningRewardAddress)
    .then(anbuApi.getDetails);

  return updateAnbuState(STORE_KEYS.ANBU_COIN, undefined, anbuCoin);
};

export const resetBlockchain = async () => {
  const anbuCoin = await anbuApi.resetBlockchain();

  return updateAnbuState(STORE_KEYS.ANBU_COIN, undefined, STORE_KEYS.RESET);
};

export const updateBlockchainSettings = async settings => {
  const anbuCoin = await anbuApi.updateBlockchainSettings(settings);

  console.log('updateBlockchainSettings', anbuCoin);

  return updateAnbuState(STORE_KEYS.ANBU_COIN, undefined, anbuCoin);
};

export const setCurrentStep = step => {
  return updateAnbuState(STORE_KEYS.SETTINGS, STORE_KEYS.CURRENT_STEP, step);
};
