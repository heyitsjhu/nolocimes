import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import { DateTime } from 'luxon';

import { Loader } from 'components';
import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { useCoronavirusService } from 'services/coronavirusService';
import { updateCoronavirus } from 'redux/reducers/coronavirus';
import palette from 'theme/palette';
import * as Utils from 'utils';
import * as ChartUtils from './utils';

// am4core.useTheme(am4themes_animated);

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  chartHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: spacing(2),
    zIndex: 10,
  },

  covidMapChartContainer: {
    // marginTop: spacing(1),
    // marginBottom: spacing(4),
  },
  chartOuterContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  controlPanel: {},
}));

export default props => {
  const { t } = useCopy();
  const dispatch = useDispatch();
  const classes = useStyles();
  const coronavirus = useSelector(state => state.coronavirus);
  // TODO: update the service
  const coro = useCoronavirusService();

  const { controlPanel: chartConfig, countries, statistics: data } = coronavirus;

  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  const chart = useRef({});
  const imageSeriesRef = useRef({});

  const setMapPolygonAndImageSeries = (chart, chartData) => {
    if (!chart) return;

    chart.geodata = am4geodata_worldLow;

    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.calculateVisualCenter = true;
    polygonSeries.exclude = ['AQ'];

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.fill = am4core.color(palette.grey[800]);
    polygonTemplate.setStateOnChildren = true;
    polygonTemplate.stroke = am4core.color(palette.grey[900]);
    polygonTemplate.strokeOpacity = 0.35;
    polygonTemplate.strokeWidth = 1;
    polygonTemplate.tooltipPosition = 'fixed';

    let polygonHoverState = polygonTemplate.states.create('hover');
    polygonHoverState.transitionDuration = 1000;
    polygonHoverState.properties.fill = am4core.color(palette.grey[900]);

    // ------------------------------------------------

    let imageSeries = chart.series.push(new am4maps.MapImageSeries());

    imageSeries.data = chartData;

    //TODO: allow users to change which data point they want to see
    imageSeries.dataFields.id = 'id';
    imageSeries.dataFields.value = chartConfig.chartMetric;

    // tooltip adjustments
    imageSeries.tooltip.animationDuration = 0;
    imageSeries.tooltip.background.fill = am4core.color(palette.background.default);
    imageSeries.tooltip.background.fillOpacity = 0.3;
    imageSeries.tooltip.background.stroke = am4core.color(palette.primary.main);
    imageSeries.tooltip.background.strokeOpacity = 0.8;
    imageSeries.tooltip.getFillFromObject = false;
    imageSeries.tooltip.getStrokeFromObject = false;
    imageSeries.tooltip.keepTargetHover = true;
    imageSeries.tooltip.showInViewport = false;
    // imageSeries.tooltip.label.interactionsEnabled = true;

    let imageTemplate = imageSeries.mapImages.template;
    imageTemplate.applyOnClones = true;
    imageTemplate.fill = am4core.color(palette.primary.main);
    imageTemplate.fillOpacity = 0.5;
    imageTemplate.nonScaling = true;
    imageTemplate.tooltipText = '{name}: [bold]{value}[/]';

    let circle = imageTemplate.createChild(am4core.Circle);

    // When hovered, circles become non-opaque
    let imageHoverState = imageTemplate.states.create('hover');
    imageHoverState.properties.fillOpacity = 1;

    imageSeries.heatRules.push({
      target: circle,
      property: 'radius',
      min: 3,
      max: 24,
      dataField: 'value',
    });

    imageTemplate.adapter.add('latitude', (latitude, target) =>
      ChartUtils.centerImageBubbleOverCountry('Latitude', latitude, target, polygonSeries)
    );
    imageTemplate.adapter.add('longitude', (longitude, target) =>
      ChartUtils.centerImageBubbleOverCountry('Longitude', longitude, target, polygonSeries)
    );
    imageTemplate.adapter.add('tooltipY', ChartUtils.positionTooltipToTop);

    imageTemplate.events.on('over', event => ChartUtils.handleOnImageOver(event, polygonSeries));
    imageTemplate.events.on('out', event => ChartUtils.handleOnImageOut(event, polygonSeries));

    polygonTemplate.events.on('over', event => ChartUtils.handleOnCountryOver(event, imageSeries));
    polygonTemplate.events.on('out', event => ChartUtils.handleOnCountryOut(event, imageSeries));

    imageSeriesRef.current = imageSeries;
  };

  const handleChange = event => {
    const newChartConfig = { ...chartConfig, chartMetric: event.target.value };
    dispatch(updateCoronavirus(STORE_KEYS.CONTROL_PANEL, null, null, newChartConfig));
  };

  useEffect(() => {
    if (data) {
      const chartData = Utils.convertCovidStatisticsDataForAmcharts(data, countries);

      console.log('theres data', coro, chartData);
      setChartData(chartData);
    }
  }, [data]);

  useEffect(() => {
    chart.current = am4core.create(props.id, am4maps.MapChart);
    chart.current.events.on('ready', () => setIsLoading(false));
    setMapPolygonAndImageSeries(chart.current, chartData);

    return () => chart.current && chart.current.dispose();
  }, [props.id, chartData]);

  useEffect(() => {
    if (imageSeriesRef.current) {
      // TODO: updating dataField value isn't redrawing map
      imageSeriesRef.current.dataFields.value = chartConfig.chartMetric;
    }
  }, [chartConfig.chartMetric]);

  const choices = [
    'cases_new',
    'cases_active',
    'cases_critical',
    'cases_recovered',
    'cases_total',
    'deaths_new',
    'deaths_total',
    'tests_total',
  ];

  return (
    <Box className={classes.chartOuterContainer}>
      <Loader isLoading={isLoading} />
      <Box className={classes.chartHeader}>
        {chartData && chartData.length && (
          <Typography variant="caption">
            {DateTime.fromISO(chartData[0].time).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
          </Typography>
        )}
        <Typography variant="h4">
          {t(`pages.Coronavirus.labels.${chartConfig.chartMetric}`)}
        </Typography>
      </Box>

      <Box
        id={props.id}
        className={classnames(classes.covidMapChartContainer)}
        style={{ width: '100%', height: '100%' }}
      />

      <Box className={classes.controlPanel}>
        <RadioGroup
          aria-label="covid stats label" // TODO - give proper name
          name="statsLabels"
          value={chartConfig.chartMetric}
          onChange={handleChange}
        >
          {choices.map(option => (
            <FormControlLabel
              control={<Radio size="small" />}
              key={option}
              label={t(`pages.Coronavirus.labels.${option}`)}
              value={option}
            />
          ))}
        </RadioGroup>
      </Box>
    </Box>
  );
};
