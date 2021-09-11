import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trans } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { makeStyles } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles/colorManipulator';
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
import { CLASSES, LOCAL_STORAGE_KEY, ROUTES, SEO, STORE_KEYS } from 'const';
import { useNotifications } from 'hooks/useNotifications';
import { useCopy } from 'hooks/useCopy';
import { useIsHome } from 'hooks/useIsHome';
import { useScrollToTop } from 'hooks/useScrollToTop';
import AppRoutes from 'routes';
import { ThemeContext } from 'store';
import { updateSiteSettings } from 'redux/reducers/siteSettings';
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
        backgroundColor: alpha(palette.background.default, 0.7),
        zIndex: 2,
      },
    },
  },
}));

const App = () => {
  const { t } = useCopy();
  const dispatch = useDispatch();
  const history = useHistory();
  const siteSettings = useSelector(state => state.siteSettings);
  const classes = useStyles();
  const isHome = useIsHome();
  const { setDarkMode } = useContext(ThemeContext);
  const { setNotification } = useNotifications();
  const appRef = useRef();

  const { acceptedCookies, isDarkMode, isInteractive, isOnMobile, viewedIntro } = siteSettings;

  const onStartAnimation = useCallback(() => {
    if (isInteractive) {
      console.log('ani-start');
      dispatch(updateSiteSettings(STORE_KEYS.IS_INTERACTIVE, null, null, false));
    }
  }, []);

  const onEndAnimation = useCallback(() => {
    if (!viewedIntro) {
      dispatch(updateSiteSettings(STORE_KEYS.VIEWED_INTRO, null, null, true));
    }
    if (!isInteractive) {
      dispatch(updateSiteSettings(STORE_KEYS.IS_INTERACTIVE, null, null, true));
    }
  }, []);

  useScrollToTop(appRef);

  useEffect(() => {
    // DEV ONLY: Uncomment the following line to force removal of local storage cookie
    // localStorage.removeItem(LOCAL_STORAGE_KEY);
    const storedCookies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    // TODO: Cookies seem to be resetting when refreshing browser.
    if (storedCookies && storedCookies.viewedIntro) {
      dispatch(updateSiteSettings(null, null, null, storedCookies));
    } // skip intro if user arrives to a page other than the homepage
    else if (!isHome && !viewedIntro) {
      dispatch(updateSiteSettings(STORE_KEYS.VIEWED_INTRO, null, null, true));
    }

    // TODO: Disabled - Until there's actually some cookies policy to include
    // if (!(acceptedCookies || (storedCookies && storedCookies.acceptedCookies))) {
    //   setNotification({
    //     [STORE_KEYS.BUTTON_TEXT]: 'common.accept',
    //     [STORE_KEYS.DELAY]: 5000,
    //     [STORE_KEYS.MESSAGE]: (
    //       <Trans i18nKey="components.PrivacyPolicy.alertMessage">
    //         {' '}
    //         <Link onClick={() => history.push(ROUTES.PRIVACY_POLICY)} />.
    //       </Trans>
    //     ),
    //     [STORE_KEYS.SEVERITY]: 'info',
    //     [STORE_KEYS.ON_CLOSE]: () => {
    //       dispatch(updateSiteSettings(STORE_KEYS.ACCEPTED_COOKIES, null, null, true));
    //     },
    //   });
    // }

    dispatch(updateSiteSettings(STORE_KEYS.IS_ON_MOBILE, null, null, isMobile));

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
        <Helmet {...SEO.HOMEPAGE(t)} />
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
