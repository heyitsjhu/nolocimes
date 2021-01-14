import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import { STORE_KEYS } from 'const';
import { useIsHome } from 'hooks/useIsHome';
import { AppContext } from 'stores';
import palette from 'theme/palette';
import { getElClass } from 'utils';

import paths from './paths';

const useStyles = makeStyles(theme => ({
  logoSvg: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    minWidth: 80,
    maxWidth: 140,
    transform: 'translate(-50%, -50%)',
    opacity: 1,
  },
  svgGroup: {
    stroke: 'none',
    strokeWidth: '1',
    fill: 'none',
    fillRule: 'evenodd',
  },
  pathSet1: {
    fill: props => props.set1Fill,
    opacity: props => props.opacity,
  },
  pathSet2: {
    fill: props => props.set2Fill,
    opacity: props => props.opacity,
  },
  fadeOut: {
    opacity: '0.3 !important',
  },
}));

export default props => {
  const isHome = useIsHome();
  const [appState, dispatch] = useContext(AppContext);
  const { introViewed } = appState[STORE_KEYS.SITE_SETTINGS];
  const classes = useStyles({
    set1Fill: introViewed ? palette.grey[600] : palette.grey[600],
    set2Fill: introViewed ? palette.primary.dark : palette.grey[600],
    opacity: introViewed ? 0.9 : 0,
  });

  const viewBox = props.viewBox || '0 0 528 566';

  return (
    <svg
      className={classnames(getElClass('comp', 'splash-logo'), classes.logoSvg)}
      viewBox={viewBox}
    >
      <g className={classnames(classes.svgGroup)}>
        {paths.map(path => (
          <path
            className={classnames([
              classes.svgPath,
              path.group === 'set1' && getElClass(null, 'logo__set--1'),
              path.group === 'set2' && getElClass(null, 'logo__set--2'),
              path.css && classes[path.css],
              !isHome && classes.fadeOut,
            ])}
            d={path.d}
            id={path.id}
            key={path.d}
          />
        ))}
      </g>
    </svg>
  );
};
