import express from 'express';
import AnbuBlockchainApi from '../api/anbuApi';

/**! - express.Router()
 * Express's Router() method creates a new router object, a sort of
 * "mini-applicaton" capable only of performing middleware and routing
 * functions. This is perfect for defining an application's routes.
 * In this file, we will create a new router object instance and define our
 * Google authentication routes. Then, we export the router, making it
 * available for importing elsewhere in our applcation, which we will then
 * include in our server.js file.
 */
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

router.get('/api/anbu/latestBlock', (req, res) => {
  const response = anbuCoinApi.getLatestBlock();

  res.send(response);
});

router.get('/api/anbu/mineTransactions', (req, res) => {
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

router.get('/api/anbu/updateSettings', (req, res) => {
  const { blockSize, difficulty, miningReward } = req.query;
  const response = anbuCoinApi.updateSettings(blockSize, difficulty, miningReward);

  res.send(response);
});

export default router;
