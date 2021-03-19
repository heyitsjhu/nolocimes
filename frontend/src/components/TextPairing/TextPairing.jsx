import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import classnames from 'classnames';

import { getElClass } from 'utils';

const useStyles = makeStyles(({ spacing }) => ({
  textPairingContainer: {
    marginBottom: spacing(1),
  },
  titleText: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

export default ({ heading, text }) => {
  const classes = useStyles();

  return (
    <Box className={classnames([getElClass('comp', 'textPairing'), classes.textPairingContainer])}>
      <Typography className={classes.titleText} component="h6" variant="caption">
        {heading}
      </Typography>
      <Typography component="p" variant="body2">
        {text}
      </Typography>
    </Box>
  );
};
