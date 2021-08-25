import fetchApi from './fetch';

class CovidAPI {
  getHistoricalData = async (country = 'all', day) => {
    const response = await fetchApi.get('/api/c19/historical-data', { country, day });

    return response.data;
  };

  getStatisticalData = async country => {
    const response = await fetchApi.get('/api/c19/statistical-data', { country });

    return response.data;
  };

  getLatestTotals = async () => {
    const response = await fetchApi.get('/api/c19/latest-totals');

    return response.data;
  };

  getListOfCountries = async () => {
    const response = await fetchApi.get('/api/c19/country-list');

    return response.data;
  };
}

export default new CovidAPI();
