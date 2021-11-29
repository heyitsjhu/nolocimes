import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOffIcon from '@material-ui/icons/LocationOff';

import { Helmet } from 'components';
import { LOCAL_STORAGE_NOLOCIMES_KEY, SEO, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { updateProjectNolocimes } from 'redux/reducers/projectNolocimes';
import PageLayout from '../PageLayout/PageLayout';
import theme from 'theme';

const useStyles = makeStyles(({ palette, spacing }) => ({
  projectNolocimesLayout: {
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      margin: 'auto',
      maxWidth: spacing(60),
    },
  },
  overviewContainer: {
    marginTop: spacing(2),
    marginBottom: spacing(2),
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
  },
}));

export default props => {
  const { t } = useCopy();
  const classes = useStyles();
  const dispatch = useDispatch();
  const projectNolocimes = useSelector(state => state.projectNolocimes);
  const hasStoredData = !!JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOLOCIMES_KEY));

  const handleGameStart = e => {
    e.preventDefault();
    if (hasStoredData) {
      dispatch(
        updateProjectNolocimes(
          null,
          null,
          null,
          JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOLOCIMES_KEY))
        )
      );
    } else {
      dispatch(updateProjectNolocimes(STORE_KEYS.GAME_STARTED, null, null, true));
    }
  };

  const renderOverview = useCallback(() => {
    // TODO: Add session cookie to track user progress
    return (
      <>
        <Box className={classes.overviewContainer}>
          <Typography>{t('pages.ProjectNolocimes.overview')}</Typography>
        </Box>
        <Box className={classes.buttonContainer}>
          {hasStoredData && (
            <Button
              color="primary"
              style={{ marginRight: 16 }}
              variant="contained"
              onClick={handleGameStart}
            >
              {t('common.resume')}
            </Button>
          )}
          <Button
            color="primary"
            variant={hasStoredData ? 'outlined' : 'contained'}
            onClick={handleGameStart}
          >
            {t('common.newGame')}
          </Button>
        </Box>
      </>
    );
  }, [handleGameStart]);

  const renderGame = () => {
    return (
      <>
        <Typography>PROMPT AREA</Typography>
        <Box>
          <Typography>DECISION AREA</Typography>
        </Box>
      </>
    );
  };

  return (
    <PageLayout
      pageName={STORE_KEYS.PROJECT_NOLOCIMES}
      pageLayoutClassName={classes.projectNolocimesLayout}
    >
      <Helmet {...SEO.PROJECT_NOLOCIMES(t)} />
      {projectNolocimes[STORE_KEYS.GAME_STARTED] ? renderGame() : renderOverview()}
    </PageLayout>
  );
};
