import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from '@material-ui/core/Link';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ palette, shared, spacing }) => ({
  paper: {
    padding: spacing(2),
    border: shared.borderDefault,
    borderTop: shared.borderSignature,
  },
}));

export default ({ title, ...popoverProps }) => {
  const classes = useStyles();

  return (
    <Popover
      // anchorEl={anchorEl}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 100, left: 400 }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      PaperProps={{ className: classes.paper }}
      {...popoverProps}
    >
      <Typography>jasdk fdjsafkl sdajfklds adfsj klasfjklsafjdksl</Typography>
    </Popover>
  );
};
