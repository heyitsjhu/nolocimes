import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  styleGuideSection: {
    paddingTop: spacing(3),
    paddingBottom: spacing(3),
    marginBottom: spacing(6),
    '& > h2': {
      marginTop: spacing(2),
      marginBottom: spacing(4),
    },
  },
  sectionInner: {
    margin: 'auto',
    paddingLeft: spacing(3),
    paddingRight: spacing(3),
    width: '100%',
    maxWidth: breakpoints.values.lg,
  },
}));

export default ({ children, className, title }) => {
  const classes = useStyles();

  return (
    <Box className={classnames([classes.styleGuideSection, className])}>
      <Typography variant="h2">{title}</Typography>
      <Box className={classes.sectionInner}>{children}</Box>
    </Box>
  );
};
