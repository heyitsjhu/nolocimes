import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { CLASSES, ROUTES, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { useIsHome } from 'hooks/useIsHome';
import { AppContext } from 'stores';

import * as Utils from 'utils';

import { GitHubExternalLink, SiteSettingsMenu } from '..';

const useStyles = makeStyles(({ palette, spacing, shared, zIndex }) => ({
  footer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    position: 'fixed',
    bottom: 0,
    left: 0,
    padding: spacing(1),
    width: '100%',
    height: 40,
    opacity: 0,
    zIndex: zIndex.footer,
    [`&.${CLASSES.IS_MOBILE}.${CLASSES.IS_NOT_HOME}`]: {
      backgroundColor: palette.background.default,
    },
  },
  verticalDivider: {
    display: 'inline',
    marginLeft: spacing(1),
    marginRight: spacing(1),
    borderLeft: shared.borderDefault,
    borderColor: palette.text.secondary,
  },
}));

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useCopy();
  const isHome = useIsHome();
  const [appState, dispatch] = useContext(AppContext);
  const { isOnMobile } = appState[STORE_KEYS.SITE_SETTINGS];

  return (
    <>
      <Box
        id={Utils.getElId('site', 'footer')}
        className={classnames([
          classes.footer,
          !isHome && CLASSES.IS_NOT_HOME,
          isOnMobile && CLASSES.IS_MOBILE,
        ])}
        component="footer"
      >
        <SiteSettingsMenu />
        <Typography color="textSecondary" variant="caption">
          {t('components.Footer.copyright')}
          {!isOnMobile && (
            <>
              <Box className={classes.verticalDivider} />
              <Link color="textSecondary" onClick={() => history.push(ROUTES.PRIVACY_POLICY)}>
                {t('components.Footer.privacyPolicy')}
              </Link>
            </>
          )}
        </Typography>
        <GitHubExternalLink />
      </Box>
    </>
  );
};
