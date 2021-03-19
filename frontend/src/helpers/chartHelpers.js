import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {
  AXIS_LINE_COLOR,
  BAR_COLOR,
  BASEGRID_LINE_OPACITY,
  BASEGRID_LINE_STROKE_WIDTH,
  LINE_OPACITY,
  AXIS_LINE_STROKE_WIDTH,
  TEXT_COLOR,
  TEXT_OPACITY,
  TEXT_SIZE,
  TICK_LENGTH,
} from 'const/charts';

export const createChart = chartId => {
  const chart = am4core.create(chartId, am4charts.XYChart);
  chart.paddingTop = 8;
  chart.paddingBottom = 0;
  chart.paddingLeft = 0;
  chart.paddingRight = 0;
  chart.maskBullets = false;
  chart.zoomOutButton.disabled = true;

  return chart;
};

// Applies basic axis properties and styling for app consistency
export const createAxis = (chart, axisType, axisGroup, options = {}) => {
  const axis = chart[axisGroup].push(new am4charts[axisType]());

  axis.renderer.minGridDistance = 30;

  axis.renderer.grid.template.stroke = am4core.color(AXIS_LINE_COLOR);
  axis.renderer.grid.template.strokeOpacity = LINE_OPACITY;
  axis.renderer.grid.template.strokeWidth = AXIS_LINE_STROKE_WIDTH;
  axis.renderer.grid.template.disabled = true;

  axis.renderer.labels.template.fill = am4core.color(TEXT_COLOR);
  axis.renderer.labels.template.fillOpacity = TEXT_OPACITY;
  axis.renderer.labels.template.fontSize = TEXT_SIZE;

  axis.renderer.line.strokeOpacity = LINE_OPACITY;
  axis.renderer.line.strokeWidth = AXIS_LINE_STROKE_WIDTH;
  axis.renderer.line.stroke = am4core.color(AXIS_LINE_COLOR);
  axis.renderer.line.disabled = true;

  axis.renderer.baseGrid.disabled = true;

  if (options.includeBaseGrid) {
    axis.renderer.baseGrid.strokeOpacity = BASEGRID_LINE_OPACITY;
    axis.renderer.baseGrid.strokeWidth = BASEGRID_LINE_STROKE_WIDTH;
    axis.renderer.baseGrid.stroke = am4core.color(AXIS_LINE_COLOR);
    axis.renderer.baseGrid.disabled = false;
  }

  axis.renderer.ticks.template.stroke = am4core.color(AXIS_LINE_COLOR);
  axis.renderer.ticks.template.strokeOpacity = LINE_OPACITY;
  axis.renderer.ticks.template.strokeWidth = AXIS_LINE_STROKE_WIDTH;
  axis.renderer.ticks.template.length = TICK_LENGTH;
  axis.renderer.ticks.template.disabled = true;

  axis.title.fill = am4core.color(TEXT_COLOR);
  axis.title.fontSize = TEXT_SIZE;

  return axis;
};

export const createCursor = (chart, cursorType = 'XYCursor') => {
  chart.cursor = new am4charts[cursorType]();
  chart.cursor.behavior = 'none';

  return chart.cursor;
};

export const createColumnSeries = chart => {
  const columnSeries = chart.series.push(new am4charts.ColumnSeries());
  // columnSeries.columns.template.fill = am4core.color(BAR_COLOR);
  columnSeries.showOnInit = false;

  return columnSeries;
};

export const createLineSeries = chart => {
  const lineSeries = chart.series.push(new am4charts.LineSeries());
  lineSeries.showOnInit = false;
  lineSeries.strokeWidth = 2;

  return lineSeries;
};

export const createCircleBullet = series => {
  const bullet = series.bullets.push(new am4charts.Bullet());
  const circle = bullet.createChild(am4core.Circle);
  circle.radius = 4;
  circle.fill = am4core.color('#fff');
  circle.strokeWidth = 2;

  return [bullet, circle];
};

export const createLabelBullet = (series, options = {}) => {
  const labelBullet = series.bullets.push(new am4charts.LabelBullet());
  labelBullet.label.fill = am4core.color(TEXT_COLOR);
  labelBullet.label.fontSize = TEXT_SIZE;
  labelBullet.zIndex = 5;

  if (options.dynamicVerticalPositioning) {
    labelBullet.label.adapter.add('verticalCenter', positionLabelBullet('vertical'));
    labelBullet.label.adapter.add('dy', offsetLabelBullet('vertical'));
  } else if (options.dynamicHorizontalPositioning) {
    labelBullet.label.adapter.add('horizontalCenter', positionLabelBullet('horizontal'));
    labelBullet.label.adapter.add('dx', offsetLabelBullet('horizontal'));
  }

  return labelBullet;
};

/**
 * This adapter adjusts where the label is positioned, for
 * horizontal and vertical labels, depending on whether the
 * value is postive or negative.
 * If positive, position label on top (vertical) or to the right (horizontal).
 * If negative, position label on bottom (vertical) or to the left (horizontal).
 * https://www.amcharts.com/docs/v4/tutorials/using-adapters-for-value-sensitive-bullet-adjustments/#Adjusting_position_of_a_label_bullet
 */
const positionLabelBullet = orientation => (center, target) => {
  if (!target.dataItem) {
    return center;
  }

  if (orientation === 'vertical') {
    const values = target.dataItem.values;
    return values.valueY.value >= 0 ? 'bottom' : 'top';
  } else if (orientation === 'horizontal') {
    const values = target.dataItem.values;
    return values.valueX.value >= 0 ? 'right' : 'left';
  }
  return center;
};

const offsetLabelBullet = orientation => (value, target) => {
  const offset = 2;
  if (!target.dataItem) {
    return value;
  }
  if (orientation === 'vertical') {
    const values = target.dataItem.values;
    return values.valueY.value >= 0 ? value - offset : value + offset;
  } else if (orientation === 'horizontal') {
    const values = target.dataItem.values;
    return values.valueX.value >= 0 ? value + offset : value - offset;
  }
  return value;
};
