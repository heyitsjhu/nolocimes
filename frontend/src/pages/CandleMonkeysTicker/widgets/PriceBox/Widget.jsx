import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import NightsStayRoundedIcon from '@material-ui/icons/NightsStayRounded';
import classnames from 'classnames';
import { DateTime } from 'luxon';

import { FormatNumber, PriceChange } from 'components';
import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import { getElClass } from 'utils';
import { DATETIME_AND_TIMEZONE, TIMEZONE_NEW_YORK } from 'const';

import ClosingPriceTable from './ClosingPriceTable';

const useStyles = makeStyles(({ spacing, typography }) => ({
  priceChangeContainer: {
    paddingBottom: spacing(1),
    marginBottom: spacing(1),
    textAlign: 'right',
  },
  rangeChartsContainer: {
    display: 'flex',
    '& > div:first-of-type': { marginRight: spacing(1) },
    '& > div:last-of-type': { marginLeft: spacing(1) },
  },
  marketStatus: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    // top: spacing(1),
    '& span': {
      marginLeft: spacing(1) / 2,
      lineHeight: 1,
      // textTransform: 'uppercase',
    },
  },
  lastUpdated: {
    position: 'relative',
    top: -spacing(1) / 2,
    fontSize: 11,
    fontWeight: typography.fontWeightRegular,
    lineHeight: 1,
  },
}));

const iconMap = {
  marketOpen: <WbSunnyRoundedIcon fontSize="inherit" />,
  afterHours: <NightsStayRoundedIcon fontSize="inherit" />,
};

export default () => {
  const { t } = useCopy();
  const classes = useStyles();
  const [appState, dispatch] = useContext(AppContext);
  const stockState = appState[STORE_KEYS.CANDLE_MONKEYS][STORE_KEYS.STOCK_DATA];
  const stockQuote = stockState.quote;

  // TODO: Account for pre-market and closed markets
  const MarketStatus = () => {
    return (
      <Box className={classes.marketStatus}>
        {stockQuote.isUSMarketOpen ? iconMap.marketOpen : iconMap.afterHours}
        <Typography variant="overline">
          {stockQuote.isUSMarketOpen
            ? t('pages.CandleMonkeys.marketsOpen')
            : t('pages.CandleMonkeys.afterHours')}
        </Typography>
      </Box>
    );
  };

  const priceMapping = {
    price: stockQuote.isUSMarketOpen ? stockQuote.latestPrice : stockQuote.extendedPrice,
    priceTime: stockQuote.isUSMarketOpen ? stockQuote.latestUpdate : stockQuote.extendedPriceTime,
    change: stockQuote.isUSMarketOpen ? stockQuote.change : stockQuote.extendedChange,
    changePercent: stockQuote.isUSMarketOpen
      ? stockQuote.changePercent
      : stockQuote.extendedChangePercent,
  };

  return (
    <Box className={classnames(getElClass('comp', 'companyPrice'))}>
      <Box className={classnames(classes.priceChangeContainer)}>
        <MarketStatus />
        <Typography component="h2" variant="h3">
          <FormatNumber currency value={priceMapping.price} />
        </Typography>
        <PriceChange
          changeValue={priceMapping.change}
          changePercentage={priceMapping.changePercent}
        />
        <Typography className={classes.lastUpdated} variant="caption">
          {`${t('pages.CandleMonkeys.lastUpdated')}: `}
          {DateTime.fromMillis(priceMapping.priceTime).toLocaleString(DateTime.DATETIME_MED)}
        </Typography>

        {!stockQuote.isUSMarketOpen && <ClosingPriceTable stockQuote={stockQuote} />}
      </Box>
    </Box>
  );
};
