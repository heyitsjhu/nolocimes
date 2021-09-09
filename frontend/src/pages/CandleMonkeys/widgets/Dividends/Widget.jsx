import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';

import { STORE_KEYS } from 'const';
import {
  createChart,
  createAxis,
  createCircleBullet,
  createLabelBullet,
  createLineSeries,
  createColumnSeries,
} from 'helpers/chartHelpers';
import { convertDateToQuarter } from 'helpers/stringHelpers';
import { useCopy } from 'hooks/useCopy';
import { getElId, deepClone } from 'utils';
import { FORECAST_LINE_DASH, FORECAST_COLUMN_DASH, FORECAST_OPACITY } from 'const';

export default props => {
  const { t } = useCopy();
  const candleMonkeys = useSelector(state => state.candleMonkeys);
  const { dividends, dividendsNext } = candleMonkeys[STORE_KEYS.STOCK_DATA];
  const [dividendsData, setDividendsData] = useState(null);
  const chartId = getElId('id', 'chart--dividends');
  const chart = useRef(null);

  //   amount: 0.63
  // currency: "USD"
  // declaredDate: "2018-02-01"
  // description: "Apple declares dividend of .63"
  // exDate: "2018-02-10"
  // flag: "Dividend income"
  // frequency: "quarterly"
  // paymentDate: "2018-02-17"
  // recordDate: "2018-02-14"
  // symbol: "AAPL"

  const transformDividendsData = (dividends, nextDividends) => {
    const data = deepClone([...dividends].reverse());

    // handle styling for upcoming dividends
    data[data.length - 1].lineDash = FORECAST_LINE_DASH;
    data.push({
      ...nextDividends,
      columnDash: FORECAST_COLUMN_DASH,
      fillOpacity: FORECAST_OPACITY,
    });

    return data;
  };

  useEffect(() => {
    return () => chart.current?.dispose();
  }, []);

  useEffect(() => {
    if (dividends && dividendsNext) {
      const data = transformDividendsData(dividends, dividendsNext).map(item => ({
        ...item,
        quarterLabel: convertDateToQuarter(item.recordDate),
      }));
      setDividendsData(data);
    }
  }, [dividends, dividendsNext]);

  useLayoutEffect(() => {
    if (!chart.current && dividendsData && dividendsData.length) {
      chart.current = createChart(chartId);
      chart.current.data = dividendsData;

      const categoryAxis = createAxis(chart.current, 'CategoryAxis', 'xAxes');
      categoryAxis.dataFields.category = 'quarterLabel';
      categoryAxis.cursorTooltipEnabled = false;

      const valueAxis = createAxis(chart.current, 'ValueAxis', 'yAxes');
      valueAxis.numberFormatter.numberFormat = '$#.##';
      valueAxis.title.text = 'Dividends';
      valueAxis.cursorTooltipEnabled = false;

      const columnSeries = createColumnSeries(chart.current);
      columnSeries.name = 'Dividends';
      columnSeries.dataFields.valueY = 'amount';
      columnSeries.dataFields.categoryX = 'quarterLabel';
      columnSeries.columns.template.propertyFields.fillOpacity = 'fillOpacity';
      columnSeries.columns.template.propertyFields.strokeWidth = 'strokeWidth';
      columnSeries.columns.template.propertyFields.strokeDasharray = 'columnDash';

      const labelBullet = createLabelBullet(columnSeries);
      labelBullet.label.text = '{valueY}';
      labelBullet.dy = -12;
    }
  }, [dividendsData]);

  return <Box id={chartId} style={{ width: '100%', height: '100%' }} />;
};
