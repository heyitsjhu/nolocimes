import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import { CLASSES, ROUTES } from 'const';
import { useCopy } from 'hooks/useCopy';
import { useIsHome } from 'hooks/useIsHome';
import * as Utils from 'utils';
import { BusinessCard, IconButton, MobileNavigation, SiteLogo } from '..';

const useStyles = makeStyles(({ palette, spacing, zIndex }) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    left: 0,
    padding: spacing(1),
    width: '100%',
    height: 40,
    opacity: 0,
    zIndex: zIndex.header,
    [`&.${CLASSES.IS_MOBILE}.${CLASSES.IS_NOT_HOME}`]: {
      backgroundColor: palette.background.default,
    },
  },
  iconSet: {
    '& > *': { marginLeft: spacing(1) },
  },
}));

export default () => {
  const { t } = useCopy();
  const classes = useStyles();
  const siteSettings = useSelector(state => state.siteSettings);
  const isHome = useIsHome();
  const history = useHistory();
  const { isInteractive, isOnMobile } = siteSettings;

  return (
    <Box
      id={Utils.getElId('site', 'header')}
      className={classnames([
        classes.header,
        !isHome && CLASSES.IS_NOT_HOME,
        isOnMobile && CLASSES.IS_MOBILE,
      ])}
      component="header"
    >
      <IconButton
        aria-label={t('a11y.ariaLabel.siteHomeUrl')}
        onClick={isInteractive ? () => history.push(ROUTES.HOME) : undefined}
      >
        <SiteLogo id={Utils.getElId('site', 'logo')} size={20} />
      </IconButton>
      <Box>
        <BusinessCard />
        <MobileNavigation />
      </Box>
    </Box>
  );
};
