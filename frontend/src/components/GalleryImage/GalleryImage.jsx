import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints, palette, spacing, zIndex }) => ({
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: palette.common.black,
      transition: 'all 0.5s ease-in-out',
      opacity: 0.3,
    },
    '&:hover': {
      '&::before': {
        opacity: 0,
      },
      '& img': {
        '-webkit-filter': 'grayscale(0%)',
        '-moz-filter': 'grayscale(0%)',
        filter: 'grayscale(0%)',
        transform: 'scale(1.03)',
      },
    },
  },
  galleryImage: {
    '-webkit-filter': 'grayscale(100%)',
    '-moz-filter': 'grayscale(100%)',
    filter: 'grayscale(100%)',
    transform: 'scale(1)',
    transition: 'all 0.5s ease-in-out',
  },
}));

export default props => {
  const classes = useStyles();
  const inlineStyles =
    props.direction === 'column'
      ? {
          position: 'absolute',
          left: props.left,
          top: props.top,
        }
      : {};

  const handlePhotoSelect = event => {
    props.onPhotoSelect && props.onPhotoSelect(event, { photo: props.photo, index: props.index });
  };

  return (
    <div
      className={classes.imageContainer}
      style={{
        margin: props.margin,
        height: props.photo.height,
        width: props.photo.width,
        ...inlineStyles,
      }}
      onClick={handlePhotoSelect}
    >
      <img className={classes.galleryImage} alt={props.photo.title} {...props.photo} />
    </div>
  );
};
