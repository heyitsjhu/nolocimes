import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import MUIBreadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import * as Utils from '../../utils';

const useStyles = makeStyles(({ palette, spacing, transitions, typography, zIndex }) => ({
  breadcrumbs: {
    position: 'fixed',
    top: spacing(5),
    left: 17,
    opacity: 0,
    zIndex: zIndex.breadcrumbs,
    '& ol': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    '& .MuiBreadcrumbs-separator': { margin: 0 },
  },
  breadcrumb: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  customBreadcrumb: {
    marginTop: spacing(1),
    marginBottom: spacing(1),
    height: 9,
    width: 9,
    borderRadius: '50%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    transition: `all ${transitions.duration.complex}ms ${transitions.easing.sharp}`,
    transitionDelay: `${transitions.duration.standard}ms`,
    zIndex: 1,
    '&.animate-in': {
      '&.is-active:not(:hover)': {
        backgroundColor: palette.grey[800],
      },
      borderColor: palette.grey[800],
      '& + div::after': {
        height: '100%',
        transitionDelay: '0ms',
      },
    },
    '&:hover': {
      backgroundColor: palette.primary.dark,
      borderColor: palette.primary.dark,
      cursor: 'pointer',
      '& + div::before': {
        height: '100%',
        transitionDelay: '0ms',
      },
      '& ~ span': {
        left: spacing(3),
        opacity: 1,
        transitionDelay: `${transitions.duration.shorter * 2}ms`,
        visibility: 'visible',
      },
    },
  },
  customSeparator: {
    position: 'relative',
    marginTop: spacing(1),
    marginBottom: spacing(1),
    height: spacing(4),
    width: 1,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '0%',
      backgroundColor: palette.grey[800],
      transition: `all ${transitions.duration.complex}ms ${transitions.easing.easeIn}`,
      transitionDelay: `${transitions.duration.short * 2}ms`,
    },
    '&::after': { backgroundColor: palette.grey[800] },
    '&::before': {
      backgroundColor: palette.primary.dark,
      zIndex: 1,
    },
  },
  linkText: {
    position: 'absolute',
    left: spacing(1),
    bottom: -1,
    padding: `${spacing(1)}px ${spacing(2)}px`,
    backgroundColor: palette.primary.dark,
    color: palette.common.white,
    letterSpacing: 1.25,
    lineHeight: 1,
    opacity: 0,
    transition: `all ${transitions.duration.complex}ms ${transitions.easing.easeInOut}`,
    zIndex: 0,
    visibility: 'hidden',
    whiteSpace: 'nowrap',
  },
}));

const LinkRouter = props => <Link {...props} component={RouterLink} />;

export default () => {
  const classes = useStyles();
  const location = useLocation();
  const [animatedSegmentsCount, setAnimatedSegmentsCount] = useState(0);
  const [urlSegments, setUrlSegments] = useState([]);

  const handleClick = isActive => event => {
    if (isActive) {
      event.preventDefault();
      return;
    }
  };

  useEffect(() => {
    setUrlSegments(location.pathname.split('/').filter(u => u));
  }, [location.pathname]);

  useEffect(() => {
    if (urlSegments.length > animatedSegmentsCount) {
      for (let i = 1; i <= urlSegments.length - animatedSegmentsCount; i++) {
        setTimeout(() => setAnimatedSegmentsCount(animatedSegmentsCount + i), 500 * i - 1);
      }
    } else if (urlSegments.length === 0) {
      setAnimatedSegmentsCount(0);
    }
  }, [animatedSegmentsCount, urlSegments]);

  return (
    <MUIBreadcrumbs
      id={Utils.getElId('site', 'breadcrumbs')}
      aria-label="breadcrumbs"
      className={classnames(Utils.getElClass('comp', 'breadcrumb'), classes.breadcrumbs)}
      separator={null}
    >
      {urlSegments.map((urlSegment, i) => {
        const to = `/${urlSegments.slice(0, i + 1).join('/')}`;
        const isActive = i === urlSegments.length - 1;

        return (
          <Box key={to} className={classes.breadcrumb}>
            <LinkRouter
              className={classnames(
                Utils.getElClass('element', 'breadcrumb'),
                classes.customBreadcrumb,
                i < animatedSegmentsCount && 'animate-in',
                isActive && 'is-active'
              )}
              to={to}
              onClick={handleClick(isActive)}
            >
              <span />
            </LinkRouter>
            <Box
              className={classnames(
                Utils.getElClass('element', 'breadcrumb-separator'),
                classes.customSeparator
              )}
            />
            <Typography className={classes.linkText} variant="overline">
              {urlSegment.replace(/-/gi, ' ')}
            </Typography>
          </Box>
        );
      })}
    </MUIBreadcrumbs>
  );
};
