import express from 'express';
import AnbuBlockchainApi from '../api/anbuApi';

const router = express.Router();
let anbuCoinApi;

router.get('/api/anbu/balance', (req, res) => {
  const { address } = req.query;
  const response = anbuCoinApi.getBalanceOfAddress(address);

  res.send(response);
});

router.get('/api/anbu/create', (req, res) => {
  const { difficulty, miningReward } = req.query;
  anbuCoinApi = new AnbuBlockchainApi({ difficulty, miningReward });

  const response = anbuCoinApi.getDetails();

  res.send(response);
});

router.get('/api/anbu/details', (req, res) => {
  const response = anbuCoinApi.getDetails();

  res.send(response);
});

router.get('/api/anbu/latest-block', (req, res) => {
  const response = anbuCoinApi.getLatestBlock();

  res.send(response);
});

router.get('/api/anbu/mine-transactions', (req, res) => {
  const { miningRewardAddress } = req.query;
  const response = anbuCoinApi.mineTransactionsQueue(miningRewardAddress);

  res.send(response);
});

// TODO update to use post correctly. body not coming through from frontend
router.get('/api/anbu/transaction', (req, res) => {
  const { sender, recipient, amount } = req.query;
  const response = anbuCoinApi.createTransaction(sender, recipient, +amount);

  res.send(response);
});

router.get('/api/anbu/reset', (req, res) => {
  anbuCoinApi = undefined;

  res.send({ success: true });
});

router.get('/api/anbu/update-settings', (req, res) => {
  const { name, value } = req.query;
  const response = anbuCoinApi.updateSettings(name, value);

  res.send(response);
});

export default router;
