import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { ROUTES, SITE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import PageLayout from '../PageLayout/PageLayout';

const useStyles = makeStyles(({ palette, spacing }) => ({
  aboutLayout: {
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

  const handleClick = e => {
    e.preventDefault();
    history.push(ROUTES.HOME);
  };

  return (
    <PageLayout pageName={SITE_KEYS.ABOUT} pageLayoutClassName={classes.aboutLayout}>
      <Typography color="textPrimary">{t('pages.PageNotFound.missingDestination')}</Typography>
      <Typography color="textPrimary" variant="subtitle2">
        sdfsfsfsd
      </Typography>
    </PageLayout>
  );
};
