import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { useCopy } from 'hooks/useCopy';

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  toggleContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  toggleSwitch: {
    '& .MuiSwitch-switchBase': {
      color: palette.primary.main,
      '& + .MuiSwitch-track': {
        backgroundColor: palette.primary.main,
      },
    },
  },
  typography: {
    paddingLeft: spacing(1) / 2,
    paddingRight: spacing(1) / 2,
    color: palette.grey[800],
  },
  checked: { color: palette.primary.main },
  unchecked: { color: palette.primary.main },
}));

export default ({ className, checkedLabel, uncheckedLabel, ...otherProps }) => {
  const classes = useStyles();
  const { t } = useCopy();

  return (
    <Box className={classes.toggleContainer}>
      <Typography
        className={classnames([classes.typography, !otherProps.checked && classes.unchecked])}
        variant="caption"
      >
        {uncheckedLabel}
      </Typography>
      <Switch
        className={classes.toggleSwitch}
        id="chart-type-toggle"
        color="primary"
        size="small"
        disableRipple
        {...otherProps}
      />
      <Typography
        className={classnames([classes.typography, otherProps.checked && classes.checked])}
        variant="caption"
      >
        {checkedLabel}
      </Typography>
    </Box>
  );
};
