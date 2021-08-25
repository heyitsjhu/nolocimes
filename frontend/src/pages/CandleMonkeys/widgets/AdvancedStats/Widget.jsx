import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { TextPairing } from 'components';
import { STORE_KEYS } from 'const';
import * as CompanyHelpers from 'helpers/companyHelpers';
import { useCopy } from 'hooks/useCopy';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > div': {
      width: '50%',
    },
  },
  listItem: {},
}));

const DEFAULT_SELECTED_STATS = [
  'beta',
  'marketcap',
  'peRatio',
  'pegRatio',
  'forwardPERatio',
  'priceToSales',
  'priceToBook',
  'enterpriseValue',
];

export default props => {
  const { t } = useCopy();
  const classes = useStyles();
  const candleMonkeys = useSelector(state => state.candleMonkeys);
  const stockState = candleMonkeys[STORE_KEYS.STOCK_DATA];
  const [selectedStats, setSelectedStats] = useState(DEFAULT_SELECTED_STATS);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const stats = CompanyHelpers.statsExtractor(stockState.advancedStats, selectedStats);
    setStats(stats);
  }, [selectedStats]);

  return (
    <Box className={classes.container}>
      {Object.keys(stats).map(statKey => (
        <TextPairing
          key={statKey}
          heading={t(`pages.CandleMonkeys.${statKey}`)}
          text={stats[statKey]}
        />
      ))}
    </Box>
  );
};
