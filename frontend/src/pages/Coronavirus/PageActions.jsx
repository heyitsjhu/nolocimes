import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { updateCoronavirus } from 'redux/reducers/coronavirus';
import { getElId } from 'utils';

const useStyles = makeStyles(() => ({
  pageActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  autocomplete: {
    '& .MuiInputBase-input.MuiInput-input': {
      fontSize: '0.875rem',
    },
    '& .MuiAutocomplete-endAdornment': {
      top: 'calc(50% - 18px)',
    },
  },
}));

export default () => {
  const { t } = useCopy();
  const dispatch = useDispatch();
  const classes = useStyles();
  const coronavirus = useSelector(state => state.coronavirus);
  const { controlPanel, countries, history } = coronavirus;

  const stateHandler = key => (event, newValue) => {
    const newControlPanel = { ...controlPanel, [key]: newValue };
    dispatch(updateCoronavirus([STORE_KEYS.CONTROL_PANEL], null, null, newControlPanel));
  };

  return (
    <Box className={classes.pageActions}>
      <Autocomplete
        autoHighlight
        className={classes.autocomplete}
        disableClearable
        id={getElId('action', 'covid-select-country')}
        options={countries}
        getOptionLabel={option => option}
        renderInput={params => <TextField {...params} label={t('common.country')} name="country" />}
        size="small"
        style={{ minWidth: 200 }}
        value={controlPanel.selectedCountry}
        onChange={stateHandler('selectedCountry')}
      />
    </Box>
  );
};
