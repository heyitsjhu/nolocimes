import React from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MuiTooltip from '@material-ui/core/Tooltip';
import { DEFAULT_TOOLTIP_ENTER_DELAY, DEFAULT_TOOLTIP_LEAVE_DELAY } from 'const';

const Tooltip = props => {
  return props.title ? (
    <MuiTooltip
      arrow
      enterDelay={DEFAULT_TOOLTIP_ENTER_DELAY}
      leaveDelay={DEFAULT_TOOLTIP_LEAVE_DELAY}
      placement="top"
      title={props.title}
      {...props}
    >
      {props.children}
    </MuiTooltip>
  ) : (
    props.children
  );
};

export default withStyles(({ palette, shared }) => ({
  tooltip: {
    maxWidth: 'none',
    backgroundColor: fade(palette.background.default, 0.9),
    border: shared.borderDefault,
    borderTop: shared.borderSignatureThin,
    borderRadius: shared.borderRadiusDefault,
    color: palette.text.primary,
  },
}))(Tooltip);
