import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { DEFAULT_TOOLTIP_ENTER_DELAY, DEFAULT_TOOLTIP_LEAVE_DELAY } from 'const';

export default props => {
  return props.title ? (
    <Tooltip
      arrow
      enterDelay={DEFAULT_TOOLTIP_ENTER_DELAY}
      leaveDelay={DEFAULT_TOOLTIP_LEAVE_DELAY}
      title={props.title}
      {...props}
    >
      {props.children}
    </Tooltip>
  ) : (
    props.children
  );
};
