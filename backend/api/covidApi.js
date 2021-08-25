// https://www.contentful.com/developers/docs/references/content-delivery-api/#/introduction
import axios from 'axios';
import constants from '../const';
import Logger from '../utils/logger';

export class CovidAPI {
  constructor({ apiKey, host, totalsHost }) {
    this.baseUrl = 'https://' + host;
    this.totalsHost = totalsHost;
    this.totalsHostUrl = 'https://' + totalsHost;
    this.config = {
      baseURL: this.baseUrl,
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': host,
        'x-rapidapi-key': apiKey,
      },
    };
  }

  fetchHandler = async caller => {
    let response = await caller
      .then(resp => {
        Logger.log(resp);

        return resp.data.response ? resp.data.response : resp.data;
      })
      .catch(error =>
        // return an object container error key
        // that's an object with info about the error
        // maybe from where (api vs backend), message,
        // stacktract (if from backend)
        Logger.error('then erropr', error)
      );

    return response;
  };

  // https://rapidapi.com/api-sports/api/covid-193
  getHistoricalData = async (country = 'all', day) => {
    const response = await this.fetchHandler(
      axios.get('/history', {
        ...this.config,
        params: {
          country: country.toLowerCase(),
          day,
        },
      })
    );

    return response;
  };

  getStatisticalData = async country => {
    const params = country ? { country: country.toLowerCase() } : {};
    const response = await this.fetchHandler(axios.get('/statistics', { ...this.config, params }));

    return response;
  };

  // https://rapidapi.com/Gramzivi/api/covid-19-data
  getLatestTotals = async () => {
    const response = await this.fetchHandler(
      axios.get('/totals', {
        ...this.config,
        baseURL: this.totalsHostUrl,
        headers: { ...this.config.headers, 'x-rapidapi-host': this.totalsHost },
      })
    );

    return response;
  };

  getListOfCountries = async () => {
    const response = await this.fetchHandler(
      axios.get('/help/countries', {
        ...this.config,
        baseURL: this.totalsHostUrl,
        headers: { ...this.config.headers, 'x-rapidapi-host': this.totalsHost },
      })
    );

    return response;
  };
}

// export an instance of api class
export default new CovidAPI({
  apiKey: constants.RAPIDAPI_KEY,
  host: constants.RAPIDAPI_COVID_STATS_URL,
  totalsHost: constants.RAPIDAPI_COVID_TOTALS_URL,
});
