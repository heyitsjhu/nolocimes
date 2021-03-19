import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box } from '@material-ui/core';

import { createChart, createAxis, createLineSeries } from 'helpers/chartHelpers';
import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import { getElId } from 'utils';
import { AXIS_LINE_COLOR, LINE_DASH_ARRAY } from 'const/charts';

export default props => {
  const { t } = useCopy();
  const [appState, dispatch] = useContext(AppContext);
  const stockState = appState[STORE_KEYS.CANDLE_MONKEYS][STORE_KEYS.STOCK_DATA];
  const { intradayPrices, quote } = stockState;
  const [chartData, setChartData] = useState([]);
  const chartId = getElId('id', 'chart--price');
  const chart = useRef(null);

  // date: '2020-08-11',
  // minute: '09:30',
  // label: '09:30 AM',
  // high: 469.41,
  // low: 453.213,
  // open: 467.753,
  // close: 459.77,
  // average: 465.1,
  // volume: 5319,
  // notional: 2444398.248,
  // numberOfTrades: 57,

  const getDateTime = (date, time) => {
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
    return new Date(year, month - 1, day, hour, minute);
  };

  const formatDataDates = data => {
    return data.map(item => {
      const datetime = getDateTime(item.date, item.minute);
      return { ...item, datetime };
    });
  };

  useEffect(() => {
    if (intradayPrices && intradayPrices.length) {
      const dataWithFormattedDate = formatDataDates(intradayPrices);
      setChartData(dataWithFormattedDate);
    }
  }, [intradayPrices]);

  useLayoutEffect(() => {
    if (!chart.current && chartData && chartData.length) {
      chart.current = createChart(chartId);
      chart.current.data = chartData;

      const dateAxis = createAxis(chart.current, 'DateAxis', 'xAxes');
      dateAxis.dataFields.category = 'datetime';
      dateAxis.groupData = true;
      dateAxis.renderer.minGridDistance = 50;
      dateAxis.startLocation = 0.5;
      dateAxis.endLocation = 0.5;

      const valueAxis = createAxis(chart.current, 'ValueAxis', 'yAxes');
      valueAxis.numberFormatter.numberFormat = '$#.##';
      valueAxis.title.text = 'Price';
      valueAxis.cursorTooltipEnabled = false;

      const lineSeries = createLineSeries(chart.current);
      lineSeries.name = 'Price';
      lineSeries.dataFields.valueY = 'average';
      lineSeries.dataFields.dateX = 'datetime';

      const previousCloseLineSeries = createLineSeries(chart.current);
      previousCloseLineSeries.name = 'Previous Close';
      previousCloseLineSeries.dataFields.valueY = 'value';
      previousCloseLineSeries.dataFields.dateX = 'datetime';
      previousCloseLineSeries.data = [
        ...chartData
          .filter((_, i) => i === 0 || i === chartData.length - 1)
          .map(item => ({
            value: quote.previousClose,
            datetime: item.datetime,
          })),
      ];
      previousCloseLineSeries.stroke = AXIS_LINE_COLOR;
      previousCloseLineSeries.strokeWidth = 1;
      previousCloseLineSeries.strokeDasharray = LINE_DASH_ARRAY;
    }
  }, [chartData]);

  console.log('stockState', stockState);

  return <Box id={chartId} style={{ width: '100%', height: '100%' }} />;
};
