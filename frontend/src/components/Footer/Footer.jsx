import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';

import * as Utils from 'utils';

import { GitHubExternalLink, SiteSettingsMenu } from '..';

const useStyles = makeStyles(({ palette, spacing, transitions, zIndex }) => ({
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
    color: palette.grey[700],
    opacity: 0,
    zIndex: zIndex.footer,
    '& > span': {
      lineHeight: 1.4,
    },
  },
}));

export default () => {
  const classes = useStyles();
  const { t } = useCopy();
  const [appState, dispatch] = useContext(AppContext);
  const { isInteractive } = appState[STORE_KEYS.SITE_SETTINGS];

  return (
    <>
      <Box id={Utils.getElId('site', 'footer')} className={classes.footer} component="footer">
        <SiteSettingsMenu />
        <Typography variant="caption">{t('components.Footer.copyright')}</Typography>
        <GitHubExternalLink />
      </Box>
    </>
  );
};
