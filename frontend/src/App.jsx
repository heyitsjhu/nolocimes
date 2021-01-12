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
  ParticleCanvas,
  SplashLogo,
} from 'components';
import { LOCAL_STORAGE_KEY, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { useIsHome } from 'hooks/useIsHome';
import { useScrollToTop } from 'hooks/useScrollToTop';
import AppRoutes from 'routes';
import { AppContext } from 'stores';
import { updateAppState, updateSplashLogo } from 'stores/actions/appActions';
import * as Utils from 'utils';
import covidApi from 'api/covid';

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
  const appRef = useRef();

  useScrollToTop(appRef);

  useEffect(() => {
    // force remove local storage - for dev purposes
    // localStorage.removeItem(LOCAL_STORAGE_KEY);

    const payload = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // skips intro if local storage exist in user's browser
    if (payload && payload.introViewed) {
      dispatch(updateAppState(STORE_KEYS.SITE_SETTINGS, null, payload));
      dispatch(updateSplashLogo('finished'));
    } else if (!isHome && !appState.splashLogo.finished) {
      // if user arrives without visiting the homepage first
      dispatch(updateSplashLogo('finished'));
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
