import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import { updateAppState } from 'stores/actions/appActions';

const useStyles = makeStyles(({ transitions }) => ({
  cookiesAlert: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 0,
    transition: `opacity ${transitions.duration.complex}ms ${transitions.easing.easeIn}`,
    opacity: 0,
    zIndex: -1,
  },
  fadeIn: {
    opacity: 1,
    zIndex: 1,
  },
}));

export default () => {
  const [appState, dispatch] = useContext(AppContext);
  const { t } = useCopy();
  const classes = useStyles();
  const [fadeIn, setFadeIn] = useState(false);
  const acknowledged = appState[STORE_KEYS.SITE_SETTINGS].cookiesAcknowledged;

  const handleOnClose = () => {
    if (!acknowledged) {
      dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, 'cookiesAcknowledged', true));
    }
  };

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 3000);
  }, []);

  return !acknowledged ? (
    <Alert
      className={classnames([classes.cookiesAlert, fadeIn && classes.fadeIn])}
      severity="info"
      variant="filled"
      onClose={handleOnClose}
    >
      <Typography>{t('components.CookiesBanner.alertMessage')}</Typography>
    </Alert>
  ) : null;
};
