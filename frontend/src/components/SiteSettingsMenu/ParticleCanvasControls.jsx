import React, { useContext, useEffect, useReducer, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import { CLASSES, PARTICLE_CANVAS_DEFAULTS, STORE_KEYS } from 'const';
import { Slider } from 'components';
import { useCopy } from 'hooks/useCopy';
import { useDebounce } from 'hooks/useDebounce';
import { AppContext } from 'stores';
import { updateAppState } from 'stores/actions/appActions';
import { deepClone } from 'utils';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    [`&.${CLASSES.IS_MOBILE}`]: {
      '& [class*="controlRow"]': {
        flexDirection: 'column',
      },
      '& [class*="sliderContainer"]:last-child': {
        paddingRight: theme.spacing(2),
      },
      '& [class*="resetButton"]': {
        marginRight: theme.spacing(2),
      },
    },
  },
  controlRow: {
    display: 'flex',
    flexWrap: 'nowrap',
    [`&.${CLASSES.IS_MOBILE}`]: {
      flexDirection: 'column',
    },
  },
  sliderContainer: {
    '&:not(:last-child)': {
      paddingRight: theme.spacing(2),
    },
  },
  resetButton: {
    alignSelf: 'flex-end',
  },
}));

const controlsMapping = {
  particleCount: t => ({
    label: t('components.ParticleCanvasControls.particleCount'),
    defaultValue: PARTICLE_CANVAS_DEFAULTS.particleCount,
    step: 2,
    min: 20,
    max: 80,
  }),
  particleThreshold: t => ({
    label: t('components.ParticleCanvasControls.particleThreshold'),
    defaultValue: PARTICLE_CANVAS_DEFAULTS.particleThreshold,
    step: 2,
    min: 10,
    max: 80,
  }),
  particleRadius: t => ({
    label: t('components.ParticleCanvasControls.particleRadius'),
    defaultValue: PARTICLE_CANVAS_DEFAULTS.particleRadius,
    step: 1,
    min: 1,
    max: 10,
  }),
  particlePulseFrequency: t => ({
    label: t('components.ParticleCanvasControls.particlePulseFrequency'),
    defaultValue: PARTICLE_CANVAS_DEFAULTS.particlePulseFrequency,
    step: 0.01,
    min: 0,
    max: 0.2,
  }),
  linkWidth: t => ({
    label: t('components.ParticleCanvasControls.linkWidth'),
    defaultValue: PARTICLE_CANVAS_DEFAULTS.linkWidth,
    step: 0.1,
    min: 0.1,
    max: 5,
  }),
  linkDistanceLimit: t => ({
    label: t('components.ParticleCanvasControls.linkDistanceLimit'),
    defaultValue: PARTICLE_CANVAS_DEFAULTS.linkDistanceLimit,
    step: 10,
    min: 100,
    max: 400,
  }),
  slowMultiplier: t => ({
    label: t('components.ParticleCanvasControls.slowMultiplier'),
    defaultValue: PARTICLE_CANVAS_DEFAULTS.slowMultiplier,
    step: 1,
    min: 1,
    max: 50,
  }),
};

const reducer = (state, payload) => deepClone(payload);

export default () => {
  const classes = useStyles();
  const { t } = useCopy();
  const [appState, dispatch] = useContext(AppContext);
  const [state, dispatchState] = useReducer(reducer, appState[STORE_KEYS.PARTICLE_CANVAS]);
  const { isOnMobile } = appState[STORE_KEYS.SITE_SETTINGS];
  const debouncedAppState = useDebounce(state, 600);

  const ROW_ONE_ITEMS = [
    'particleColor',
    'particleCount',
    'particleThreshold',
    'particleRadius',
    'particlePulseFrequency',
  ];
  const ROW_TWO_ITEMS = ['linkColor', 'linkWidth', 'linkDistanceLimit', 'slowMultiplier'];

  const handleSliderChange = control => (event, value) => {
    if (value !== state[control]) {
      dispatchState({ ...deepClone(state), [control]: value });
    }
  };

  const handleReset = () => {
    dispatchState(PARTICLE_CANVAS_DEFAULTS);
    dispatch(
      updateAppState(STORE_KEYS.PARTICLE_CANVAS, undefined, undefined, PARTICLE_CANVAS_DEFAULTS)
    );
  };

  const renderSlider = control => {
    const { label, defaultValue, step, min, max } = controlsMapping[control](t);

    return (
      <Box className={classes.sliderContainer} key={label}>
        <Slider
          defaultValue={defaultValue}
          label={label}
          name={control}
          min={min}
          max={max}
          step={step}
          value={state[control]}
          onChange={handleSliderChange(control)}
        />
      </Box>
    );
  };

  useEffect(() => {
    if (debouncedAppState !== appState[STORE_KEYS.PARTICLE_CANVAS]) {
      dispatch(updateAppState(STORE_KEYS.PARTICLE_CANVAS, undefined, undefined, debouncedAppState));
    }
  }, [debouncedAppState, dispatch]);

  return (
    <Box className={classnames([classes.root, isOnMobile && CLASSES.IS_MOBILE])}>
      <Typography variant="h6">
        {t('components.ParticleCanvasControls.particleCanvasControls')}
      </Typography>

      {[ROW_ONE_ITEMS, ROW_TWO_ITEMS].map((row, i) => (
        <Box className={classes.controlRow} key={'particle-canvas-controls-row-' + i}>
          {Object.keys(controlsMapping)
            .filter(control => row.includes(control))
            .map(control => renderSlider(control))}
        </Box>
      ))}

      <Button className={classes.resetButton} variant="outlined" size="small" onClick={handleReset}>
        {t('common.reset', { name: t('common.canvas') })}
      </Button>
    </Box>
  );
};
