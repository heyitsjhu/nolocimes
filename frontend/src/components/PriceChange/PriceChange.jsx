import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import classnames from 'classnames';

import { FormatNumber } from 'components';
import { getElClass } from 'utils';

const useStyles = makeStyles(({ palette, spacing }) => ({
  container: {},
  label: {
    marginRight: spacing(1),
    fontStyle: 'italic',
  },
  positive: {
    color: palette.success.main,
  },
  negative: {
    color: palette.error.main,
  },
  small: {
    fontSize: 12,
  },
}));

export default ({ changeValue, changePercentage, label, small, ...boxProps }) => {
  const classes = useStyles();
  const isPositive = changeValue >= 0 || changePercentage >= 0;

  return (
    <Box
      {...boxProps}
      className={classnames([
        getElClass('comp', 'priceChange'),
        boxProps.className,
        classes.container,
      ])}
    >
      {label && (
        <Typography
          className={classnames([classes.label, small && classes.small])}
          component="span"
          color="textSecondary"
        >
          {label}
        </Typography>
      )}
      {changeValue && (
        <Typography
          className={classnames([
            isPositive ? classes.positive : classes.negative,
            small && classes.small,
          ])}
          component="span"
          variant="body1"
        >
          <FormatNumber currency value={changeValue} />
        </Typography>
      )}
      {changePercentage && (
        <Typography
          className={classnames([
            isPositive ? classes.positive : classes.negative,
            small && classes.small,
          ])}
          component="span"
          style={{ marginLeft: 4 }}
          variant="body1"
        >
          (<FormatNumber percentage value={changePercentage} />)
        </Typography>
      )}
    </Box>
  );
};
