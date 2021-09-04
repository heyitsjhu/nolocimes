import { useCallback } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';

import anbuApi from 'api/anbu';
import { STORE_KEYS } from 'const';
import { formatNumber } from 'helpers';
import { formatHash } from 'utils';

import { updateAnbuBlockchain, resetAnbuBlockchain } from 'redux/reducers/anbu';

export const useAnbuService = () => {
  const dispatch = useDispatch();
  const anbuBlockchain = useSelector(state => state.anbu);
  const { account, anbuCoin, consoleOutputs, tutorialOutputs, settings } = anbuBlockchain;

  const initializeAnbuCoin = async (difficulty, miningReward) => {
    await anbuApi.createAnbuBlockchain(difficulty, miningReward);
    await anbuApi.addTransaction(null, account[STORE_KEYS.ADDRESS], 100000);

    const anbuCoin = await anbuApi.getDetails();
    const blockchainInitOutput = {
      message: 'pages.AnbuBlockchain.console.blockchainCreated',
      options: { hashId: formatHash(anbuCoin.chain[0].hash) },
    };
    const latestTransactionOutput = getLatestTransactionOutput(anbuCoin);

    batch(() => {
      dispatch(updateAnbuBlockchain(STORE_KEYS.ANBU_COIN, undefined, undefined, anbuCoin));
      dispatch(
        updateAnbuBlockchain(STORE_KEYS.CONSOLE_OUTPUTS, undefined, undefined, [
          blockchainInitOutput,
          latestTransactionOutput,
        ])
      );
    });

    return anbuCoin;
  };

  const createTransaction = useCallback(
    async (sender, recipient, amount) => {
      const anbuCoin = await anbuApi
        .addTransaction(sender, recipient, amount)
        .then(anbuApi.getDetails);

      dispatch(updateAnbuBlockchain(STORE_KEYS.ANBU_COIN, undefined, undefined, anbuCoin));

      const latestTransactionOutput = getLatestTransactionOutput(anbuCoin);

      if (latestTransactionOutput) {
        dispatch(
          updateAnbuBlockchain(STORE_KEYS.CONSOLE_OUTPUTS, undefined, undefined, [
            ...consoleOutputs,
            latestTransactionOutput,
          ])
        );
      }

      return anbuCoin;
    },
    [anbuBlockchain]
  );

  const getBalanceOfAddress = async address => {
    const account = await anbuApi.getBalanceOfAddress(address);

    dispatch(updateAnbuBlockchain(STORE_KEYS.ACCOUNT, undefined, undefined, account));

    return account;
  };

  const getLatestTransactionOutput = anbuCoin => {
    const transactionsQueue = anbuCoin[STORE_KEYS.TRANSACTIONS_QUEUE];
    const latestTransaction = transactionsQueue[transactionsQueue.length - 1] || null;

    return latestTransaction
      ? {
          message: 'pages.AnbuBlockchain.console.blockchainTransactionPosted',
          options: {
            sender: formatHash(latestTransaction.sender),
            recipient: formatHash(latestTransaction.recipient),
            amount: formatNumber(latestTransaction.amount),
          },
        }
      : {};
  };

  const mineTransactionsQueue = async miningRewardAddress => {
    const timeStart = performance.now();
    const anbuCoin = await anbuApi
      .mineTransactionsQueue(miningRewardAddress)
      .then(anbuApi.getDetails);
    const latestBlock = anbuCoin?.chain[anbuCoin?.chain.length - 1] || null;

    dispatch(updateAnbuBlockchain(STORE_KEYS.ANBU_COIN, undefined, undefined, anbuCoin));

    const timeEnd = performance.now();

    if (latestBlock) {
      const consoleOutput = {
        message: 'pages.AnbuBlockchain.console.blockMined',
        options: {
          duration: formatNumber((timeEnd - timeStart) / 1000),
          hashId: formatHash(latestBlock.hash),
          noOfTransactions: latestBlock.transactions.length,
        },
      };

      dispatch(
        updateAnbuBlockchain(STORE_KEYS.CONSOLE_OUTPUTS, undefined, undefined, [
          ...consoleOutputs,
          consoleOutput,
        ])
      );
    }

    getBalanceOfAddress(account[STORE_KEYS.ADDRESS]);

    return anbuCoin;
  };

  const resetBlockchain = async resetSettings => {
    const anbuCoin = await anbuApi.resetBlockchain();

    dispatch(resetAnbuBlockchain(resetSettings));

    return anbuCoin;
  };

  const updateBlockchainSettings = async (name, value) => {
    const anbuCoin = await anbuApi.updateBlockchainSettings({ name, value });

    batch(() => {
      dispatch(updateAnbuBlockchain(STORE_KEYS.ANBU_COIN, undefined, undefined, anbuCoin));
      dispatch(updateAnbuBlockchain(STORE_KEYS.SETTINGS, name, undefined, value));
    });

    return anbuCoin;
  };

  const updateTutorialProgression = targetStep => {
    if (targetStep > settings[STORE_KEYS.TUTORIAL_MAX_STEP]) return;

    let newTutorialOutputs = [];

    for (let i = settings[STORE_KEYS.TUTORIAL_STEP]; i < targetStep; i++) {
      newTutorialOutputs.push('pages.AnbuBlockchain.tutorial.' + (i + 1));
    }

    if (
      targetStep === settings[STORE_KEYS.TUTORIAL_MAX_STEP] &&
      targetStep - settings[STORE_KEYS.TUTORIAL_STEP] > 1 &&
      anbuCoin.chain.length === 0
    ) {
      initializeAnbuCoin(settings[STORE_KEYS.DIFFICULTY], settings[STORE_KEYS.MINING_REWARD]);
    }

    batch(() => {
      dispatch(
        updateAnbuBlockchain(STORE_KEYS.SETTINGS, undefined, undefined, {
          ...settings,
          [STORE_KEYS.TUTORIAL_COMPLETED]: targetStep >= settings[STORE_KEYS.TUTORIAL_MAX_STEP],
          [STORE_KEYS.TUTORIAL_SKIPPED]:
            targetStep === settings[STORE_KEYS.TUTORIAL_MAX_STEP] &&
            targetStep - settings[STORE_KEYS.TUTORIAL_STEP] > 1,
          [STORE_KEYS.TUTORIAL_STEP]: targetStep,
        })
      );
      dispatch(
        updateAnbuBlockchain(STORE_KEYS.TUTORIAL_OUTPUTS, undefined, undefined, [
          ...tutorialOutputs,
          ...newTutorialOutputs,
        ])
      );
    });
  };

  return {
    createTransaction,
    getBalanceOfAddress,
    initializeAnbuCoin,
    mineTransactionsQueue,
    resetBlockchain,
    updateBlockchainSettings,
    updateTutorialProgression,
  };
};
