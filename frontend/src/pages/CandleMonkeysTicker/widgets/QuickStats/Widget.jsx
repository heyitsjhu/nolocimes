import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { TextPairing } from 'components';
import { useCopy } from 'i18n';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > div': {
      width: '50%',
    },
  },
  listItem: {},
}));

export default ({ quickStats }) => {
  const { t } = useCopy();
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      {Object.keys(quickStats).map(statKey => (
        <TextPairing
          key={statKey}
          heading={t(`pages.CandleMonkeys.${statKey}`)}
          text={quickStats[statKey]}
        />
      ))}
    </Box>
  );
};
