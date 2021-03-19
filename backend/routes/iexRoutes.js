import express from 'express';

import iexApi from '../api/iexCloudApi';
import Logger from '../utils/logger';

/**! - express.Router()
 * Express's Router() method creates a new router object, a sort of
 * "mini-applicaton" capable only of performing middleware and routing
 * functions. This is perfect for defining an application's routes.
 * In this file, we will create a new router object instance and define our
 * Google authentication routes. Then, we export the router, making it
 * available for importing elsewhere in our applcation, which we will then
 * include in our index.js file.
 */
const router = express.Router();

/**!
 * Retrieves the user from the request and sends it back as a response.
 * If there is no user, then the response will be false.
 */
router.get('/api/iexcloud', async (req, res) => {
  const { queryType, ticker, options } = req.query;
  try {
    const response = await iexApi.get(queryType, {
      ticker,
      ...JSON.parse(options),
    });

    console.log('EHEHEHE', queryType, response);

    res.send(response.data);
  } catch (error) {
    Logger.error('iexApi', error);
    res.send({ error });
  }
});

router.get('/api/iexcloud/batch', async (req, res) => {
  const { queryType, ticker, options } = req.query;

  try {
    const response = await iexApi.get(queryType, {
      ticker,
      ...JSON.parse(options),
    });

    console.log(response);

    res.send(ticker, options, response.data);
  } catch (error) {
    // Logger.error('iexApi -----', error.response);
    res.send({ error });
  }
});

router.get('/api/iexcloud/search', async (req, res) => {
  const { ticker } = req.query;

  try {
    const response = await iexApi.get('searchSuggestions', {
      fragment: ticker,
    });

    // Logger.info('iexApi ----- ', ticker, response);
    res.send(response.data);
  } catch (error) {
    Logger.error('iexApi ----- ', ticker, error.response);
    res.send({ error });
  }
});

export default router;

// @TODO - need proper error handling and sending of error messages back to frontend

/**
 * Returns an array of endpoints.
 * @param {*} requestArray An array of requests (e.g., ['stockQuote', 'stockNews', 'stockOHLC'])
 * @returns An array of endpoints (e.g., ['quote', 'news', 'ohlc'])
 */
const getMappedRequests = requestArray => {
  return requestArray.map(request => request.replace('stock', '').toLowerCase());
};
