import express from 'express';

import contentfulApi from '../api/contentfulApi';

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

// get content type
router.get('/api/contentful/contentType', async (req, res) => {
  const { id } = req.query;
  const response = await contentfulApi.getContentType(id);

  res.send(response);
});

// get entries
router.get('/api/contentful/entries', async (req, res) => {
  const { query } = req.query;
  const response = await contentfulApi.getEntries(query);

  res.send(response);
});

export default router;
