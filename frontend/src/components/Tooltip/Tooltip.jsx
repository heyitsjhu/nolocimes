import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

export default ({ children, valueLabelDisplay, valueLabelFormat, ...otherProps }) => {
  return (
    <Tooltip arrow enterTouchDelay={0} placement="top" title={otherProps.value} {...otherProps}>
      {children}
    </Tooltip>
  );
};
