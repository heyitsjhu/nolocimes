import C19Api from 'api/covid';
import { STORE_KEYS } from 'const';
import { convertCovidHistoricalData } from 'utils/dataHandlers';
import Logger from 'utils/logger';

import * as TYPES from '../types';

export const updateCoronavirusState = (firstLevelKey, secondLevelKey, payload) => {
  return { type: TYPES.UPDATE_APP_STATE, firstLevelKey, secondLevelKey, payload };
};

export const fetchC19Countries = async () => {
  const resp = await C19Api.getCountries();

  return updateCoronavirusState(STORE_KEYS.CORONAVIRUS, STORE_KEYS.COUNTRIES, resp);
};

export const fetchC19History = async country => {
  const data = await C19Api.getHistory(country);

  return updateCoronavirusState(STORE_KEYS.CORONAVIRUS, STORE_KEYS.HISTORY, data);
};

export const fetchC19Statistics = async () => {
  const resp = await C19Api.getStatistics();

  return updateCoronavirusState(STORE_KEYS.CORONAVIRUS, STORE_KEYS.STATISTICS, resp);
};

export const getInitialC19Data = async (state, dispatch) => {
  dispatch(updateCoronavirusState(STORE_KEYS.CORONAVIRUS, STORE_KEYS.IS_LOADING, true));

  try {
    const { selectedCountries } = state.controlPanel;

    const history = await Promise.all(
      selectedCountries.map(async country => await C19Api.getHistory(country))
    ).then(response => convertCovidHistoricalData(state.history, response));

    // fetchC19Countries().then(dispatch);

    dispatch(updateCoronavirusState(STORE_KEYS.CORONAVIRUS, STORE_KEYS.HISTORY, history));
  } catch (e) {
    // sdfds
  }

  dispatch(updateCoronavirusState(STORE_KEYS.CORONAVIRUS, STORE_KEYS.IS_LOADING, false));
};

// export const fetchCovidCountriesData = async () => {
//   try {
//     const resp = await C19Api.getCountries();

//     // const assets = resp.data.items;
//     return { type: TYPES.FETCH_COVID_COUNTRIES_DATA, key: STORE_KEYS.COUNTRIES, resp };
//   } catch (error) {
//     Logger.error(error);
//   }
// };

// export const updateCoronavirusSettings = async contentState => {
//   try {
//     // let assets;
//     // const images = assets.filter(asset => imageTypes.includes(asset.fields.file.contentType));
//     // return { type: TYPES.UPDATE_CORONAVIRUS_SETTING, key, payload };
//   } catch (error) {
//     Logger.error(error);
//   }
// };
