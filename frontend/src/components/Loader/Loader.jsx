import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Fade } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1,
  },
}));

export default props => {
  const classes = useStyles();

  return (
    <Fade in={props.isLoading}>
      <Box className={classes.loadingContainer}>
        <CircularProgress />
      </Box>
    </Fade>
  );
};
