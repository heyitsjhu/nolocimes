import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import Box from '@material-ui/core/Box';

import { C19_STATISTICS_OPTIONS, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { useCoronavirusService } from 'services/coronavirusService';
import palette from 'theme/palette';
import * as Utils from 'utils';
import * as ChartUtils from './utils';

export default props => {
  const { t } = useCopy();
  const coronavirus = useSelector(state => state.coronavirus);
  const { controlPanel, countries, statistics: data } = coronavirus;

  useCoronavirusService();

  const [chartData, setChartData] = useState([]);
  const chart = useRef({});
  const imageSeriesRef = useRef({});

  const setMapPolygonAndImageSeries = useCallback(
    (chart, chartData) => {
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
      imageSeries.dataFields.id = 'id';
      imageSeries.dataFields.value = 'value';

      // Tooltip adjustments
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
      imageTemplate.tooltipHTML = ChartUtils.renderHTMLTooltip(
        controlPanel[STORE_KEYS.CHART_METRIC],
        C19_STATISTICS_OPTIONS,
        t
      );

      // When hovered, circles become non-opaque
      let imageHoverState = imageTemplate.states.create('hover');
      imageHoverState.properties.fillOpacity = 1;

      let circle = imageTemplate.createChild(am4core.Circle);

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

      polygonTemplate.events.on('over', event =>
        ChartUtils.handleOnCountryOver(event, imageSeries)
      );
      polygonTemplate.events.on('out', event => ChartUtils.handleOnCountryOut(event, imageSeries));

      imageSeriesRef.current = imageSeries;

      // Generate zoom controls
      chart.zoomControl = new am4maps.ZoomControl();
      chart.zoomControl.background.fillOpacity = 0;

      ['plusButton', 'minusButton'].forEach(button => {
        chart.zoomControl[button].background.fill = am4core.color(palette.grey[700]);
        chart.zoomControl[button].background.fillOpacity = 1;
        chart.zoomControl[button].background.strokeWidth = 0;
        chart.zoomControl[button].background.states.getKey('hover').properties.fill = am4core.color(
          palette.grey[400]
        );
      });

      // Genearate small map
      chart.smallMap = new am4maps.SmallMap();
      chart.smallMap.series.push(polygonSeries);
      chart.smallMap.background.stroke = am4core.color(palette.grey[700]);
      chart.smallMap.background.strokeOpacity = 1;
      chart.smallMap.background.fill = am4core.color(palette.common.black);
      chart.smallMap.background.fillOpacity = 0.2;
      chart.smallMap.rectangle.stroke = am4core.color(palette.primary.main);
      chart.smallMap.rectangle.strokeWidth = 2;
    },
    [t]
  );

  useEffect(() => {
    if (data?.length && countries?.length) {
      const chartData = Utils.convertCovidStatisticsDataForAmcharts(data, countries);

      chartData.forEach(serie => {
        serie['value'] = serie[controlPanel[STORE_KEYS.CHART_METRIC]];
      });

      setChartData(chartData);
    }
  }, [countries, data]);

  useEffect(() => {
    chart.current = am4core.create(props.id, am4maps.MapChart);
    // chart.current.events.on('ready', () => setIsLoading(false));

    setMapPolygonAndImageSeries(chart.current, chartData);

    return () => chart.current && chart.current.dispose();
  }, [props.id, chartData]);

  useEffect(() => {
    if (imageSeriesRef.current) {
      am4core.array.each(imageSeriesRef.current.data, (serie, i) => {
        serie['value'] = serie[controlPanel[STORE_KEYS.CHART_METRIC]];
      });

      imageSeriesRef.current.mapImages.template.tooltipHTML = ChartUtils.renderHTMLTooltip(
        controlPanel[STORE_KEYS.CHART_METRIC],
        C19_STATISTICS_OPTIONS,
        t
      );

      imageSeriesRef.current.invalidateRawData();
    }
  }, [controlPanel[STORE_KEYS.CHART_METRIC]]);

  return <Box id={props.id} style={{ width: '100%', height: '100%' }} />;
};
