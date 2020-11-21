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
import navMapping from './navMapping';
import paths from './paths';

const useStyles = makeStyles(({ palette, spacing, transitions, zIndex }) => ({
  homeLogoContainer: {
    display: 'none',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
  popperContainer: {
    display: 'none',
  },
  popper: {
    marginLeft: spacing(3),
    marginRight: spacing(3),
    '&::before': {
      content: '""',
      position: 'absolute',
      right: spacing(2),
      top: '50%',
      width: spacing(6),
      borderBottom: `1px solid ${palette.grey[100]}`,
    },
  },
  popperLeft: {
    marginRight: spacing(10),
    '&::before': { right: spacing(2) },
  },
  popperRight: {
    marginLeft: spacing(10),
    '&::before': { left: spacing(2) },
  },
  isHome: { display: 'block' },
  comingSoon: {
    position: 'relative',
    textAlign: 'center',
    '& > *': {
      color: palette.grey[300],
      opacity: 0,
    },
    '& span:last-child': {
      position: 'absolute',
      top: '50%',
      right: 0,
      transform: 'translate(-50%,-50%)',
      fontStyle: 'italic',
      color: palette.grey[600],
    },
  },
}));

export default props => {
  const classes = useStyles();
  const { t } = useCopy();
  const [appState, dispatch] = useContext(AppContext);

  const history = useHistory();
  const isHome = useIsHome();
  const viewBox = props.viewBox || '0 0 528 566';
  const [anchorEl, setAnchorEl] = useState(null);
  const [popperPlacement, setPopperPlacement] = useState('left');
  const [popperText, setPopperText] = useState('');
  const [isInteractive, setIsInteractive] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  const handleMouseOver = event => {
    if (!anchorEl) {
      const popper = navMapping[event.currentTarget.id];
      setPopperPlacement(popper.placement);
      setPopperText(popper.text);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMouseLeave = event => {
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
          isHome && classes.isHome
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
                  aria-label={t('a11y.ariaLabel.navigateTo', {
                    name: t(navMapping[path.navId].text),
                  })}
                  className={classnames(
                    Utils.getElClass('comp', 'homeLogo-path'),
                    classes.svgPath,
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
      <Popper
        anchorEl={anchorEl}
        className={classnames(classes.popperContainer, isHome && classes.isHome)}
        id={id}
        open={open}
        placement={popperPlacement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div
              className={classnames(
                Utils.getElClass('comp', 'homeLogo-popper'),
                classes.popper,
                popperPlacement === 'left' && classes.popperLeft,
                popperPlacement === 'right' && classes.popperRight
              )}
            >
              <Typography color="textPrimary" variant="overline">
                {t(popperText)}
              </Typography>
            </div>
          </Fade>
        )}
      </Popper>
    </Fragment>
  );
};
