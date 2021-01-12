// https://www.contentful.com/developers/docs/references/content-delivery-api/#/introduction
import axios from 'axios';

import constants from '../const';
import Logger from '../utils/logger';

export class CovidAPI {
  constructor({ apiKey, countryListHost, host }) {
    this.baseUrl = 'https://' + host;
    this.countryListHost = countryListHost;
    this.countryListUrl = 'https://' + countryListHost;
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

        return resp.data.response;
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
  getCountries = async () => {
    const response = await this.fetchHandler(axios.get('/countries', { ...this.config }));

    return response;
  };

  getHistory = async (country = 'all', day) => {
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

  getStatistics = async (country = 'china') => {
    const response = await this.fetchHandler(
      axios.get('/statistics', { ...this.config, params: { country } })
    );

    return response;
  };

  // https://rapidapi.com/Gramzivi/api/covid-19-data
  getListOfCountries = async () => {
    const response = await this.fetchHandler(
      axios.get('/help/countries', {
        ...this.config,
        baseURL: this.countryListUrl,
        headers: { ...this.config.headers, 'x-rapidapi-host': this.countryListHost },
      })
    );

    return response;
  };
}

// export an instance of api class
export default new CovidAPI({
  apiKey: constants.RAPIDAPI_KEY,
  countryListHost: constants.RAPIDAPI_COVID_COUNTRY_LIST_URL,
  host: constants.RAPIDAPI_COVID_DATA_URL,
});
