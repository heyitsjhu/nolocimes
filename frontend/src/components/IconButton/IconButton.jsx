import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';
import { Tooltip } from 'components';

const useStyles = makeStyles(({ palette, transitions, spacing, zIndex }) => ({
  iconButton: {
    padding: spacing(1) / 2,
    '& svg': {
      fill: palette.grey[700],
      transition: `fill ${transitions.duration.longer}ms ${transitions.easing.easeInOut}`,
    },
    "& svg[class*='siteLogo'] path": {
      fill: palette.grey[700],
    },
    '&:hover, &.Mui-focusVisible': {
      backgroundColor: 'transparent',
      cursor: 'default',
    },
  },
  isInteractive: {
    '&:hover, &.Mui-focusVisible': {
      cursor: 'pointer',
      "& svg:not([class*='siteLogo'])": { fill: palette.grey[600] },
      "& svg[class*='siteLogo'] path": {
        fill: palette.grey[500],
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

export default React.forwardRef(
  ({ children, className, noPadding, tooltip, TooltipProps, ...otherProps }, ref) => {
    const classes = useStyles();

    return (
      <Tooltip title={tooltip} {...TooltipProps}>
        <IconButton
          ref={ref}
          className={classnames([
            classes.iconButton,
            noPadding && classes.noPadding,
            (otherProps.onClick || otherProps.href) && classes.isInteractive,
            className,
          ])}
          disableRipple
          {...otherProps}
        >
          {children}
        </IconButton>
      </Tooltip>
    );
  }
);
