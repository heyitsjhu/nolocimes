import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import { Footer, Header, Helmet, HomeLogoNavigation, ParticleCanvas, SplashLogo } from 'components';
import { useCopy } from 'hooks/useCopy';
import { useIsHome } from 'hooks/useIsHome';
import { useScrollToTop } from 'hooks/useScrollToTop';
import AppRoutes from 'routes';
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
  const { t } = useCopy();
  const isHome = useIsHome();
  const appRef = useRef();

  useScrollToTop(appRef);

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
        <ParticleCanvas />
        <Header />
        <AppRoutes />
        <HomeLogoNavigation />
        <Footer />
      </Box>
      <SplashLogo />
    </>
  );
};

export default App;
