import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import contentfulApi from './api/contentful';
import { ParticleCanvas, SplashLogo } from 'components';
import { useIsHome } from 'hooks/useIsHome';
import { useScrollToTop } from 'hooks/useScrollToTop';
import AppRoutes from 'routes';
import * as Utils from 'utils';

const useStyles = makeStyles(({ shared, spacing }) => ({
  app: {
    position: 'relative',
    margin: 0,
    height: 'inherit',
    border: shared.borderUncolored,
    transition: `all 600ms linear`,
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
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 2,
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const isHome = useIsHome();
  const appRef = useRef();

  useScrollToTop(appRef);

  useEffect(() => {
    contentfulApi.getEntries({ content_type: 'blogPost' });
  }, []);

  return (
    <>
      <Box
        id={Utils.getElId('app', 'heyitsjhu')}
        className={classnames([classes.app, !isHome && classes.isNotHome])}
        ref={appRef}
      >
        <ParticleCanvas />
        <AppRoutes />
      </Box>
      <SplashLogo />
    </>
  );
};

export default App;