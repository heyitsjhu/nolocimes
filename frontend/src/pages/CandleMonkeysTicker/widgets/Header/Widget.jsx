import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import classnames from 'classnames';

import { SearchBar } from 'components';
import { STORE_KEYS } from 'const';
import { AppContext } from 'stores';
import { getElClass } from 'utils';

const useStyles = makeStyles(({ palette, shared, spacing }) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing(1),
    borderBottom: shared.borderDefault,
  },
  metaTypography: {
    position: 'relative',
    top: 2,
  },
}));

export default props => {
  const classes = useStyles();
  const [appState, dispatch] = useContext(AppContext);
  const stockState = appState[STORE_KEYS.CANDLE_MONKEYS][STORE_KEYS.STOCK_DATA];
  const { companyName, exchange, symbol } = stockState.company;

  return (
    <Box className={classnames([getElClass('comp', 'companyHeader'), classes.container])}>
      {companyName && (
        <>
          <Box>
            <Typography className={classes.metaTypography} variant="caption">
              {exchange}: {symbol}
            </Typography>
            <Typography component="h1" variant="h4">
              {companyName}
            </Typography>
          </Box>

          <SearchBar />

          <Button startIcon={<AddCircleOutlineOutlinedIcon />}>Add to Watchlist</Button>
        </>
      )}
    </Box>
  );
};
