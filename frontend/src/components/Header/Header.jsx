import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { getAnimation } from 'animations';
import { ROUTES, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import { updateAppState } from 'stores/actions/appActions';

import * as Utils from 'utils';

import { BusinessCard, IconButton, MobileNavigation, SiteLogo } from '..';

const useStyles = makeStyles(({ palette, shared, spacing, zIndex }) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    left: 0,
    padding: spacing(1),
    width: '100%',
    height: 40,
    opacity: 0,
    zIndex: zIndex.header,
  },
  iconSet: {
    '& > *': { marginLeft: spacing(1) },
  },
}));

export default () => {
  const classes = useStyles();
  const { t } = useCopy();
  const history = useHistory();
  const [appState, dispatch] = useContext(AppContext);
  const { isInteractive } = appState[STORE_KEYS.SITE_SETTINGS];

  useEffect(() => {
    if (appState[STORE_KEYS.SPLASH_LOGO].finished) {
      const animation = getAnimation({ skipDelay: appState[STORE_KEYS.SITE_SETTINGS].introViewed });
      animation.play();

      dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, 'introViewed', true));
    }
  }, [appState[STORE_KEYS.SPLASH_LOGO].finished, dispatch]);

  return (
    <>
      <Box id={Utils.getElId('site', 'header')} className={classes.header} component="header">
        <IconButton
          aria-label={t('a11y.ariaLabel.siteHomeUrl')}
          onClick={isInteractive ? () => history.push(ROUTES.HOME) : undefined}
        >
          <SiteLogo id={Utils.getElId('site', 'logo')} size={20} />
        </IconButton>
        <Box>
          <BusinessCard />
          <MobileNavigation />
        </Box>
      </Box>
    </>
  );
};
