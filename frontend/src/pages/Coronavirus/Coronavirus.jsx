import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Typography from '@material-ui/core/Typography';
import covidApi from 'api/covid';
import { STORE_KEYS } from 'const';
import { LineChart, MapChart, Toggle } from 'components';
import LineChartEditor from 'components/Charts/LineChart/Editor';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import { getInitialC19Data } from 'stores/actions/coronavirusActions';

import PageLayout from '../PageLayout/PageLayout';
import PageActions from './PageActions';
import { getElId } from 'utils';

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  coronavirusLayout: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },
  pageActions: {
    paddingRight: spacing(1) / 2,
  },
  publicIcon: {
    width: 20,
    height: 20,
  },
  toggleSwitch: {
    '& .MuiSwitch-switchBase': {
      color: palette.primary.main,
      '& + .MuiSwitch-track': {
        backgroundColor: palette.primary.main,
      },
    },
  },
  expansionPanel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: palette.common.black,
    '&.MuiExpansionPanel-root.Mui-expanded:before': { opacity: 1 },
  },
  AccordionSummary: {
    paddingLeft: spacing(1) / 2,
    paddingRight: spacing(1) / 2,
    minHeight: 'initial',
    color: palette.grey[800],
    '&.Mui-expanded': {
      minHeight: 'initial',
      borderBottom: `1px solid rgba(255, 255, 255, 0.12)`,
    },
    '& .MuiAccordionSummary-content': {
      justifyContent: 'space-between',
      marginTop: spacing(1) / 2,
      marginBottom: spacing(1) / 2,
    },
    '& .MuiIconButton-root': {
      marginRight: 0,
      padding: 0,
      '& svg': {
        fill: palette.grey[800],
        transition: `fill ${transitions.duration.longer}ms ${transitions.easing.easeInOut}`,
      },
      '&:hover': {
        backgroundColor: 'transparent',
        '& svg': { fill: palette.grey[600] },
      },
    },
  },
  AccordionDetails: {
    padding: 0,
    width: '100%',
    height: '70vh',
    overflowX: 'scroll',
    overflowY: 'hidden',
  },
  AccordionSummaryText: {
    paddingLeft: spacing(1) / 2,
    paddingRight: spacing(1) / 2,
  },
}));

export default props => {
  const classes = useStyles();
  const { t } = useCopy();
  const [appState, dispatch] = useContext(AppContext);

  const handleExpansionPanelChange = (event, expanded) => {
    if (!expanded) {
      // fetch new countries that need data
    }
  };

  useEffect(() => {
    // getInitialC19Data(coronavirusState, dispatch);
  }, []);

  return (
    <PageLayout
      pageName="coronavirus"
      className={classes.coronavirusLayout}
      pageActions={<PageActions />}
    >
      <LineChart
        id={getElId('chart', 'covid-historical')}
        data={appState[STORE_KEYS.CORONAVIRUS]}
      />

      <Accordion className={classes.expansionPanel} onChange={handleExpansionPanelChange} square>
        <AccordionSummary
          aria-controls="covid-expansion-panel-content"
          className={classes.AccordionSummary}
          expandIcon={<ExpandLessIcon />}
          IconButtonProps={{ disableFocusRipple: true, disableRipple: true }}
          id="covid-expansion-panel-header"
        >
          <Typography className={classes.AccordionSummaryText} variant="caption">
            Showing:
            {/* {t("pages.Coronavirus.ControlPanel.controlPanel")} */}
          </Typography>

          <Typography className={classes.AccordionSummaryText} variant="caption">
            {t('pages.Coronavirus.ControlPanel.controlPanel')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.AccordionDetails}>
          <LineChartEditor />
        </AccordionDetails>
      </Accordion>
    </PageLayout>
  );
};
