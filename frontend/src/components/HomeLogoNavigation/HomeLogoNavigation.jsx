import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { useIsHome } from 'hooks/useIsHome';
import { AppContext } from 'stores';
import * as Utils from 'utils';

import getAnimation from './anime';
import NavigationPopper from './NavigationPopper';
import navMapping from './navMapping';
import paths from './paths';
import { updateAppState } from 'stores/actions/appActions';

const useStyles = makeStyles(({ palette, transitions, zIndex }) => ({
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
    '&.is-interactive:hover, &.is-interactive:focus, &.is-hinting': {
      fill: palette.grey[100],
      outline: 'none',
      cursor: 'pointer',
    },
  },
  pathSet2: {
    fill: palette.primary.dark,
    '&.is-interactive:hover, &.is-interactive:focus, &.is-hinting': {
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
  const { controlsEnabled, cookiesAcknowledged, introViewed } = appState[STORE_KEYS.SITE_SETTINGS];
  const viewBox = props.viewBox || '0 0 528 566';
  const [anchorEl, setAnchorEl] = useState(null);
  const [popper, setPopper] = useState(null);
  const [hintStatus, setHintStatus] = useState({});
  const navElRefs = useRef({});

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

  const addToHintQueue = (navSet, isOn) => () => {
    const set = {
      set1: Object.keys(navMapping).slice(0, 5),
      set2: Object.keys(navMapping).slice(5),
    };

    return new Promise(resolve => {
      setTimeout(() => {
        setHintStatus({
          ...hintStatus,
          ...set[navSet].reduce((acc, curr) => {
            acc[curr] = isOn;
            return acc;
          }, {}),
        });
        // setPopper(isOn ? navMapping[navId] : null);
        // setAnchorEl(isOn ? navRef : null);
        resolve();
      }, 800);
    });
  };

  const showNavigationHints = () => {
    Promise.resolve()
      .then(addToHintQueue('set1', true))
      .then(addToHintQueue('set1', false))
      .then(addToHintQueue('set2', true))
      .then(addToHintQueue('set2', false));
  };

  const handleOnAnimationEnd = () => {
    dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, 'controlsEnabled', true));

    if (isHome && !cookiesAcknowledged) {
      showNavigationHints();
    }
  };

  useEffect(() => {
    if (appState[STORE_KEYS.SPLASH_LOGO].finished) {
      const animation = getAnimation({
        onEnd: handleOnAnimationEnd,
        skipDelay: appState[STORE_KEYS.SITE_SETTINGS].introViewed,
      });

      animation.play();
    }
  }, [appState.splashLogo.finished, dispatch]);

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
            {paths.map((path, i) => {
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
                    controlsEnabled && !isDisabled && 'is-interactive',
                    hintStatus[path.navId] && 'is-hinting'
                  )}
                  d={path.d}
                  id={path.navId}
                  key={path.d}
                  ref={ref => (navElRefs.current[path.navId] = ref)}
                  role={!isDisabled ? 'button' : null}
                  tabIndex={!isDisabled ? 0 : -1}
                  onClick={!isDisabled ? handleClick(path.navId) : undefined}
                  onKeyDown={!isDisabled ? handleClick(path.navId) : undefined}
                  onMouseOver={!isDisabled && controlsEnabled ? handleMouseOver : undefined}
                  onMouseLeave={!isDisabled && controlsEnabled ? handleMouseLeave : undefined}
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
