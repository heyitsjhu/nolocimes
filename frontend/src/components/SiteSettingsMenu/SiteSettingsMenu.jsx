import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TuneIcon from '@material-ui/icons/Tune';
import { makeStyles } from '@material-ui/core/styles';

import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import { updateAppState } from 'stores/actions/appActions';
import { IconButton } from '..';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  settingsMenuContainer: {
    padding: theme.spacing(1),
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default props => {
  const classes = useStyles();
  const { t } = useCopy();
  const [appState, dispatch] = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const darkMode = appState[STORE_KEYS.SITE_SETTINGS].darkMode;

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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <IconButton
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        aria-label={t('a11y.ariaLabel.siteSettingsButton')}
        onClick={handleToggle}
        noPadding
      >
        <TuneIcon ref={anchorRef} fontSize="small" />
      </IconButton>

      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Box className={classes.settingsMenuContainer}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={darkMode}
                        color="primary"
                        name="darkMode"
                        onChange={handleSettingsChange}
                      />
                    }
                    label="Dark Mode"
                  />
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
