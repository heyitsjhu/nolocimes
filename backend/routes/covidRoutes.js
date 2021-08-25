import express from 'express';
import covidApi from '../api/covidApi';

const router = express.Router();

router.get('/api/c19/statistical-data', async (req, res) => {
  const { country } = req.query;
  const response = await covidApi.getStatisticalData(country);

  res.send(response);
});

router.get('/api/c19/historical-data', async (req, res) => {
  const { country, day } = req.query;
  const response = await covidApi.getHistoricalData(country, day);

  res.send(response);
});

router.get('/api/c19/latest-totals', async (req, res) => {
  const response = await covidApi.getLatestTotals();

  res.send(response);
});

router.get('/api/c19/country-list', async (req, res) => {
  const response = await covidApi.getListOfCountries();

  res.send(response);
});

export default router;
