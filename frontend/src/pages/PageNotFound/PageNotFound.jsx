import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOffIcon from '@material-ui/icons/LocationOff';

import { ROUTES, SITE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import PageLayout from '../PageLayout/PageLayout';

const useStyles = makeStyles(({ spacing }) => ({
  notFoundLayout: {
    '& > div:nth-child(2)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '& a:hover': {
        cursor: 'pointer',
      },
    },
  },
  notFoundRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    margin: spacing(2),
    marginBottom: spacing(3),
    '& + p': {
      maxWidth: 450,
      textAlign: 'center',
    },
  },
}));

export default props => {
  const { t } = useCopy();
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const handleClick = e => {
    e.preventDefault();
    history.push(ROUTES.HOME);
  };

  return (
    <PageLayout
      className={classes.notFoundRoot}
      pageName={SITE_KEYS.NOT_FOUND}
      pageLayoutClassName={classes.notFoundLayout}
    >
      <Typography variant="subtitle2">
        {window.location.origin}
        {location.pathname}
      </Typography>

      <Box className={classes.iconContainer}>
        <LocationOffIcon color="primary" style={{ fontSize: 84 }} />
      </Box>

      <Typography>{t('pages.PageNotFound.missingDestination')}</Typography>
      <Box mt={2}>
        <Link color="primary" onClick={handleClick} variant="subtitle2">
          {t('pages.PageNotFound.backHomeButton')}
        </Link>
      </Box>
    </PageLayout>
  );
};
