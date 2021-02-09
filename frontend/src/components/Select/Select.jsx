import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { getElId } from 'utils';
import classnames from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    width: '100%',
  },
  inputLabel: {
    whiteSpace: 'nowrap',
  },
}));

export default ({
  children,
  className,
  disabled,
  error,
  helperText,
  InputProps = {},
  id,
  label,
  options,
  value,
  onBlur,
  onChange,
}) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState(value);

  const _InputProps = {
    ...InputProps,
    className: classnames([classes.inputProps, InputProps.className]),
  };

  const handleOnChange = e => {
    setInputValue(e.target.value);
    onChange && onChange(e);
  };

  const renderOptions = () => {
    return options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  };

  return (
    <TextField
      className={classnames([classes.root, className])}
      disabled={disabled}
      error={error}
      id={getElId('select-textfield', id)}
      helperText={helperText}
      label={label}
      select
      InputLabelProps={{ className: classes.inputLabel }}
      InputProps={_InputProps}
      value={inputValue}
      onBlur={onBlur}
      onChange={handleOnChange}
    >
      {children ? children : options ? renderOptions() : null}
    </TextField>
  );
};
