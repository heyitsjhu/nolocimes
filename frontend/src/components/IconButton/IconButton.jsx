import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';

const useStyles = makeStyles(({ palette, transitions, spacing, zIndex }) => ({
  iconButton: {
    padding: spacing(1) / 2,
    '& svg': {
      fill: palette.grey[800],
      transition: `fill ${transitions.duration.longer}ms ${transitions.easing.easeInOut}`,
    },
    "& svg[class*='siteLogo'] path": {
      fill: palette.grey[800],
    },
    '&:hover, &.Mui-focusVisible': {
      backgroundColor: 'transparent',
      "& svg:not([class*='siteLogo'])": { fill: palette.grey[600] },
      "& svg[class*='siteLogo'] path": {
        fill: palette.grey[600],
        '&:nth-child(6), &:nth-child(7), &:nth-child(8)': {
          fill: palette.primary.main,
        },
      },
    },
  },
  noPadding: {
    padding: 0,
  },
}));

export default ({ children, className, noPadding, ...otherProps }) => {
  const classes = useStyles();

  return (
    <IconButton
      className={classnames([classes.iconButton, noPadding && classes.noPadding, className])}
      // disableFocusRipple
      disableRipple
      {...otherProps}
    >
      {children}
    </IconButton>
  );
};
