import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';

import { STORE_KEYS } from 'const';
import {
  createChart,
  createAxis,
  createColumnSeries,
  createLabelBullet,
} from 'helpers/chartHelpers';
import { useCopy } from 'hooks/useCopy';
import { getElId } from 'utils';
import { AXIS_LINE_COLOR, LINE_DASH_ARRAY } from 'const/charts';

export default props => {
  const { t } = useCopy();
  const candleMonkeys = useSelector(state => state.candleMonkeys);
  const { advancedStats } = candleMonkeys[STORE_KEYS.STOCK_DATA];

  const [chartData, setChartData] = useState([]);
  const chartId = getElId('id', 'chart--performance');
  const chart = useRef(null);

  useEffect(() => {
    return () => chart.current?.dispose();
  }, []);

  useEffect(() => {
    if (advancedStats) {
      const data = [
        { category: '5YR', changePercent: advancedStats.year5ChangePercent },
        { category: '2YR', changePercent: advancedStats.year2ChangePercent },
        { category: '1YR', changePercent: advancedStats.year1ChangePercent },
        { category: 'YTD', changePercent: advancedStats.ytdChangePercent },
      ];
      setChartData(data);
    }
  }, [advancedStats]);

  useLayoutEffect(() => {
    if (!chart.current && chartData && chartData.length) {
      chart.current = createChart(chartId);
      chart.current.paddingBottom = 8;
      chart.current.data = chartData;

      const categoryAxis = createAxis(chart.current, 'CategoryAxis', 'xAxes');
      categoryAxis.dataFields.category = 'category';
      categoryAxis.renderer.labels.template.disabled = true;

      const valueAxis = createAxis(chart.current, 'ValueAxis', 'yAxes', {
        includeBaseGrid: true,
      });
      valueAxis.numberFormatter.numberFormat = '#.#%';
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.cursorTooltipEnabled = false;

      const columnSeries = createColumnSeries(chart.current);
      columnSeries.name = 'Price';
      columnSeries.dataFields.valueY = 'changePercent';
      columnSeries.dataFields.categoryX = 'category';

      const labelBullet = createLabelBullet(columnSeries, {
        dynamicVerticalPositioning: true,
      });
      labelBullet.label.text = '{valueY}';
    }
  }, [chartData]);

  return <Box id={chartId} style={{ width: '100%', height: '100%' }} />;
};
