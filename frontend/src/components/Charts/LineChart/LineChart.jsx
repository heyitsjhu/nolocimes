import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import { BIG_NUMBER_PREFIXES, STORE_KEYS } from 'const';
import palette from 'theme/palette';

const PRIMARY_COLOR = palette.primary.main;
const LABEL_FONT_SIZE = 13;
const LABEL_COLOR = palette.text.primary;
const LINE_COLOR = palette.grey[600];
const SCROLLBAR_COLOR = palette.grey[800];

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  covidLineChartContainer: {
    marginBottom: spacing(4),
    width: '100%',
    height: `calc(100% - ${spacing(4)}px)`,
  },
}));

export default props => {
  const classes = useStyles();
  const coronavirus = useSelector(state => state.coronavirus);
  const { chartMetric } = coronavirus[STORE_KEYS.CONTROL_PANEL];
  const chart = useRef({});

  const setDateAxis = chart => {
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.baseInterval = { timeUnit: 'day', count: 1 };
    dateAxis.renderer.labels.template.fill = am4core.color(LINE_COLOR);
    dateAxis.renderer.labels.template.fontSize = LABEL_FONT_SIZE;
    dateAxis.renderer.line.stroke = am4core.color(LINE_COLOR);
    dateAxis.renderer.line.strokeOpacity = 1;
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;

    const dateTooltip = dateAxis.tooltip;
    dateTooltip.background.fill = am4core.color(LINE_COLOR);
    dateTooltip.background.strokeWidth = 0;
    dateTooltip.background.cornerRadius = 0;
    dateTooltip.background.pointerLength = 5;
    dateTooltip.label.fill = am4core.color(LABEL_COLOR);
    dateTooltip.label.fontSize = LABEL_FONT_SIZE;
  };

  const setValueAxis = chart => {
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.labels.template.fill = am4core.color(LINE_COLOR);
    valueAxis.renderer.labels.template.fontSize = LABEL_FONT_SIZE;
    valueAxis.renderer.line.stroke = am4core.color(LINE_COLOR);
    valueAxis.renderer.line.strokeOpacity = 1;

    const valueTooltip = valueAxis.tooltip;
    valueTooltip.background.fill = am4core.color(LINE_COLOR);
    valueTooltip.background.strokeWidth = 0;
    valueTooltip.background.cornerRadius = 0;
    valueTooltip.background.pointerLength = 5;
    valueTooltip.label.fill = am4core.color(LABEL_COLOR);
    valueTooltip.label.fontSize = LABEL_FONT_SIZE;
    valueTooltip.numberFormatter.numberFormat = '#.#a';
  };

  const setLineSeries = (chart, dataKey, country) => {
    const series = chart.series.push(new am4charts.LineSeries());
    series.data = chart.data[dataKey];
    series.dataFields.dateX = 'day';
    series.dataFields.valueY = country;
    series.name = dataKey;
    series.legendSettings.labelText = '[bold {color}]{name}[/]';
    series.legendSettings.valueText = '[bold {color}]{valueY.close}[/]';
    series.legendSettings.itemValueText = '[bold {color}]{valueY}[/]';
    series.showOnInit = false;

    return series;
  };

  const setColumnSeries = (chart, dataKey, country) => {
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.columns.template.width = am4core.percent(80);
    series.data = chart.data[dataKey];
    series.dataFields.dateX = 'day';
    series.dataFields.valueY = country;
    series.name = dataKey;
    series.legendSettings.labelText = '[bold {color}]{name}[/]';
    series.legendSettings.valueText = '[bold {color}]{valueY.close}[/]';
    series.legendSettings.itemValueText = '[bold {color}]{valueY}[/]';
    series.showOnInit = false;

    return series;
  };

  const setLegend = chart => {
    chart.legend = new am4charts.Legend();
    chart.legend.parent = chart.plotContainer;
    chart.legend.position = 'left';
    chart.legend.valign = 'top';
    chart.legend.dy = -16;
    chart.legend.maxHeight = am4core.percent(40);
    chart.legend.scrollable = false;
    chart.legend.itemContainers.template.paddingTop = 2;
    chart.legend.itemContainers.template.paddingBottom = 2;
    chart.legend.labels.template.fill = am4core.color(LINE_COLOR);
    chart.legend.labels.template.fontSize = LABEL_FONT_SIZE;
    chart.legend.labels.template.text = '[bold {color}]{name}[/]';
    chart.legend.markers.template.disabled = true;

    return chart.legend;
  };

  const setXYCursor = chart => {
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'zoomXY';

    chart.cursor.lineX.stroke = am4core.color(LINE_COLOR);
    chart.cursor.lineX.strokeOpacity = 1;
    chart.cursor.lineX.strokeDasharray = '5,5';

    chart.cursor.lineY.stroke = am4core.color(LINE_COLOR);
    chart.cursor.lineY.strokeOpacity = 1;
    chart.cursor.lineY.strokeDasharray = '5,5';

    return chart.cursor;
  };

  const setScrollbarX = chart => {
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.strokeWidth = 0;
    chart.scrollbarX.background.fill = am4core.color(SCROLLBAR_COLOR);
    chart.scrollbarX.background.fillOpacity = 0.4;

    chart.scrollbarX.thumb.background.fill = am4core.color(SCROLLBAR_COLOR);
    chart.scrollbarX.thumb.background.fillOpacity = 1;

    customizeScrollbarGrip(chart.scrollbarX.startGrip);
    customizeScrollbarGrip(chart.scrollbarX.endGrip);

    return chart.scrollbarX;
  };

  const setScrollbarY = chart => {
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.strokeWidth = 0;
    chart.scrollbarY.background.fill = am4core.color(SCROLLBAR_COLOR);
    chart.scrollbarY.background.fillOpacity = 0.4;

    chart.scrollbarY.thumb.background.fill = am4core.color(SCROLLBAR_COLOR);
    chart.scrollbarY.thumb.background.fillOpacity = 1;

    customizeScrollbarGrip(chart.scrollbarY.startGrip);
    customizeScrollbarGrip(chart.scrollbarY.endGrip);

    return chart.scrollbarY;
  };

  const setZoomOutButton = chart => {
    chart.zoomOutButton.background.cornerRadius(4, 4, 4, 4);
    chart.zoomOutButton.background.fill = am4core.color(LINE_COLOR);
    chart.zoomOutButton.background.fillOpacity = 1;
    chart.zoomOutButton.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    const hoverState = chart.zoomOutButton.background.states.getKey('hover');
    hoverState.properties.fill = am4core.color(PRIMARY_COLOR);
  };

  const customizeScrollbarGrip = grip => {
    grip.icon.disabled = true;
    grip.background.fill = am4core.color(LINE_COLOR);
    grip.background.fillOpacity = 1;
  };

  useEffect(() => {
    // dispatch(updateAppState(STORE_KEYS.CORONAVIRUS, 'isLoading', undefined,true));

    chart.current = am4core.create(props.id, am4charts.XYChart);
    chart.current.paddingTop = 4;
    chart.current.paddingLeft = 4;
    chart.current.paddingRight = 4;
    chart.current.paddingBottom = 4;
    chart.current.numberFormatter.numberFormat = '#,###a';
    chart.current.numberFormatter.bigNumberPrefixes = BIG_NUMBER_PREFIXES;
    chart.current.preloader.disabled = true;
    chart.current.data = props.data;

    setDateAxis(chart.current);
    setValueAxis(chart.current);

    setLegend(chart.current);
    setXYCursor(chart.current);
    setScrollbarX(chart.current);
    setScrollbarY(chart.current);
    setZoomOutButton(chart.current);

    return () => setTimeout(() => chart.current && chart.current.dispose(), 50);
  }, []);

  useEffect(() => {
    const { selectedCountries, selectedCountry } = props.controlPanel;

    // TODO: need to figure a clean way to load data
    setTimeout(() => {
      // selectedCountries.forEach(country => {
      //   setLineSeries(chart.current, 'cases_total', country);
      //   setLineSeries(chart.current, 'cases_active', country);
      //   setLineSeries(chart.current, 'cases_recovered', country);
      //   setColumnSeries(chart.current, 'cases_new', country);
      // });

      setLineSeries(chart.current, 'cases_total', selectedCountry);
      setLineSeries(chart.current, 'cases_active', selectedCountry);
      setLineSeries(chart.current, 'cases_recovered', selectedCountry);
      setColumnSeries(chart.current, 'cases_new', selectedCountry);
      // dispatch(updateAppState(STORE_KEYS.CORONAVIRUS, 'isLoading', undefined,false));
    }, 1000);
  }, [props.id]);

  useEffect(() => {
    // TODO: Use amcharts way of updating data set
    if (props.data && Array.isArray(chart.current.data) && chart.current.data.length === 0) {
      chart.current.data = props.data;
    } else {
      console.log(props.data, chart.current.data);

      am4core.array.each(chart.current.data, (dataRow, i) => {
        console.log('Data Row ' + i, dataRow);
      });

      if (chart.current) {
        chart.current.series.each(serie => {
          serie.dataFields.valueY = props.controlPanel.selectedCountry;
        });
      }
    }
  }, [props.data]);

  // console.log("CHART", props, chartData);

  return <Box id={props.id} className={classnames(classes.covidLineChartContainer)} />;
};
