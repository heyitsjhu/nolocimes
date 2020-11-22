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
  popperContainer: {
    transition: `opacity ${transitions.duration.long}ms ${transitions.easing.easeInOut}`,
    opacity: 0,
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
  fadeIn: {
    opacity: 1,
  },
}));

export default props => {
  const classes = useStyles();
  const { t } = useCopy();
  const [popperPlacement, setPopperPlacement] = useState('left');
  const [popperText, setPopperText] = useState('');
  const [showPopper, setShowPopper] = useState(false);
  const open = Boolean(props.anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  useEffect(() => {
    if (props.popper) {
      setPopperPlacement(props.popper.placement);
      setPopperText(props.popper.text);
      setShowPopper(true);
    } else {
      setShowPopper(false);
    }
  }, [props.popper]);

  return (
    <Popper
      anchorEl={props.anchorEl}
      className={classnames(classes.popperContainer, open && classes.fadeIn)}
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
  );
};
