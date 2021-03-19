import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AutorenewRoundedIcon from '@material-ui/icons/AutorenewRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import Autocomplete from '@material-ui/lab/Autocomplete';
import classnames from 'classnames';

import { ROUTES } from 'const';
import { useCopy } from 'hooks/useCopy';
import { useSearchQuery } from 'hooks/useSearchQuery';

const useStyles = makeStyles(({ shared, spacing, typography }) => ({
  searchBarContainer: {
    width: '100%',
    maxWidth: '50%',
    '& + .MuiAutocomplete-popper': {
      '& .MuiAutocomplete-loading': {
        padding: `${spacing(1) / 2}px ${spacing(1)}px`,
        '& span': {
          paddingLeft: spacing(1),
          fontWeight: typography.fontWeightMedium,
        },
      },
      '& .MuiAutocomplete-listbox': { paddingBottom: 0 },
      '& .MuiAutocomplete-option': {
        ...typography.body2,
        padding: `${spacing(1) / 2}px ${spacing(1) * 1.5}px`,
      },
    },
  },
  inputContainer: {
    paddingLeft: spacing(1),
    paddingRight: spacing(1),
    fontSize: '0.875rem',
    border: shared.borderDefault,
    borderRadius: 3,
    boxShadow: 'none',
    transition: 'border 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
    '&:hover': {
      border: '1px solid rgba(67, 90, 111, 0.3)',
      boxShadow: '0 0 4px 1px rgba(67, 90, 111, 0.3), 0 3px 24px rgba(67, 90, 111, 0.14)',
    },
    '& .MuiAutocomplete-input': { padding: spacing(1) },
  },
  textField: { margin: 0 },
  inputFocused: {
    border: '1px solid rgba(67, 90, 111, 0.3)',
    boxShadow: '0 0 4px 1px rgba(67, 90, 111, 0.3), 0 3px 24px rgba(67, 90, 111, 0.14)',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  loadingIcon: {
    animation: '$rotation 1500ms infinite linear',
    transformOrigin: '50% 50%',
    lineHeight: 0,
  },
  '@keyframes rotation': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(359deg)' },
  },
}));

export default props => {
  const classes = useStyles();
  const { t } = useCopy();
  const history = useHistory();
  const [data, setTickerQuery] = useSearchQuery();
  const [loading, setLoading] = useState(false);
  const [debounce, setDebounce] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleOnBlur = () => {
    setInputFocused(false);
  };

  const handleOnFocus = () => {
    setInputFocused(true);
  };

  // TODO clear search input after user selects result.
  const handleOnChange = (event, newValue) => {
    setValue(newValue);

    if (newValue) {
      const ticker = newValue.substr(0, newValue.indexOf(' '));
      history.push(ROUTES.TO_TICKER(ticker));
    }
  };

  const handleOnInputChange = (event, newValue) => {
    setLoading(true);
    clearTimeout(debounce);
    setInputValue(newValue);
    setDebounce(setTimeout(() => setTickerQuery(newValue), 500));
  };

  useEffect(() => {
    if (data) {
      const results = data.map(({ symbol, securityName, region }) => `${symbol} - ${securityName}`);
      setSuggestions(results);
      setLoading(false);
    }
  }, [data]);

  const Loading = () => {
    return (
      <Box className={classes.loadingContainer}>
        <Box className={classes.loadingIcon}>
          <AutorenewRoundedIcon fontSize="small" />
        </Box>
        <Typography variant="caption">{t('common.fetchingResults')}</Typography>
      </Box>
    );
  };

  return (
    <Box className={classes.searchBarContainer}>
      <Autocomplete
        blurOnSelect
        className={props.className}
        disableClearable
        disablePortal
        freeSolo
        open
        // open={inputFocused && suggestions.length > 0}
        loading={loading}
        loadingText={<Loading />}
        options={suggestions}
        filterOptions={options => options}
        inputValue={inputValue}
        value={value}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onChange={handleOnChange}
        onInputChange={handleOnInputChange}
        renderInput={params => (
          <TextField
            {...params}
            className={classes.textField}
            name="header-search-input"
            placeholder={t('common.search')}
            InputProps={{
              ...params.InputProps,
              className: classnames([classes.inputContainer, inputFocused && classes.inputFocused]),
              disableUnderline: true,
              startAdornment: <SearchRoundedIcon fontSize="small" />,
              type: 'search',
            }}
          />
        )}
      />
    </Box>
  );
};
