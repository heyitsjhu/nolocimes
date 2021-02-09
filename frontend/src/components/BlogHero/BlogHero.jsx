import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import heroImageUrl from 'static/images/blogHeroImage.jpg';

const useStyles = makeStyles(({ palette, spacing, transitions, zIndex }) => ({
  jottingPadHeroComponent: {
    width: '100%',
    height: '50vh',
    maxHeight: 480,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

export default ({ srcUrl }) => {
  const classes = useStyles();
  const imgUrl = srcUrl ? srcUrl : heroImageUrl;

  return (
    <Box
      className={classes.jottingPadHeroComponent}
      style={{ backgroundImage: `url('${imgUrl}')` }}
    >
      {/* {props.title && <Typography variant="h5">{props.title}</Typography>} */}
    </Box>
  );
};
