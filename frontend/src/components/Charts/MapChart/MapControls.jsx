import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import { useCopy } from 'hooks/useCopy';

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  mapControlsContainer: {
    width: '100%',
    height: '100%',
    overflowX: 'scroll',
    overflowY: 'hidden',
  },
  formControl: {
    width: 'inherit',
    height: 'inherit',
  },
  checkboxesFormGroup: {
    padding: spacing(2),
    width: 'inherit',
    height: '100%',
  },
  formControlLabel: {
    marginRight: spacing(4),
    color: palette.grey[800],
  },
  checkbox: {
    color: palette.grey[800],
  },
}));

export default props => {
  const selectedCountries = props.selectedCountries;
  const classes = useStyles();
  const { t } = useCopy();

  const handleChange = event => {
    const countries = Array.from(selectedCountries);
    const checked = event.target.checked;
    const selected = event.target.name;

    if (checked) {
      props.setSelectedCountries([...countries, selected]);
    } else {
      const index = countries.findIndex(country => country === selected);
      countries.splice(index, 1);
      props.setSelectedCountries(countries);
    }
  };

  const renderCheckboxes = () => {
    return (
      <FormGroup className={classes.checkboxesFormGroup}>
        {props.countriesList.map(country => (
          <FormControlLabel
            className={classes.formControlLabel}
            key={country}
            control={
              <Checkbox
                className={classes.checkbox}
                checked={selectedCountries.includes(country.toLowerCase())}
                color="primary"
                onChange={handleChange}
                name={country.toLowerCase()}
              />
            }
            label={country}
          />
        ))}
      </FormGroup>
    );
  };

  return (
    <Box className={classes.mapControlsContainer}>
      <FormControl className={classes.formControl} component="fieldset">
        {renderCheckboxes()}
      </FormControl>
    </Box>
  );
};
