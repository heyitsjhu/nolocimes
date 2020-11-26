import React, { useContext, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import {
  Breadcrumbs,
  Footer,
  Header,
  HomeLogoNavigation,
  ParticleCanvas,
  SplashLogo,
} from 'components';

import { LOCAL_STORAGE_KEY, STORE_KEYS } from 'const';
import { useIsHome } from 'hooks/useIsHome';
import { useScrollToTop } from 'hooks/useScrollToTop';
import AppRoutes from 'routes';
import { AppContext } from 'stores';
import { updateAppState, updateSplashLogo } from 'stores/actions/appActions';
import * as Utils from 'utils';

const useStyles = makeStyles(({ palette, shared, spacing, transitions }) => ({
  app: {
    position: 'relative',
    margin: 0,
    height: 'inherit',
    border: shared.borderUncolored,
    transition: `all ${transitions.duration.longest}ms ${transitions.easing.easeInOut}`,
    overflow: 'auto',
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
  const isHome = useIsHome();
  const [appState, dispatch] = useContext(AppContext);
  const appRef = useRef();

  useScrollToTop(appRef);

  useEffect(() => {
    // localStorage.removeItem(LOCAL_STORAGE_KEY);
    const payload = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // skips intro if local storage exist in user's browser
    if (payload && payload.introViewed) {
      dispatch(updateAppState(STORE_KEYS.LOCAL_STORAGE, null, payload));
      dispatch(updateSplashLogo('finished'));
    } else if (!isHome && !appState.splashLogo.finished) {
      // if user arrives without visiting the homepage first
      dispatch(updateSplashLogo('finished'));
    }
  }, []);

  return (
    <>
      <Box
        id={Utils.getElId('app', 'heyitsjhu')}
        className={classnames([classes.app, !isHome && classes.isNotHome])}
        ref={appRef}
      >
        <ParticleCanvas />
        <Header />
        <Breadcrumbs />
        <AppRoutes />
        <HomeLogoNavigation />
        <Footer />
      </Box>
      <SplashLogo />
    </>
  );
};

export default App;
