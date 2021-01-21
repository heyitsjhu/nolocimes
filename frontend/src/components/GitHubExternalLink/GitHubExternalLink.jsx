import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';

import { LINKS, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';

import { Dialog, IconButton } from '..';

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
    color: palette.grey[800],
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
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.iconSet}>
      <IconButton
        aria-label={t('a11y.ariaLabel.githubSourceUrl')}
        noPadding
        tooltip={t('tooltips.githubIconButton')}
        onClick={isInteractive ? () => setOpen(true) : undefined}
      >
        <CodeRoundedIcon fontSize="small" />
      </IconButton>
      <Dialog
        description={t('components.GitHubExternalLink.modalDescription')}
        id="github-external"
        open={open}
        title={t('components.GitHubExternalLink.modalTitle')}
        onClose={handleClose}
        dialogActions={() => (
          <>
            <Button onClick={handleClose} color="primary">
              {t('common.nevermind')}
            </Button>
            <Button
              href={LINKS.GITHUB_PROJECT_URL}
              color="primary"
              target="_blank"
              variant="contained"
              onClick={handleClose}
            >
              {t('common.continue')}
            </Button>
          </>
        )}
      />
    </Box>
  );
};
