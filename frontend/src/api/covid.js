import fetchApi from './fetch';

class CovidAPI {
  getCountries = async () => {
    const response = await fetchApi.get('/api/covid/countries');

    return response.data;
  };

  getHistory = async (country = 'all', day) => {
    const response = await fetchApi.get('/api/covid/history', { country, day });

    return response.data;
  };

  getStatistics = async country => {
    const response = await fetchApi.get('/api/covid/statistics', { country });

    return response.data;
  };

  getListOfCountries = async () => {
    const response = await fetchApi.get('/api/covid/countryList');

    return response;
  };
}

export default new CovidAPI();
