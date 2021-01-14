import React, { useContext, useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
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

import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import { updateAppState } from 'stores/actions/appActions';

import CHART_METRICS from './options/chartMetrics.json';

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  lineChartEditor: {
    padding: spacing(2),
  },
}));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const renderCheckboxComponent = (option, { selected }) => (
  <React.Fragment>
    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
    {option}
  </React.Fragment>
);

const renderInputComponent = params => (
  <TextField {...params} variant="outlined" label="Select Countries" placeholder="Search..." />
);

const stateReducer = (state, action) => {
  return { ...state, ...action };
};

export default props => {
  const classes = useStyles();
  const { t } = useCopy();
  const [appState, dispatch] = useContext(AppContext);
  const { controlPanel, countries, history } = appState[STORE_KEYS.CORONAVIRUS];
  const [state, dispatchState] = useReducer(stateReducer, controlPanel);

  const stateHandler = (key, value) => (event, autocompleteValue, autocompleteReason) => {
    const newState = Object.assign({}, state);
    if (['showGlobalTotals'].includes(key)) {
      newState[key] = event.target.checked;
    } else if (key === 'countrySelect') {
      const selectedCountries = autocompleteValue;
      const countriesToFetch = selectedCountries.filter(function (obj) {
        return history._retrievedCountries.indexOf(obj) === -1;
      });

      newState.selectedCountries = selectedCountries;
      newState.countriesToFetch = countriesToFetch;
    } else {
      newState[key] = event.target.value;
    }

    dispatchState(newState);
    // dispatch(updateAppState(STORE_KEYS.CORONAVIRUS, 'controlPanel', newState));
  };

  return (
    <Box className={classes.lineChartEditor}>
      <Autocomplete
        multiple
        style={{ width: 300 }}
        options={countries}
        getOptionLabel={option => option}
        noOptionsText={'no country found'} //TBD
        value={state.selectedCountries}
        disableCloseOnSelect
        renderOption={renderCheckboxComponent}
        renderInput={renderInputComponent}
        onChange={stateHandler('countrySelect')}
      />
      <Box>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.chartMetric}
            onChange={stateHandler('chartMetric')}
          >
            {CHART_METRICS.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.showGlobalTotals}
              onChange={stateHandler('showGlobalTotals', !state.showGlobalTotals)}
              name="showGlobalTotals"
              color="primary"
            />
          }
          label="Show global totals"
        />
      </Box>
    </Box>
  );
};
