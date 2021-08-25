import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { FormatNumber, PriceChange } from 'components';
import { STORE_KEYS } from 'const';
import {
  createChart,
  createAxis,
  createCircleBullet,
  createLabelBullet,
  createColumnSeries,
  createLineSeries,
} from 'helpers/chartHelpers';
import { useCopy } from 'hooks/useCopy';
import { getElClass } from 'utils';

const useStyles = makeStyles(({ shared, spacing }) => ({
  peersGroupList: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
  },
  peersGroupListItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: spacing(1),
    padding: spacing(1),
    width: `calc(50% - ${spacing(1)}px)`,
    border: shared.borderStyle,
    borderRadius: shared.borderRadiusStyle,
    '&:nth-child(odd)': {
      marginRight: spacing(1) / 2,
    },
    '&:nth-child(even)': {
      marginLeft: spacing(1) / 2,
    },
  },
  companyName: {
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  pricesContainer: {
    display: 'flex',
  },
  priceChange: {
    '& > span': {
      fontSize: '0.875rem',
    },
  },
}));

export default () => {
  const { t } = useCopy();
  const classes = useStyles();
  const candleMonkeys = useSelector(state => state.candleMonkeys);
  const { analystRecommendations } = candleMonkeys[STORE_KEYS.STOCK_DATA];

  const [recommendationData, setRecommendationData] = useState(null);
  const chartId = getElClass('id', 'chart--analyst-recommendations');
  const chart = useRef(null);
  // const data = useIEXStockQuery('stockAnalystRecommendations');

  const labelMapping = {
    ratingBuy: t('common.buy'),
    ratingOverweight: t('common.overweightAbbr'),
    ratingHold: t('common.hold'),
    ratingUnderweight: t('common.underweightAbbr'),
    ratingSell: t('common.sell'),
    ratingNone: t('common.none'),
  };

  // Transforms data into an array containing just the ratings,
  // in an array format that is easy for amcharts to ingest.
  const transformRecommendationData = data => {
    return Object.keys(data)
      .filter(key => key.includes('rating') && !['ratingScaleMark', 'ratingNone'].includes(key))
      .map(key => ({
        ratingType: labelMapping[key],
        noOfRatings: data[key],
      }));
  };

  useEffect(() => {
    if (analystRecommendations) {
      const latestRecommendation = analystRecommendations.find(
        recommendation => recommendation.consensusEndDate === null
      );
      const recData = transformRecommendationData(latestRecommendation).reverse();

      setRecommendationData(recData);
    }
  }, [analystRecommendations]);

  useLayoutEffect(() => {
    if (!chart.current && recommendationData && recommendationData.length) {
      chart.current = createChart(chartId);
      chart.current.paddingRight = 8;
      chart.current.data = recommendationData;

      const categoryAxis = createAxis(chart.current, 'CategoryAxis', 'yAxes');
      categoryAxis.dataFields.category = 'ratingType';
      categoryAxis.renderer.minGridDistance = 10;
      categoryAxis.cursorTooltipEnabled = false;

      const valueAxis = createAxis(chart.current, 'ValueAxis', 'xAxes');
      valueAxis.numberFormatter.numberFormat = '#';
      valueAxis.title.text = '# of Ratings';
      valueAxis.cursorTooltipEnabled = false;

      const columnSeries = createColumnSeries(chart.current);
      columnSeries.name = '# of Ratings';
      columnSeries.dataFields.valueX = 'noOfRatings';
      columnSeries.dataFields.categoryY = 'ratingType';
    }
  }, [recommendationData]);

  return <Box id={chartId} style={{ width: '100%', height: '100%' }} />;
};
