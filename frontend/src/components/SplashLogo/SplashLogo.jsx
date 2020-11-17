import React, { useCallback, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import { AppContext } from 'stores';
import { updateSplashLogo } from 'stores/actions/appActions';
import { getElClass } from 'utils';

import getAnimation from './anime';
import paths from './paths';

const useStyles = makeStyles(theme => ({
  splashLogoContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.common.white,
    zIndex: 1000,
  },
  curtains: {
    position: 'relative',
    top: 0,
    height: 0,
    width: '50%',
    backgroundColor: '#101010',
    opacity: 0,
    '&::before': {
      content: '""',
      position: 'fixed',
      top: 0,
      width: 'calc(50%)',
      height: '100%',
      backgroundColor: '#101010',
      zIndex: -1,
    },
  },
  curtainLeft: {
    left: 0,
    borderRight: `3px solid ${theme.palette.grey[600]}`,
  },
  curtainRight: {
    right: 0,
    borderLeft: `3px solid ${theme.palette.grey[600]}`,
  },
  logoSvg: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    minWidth: 80,
    maxWidth: 150,
    transform: 'translate(-50%, -50%)',
    opacity: 1,
  },
  svgGroup: {
    stroke: 'none',
    strokeWidth: '1',
    fill: 'none',
    fillRule: 'evenodd',
  },
  svgPath: {
    fill: '#262b37',
    opacity: 0,
  },
}));

export default props => {
  const [appState, dispatch] = useContext(AppContext);
  const classes = useStyles();
  const viewBox = props.viewBox || '0 0 528 566';

  const splashContainer = getElClass('comp', 'splash-container');
  const splashLogo = getElClass('comp', 'splash-logo');
  const splashCurtain = getElClass('comp', 'splash-curtain');
  const splashCurtainLeft = getElClass('comp', 'splash-curtain-left');
  const splashCurtainRight = getElClass('comp', 'splash-curtain-right');

  const onStartAnimation = useCallback(() => dispatch(updateSplashLogo('start')), [dispatch]);
  const onEndAnimation = useCallback(() => dispatch(updateSplashLogo('finish')), [dispatch]);

  useEffect(() => {
    if (!appState.splashLogo.finished) {
      const animation = getAnimation(onStartAnimation, onEndAnimation);
      animation.play();
    }
  }, [appState.splashLogo.finished, onStartAnimation, onEndAnimation]);

  return (
    !appState.splashLogo.finished && (
      <Box className={classnames(splashContainer, classes.splashLogoContainer)}>
        <Box
          className={classnames([
            splashCurtain,
            splashCurtainLeft,
            classes.curtains,
            classes.curtainLeft,
          ])}
        ></Box>
        <Box
          className={classnames([
            splashCurtain,
            splashCurtainRight,
            classes.curtains,
            classes.curtainRight,
          ])}
        ></Box>
        <svg className={classnames(splashLogo, classes.logoSvg)} viewBox={viewBox}>
          <g className={classnames(classes.svgGroup)}>
            {paths.map(path => (
              <path
                className={classnames([
                  path.className === 'set1' && getElClass(null, 'logo__set--1'),
                  path.className === 'set2' && getElClass(null, 'logo__set--2'),
                  classes.svgPath,
                ])}
                d={path.d}
                id={path.id}
                key={path.d}
              />
            ))}
          </g>
        </svg>
      </Box>
    )
  );
};
