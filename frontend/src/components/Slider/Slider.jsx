import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { Tooltip } from 'components';

const useStyles = makeStyles({
  root: {
    width: '100%',
    '& > span': {
      whiteSpace: 'nowrap',
    },
  },
});

function valuetext(value) {
  return value;
}

export default ({ label, ...otherProps }) => {
  const classes = useStyles();
  const id = label.toLowerCase().replace(' ', '-');

  return (
    <Box className={classes.root}>
      <Typography id={`${id}-slider`} gutterBottom variant="overline">
        {label}
      </Typography>
      <Slider
        aria-labelledby={id}
        valueLabelDisplay="auto"
        ValueLabelComponent={Tooltip}
        getAriaValueText={valuetext}
        {...otherProps}
      />
    </Box>
  );
};
