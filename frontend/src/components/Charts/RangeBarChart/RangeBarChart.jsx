import React, { useEffect, useLayoutEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

// import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import { AXIS_LINE_COLOR, TEXT_COLOR, TEXT_SIZE } from 'const/charts';
import {
  createChart,
  createCursor,
  createAxis,
  createCircleBullet,
  createLabelBullet,
  createLineSeries,
  createColumnSeries,
} from 'helpers/chartHelpers';

// Creates the high/low range labels along the x-axis
const setCustomRangeLabels = (valueAxis, axisRange) => {
  const alignment = ['left', 'right'];

  axisRange.forEach((rangeValue, i) => {
    if (valueAxis.axisRanges.length < 2) {
      const range = valueAxis.axisRanges.create();

      range.label.text = rangeValue;
      range.label.align = alignment[i];
      range.label.dx = alignment[i] === 'left' ? -10 : 10;
      range.label.dy = -5;
      range.label.fill = am4core.color(TEXT_COLOR);
      range.label.fontSize = TEXT_SIZE;
      range.grid.strokeWidth = 0;
      range.label.numberFormatter.numberFormat = '$#.##';
    } else {
      const range = valueAxis.axisRanges.getIndex(i);
      range.label.text = rangeValue;
    }
  });
};

// Draw series min/max onto axis range
const drawBarSeries = (chart, lowValue, highValue, color) => {
  const series = createColumnSeries(chart);
  const height = lowValue === 'min' ? 60 : 100;

  series.clustered = false;
  series.dataFields.categoryY = 'symbol';
  series.dataFields.openValueX = lowValue;
  series.dataFields.valueX = highValue;
  series.columns.template.fill = am4core.color(color);
  series.columns.template.fillOpacity = lowValue === 'min' ? 1 : 0.9;
  series.columns.template.strokeWidth = 0;
  series.columns.template.height = am4core.percent(height);

  return series;
};

export default ({ data, id, title }) => {
  const chart = useRef(null);

  useEffect(() => {
    return () => chart.current?.dispose();
  }, []);

  useLayoutEffect(() => {
    /** 
      [
        {
          "symbol": "AAPL",
          "min": 153.25,
          "max": 154.8,
          "rangeLower": 153.28,
          "rangeUpper": 154
        }
      ]  
    */
    if (!chart.current && data.length) {
      const { min, max } = data[0];
      chart.current = createChart(id);
      chart.current.paddingTop = 0;

      chart.current.data = data;

      const categoryAxis = createAxis(chart.current, 'CategoryAxis', 'yAxes');
      categoryAxis.dataFields.category = 'symbol';
      categoryAxis.renderer.labels.template.disabled = true;
      categoryAxis.cursorTooltipEnabled = false;

      const valueAxis = createAxis(chart.current, 'ValueAxis', 'xAxes');
      valueAxis.cursorTooltipEnabled = false;
      valueAxis.min = min;
      valueAxis.max = max;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.strictMinMax = true;
      valueAxis.title.dy = -8;
      valueAxis.title.text = title;

      setCustomRangeLabels(valueAxis, [min, max]);

      drawBarSeries(chart.current, 'min', 'max', AXIS_LINE_COLOR);
      drawBarSeries(chart.current, 'rangeLower', 'rangeUpper', 'orange');

      createCursor(chart.current);

      // return () => chart.current.dispose();
    } else if (chart.current && chart.current.data.length) {
      const { min, max } = data[0];
      const valueAxis = chart.current.xAxes.getIndex(0);
      valueAxis.min = min;
      valueAxis.max = max;
      setCustomRangeLabels(valueAxis, [min, max]);

      am4core.array.each(chart.current.data, (rowData, i) => {
        chart.current.data[i].max = data[i].max;
        chart.current.data[i].min = data[i].min;
        chart.current.data[i].rangeLower = data[i].rangeLower;
        chart.current.data[i].rangeUpper = data[i].rangeUpper;
        chart.current.data[i].symbol = data[i].symbol;
      });

      chart.current.invalidateRawData();
    }
  }, [data]);

  return <Box id={id} style={{ width: '100%', height: '100%' }} />;
};
