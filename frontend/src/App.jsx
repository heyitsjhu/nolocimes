import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { Trans } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
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
import { CLASSES, LOCAL_STORAGE_KEY, ROUTES, STORE_KEYS } from 'const';
import { useNotification } from 'hooks/useNotification';
import { useCopy } from 'hooks/useCopy';
import { useIsHome } from 'hooks/useIsHome';
import { useScrollToTop } from 'hooks/useScrollToTop';
import AppRoutes from 'routes';
import { AppContext, ThemeContext } from 'stores';
import { updateAppState } from 'stores/actions/appActions';
import * as Utils from 'utils';

am4core.useTheme(am4themes_animated);

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
    [`&.${CLASSES.IS_NOT_HOME}:not(.${CLASSES.IS_MOBILE})`]: {
      display: 'block',
      margin: spacing(5),
      height: `calc(100% - ${spacing(10)}px)`,
      border: shared.borderDefault,
      borderTop: shared.borderSignature,
      '&::before': {
        content: '""',
        position: 'fixed',
        width: `calc(100% - ${spacing(10) + 4}px)`,
        height: `calc(100% - ${spacing(10) + 6}px)`,
        backgroundColor: fade(palette.background.default, 0.7),
        zIndex: 2,
      },
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const { t } = useCopy();
  const history = useHistory();
  const isHome = useIsHome();
  const [appState, dispatch] = useContext(AppContext);
  const { setDarkMode } = useContext(ThemeContext);
  const { setNotification } = useNotification();
  const { acceptedCookies, isDarkMode, isOnMobile, viewedIntro } = appState[
    STORE_KEYS.SITE_SETTINGS
  ];
  const appRef = useRef();

  const onStartAnimation = useCallback(() => {
    // dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, 'isInteractive', undefined, false));
  }, [dispatch]);

  const onEndAnimation = useCallback(() => {
    if (!viewedIntro) {
      dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, 'viewedIntro', undefined, true));
    }
    // dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, 'isInteractive', undefined, true));
  }, [dispatch]);

  useScrollToTop(appRef);

  useEffect(() => {
    // localStorage.removeItem(LOCAL_STORAGE_KEY); // force remove local storage (dev only)
    const storedCookies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (storedCookies && storedCookies.viewedIntro) {
      dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, undefined, undefined, storedCookies));
    } // skip intro if user arrives to a page other than the homepage
    else if (!isHome && !viewedIntro) {
      dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, 'viewedIntro', undefined, true));
    }

    if (!(acceptedCookies || (storedCookies && storedCookies.acceptedCookies))) {
      setNotification({
        buttonText: 'Accept',
        delay: 5000,
        message: (
          <Trans i18nKey="components.PrivacyPolicy.alertMessage">
            {' '}
            <Link onClick={() => history.push(ROUTES.PRIVACY_POLICY)} />.
          </Trans>
        ),
        severity: 'info',
        onClose: () =>
          dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, 'acceptedCookies', undefined, true)),
      });
    }

    dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, 'isOnMobile', undefined, isMobile));

    const animation = getAnimation({
      onStartAnimation,
      onEndAnimation,
      skipIntro: (storedCookies && storedCookies.viewedIntro) || viewedIntro,
    });

    animation.play();
  }, []);

  useEffect(() => {
    setDarkMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <>
      <Box
        id={Utils.getElId('app', 'heyitsjhu')}
        className={classnames([
          classes.app,
          !isHome && CLASSES.IS_NOT_HOME,
          isOnMobile && CLASSES.IS_MOBILE,
        ])}
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
