import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ palette, shared, spacing }) => ({
  paper: {
    padding: spacing(2),
    border: shared.borderDefault,
    borderRadius: 0,
    borderTop: shared.borderSignature,
    maxWidth: 325,
  },
}));

export default ({ id, title, TriggerElement, ...popoverProps }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {React.cloneElement(TriggerElement, { onClick: handleClick })}
      <Popover
        anchorEl={anchorEl}
        id={open ? id : undefined}
        open={open}
        PaperProps={{ className: classes.paper }}
        onClose={handleClose}
        {...popoverProps}
      >
        <Typography variant="caption">{title}</Typography>
      </Popover>
    </>
  );
};
