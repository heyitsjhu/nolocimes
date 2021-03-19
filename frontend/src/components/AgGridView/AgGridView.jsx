import React from 'react';
import sizeMe from 'react-sizeme';
import GridLayout from 'react-grid-layout';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import { getElClass } from 'utils';
// TODO: Rename the file! It's not AG Grid

// TODO: Responsive Grid Layout with breakpoints
const useStyles = makeStyles(({ palette, shared }) => ({
  viewContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 1600,
  },
  borderTop: {
    borderTop: shared.borderDefault,
  },
  borderLeft: {
    borderLeft: shared.borderDefault,
  },
  borderRight: {
    borderRight: shared.borderDefault,
  },
  borderBottom: {
    borderBottom: shared.borderDefault,
  },
}));

export const ViewBase = ({ ...viewProps }) => {
  const classes = useStyles();

  return (
    <GridLayout
      {...viewProps}
      className={classnames([
        getElClass('comp', 'view'),
        viewProps.className,
        classes.viewContainer,
      ])}
      autoSize
      margin={[8, 8]}
      width={viewProps.size.width || undefined}
    />
  );
};

export const AgGridViewPane = ({
  borderTop,
  borderLeft,
  borderRight,
  borderBottom,
  ...otherProps
}) => {
  const classes = useStyles();

  return (
    <Box
      {...otherProps}
      className={classnames([
        getElClass('comp', 'viewWidget'),
        classes.viewWidget,
        borderTop && classes.borderTop,
        borderLeft && classes.borderLeft,
        borderRight && classes.borderRight,
        borderBottom && classes.borderBottom,
        otherProps.className,
      ])}
    />
  );
};

export default sizeMe({ monitorHeight: true })(ViewBase);
