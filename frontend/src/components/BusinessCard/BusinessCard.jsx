import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import DomainIcon from '@material-ui/icons/Domain';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PersonPinRoundedIcon from '@material-ui/icons/PersonPinRounded';

import { Dialog, IconButton, SiteLogo } from 'components';
import { LINKS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { getElId } from 'utils';

const useStyles = makeStyles(({ breakpoints, palette, spacing, zIndex }) => ({
  businessCardLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '10vh auto !important',
    padding: spacing(3),
    height: '100%',
    width: '100%',
    maxWidth: '44vh !important',
    maxHeight: '66vh !important',
    zIndex: zIndex.businessCard,
    [`${breakpoints.down('sm')} and (orientation: landscape)`]: {
      maxWidth: '66vw !important',
    },
  },
  logoTitleContainer: {
    [`${breakpoints.down('sm')} and (orientation: landscape)`]: {
      display: 'flex',
      alignItems: 'flex-end',
      width: '100%',
    },
  },
  contentContainer: {
    flex: 'none',
    marginTop: 'auto',
    padding: 0,
  },
  siteLogo: {
    marginTop: spacing(1),
    marginBottom: spacing(2),
    '& path': {
      '&:nth-child(6),&:nth-child(7),&:nth-child(8)': {
        fill: palette.primary.main,
      },
    },
  },
  titleContainer: {
    marginTop: spacing(1),
    marginBottom: 'auto',
    padding: 0,
    [`${breakpoints.down('sm')} and (orientation: landscape)`]: {
      marginLeft: spacing(4),
      marginTop: spacing(1) / 2,
    },
  },
  title: {
    color: palette.primary.main,
    letterSpacing: '.05rem',
  },
  contentIcon: {
    paddingRight: spacing(1),
  },
  contentText: {
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '.05rem',
    lineHeight: 1.65,
  },
  name: {
    textTransform: 'uppercase',
    letterSpacing: '0.2rem',
    lineHeight: 1.1,
  },
}));

export default () => {
  const { t } = useCopy();
  const classes = useStyles();
  const siteSettings = useSelector(state => state.siteSettings);
  const [open, setOpen] = useState(false);
  const { isInteractive, isOnMobile } = siteSettings;

  const openBusinessCard = () => setOpen(true);
  const closeBusinessCard = () => setOpen(false);

  return (
    <>
      <IconButton
        aria-label={t('a11y.ariaLabel.businessCardButton')}
        onClick={isInteractive ? openBusinessCard : undefined}
      >
        <PersonPinRoundedIcon fontSize="small" />
      </IconButton>

      <Dialog
        id={getElId('modal', 'business-card')}
        open={open}
        PaperProps={{ className: classes.businessCardLayout }}
        onClose={closeBusinessCard}
      >
        <Box className={classes.logoTitleContainer}>
          <SiteLogo className={classes.siteLogo} size={isOnMobile ? 75 : 100} />
          <Box className={classes.titleContainer}>
            <Typography className={classes.name} color="textSecondary" component="h2" variant="h2">
              {t('components.BusinessCard.name')}
            </Typography>
            <Typography className={classes.title} component="span" variant="body2">
              {t('components.BusinessCard.title')}
            </Typography>
            <Box marginLeft={-0.5}>
              <IconButton
                aria-label={t('a11y.ariaLabel.githubUserUrl')}
                href={LINKS.GITHUB_USER_URL}
                target="_blank"
              >
                <GitHubIcon fontSize="small" />
              </IconButton>

              <IconButton
                aria-label={t('a11y.ariaLabel.linkedInUrl')}
                href={LINKS.LINKEDIN_URL}
                target="_blank"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box className={classes.contentContainer}>
          <Link
            aria-label={t('a11y.ariaLabel.businessCardEmail')}
            href={`mailto:${t('components.BusinessCard.emailAddress')}`}
          >
            <Typography
              className={classes.contentText}
              color="textSecondary"
              component="span"
              variant="body2"
            >
              <EmailIcon className={classes.contentIcon} />
              {t('components.BusinessCard.emailAddress')}
            </Typography>
          </Link>
          <Typography
            className={classes.contentText}
            color="textSecondary"
            component="span"
            variant="body2"
          >
            <DomainIcon className={classes.contentIcon} />
            {t('components.BusinessCard.companyName')}
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};
