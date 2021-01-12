import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { useCopy } from 'hooks/useCopy';

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  pageActions: {
    paddingRight: spacing(1) / 2,
  },
}));

export default props => {
  const classes = useStyles();
  const { t } = useCopy();

  return <Box className={classes.pageActions}>asdfjkalsjflksjdfkl</Box>;
};
