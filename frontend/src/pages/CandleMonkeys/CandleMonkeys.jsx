import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOffIcon from '@material-ui/icons/LocationOff';

import { SearchBar } from 'components';
import { ROUTES } from 'const';
import { useCopy } from 'hooks/useCopy';
import PageLayout from '../PageLayout/PageLayout';

const useStyles = makeStyles(({ palette, spacing }) => ({
  candleMonkeysLayout: {
    padding: 0,
  },
  searchHeader: {
    display: 'flex',
    justifyContent: 'center',
    padding: `${spacing(2)}px ${spacing(4)}px`,
    width: '100%',
    '& > div': { maxWidth: '80%' },
  },
  content: {
    padding: spacing(4),
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
    <PageLayout pageName="candleMonkeys" pageLayoutClassName={classes.candleMonkeysLayout}>
      <Box className={classes.searchHeader}>
        <SearchBar />
      </Box>
      <Box className={classes.content}></Box>
    </PageLayout>
  );
};
