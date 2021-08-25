import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import classnames from 'classnames';

const useStyles = makeStyles(({ palette, shared, spacing }) => ({
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
    '& > :not(:first-child)': {
      marginLeft: spacing(2),
    },
  },
  justifyRight: {
    justifyContent: 'flex-end',
  },
}));

export default props => {
  const classes = useStyles();

  return (
    <Box className={classnames([classes.buttonGroup, props.justifyRight && classes.justifyRight])}>
      {props.children}
    </Box>
  );
};
