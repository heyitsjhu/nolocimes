import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import { RangeBarChart } from 'components';
import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import { getElClass, getElId } from 'utils';

const RANGE_BAR_HEIGHT = 64;

const useStyles = makeStyles(({ spacing }) => ({
  rangeChartsContainer: {
    display: 'flex',
    '& > div:first-of-type': { marginRight: spacing(1) },
    '& > div:last-of-type': { marginLeft: spacing(1) },
  },
}));

export default () => {
  const { t } = useCopy();
  const classes = useStyles();
  const [appState, dispatch] = useContext(AppContext);
  const stockState = appState[STORE_KEYS.CANDLE_MONKEYS][STORE_KEYS.STOCK_DATA];
  const stockQuote = stockState.quote;
  const [dailyHighLow, setDailyHighLow] = useState([]);
  const [wk52HighLow, setWk52HighLow] = useState([]);

  useEffect(() => {
    const { close, high, low, open, symbol, week52High, week52Low } = stockQuote;

    setDailyHighLow([
      {
        symbol,
        min: Math.min(...[open, high, low, close]),
        max: Math.max(...[open, high, low, close]),
        rangeLower: Math.min(open, close),
        rangeUpper: Math.max(open, close),
      },
    ]);
    setWk52HighLow([
      {
        symbol,
        min: week52Low,
        max: week52High,
        rangeLower: low,
        rangeUpper: high,
      },
    ]);
  }, [stockQuote]);

  return (
    <Box className={classnames(getElClass('comp', 'companyPrice'))}>
      <Box
        className={classnames([getElClass('comp', 'companyPrice'), classes.rangeChartsContainer])}
      >
        <Box height={RANGE_BAR_HEIGHT}>
          <RangeBarChart
            id={getElId('id', 'chart--ohlc')}
            data={dailyHighLow}
            title={t('pages.CandleMonkeys.dayHighLow')}
          />
        </Box>
        <Box height={RANGE_BAR_HEIGHT}>
          <RangeBarChart
            id={getElId('id', 'chart--52wk-high-low')}
            data={wk52HighLow}
            title={t('pages.CandleMonkeys.52wkHighLow')}
          />
        </Box>
      </Box>
    </Box>
  );
};
