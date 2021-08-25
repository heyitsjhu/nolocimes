import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { MapChart } from 'components';
import { useCopy } from 'hooks/useCopy';

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

  return (
    <PageLayout
      pageName="coronavirus"
      // pageActions={<PageActions />}
      noPadding
      pageLayoutClassName={classes.coronavirusLayout}
    >
      <MapChart id={getElId('chart', 'coronavirus-map')} />
    </PageLayout>
  );
};
