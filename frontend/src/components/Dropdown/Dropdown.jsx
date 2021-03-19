import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classnames from 'classnames';

const useStyles = makeStyles(({ palette, spacing, typography }) => ({
  formControl: {
    margin: spacing(1),
    minWidth: 120,
    '& .MuiInputBase-root': {
      fontSize: 14,
    },
  },
  inputLabel: {
    ...typography.overline,
    color: palette.text.secondary,
  },
  selectEmpty: {
    marginTop: spacing(2),
  },
  select: {
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent',
    },
  },
}));

export default ({ id, labelId, label, options, ...otherProps }) => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(otherProps.value);

  const handleChange = event => {
    setSelected(event.target.value);
    otherProps.onChange && otherProps.onChange(event);
  };

  return (
    <FormControl className={classnames([classes.formControl, otherProps.className])}>
      <InputLabel id={labelId} className={classes.inputLabel}>
        {label}
      </InputLabel>
      <Select
        className={classes.select}
        labelId={labelId}
        id={id}
        value={selected}
        onChange={handleChange}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
