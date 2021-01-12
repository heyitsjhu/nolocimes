import express from 'express';
import covidApi from '../api/covidApi';

const router = express.Router();

router.get('/api/covid/countries', async (req, res) => {
  const response = await covidApi.getCountries();

  res.send(response);
});

router.get('/api/covid/history', async (req, res) => {
  const { country, day } = req.query;
  const response = await covidApi.getHistory(country, day);

  res.send(response);
});

router.get('/api/covid/statistics', async (req, res) => {
  const { country } = req.query;

  const response = await covidApi.getHistory(country);

  res.send(response);
});

router.get('/api/covid/countryList', async (req, res) => {
  const response = await covidApi.getListOfCountries();

  res.send(response);
});

export default router;
