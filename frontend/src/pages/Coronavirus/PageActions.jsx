import React, { useContext, useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import { updateCoronavirusState } from 'stores/actions/coronavirusActions';
import { getElId } from 'utils';

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
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
  const classes = useStyles();
  const { t } = useCopy();
  const [appState, dispatch] = useContext(AppContext);
  const { controlPanel, countries, history } = appState[STORE_KEYS.CORONAVIRUS];

  const stateHandler = key => (event, newValue) => {
    dispatch(updateCoronavirusState(STORE_KEYS.CONTROL_PANEL, key, newValue));
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
