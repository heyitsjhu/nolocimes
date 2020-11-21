import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import paths from './paths';
import { getElClass } from 'utils';

const useStyles = makeStyles(theme => ({
  svgGroup: {
    stroke: 'none',
    strokeWidth: '1',
    fillRule: 'evenodd',
  },
  svgPath: {
    fill: theme.palette.grey[100],
    transition: `fill ${theme.transitions.duration.longer}ms ${theme.transitions.easing.easeInOut}`,
  },
}));

export default ({ className, size, ...otherProps }) => {
  const classes = useStyles();
  const viewBox = '0 0 528 566';
  const getPathClasses = path =>
    classnames([
      classes.svgPath,
      path.css && classes[path.css],
      path.group === 'set1' && getElClass('comp', 'siteLogo-set-1'),
      path.group === 'set2' && getElClass('comp', 'siteLogo-set-2'),
    ]);

  return (
    <svg
      className={classnames(getElClass('comp', 'siteLogo-SVG'), className)}
      width={size}
      height={size * 1.071969}
      viewBox={viewBox}
      {...otherProps}
    >
      <g className={classes.svgGroup}>
        {paths.map(path => (
          <path className={getPathClasses(path)} d={path.d} key={path.d} />
        ))}
      </g>
    </svg>
  );
};
