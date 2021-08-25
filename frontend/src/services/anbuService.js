import { useSelector, useDispatch } from 'react-redux';

import anbuApi from 'api/anbu';
import { STORE_KEYS } from 'const';

import { updateAnbuBlockchain, resetAnbuBlockchain } from 'redux/reducers/anbu';

export const useAnbuService = () => {
  const dispatch = useDispatch();
  const anbu = useSelector(state => state.anbu);

  const initializeAnbuCoin = async (difficulty, miningReward) => {
    const anbuCoin = await anbuApi.createAnbuBlockchain(difficulty, miningReward);

    dispatch(updateAnbuBlockchain(STORE_KEYS.ANBU_COIN, undefined, undefined, anbuCoin));

    return anbuCoin;
  };

  const getBalanceOfAddress = async address => {
    const account = await anbuApi.getBalanceOfAddress(address);

    dispatch(updateAnbuBlockchain(STORE_KEYS.ACCOUNT, undefined, undefined, account));

    return account;
  };

  const createTransaction = async (sender, recipient, amount) => {
    const anbuCoin = await anbuApi
      .addTransaction(sender, recipient, amount)
      .then(anbuApi.getDetails);

    dispatch(updateAnbuBlockchain(STORE_KEYS.ANBU_COIN, undefined, undefined, anbuCoin));

    return anbuCoin;
  };

  const mineTransactionsQueue = async miningRewardAddress => {
    const anbuCoin = await anbuApi
      .mineTransactionsQueue(miningRewardAddress)
      .then(anbuApi.getDetails);

    dispatch(updateAnbuBlockchain(STORE_KEYS.ANBU_COIN, undefined, undefined, anbuCoin));

    return anbuCoin;
  };

  const resetBlockchain = async () => {
    const anbuCoin = await anbuApi.resetBlockchain();

    dispatch(resetAnbuBlockchain());

    return anbuCoin;
  };

  const setCurrentStep = step => {
    dispatch(updateAnbuBlockchain(STORE_KEYS.SETTINGS, STORE_KEYS.CURRENT_STEP, undefined, step));

    return step;
  };
  const updateBlockchainSettings = async settings => {
    const anbuCoin = await anbuApi.updateBlockchainSettings(settings);

    dispatch(updateAnbuBlockchain(STORE_KEYS.ANBU_COIN, undefined, undefined, anbuCoin));

    return anbuCoin;
  };

  return {
    initializeAnbuCoin,
    getBalanceOfAddress,
    createTransaction,
    mineTransactionsQueue,
    resetBlockchain,
    updateBlockchainSettings,
    setCurrentStep,
  };
};
