import axios from 'axios';
import log from 'utils/logger';

const fetchApi = {
  /**
   * @param {string} uri - The target api endpoint.
   * @param {Object} params - Parameters to pass through to server.
   * @param {boolean} bypassCheck - If true, force fetch.
   */
  get: async (uri, params, bypassCheck = true) => {
    if (process.env.NODE_ENV === 'development' && !bypassCheck) return null;

    let response;

    try {
      // TODO: check status code, handle errors
      response = await axios.get(uri, { params });

      log.info(
        `%cfetchApi %c[GET] ${uri} %c:params: ${JSON.stringify(params)}`,
        'color: lightblue',
        'color: green',
        'color: orange'
      );
    } catch (error) {
      // TODO: do a better handling of api errors.
      response = error;
      log.error(
        `%cfetchApi %c[GET] ${uri} %c:params: ${JSON.stringify(params)}`,
        'color: lightblue',
        'color: green',
        'color: orange'
      );
    }

    return response;
  },

  post: async (uri, data, bypassCheck = true) => {
    if (process.env.NODE_ENV === 'development' && !bypassCheck) return null;

    let response;

    try {
      // check status code, handle errors
      response = await axios.post(uri, JSON.stringify(data));

      log.info(
        `%cfetchApi %c[POST] ${uri} %c:data: ${JSON.stringify(data)}`,
        'color: lightblue',
        'color: green',
        'color: orange'
      );
    } catch (error) {
      // do a better handling of api errors.
      response = error;
      log.error(
        `%cfetchApi %c[POST] ${uri} %c:data: ${JSON.stringify(data)}`,
        'color: lightblue',
        'color: green',
        'color: orange'
      );
    }

    return response;
  },
};
export default fetchApi;
