import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import getAnimation from 'animations';
import {
  Breadcrumbs,
  Footer,
  Header,
  Helmet,
  NotificationBanner,
  ParticleCanvas,
  SplashLogo,
} from 'components';
import { LOCAL_STORAGE_KEY, STORE_KEYS } from 'const';
import { useNotification } from 'hooks/useNotification';
import { useCopy } from 'hooks/useCopy';
import { useIsHome } from 'hooks/useIsHome';
import { useScrollToTop } from 'hooks/useScrollToTop';
import AppRoutes from 'routes';
import { AppContext } from 'stores';
import { updateAppState } from 'stores/actions/appActions';
import * as Utils from 'utils';

const useStyles = makeStyles(({ palette, shared, spacing, transitions, zIndex }) => ({
  app: {
    position: 'relative',
    margin: 0,
    height: 'inherit',
    border: shared.borderUncolored,
    transition: `all ${transitions.duration.longest}ms ${transitions.easing.easeInOut}`,
    overflowX: 'auto',
    overflowY: 'auto',
    zIndex: zIndex.appContainer,
  },
  isNotHome: {
    display: 'block',
    margin: spacing(5),
    height: `calc(100% - ${spacing(10)}px)`,
    border: shared.borderDefault,
    '&::before': {
      content: '""',
      position: 'fixed',
      width: `calc(100% - ${spacing(10) + 2}px)`,
      height: `calc(100% - ${spacing(10) + 2}px)`,
      backgroundColor: palette.overlay.dark,
      zIndex: 2,
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const { t } = useCopy();
  const isHome = useIsHome();
  const [appState, dispatch] = useContext(AppContext);
  const { setNotification } = useNotification();
  const { cookiesAccepted, introViewed } = appState[STORE_KEYS.SITE_SETTINGS];
  const appRef = useRef();

  const onStartAnimation = useCallback(() => {
    dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, 'isInteractive', false));
  }, [dispatch]);
  const onEndAnimation = useCallback(() => {
    if (!introViewed) {
      dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, 'introViewed', true));
    }
    dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, 'isInteractive', true));
  }, [dispatch]);

  useScrollToTop(appRef);

  useEffect(() => {
    // localStorage.removeItem(LOCAL_STORAGE_KEY); // force remove local storage (dev only)
    const storedCookie = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (storedCookie && storedCookie.introViewed) {
      dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, null, storedCookie));
    } else if (!isHome && !introViewed) {
      // skip intro if user arrives to a page other than the homepage
      dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, 'introViewed', true));
    }

    if (!(cookiesAccepted || (storedCookie && storedCookie.cookiesAccepted))) {
      setNotification({
        buttonText: 'Accept',
        delay: 5000,
        message: 'components.CookiesBanner.alertMessage',
        onClose: () => dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, 'cookiesAccepted', true)),
      });
    }

    dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, 'userIsOnMobile', isMobile));

    const animation = getAnimation({
      onStartAnimation,
      onEndAnimation,
      skipIntro: (storedCookie && storedCookie.introViewed) || introViewed,
    });

    animation.play();
  }, []);

  return (
    <>
      <Box
        id={Utils.getElId('app', 'heyitsjhu')}
        className={classnames([classes.app, !isHome && classes.isNotHome])}
        ref={appRef}
      >
        <Helmet
          title={t('components.Helmet.home.title')}
          meta={[{ name: 'description', content: t('components.Helmet.home.meta.description') }]}
        />
        <NotificationBanner />
        <Header />
        <Breadcrumbs />
        <AppRoutes />
        <SplashLogo />
        <Footer />
      </Box>
      <ParticleCanvas />
    </>
  );
};

export default App;
