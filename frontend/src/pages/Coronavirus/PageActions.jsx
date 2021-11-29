import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import BarChartIcon from '@material-ui/icons/BarChart';
import PublicIcon from '@material-ui/icons/Public';
import TableChartIcon from '@material-ui/icons/TableChart';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { C19_STATISTICS_OPTIONS, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { updateCoronavirus } from 'redux/reducers/coronavirus';
import { getElId } from 'utils';

const useStyles = makeStyles(() => ({
  pageActions: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  chartHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  formControl: {
    width: '100%',
    minWidth: 170,
    maxWidth: 200,
  },
}));

export default React.memo(() => {
  const { t } = useCopy();
  const dispatch = useDispatch();
  const classes = useStyles();
  const coronavirus = useSelector(state => state.coronavirus);
  const { controlPanel } = coronavirus;

  const handleChange = key => event => {
    dispatch(updateCoronavirus(STORE_KEYS.CONTROL_PANEL, key, null, event.target.value));
  };

  const handleTabChange = key => (event, newValue) => {
    dispatch(updateCoronavirus(STORE_KEYS.CONTROL_PANEL, key, null, newValue));
  };

  return (
    <Box className={classes.pageActions}>
      <Box className={classes.chartHeader}>
        <Typography>{t('pages.Coronavirus.title')}</Typography>
      </Box>

      <Tabs
        value={controlPanel[STORE_KEYS.VIEW_MODE]}
        onChange={handleTabChange(STORE_KEYS.VIEW_MODE)}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="Select between map, chart or table views"
      >
        <Tab icon={<PublicIcon fontSize="small" />} aria-label="Map View" value="map" />
        <Tab icon={<BarChartIcon fontSize="small" />} aria-label="Chart View" value="chart" />
        <Tab icon={<TableChartIcon fontSize="small" />} aria-label="Table View" value="table" />
      </Tabs>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{t('common.metric')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={controlPanel[STORE_KEYS.CHART_METRIC]}
          onChange={handleChange(STORE_KEYS.CHART_METRIC)}
        >
          {C19_STATISTICS_OPTIONS.map(option => (
            <MenuItem key={option} name={t(`pages.Coronavirus.labels.${option}`)} value={option}>
              {t(`pages.Coronavirus.labels.${option}`)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
});
