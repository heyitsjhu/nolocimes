import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';

import { getAnimation } from 'animations';
import { ROUTES, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';

import * as Utils from 'utils';

import { BusinessCard, IconButton, SiteLogo } from '..';
import { updateAppState } from 'stores/actions/appActions';
// import PurposeCard from '../PurposeCard/PurposeCard';

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

  useEffect(() => {
    if (appState[STORE_KEYS.SPLASH_LOGO].finished) {
      const animation = getAnimation({ skipDelay: appState.localStorage.introViewed });
      animation.play();

      dispatch(updateAppState(STORE_KEYS.LOCAL_STORAGE, 'introViewed', true));
    }
  }, [appState[STORE_KEYS.SPLASH_LOGO].finished, dispatch]);

  const openBusinessCard = () => dispatch(updateAppState(STORE_KEYS.BUSINESS_CARD, 'show', true));
  const closeBusinessCard = () => dispatch(updateAppState(STORE_KEYS.BUSINESS_CARD, 'show', false));

  return (
    <>
      <Box id={Utils.getElId('site', 'header')} className={classes.header} component="header">
        <IconButton
          aria-label={t('a11y.ariaLabel.siteHomeUrl')}
          onClick={() => history.push(ROUTES.HOME)}
        >
          <SiteLogo id={Utils.getElId('site', 'logo')} size={20} />
        </IconButton>

        <IconButton aria-label={t('a11y.ariaLabel.businessCardButton')} onClick={openBusinessCard}>
          <PersonIcon fontSize="small" />
        </IconButton>
      </Box>
      <BusinessCard open={appState[STORE_KEYS.BUSINESS_CARD].show} onClose={closeBusinessCard} />
    </>
  );
};
