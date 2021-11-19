import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  blogHeroComponent: {
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
  const imgUrl = srcUrl ? srcUrl : process.env.PUBLIC_URL + '/static/images/blogHeroImage.jpg';

  return (
    <Box className={classes.blogHeroComponent} style={{ backgroundImage: `url('${imgUrl}')` }}>
      {/* {props.title && <Typography variant="h5">{props.title}</Typography>} */}
    </Box>
  );
};
