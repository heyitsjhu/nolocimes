import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { FormatNumber, PriceChange } from 'components';
import { ROUTES, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { useIEXBatchQuery } from 'hooks/useIEXBatchQuery';
import { getElClass } from 'utils';

import staticData from './static';

const useStyles = makeStyles(({ shared, spacing }) => ({
  peersGroupList: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
  },
  peersGroupListItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: spacing(1),
    padding: spacing(1),
    width: `calc(50% - ${spacing(1) / 2}px)`,
    border: shared.borderStyle,
    borderRadius: shared.borderRadiusStyle,
    '&:nth-child(odd)': {
      marginRight: spacing(1) / 2,
    },
    '&:nth-child(even)': {
      marginLeft: spacing(1) / 2,
    },
  },
  companyName: {
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  pricesContainer: {
    display: 'flex',
  },
  priceChange: {
    '& > span': {
      fontSize: '0.875rem',
    },
  },
}));

export default () => {
  const { t } = useCopy();
  const classes = useStyles();
  const candleMonkeys = useSelector(state => state.candleMonkeys);
  const { peers: stockPeers } = candleMonkeys[STORE_KEYS.STOCK_DATA];
  const data = staticData;

  // const data2 = useIEXBatchQuery('batchMarket', {
  //   batchQueryList: 'quote',
  //   tickers: stockPeers,
  // });

  // useEffect(() => {
  //   console.log(data2);
  // }, [data2]);

  return (
    <List
      className={classnames([getElClass('comp', 'companyPeersGroup'), classes.peersGroupList])}
      disablePadding
    >
      {stockPeers.map(peerTicker => {
        if (!data[peerTicker]) return;

        const url = ROUTES.TO_TICKER(peerTicker);
        const { latestPrice, change, changePercent, companyName, primaryExchange, symbol } = data[
          peerTicker
        ].quote;

        return (
          <ListItem key={`peer-${peerTicker}`} className={classes.peersGroupListItem}>
            <Typography variant="overline">{symbol}</Typography>

            <Typography className={classes.companyName} variant="body1">
              <Link href={url} to={url} component={RouterLink}>
                {companyName}
              </Link>
            </Typography>

            <Box className={classes.pricesContainer}>
              <Typography variant="body2">
                <FormatNumber currency value={latestPrice} />
              </Typography>

              <PriceChange className={classes.priceChange} changePercentage={changePercent} />
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
};
