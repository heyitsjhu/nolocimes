import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import classnames from 'classnames';

import { FeatureToggle } from 'components';
import { FEATURE_FLAGS, ROUTES, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { updateSiteSettings } from 'redux/reducers/siteSettings';
import { IconButton, ReportBug } from '..';
import ParticleCanvasControls from './ParticleCanvasControls';

const useStyles = makeStyles(({ palette, shared, spacing }) => ({
  paper: {
    backgroundColor: palette.background.default,
    border: shared.borderDefault,
    borderTop: shared.borderSignature,
  },
  settingsMenuContainer: {
    padding: spacing(2),
    minWidth: '15rem',
    maxWidth: '40.625rem',
    maxHeight: '70vh',
    overflowY: 'scroll',
    '& > *': {
      width: '100%',
      '&:not(:first-child)': {
        paddingTop: spacing(1),
      },
      '&:not(:last-child)': {
        borderBottom: shared.borderDefault,
      },
    },
  },
  darkModeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default () => {
  const { t } = useCopy();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const siteSettings = useSelector(state => state.siteSettings);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const { isInteractive, isDarkMode } = siteSettings;

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
    if (event.target.name === STORE_KEYS.IS_DARK_MODE) {
      dispatch(updateSiteSettings(STORE_KEYS.IS_DARK_MODE, null, null, event.target.checked));
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
            <Paper className={classes.paper} square>
              <ClickAwayListener onClickAway={handleClose}>
                <Box className={classes.settingsMenuContainer}>
                  <Box className={classes.darkModeContainer}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isDarkMode}
                          color="primary"
                          name="isDarkMode"
                          value={isDarkMode}
                          onChange={handleSettingsChange}
                        />
                      }
                      label={t('common.darkMode')}
                    />
                    <Box>
                      <FeatureToggle flag={FEATURE_FLAGS.STYLE_GUIDE}>
                        <IconButton
                          aria-label={t('a11y.ariaLabel.styleGuideButton')}
                          tooltip={t('tooltips.styleGuideButton')}
                          onClick={handleStyleGuideClick}
                        >
                          <StyleIcon fontSize="small" />
                        </IconButton>
                      </FeatureToggle>
                      <ReportBug />
                    </Box>
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
