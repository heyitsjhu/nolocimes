import { DateTime } from 'luxon';
import { deepClone } from 'utils';

export const COVID_CHART_DATA_LABELS = [
  { key: 'cases_new', label: 'New Cases' },
  { key: 'cases_active', label: 'Active Cases' },
  { key: 'cases_critical', label: 'Critical Cases' },
  { key: 'cases_recovered', label: 'Recovered Cases' },
  { key: 'cases_total', label: 'Total Cases' },
  { key: 'deaths_new', label: 'New Deaths' },
  { key: 'deaths_total', label: 'Total Deaths' },
  { key: 'tests_total', label: 'Total Tests' },
];

// Merges Covid-19 historical data for an array of countries into the
// reducer's coronavirus history object for amCharts ingestion. Also, pushes
// the country into a _retrievedCountries property for easier reference
export const convertCovidHistoricalData = (existingData, countriesData) => {
  const newState = existingData ? deepClone(existingData) : {}; // need initial state with keys??
  const stateKeys = Object.keys(existingData).filter(key => key !== '_retrievedCountries');

  countriesData.forEach(countryData => {
    if (countryData.length === 0) return;

    // TODO need a better way to handle updates of differing data points (ie new data points)
    // if (newState._retrievedCountries.includes(countryData[0].country)) return;

    // track which countries we already fetched data for.
    newState._retrievedCountries.push(countryData[0].country);

    countryData.reduce(getEndOfDayStatisticsOnly, []).forEach(dataPoint => {
      const { country, day, time } = dataPoint;

      stateKeys.forEach(stateKey => {
        const keys = stateKey.split(/_(.+)/);
        const value = stateKey === 'population' ? dataPoint[stateKey] : dataPoint[keys[0]][keys[1]];
        const existingDataPointIdx = newState[stateKey].findIndex(d => d.day === dataPoint.day);

        // If given date already has recorded data, add country's data to it; otherwise, create new entry for the current date
        if (existingDataPointIdx > -1) {
          newState[stateKey][existingDataPointIdx][country] = value;
        } else {
          newState[stateKey].push({ [country]: value, day, time });
        }

        // Sort the collection by date (most recent first)
        newState[stateKey].sort((a, b) => DateTime.fromISO(b.day) - DateTime.fromISO(a.day));
      });
    });
  });

  return newState;
};

// Given a country's historical data set, pushes the end of day, or latest, data for each day into, and returns, the accumulated array.
const getEndOfDayStatisticsOnly = (accItem, currItem) => {
  const hasEntry = accItem.find(item => item.day === currItem.day);
  if (!accItem.length || !hasEntry) {
    accItem.push(currItem);
  }

  return accItem;
};

// Converts Covid-19 historical data into a format for amCharts ingestion, based on the
// available, retrieved data
export const convertCovidHistoricalDataForAmcharts = (historicalData = [], countries = []) => {
  const replaceRegex = new RegExp(/-/, 'gi');
  const dataKeys = Object.keys(historicalData).filter(key => key !== '_retrievedCountries');

  return historicalData._retrievedCountries
    .map(country => {
      const countryName = country.replace(replaceRegex, ' ');
      const countryData = countries.find(countryItem => countryItem.name === countryName);
      const countryStatistics = {
        id: countryData ? countryData.alpha2code : undefined,
        name: countryName,
      };

      dataKeys.forEach((dataKey, index) => {
        // zero index gets most recent data point
        // TODO: allow users to adjust a slider to change via day or time
        const data = historicalData[dataKey][0];
        if (index === 0) {
          countryStatistics.day = data.day;
          countryStatistics.time = data.time;
        }

        countryStatistics[dataKey] = data[country];
      });

      return countryStatistics;
    })
    .filter(dataItem => typeof dataItem.id !== 'undefined');
};

// Converts Covid-19 statistics data for amCharts ingestion.
export const convertCovidStatisticsDataForAmcharts = (statisticsData = [], countries = []) => {
  const replaceRegex = new RegExp(/-/, 'gi');

  return statisticsData
    .map(({ country, cases, deaths, tests, day, time }) => {
      const countryName = country.replace(replaceRegex, ' ');
      const countryData = countries.find(countryItem => countryItem.name === countryName);

      return {
        id: countryData ? countryData.alpha2code : undefined,
        name: countryName,
        cases_new: cases.new,
        cases_active: cases.active,
        cases_critical: cases.critical,
        cases_recovered: cases.recovered,
        cases_total: cases.total,
        deaths_new: deaths.new,
        deaths_total: deaths.total,
        tests_total: tests.total,
        day,
        time,
      };
    })
    .filter(dataItem => typeof dataItem.id !== 'undefined');
};
