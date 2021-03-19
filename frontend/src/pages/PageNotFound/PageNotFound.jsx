import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOffIcon from '@material-ui/icons/LocationOff';

import { ROUTES } from 'const';
import { useCopy } from 'hooks/useCopy';
import PageLayout from '../PageLayout/PageLayout';

const useStyles = makeStyles(({ palette, spacing }) => ({
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
  iconContainer: {
    margin: spacing(2),
  },
}));

export default props => {
  const { t } = useCopy();
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { unfoundPath } = location.state;

  const handleClick = e => {
    e.preventDefault();
    history.push(ROUTES.HOME);
  };

  return (
    <PageLayout pageName="notFound" pageLayoutClassName={classes.notFoundLayout}>
      <Typography color="textPrimary">{t('pages.PageNotFound.missingDestination')}</Typography>
      <Typography color="textPrimary" variant="subtitle2">
        {window.location.origin}
        {unfoundPath}
      </Typography>

      <Box className={classes.iconContainer}>
        <LocationOffIcon color="primary" style={{ fontSize: 84 }} />
      </Box>

      <Typography color="textPrimary" variant="subtitle2">
        {t('pages.PageNotFound.theresNothingHere')}
      </Typography>
      <Link color="primary" onClick={handleClick}>
        {t('pages.PageNotFound.backHomeButton')}
      </Link>
    </PageLayout>
  );
};
