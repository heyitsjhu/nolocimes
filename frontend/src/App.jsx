import React, { useContext, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import {
  Breadcrumbs,
  Footer,
  Header,
  Helmet,
  HomeLogoNavigation,
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
import { updateAppState, updateSplashLogo } from 'stores/actions/appActions';
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
      backgroundColor: palette.background.dark,
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
  const { cookiesAccepted } = appState[STORE_KEYS.SITE_SETTINGS];
  const appRef = useRef();

  useScrollToTop(appRef);

  useEffect(() => {
    // localStorage.removeItem(LOCAL_STORAGE_KEY); // force remove local storage (dev only)
    const storedCookie = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (storedCookie && storedCookie.introViewed) {
      dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, null, storedCookie));
      dispatch(updateSplashLogo('finished'));
    } else if (!isHome && !appState.splashLogo.finished) {
      // skip intro if user arrives to a page other than the homepage
      dispatch(updateSplashLogo('finished'));
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
        <HomeLogoNavigation />
        <Footer />
      </Box>
      <ParticleCanvas />
      <SplashLogo />
    </>
  );
};

export default App;
