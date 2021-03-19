import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CloudIcon from '@material-ui/icons/Cloud';
import MouseIcon from '@material-ui/icons/Mouse';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { PoweredByScroll } from 'components';
import { ROUTES } from 'const';
import { useCopy } from 'hooks/useCopy';
import { useEventListener } from 'hooks/useEventListener';
import PageLayout from '../PageLayout/PageLayout';

const useStyles = makeStyles(({ palette, presets, spacing, transitions, typography }) => ({
  poweredByScrollLayout: {
    '& > div:nth-child(2)': {
      ...presets.flexColumnCentered,
      justifyContent: 'center',
      '& a:hover': {
        cursor: 'pointer',
      },
    },
  },
  iconContainer: {
    margin: spacing(2),
  },
  pbsContainer: {
    ...presets.flexColumnCentered,
  },
  title: {
    ...presets.uppercase,
    marginTop: `calc((100vh - ${spacing(10)}px) * 0.35)`,
    marginBottom: `calc(20vh - ${spacing(10)}px)`,
    fontStyle: 'italic',
    fontWeight: typography.fontWeightBold,
  },
  shortDescription: {
    marginTop: `calc(30vh - ${spacing(10)}px)`,
    marginBottom: `calc(30vh - ${spacing(10)}px)`,
  },
  scrollDownContainer: {
    ...presets.flexColumnCentered,
    marginTop: `calc(15vh - ${spacing(10)}px)`,
    marginBottom: `calc(15vh - ${spacing(10)}px)`,
    opacity: 0,
    animation: `$animateScrollIcon 5000ms ${transitions.easing.easeInOut} 3000ms infinite`,
  },

  '@keyframes animateScrollIcon': {
    // '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
    '0%, 100%': { opacity: 0, transform: 'translateY(0)' },
    '20%, 28%': { opacity: 1, transform: 'translateY(0)' },
    '37%, 38%': { opacity: 1, transform: 'translateY(-15px)' },
    '46%, 60%, 80%': { opacity: 1, transform: 'translateY(0)' },
    '53%': { transform: 'translateY(-10px)' },
  },
}));

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const directions = ['left', 'right', 'top', 'bottom'];
const movementMultipliers = [0.25, 0.5, 0.75, 1, 2, 3];
const scales = [0.6, 0.85, 1, 1.15, 1.36, 1.6, 2];
const targetPositions = [0.05, 0.11, 0.18, 0.33, 0.55, 0.76, 0.84];

export default props => {
  const { t } = useCopy();
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [hideScrollIcon, setHideScrollIcon] = useState(false);
  const poweredByScrollRef = useRef();

  const handleClick = e => {
    e.preventDefault();
    history.push(ROUTES.HOME);
  };

  const renderSampleElements = () => {
    const elements = [];

    for (let i = 0; i < 10; i++) {
      const performance = {
        // anchorPosition: 'topLeft',
        direction: directions[getRandomInt(4)],
        movementMultiplier: movementMultipliers[getRandomInt(6)],
        passThrough: [true, false][getRandomInt(2)],
        targetPosition: targetPositions[getRandomInt(7)],
      };
      elements.push(
        <Box
          key={i}
          performance={performance}
          style={{ transform: `scale(${scales[getRandomInt(7)]})` }}
        >
          Powered By Scroll
        </Box>
      );
    }

    return elements;
  };

  const handleScrollActivity = event => {
    setHideScrollIcon(poweredByScrollRef.current.scrollTop > 5);
    console.log('rerendering', poweredByScrollRef.current?.scrollTop);
  };

  useEventListener('scroll', handleScrollActivity, poweredByScrollRef.current);

  return (
    <PageLayout pageName="poweredByScroll" pageLayoutClassName={classes.poweredByScrollLayout}>
      <PoweredByScroll
        className={classes.pbsContainer}
        enablePerformances={false}
        ref={poweredByScrollRef}
      >
        <Typography className={classes.title} variant="h1">
          Powered By Scroll
        </Typography>
        <Typography className={classes.shortDescription}>
          adsjf sdakfjdsklfj dklsjf sdkljf ksjdf ksdjfdskjf i80ew4eh ajkdhgfkdlsa;jfg kldsj
          jgklsdhghg dsa gdslkfj
        </Typography>
        <Box
          className={classes.scrollDownContainer}
          style={{ animationIterationCount: hideScrollIcon ? 1 : 'infinite' }}
        >
          <MouseIcon />
          <ArrowForwardIosIcon style={{ transform: 'rotate(90deg)' }} />
        </Box>

        <Typography className={classes.shortDescription}>
          adsjf sdakfjdsklfj dklsjf sdkljf ksjdf ksdjfdskjf i80ew4eh ajkdhgfkdlsa;jfg kldsj
          jgklsdhghg dsa gdslkfj
        </Typography>
      </PoweredByScroll>
    </PageLayout>
  );
};
