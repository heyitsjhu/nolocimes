import React from 'react';
import { FormatNumber } from 'components';

const getStatsComponent = (key, value) => {
  if (['beta', 'peRatio', 'pegRatio', 'forwardPERatio'].includes(key)) {
    return value.toFixed(1);
  } else if (['priceToSales', 'priceToBook'].includes(key)) {
    return value.toFixed(2);
  } else if (['dividendYield'].includes(key)) {
    return <FormatNumber percentage value={value} />;
  } else if (['enterpriseValue', 'marketcap'].includes(key)) {
    return <FormatNumber value={value} format="0.00a" />;
  } else if (['ytdChangePercent'].includes(key)) {
    return <FormatNumber percentage value={value} />;
  } else if (['sharesOutstanding'].includes(key)) {
    return <FormatNumber value={value} format="0.0a" />;
  } else {
    return value;
  }
};

export const statsExtractor = (data, statKeys) => {
  let stats = {};

  statKeys.map(statKey => {
    stats[statKey] = getStatsComponent(statKey, data[statKey]);
  });

  return stats;
};

export const extractQuickStats = keyStats => {
  const { beta, dividendYield, marketcap, peRatio, sharesOutstanding, ytdChangePercent } = keyStats;

  return {
    peRatio: peRatio.toFixed(1),
    dividendYield: <FormatNumber percentage value={dividendYield} />,
    beta,
    marketcap: <FormatNumber value={marketcap} format="0.0a" />,
    ytdChangePercent: <FormatNumber percentage value={ytdChangePercent} />,
    sharesOutstanding: <FormatNumber value={sharesOutstanding} format="0.0a" />,
  };
};

export const getTableRowLabels = tableType => {
  if (tableType === 'balancesheet') {
    return {
      assets: {
        firstLevel: [
          'currentCash',
          'inventory',
          'receivables',
          'currentAssets',
          'propertyPlantEquipment',
          'goodwill',
          'otherAssets',
        ],
        total: 'totalAssets',
      },
      liabilities: ['accountsPayable', ''],
    };
  }
};
