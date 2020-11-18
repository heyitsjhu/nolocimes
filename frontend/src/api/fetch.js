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
      // check status code, handle errors
      response = await axios.get(uri, { params });

      log.info(`fetchApi ${uri}`, params);
    } catch (error) {
      // do a better handling of api errors.
      response = error;
      log.error(`fetchApi ${uri}`, params);
    }

    return response;
  },
};
export default fetchApi;
