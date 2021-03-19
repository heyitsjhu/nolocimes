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
export const convertCovidHistoricalData = (existingData, countryData) => {
  const newState = existingData ? deepClone(existingData) : {};
  const stateKeys = Object.keys(existingData).filter(key => key !== '_retrievedCountries');

  if (newState._retrievedCountries.includes(countryData[0].country)) return;
  if (countryData.length > 0) {
    // just tracks which countries we've fetched data for already.
    newState._retrievedCountries.push(countryData[0].country);
  }

  countryData.reduce(getEndOfDayStatistic, []).forEach(dataPoint => {
    const country = dataPoint.country;

    stateKeys.forEach(stateKey => {
      const keys = stateKey.split(/_(.+)/);
      // const daysData = newState[stateKey].find(({ day }) => day === metadata.day);
      const existingDataPointIdx = newState[stateKey].findIndex(d => d.day === dataPoint.day);
      if (existingDataPointIdx > -1) {
        newState[stateKey][existingDataPointIdx][country] =
          stateKey === 'population' ? dataPoint[stateKey] : dataPoint[keys[0]][keys[1]];
      } else {
        newState[stateKey].push({
          [country]: stateKey === 'population' ? dataPoint[stateKey] : dataPoint[keys[0]][keys[1]],
          day: dataPoint.day,
          time: dataPoint.time,
        });
      }
    });
  });

  return newState;
};

// Given a country's historical data set, pushes the end of day, or latest, data for each day into, and returns, the accumulated array.
const getEndOfDayStatistic = (accItem, currItem) => {
  const hasEntry = accItem.find(item => item.day === currItem.day);
  if (!accItem.length || !hasEntry) {
    accItem.push(currItem);
  }
  return accItem;
};

// Converts Covid-19 statistics data for amCharts ingestion.
export const convertCovidStatisticsData = data => {
  const replaceRegex = new RegExp(/-/, 'gi');

  return data.statistics
    .map(({ country, cases, deaths, tests, day, time }) => {
      const countryName = country.replace(replaceRegex, ' ');
      const countryData = data.countries.find(countryItem => countryItem.name === countryName);

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
