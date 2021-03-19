import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';

import { LINKS, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';

import { Dialog, IconButton } from '..';

const useStyles = makeStyles(theme => ({}));

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
    <Box>
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
            <Link onClick={handleClose} color="textSecondary">
              {t('common.nevermind')}
            </Link>
            <Button
              color="primary"
              href={LINKS.GITHUB_PROJECT_URL}
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
