import React, { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import TuneIcon from '@material-ui/icons/Tune';
import StyleIcon from '@material-ui/icons/Style';

import { ROUTES, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import { updateAppState } from 'stores/actions/appActions';
import { IconButton } from '..';
import ParticleCanvasControls from './ParticleCanvasControls';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.overlay.darkest,
    border: `1px solid ${theme.palette.grey[600]}`,
  },
  settingsMenuContainer: {
    padding: theme.spacing(2),
    '& > *': {
      width: '100%',
      '&:not(:first-child)': {
        paddingTop: theme.spacing(1),
      },
      '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.palette.grey[600]}`,
      },
    },
  },
  darkModeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    aliginItems: 'center',
  },
}));

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useCopy();
  const [appState, dispatch] = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { isInteractive, darkMode } = appState[STORE_KEYS.SITE_SETTINGS];

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleSettingsChange = event => {
    if (event.target.name === 'darkMode') {
      dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, 'darkMode', event.target.checked));
    }
  };

  const handleStyleGuideClick = event => {
    history.push(ROUTES.STYLE_GUIDE);
    handleClose(event);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Box>
      <IconButton
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        aria-label={t('a11y.ariaLabel.siteSettingsButton')}
        noPadding
        onClick={isInteractive ? handleToggle : undefined}
      >
        <TuneIcon ref={anchorRef} fontSize="small" />
      </IconButton>

      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box className={classes.settingsMenuContainer}>
                  <Box className={classes.darkModeContainer}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={darkMode}
                          color="primary"
                          name="darkMode"
                          value={appState[STORE_KEYS.SITE_SETTINGS].darkMode}
                          onChange={handleSettingsChange}
                        />
                      }
                      label={t('common.darkMode')}
                    />
                    <IconButton
                      aria-label={t('a11y.ariaLabel.styleGuideButton')}
                      onClick={handleStyleGuideClick}
                    >
                      <StyleIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <ParticleCanvasControls />
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};
