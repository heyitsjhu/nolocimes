import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import classnames from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

export default ({ className, isLoading }) => {
  const classes = useStyles();

  return isLoading ? (
    <Box className={classnames([classes.root, className])}>
      <LinearProgress />
    </Box>
  ) : null;
};
