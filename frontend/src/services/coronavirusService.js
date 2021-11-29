import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import coronavirusApi from 'api/coronavirus';
import { STORE_KEYS } from 'const';
import { updateCoronavirus } from 'redux/reducers/coronavirus';
import Logger from 'utils/logger';

export const useCoronavirusService = () => {
  const dispatch = useDispatch();
  const coronavirus = useSelector(state => state.coronavirus);

  const getLatestTotals = async () => {
    try {
      const latestTotals = await coronavirusApi.getLatestTotals();

      dispatch(updateCoronavirus(STORE_KEYS.LATEST_TOTALS, null, null, latestTotals));
    } catch (error) {
      Logger.error(error);
    }
  };

  const getListOfCountries = async () => {
    try {
      const countries = await coronavirusApi.getListOfCountries();

      dispatch(updateCoronavirus(STORE_KEYS.COUNTRIES, null, null, countries));
    } catch (error) {
      Logger.error(error);
    }
  };

  const getStatisticalData = async () => {
    try {
      const statistics = await coronavirusApi.getStatisticalData();

      dispatch(updateCoronavirus(STORE_KEYS.STATISTICS, null, null, statistics));
    } catch (error) {
      Logger.error(error);
    }
  };

  const getInitialData = () => {
    if (coronavirus[STORE_KEYS.COUNTRIES].length === 0) {
      getListOfCountries();
    }
    if (coronavirus[STORE_KEYS.STATISTICS].length === 0) {
      getStatisticalData();
    }
    if (coronavirus[STORE_KEYS.LATEST_TOTALS].length === 0) {
      getLatestTotals();
    }
  };

  useEffect(() => {
    console.log('initial load?');
    getInitialData();
  }, []);

  // TODO: update with refetch Fns
  return { getInitialData, getLatestTotals, getListOfCountries, getStatisticalData };
};
