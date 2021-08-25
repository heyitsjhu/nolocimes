import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';

import { STORE_KEYS } from 'const';
import {
  createChart,
  createAxis,
  createCircleBullet,
  createLabelBullet,
  createColumnSeries,
  createLineSeries,
} from 'helpers/chartHelpers';
import { getShortenedQuarter } from 'helpers/stringHelpers';
import { useCopy } from 'hooks/useCopy';
import { getElId, deepClone } from 'utils';
import { FORECAST_LINE_DASH, FORECAST_COLUMN_DASH, FORECAST_OPACITY } from 'const';

export default props => {
  const { t } = useCopy();
  const candleMonkeys = useSelector(state => state.candleMonkeys);
  const { earnings: stockEarnings, estimates: stockEstimates } = candleMonkeys[
    STORE_KEYS.STOCK_DATA
  ];
  const [earningsData, setEarningsData] = useState(null);
  const chartId = getElId('id', 'chart--earnings-estimates');
  const chart = useRef(null);

  // actualEPS: 2.46,
  // consensusEPS: 2.36,
  // announceTime: 'AMC',
  // numberOfEstimates: 34,
  // EPSSurpriseDollar: 0.1,
  // EPSReportDate: '2019-10-30',
  // fiscalPeriod: 'Q3 2019',
  // fiscalEndDate: '2019-09-30',
  // yearAgo: 2.73,
  // yearAgoChangePercent: -0.0989,

  // returns a random number between the values identified
  // by the given key in the supplied dataset
  const getValueBetweenMaxMin = (data, key) => {
    const values = data.map(item => item[key]);
    const [max, min] = [Math.max(...values), Math.min(...values)];
    const value = Math.random() * (max - min) + min;

    return value.toFixed(2);
  };

  const transformEarningsData = (earnings, estimates) => {
    const data = deepClone([...earnings].reverse()).map(item => ({
      ...item,
      fiscalPeriod: getShortenedQuarter(item.fiscalPeriod),
    }));

    // handles styling for the estimates entry
    data[data.length - 1].lineDash = FORECAST_LINE_DASH;
    data.push({
      ...estimates[0],
      actualEPS: getValueBetweenMaxMin(data, 'actualEPS'),
      fiscalPeriod: getShortenedQuarter(estimates[0].fiscalPeriod),
      columnDash: FORECAST_COLUMN_DASH,
      fillOpacity: FORECAST_OPACITY,
    });

    return data;
  };

  useEffect(() => {
    const { earnings } = stockEarnings;
    const { estimates } = stockEstimates;
    if (earnings && estimates) {
      const data = transformEarningsData(earnings, estimates);

      setEarningsData(data);
    }
  }, [stockEarnings, stockEstimates]);

  useLayoutEffect(() => {
    if (!chart.current && earningsData && earningsData.length) {
      chart.current = createChart(chartId);
      chart.current.data = earningsData;

      const categoryAxis = createAxis(chart.current, 'CategoryAxis', 'xAxes');
      categoryAxis.dataFields.category = 'fiscalPeriod';
      categoryAxis.cursorTooltipEnabled = false;

      const valueAxis = createAxis(chart.current, 'ValueAxis', 'yAxes');
      valueAxis.numberFormatter.numberFormat = '$#.##';
      valueAxis.title.text = 'EPS';
      valueAxis.cursorTooltipEnabled = false;

      const columnSeries = createColumnSeries(chart.current);
      columnSeries.name = 'EPS';
      columnSeries.dataFields.valueY = 'actualEPS';
      columnSeries.dataFields.categoryX = 'fiscalPeriod';
      columnSeries.columns.template.propertyFields.fillOpacity = 'fillOpacity';
      columnSeries.columns.template.propertyFields.strokeWidth = 'strokeWidth';
      columnSeries.columns.template.propertyFields.strokeDasharray = 'columnDash';

      const labelBullet = createLabelBullet(columnSeries, {
        dynamicVerticalPositioning: true,
      });
      labelBullet.label.text = '{valueY}';

      const lineSeries = createLineSeries(chart.current);
      lineSeries.name = 'EPS';
      lineSeries.dataFields.valueY = 'consensusEPS';
      lineSeries.dataFields.categoryX = 'fiscalPeriod';
      lineSeries.propertyFields.strokeDasharray = 'lineDash';

      const [bullet, circle] = createCircleBullet(lineSeries);
      bullet.tooltipText =
        '[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]';
    }
  }, [earningsData]);

  return <Box id={chartId} style={{ width: '100%', height: '100%' }} />;
};
