import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { convertColorToHEX } from 'helpers';
import { useCopy } from 'hooks/useCopy';

const useStyles = makeStyles(({ palette, shared, spacing }) => ({
  colorBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: `${spacing(2)}px ${spacing(1)}px`,
    width: '100%',
    maxWidth: 200,
    minHeight: 100,
    backgroundColor: ({ hexColor }) => hexColor,
    '& .MuiTypography-root': {
      color: ({ textColor }) => textColor,
    },
  },
}));

export default ({ color, getContrastText, label, sublabel }) => {
  if (!color) return null;

  const { t } = useCopy();
  const hexColor = convertColorToHEX(color);
  const classes = useStyles({ hexColor, textColor: getContrastText(color) });

  return (
    <Box className={classes.colorBox}>
      {sublabel && <Typography variant="caption">{t(sublabel)}</Typography>}
      <Typography>{t(label)}</Typography>
      <Typography variant="caption">{hexColor}</Typography>
    </Box>
  );
};
