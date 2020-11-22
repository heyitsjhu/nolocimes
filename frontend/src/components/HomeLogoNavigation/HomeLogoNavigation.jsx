import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { useCopy } from 'hooks/useCopy';
import { useIsHome } from 'hooks/useIsHome';
import { AppContext } from 'stores';
import * as Utils from 'utils';

import getAnimation from './anime';
import NavigationPopper from './NavigationPopper';
import navMapping from './navMapping';
import paths from './paths';

const useStyles = makeStyles(({ palette, spacing, transitions, zIndex }) => ({
  homeLogoContainer: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    transition: `opacity ${transitions.duration.long}ms ${transitions.easing.easeOut}`,
    opacity: 0,
    zIndex: zIndex.homeLogo,
  },
  logoSvg: {
    minWidth: 96,
    maxWidth: 180,
    width: '100%',
    opacity: 1,
  },
  svgGroup: {
    stroke: 'none',
    strokeWidth: '1',
    fill: 'none',
    fillRule: 'evenodd',
  },
  svgPath: {
    transition: `fill ${transitions.duration.long}ms ${transitions.easing.easeInOut}`,
  },
  pathSet1: {
    fill: palette.grey[600],
    '&.interactive:hover, &.interactive:focus': {
      fill: palette.grey[100],
      outline: 'none',
      cursor: 'pointer',
    },
  },
  pathSet2: {
    fill: palette.primary.dark,
    '&.interactive:hover,     &.interactive:focus': {
      fill: palette.primary.main,
      outline: 'none',
      cursor: 'pointer',
    },
  },
  isNotHome: {
    opacity: '0.1 !important',
  },
}));

export default props => {
  const classes = useStyles();
  const { t } = useCopy();
  const history = useHistory();
  const isHome = useIsHome();
  const [appState, dispatch] = useContext(AppContext);
  const viewBox = props.viewBox || '0 0 528 566';
  const [anchorEl, setAnchorEl] = useState(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [popper, setPopper] = useState(null);

  const handleMouseOver = event => {
    if (!anchorEl) {
      setPopper(navMapping[event.currentTarget.id]);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMouseLeave = event => {
    setPopper(null);
    setAnchorEl(null);
  };

  const handleClick = navId => event => {
    if ((event.type === 'keydown' && event.keyCode === 13) || event.type === 'click') {
      history.push(navMapping[navId].url, { fromNav: true });
      setAnchorEl(null);
    }
  };

  useEffect(() => {
    if (appState.splashLogo.finished) {
      const animation = getAnimation(null, () => setIsInteractive(true));
      animation.play();
    }
  }, [appState.splashLogo.finished]);

  return (
    <Fragment>
      <Box
        className={classnames(
          Utils.getElClass('comp', 'homeLogo-container'),
          classes.homeLogoContainer,
          !isHome && classes.isNotHome
        )}
      >
        <svg
          className={classnames(Utils.getElClass('comp', 'homeLogo-svg'), classes.logoSvg)}
          viewBox={viewBox}
        >
          <g className={classes.svgGroup}>
            {paths.map(path => {
              const isDisabled = navMapping[path.navId].disabled;

              return (
                <path
                  aria-label={t('a11y.ariaLabel.navigateToPage', {
                    name: t(navMapping[path.navId].text),
                  })}
                  className={classnames(
                    Utils.getElClass('comp', 'homeLogo-path'),
                    classes.svgPath,
                    path.group === 'set1' && Utils.getElClass(null, 'logo__set--1'),
                    path.group === 'set2' && Utils.getElClass(null, 'logo__set--2'),
                    path.css && classes[path.css],
                    isInteractive && !isDisabled && 'interactive'
                  )}
                  d={path.d}
                  id={path.navId}
                  key={path.d}
                  role={!isDisabled ? 'button' : null}
                  tabIndex={!isDisabled ? 0 : -1}
                  onClick={!isDisabled ? handleClick(path.navId) : undefined}
                  onKeyDown={!isDisabled ? handleClick(path.navId) : undefined}
                  onMouseOver={!isDisabled && isInteractive ? handleMouseOver : undefined}
                  onMouseLeave={!isDisabled && isInteractive ? handleMouseLeave : undefined}
                />
              );
            })}
          </g>
        </svg>
      </Box>
      <NavigationPopper anchorEl={anchorEl} popper={popper} />
    </Fragment>
  );
};