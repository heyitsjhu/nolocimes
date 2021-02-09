import fetchApi from './fetch';

class AnbuAPI {
  addTransaction = async (sender, recipient, amount) => {
    const response = await fetchApi.get('/api/anbu/transaction', {
      sender,
      recipient,
      amount,
    });

    return response;
  };

  createAnbuBlockchain = async (difficulty, miningReward) => {
    const response = await fetchApi.get('/api/anbu/create', { difficulty, miningReward });

    return response.data;
  };

  getBalanceOfAddress = async address => {
    const response = await fetchApi.get('/api/anbu/balance', { address });

    return response.data;
  };

  getLatestBlock = async () => {
    const response = await fetchApi.get('/api/anbu/latestBlock');

    return response.data;
  };

  getDetails = async () => {
    const response = await fetchApi.get('/api/anbu/details');

    return response.data;
  };

  getLatestBlock = async () => {
    const response = await fetchApi.get('/api/anbu/latestBlock');

    return response.data;
  };

  mineTransactionsQueue = async miningRewardAddress => {
    const response = await fetchApi.get('/api/anbu/mineTransactions', { miningRewardAddress });

    return response.data;
  };

  resetBlockchain = async () => {
    const response = await fetchApi.get('/api/anbu/reset');

    return response.data;
  };

  updateBlockchainSettings = async ({ blockSize, difficulty, miningReward }) => {
    const response = await fetchApi.get('/api/anbu/updateSettings', {
      blockSize,
      difficulty,
      miningReward,
    });

    return response.data;
  };
}

export default new AnbuAPI();
