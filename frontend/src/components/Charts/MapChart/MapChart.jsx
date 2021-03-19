import React, { useEffect, useRef, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';
import { Loader } from 'components';
import palette from 'theme/palette';
import * as Utils from 'utils';

// am4core.useTheme(am4themes_animated);

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  covidMapChartContainer: {
    marginTop: spacing(1),
    marginBottom: spacing(4),
  },
}));

export default props => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const chart = useRef({});

  const setMapPolygonAndImageSeries = (chart, chartData, chartType) => {
    chart.geodata = am4geodata_worldLow;

    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.calculateVisualCenter = true;

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.fill = am4core.color(palette.grey[800]);
    polygonTemplate.stroke = am4core.color(palette.grey[900]);
    polygonTemplate.strokeWidth = 1;

    let imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.data = chartData;
    imageSeries.dataFields.value = 'casesTotal';

    let imageTemplate = imageSeries.mapImages.template;
    imageTemplate.nonScaling = true;

    let circle = imageTemplate.createChild(am4core.Circle);
    circle.fillOpacity = 0.95;
    circle.fill = am4core.color(palette.primary.main);
    circle.tooltipText = '{name}: [bold]{value}[/]';

    imageSeries.heatRules.push({
      target: circle,
      property: 'radius',
      min: 4,
      max: 30,
      dataField: 'value',
    });

    imageTemplate.adapter.add('latitude', function (latitude, target) {
      const { dataContext } = target.dataItem;
      let polygon = polygonSeries.getPolygonById(dataContext.id);
      if (polygon) return polygon.visualLatitude;
      return latitude;
    });

    imageTemplate.adapter.add('longitude', function (longitude, target) {
      const { dataContext } = target.dataItem;
      var polygon = polygonSeries.getPolygonById(dataContext.id);
      if (polygon) return polygon.visualLongitude;
      return longitude;
    });
  };

  useEffect(() => {
    if (props.data) {
      setIsLoading(true);
      const chartData = Utils.convertCovidStatisticsData(props.data);
      setChartData(chartData);
    }
  }, [props.data]);

  useEffect(() => {
    chart.current = am4core.create(props.id, am4maps.MapChart);
    chart.current.events.on('ready', () => setIsLoading(false));
    chart.current.series.clear();

    setMapPolygonAndImageSeries(chart.current, chartData, chart.current.series);

    return () => chart.current && chart.current.dispose();
  }, [props.id, chartData]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <Box
        id={props.id}
        className={classnames(classes.covidMapChartContainer)}
        style={{ width: '100%', height: '100%' }}
      />
    </>
  );
};
