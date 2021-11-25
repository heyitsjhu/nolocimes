export const handleOnCountryOver = (event, imageSeries) => {
  rollOverCountry(event.target, imageSeries);
};

export const handleOnCountryOut = (event, imageSeries) => {
  rollOutCountry(event.target, imageSeries);
};

export const handleOnImageOver = (event, polygonSeries) => {
  rollOverCountry(
    polygonSeries.getPolygonById(event.target.dataItem.dataContext.id),
    event.target.parent
  );
};

export const handleOnImageOut = (event, polygonSeries) => {
  rollOutCountry(
    polygonSeries.getPolygonById(event.target.dataItem.dataContext.id),
    event.target.parent
  );
};

// what happens when a country is rolled-over
/**
 *
 * @param {*} mapPolygon
 * @param {*} imageSeries
 */
const rollOverCountry = (mapPolygon, imageSeries) => {
  // resetHover(mapPolygon.parent, imageSeries);

  if (mapPolygon) {
    mapPolygon.isHover = true;

    // make bubble hovered too
    const image = imageSeries.getImageById(mapPolygon.dataItem.dataContext.id);

    if (image) {
      image.dataItem.dataContext.name = mapPolygon.dataItem.dataContext.name;
      image.isHover = true;
      image.dataItem.dataContext.isHover = true;
    }
  }
};

const rollOutCountry = (mapPolygon, imageSeries) => {
  if (!mapPolygon) return;

  var image = imageSeries.getImageById(mapPolygon.dataItem.dataContext.id);

  resetHover(mapPolygon.parent, imageSeries);
  if (image) {
    image.isHover = false;
  }
};

const resetHover = (mapPolygon, imageSeries) => {
  mapPolygon.mapPolygons.each(polygon => {
    polygon.isHover = false;
  });

  imageSeries.mapImages.each(image => {
    image.isHover = false;
  });
};

/**
 * Positions the tooltip to the top of the circle (bubble) image by
 * offsetting its Y-position by the radius of the circle.
 * @param {*} tooltipY
 * @param {*} target - imageTemplate [amcharts]
 * @returns {number}
 */
export const positionTooltipToTop = (tooltipY, target) => {
  return -target.children.getIndex(0).radius;
};

/**
 *
 * @param {*} positionType
 * @param {*} positionData
 * @param {*} target
 * @param {*} polygonSeries
 * @returns {object}
 */
export const centerImageBubbleOverCountry = (positionType, positionData, target, polygonSeries) => {
  const { dataContext } = target.dataItem;
  var polygon = polygonSeries.getPolygonById(dataContext.id);
  if (polygon) return polygon[`visual${positionType}`];

  return positionData;
};

export const renderHTMLTooltip = (metric, options, t) => {
  return `
  <div class="MuiBox-root">
    <strong>{name}</strong> <br />
    <p class="MuiTypography-root MuiTypography-caption">
    ${t('common.population')}:
    <span class="MuiTypography-root MuiTypography-overline">{population}</span>
    </p>
    <hr />
    <span class="MuiTypography-root MuiTypography-overline">{day}</span>
    ${options
      .map(
        option => `
      <p class="MuiTypography-root MuiTypography-caption">
        ${option === metric ? '<strong>' : ''}
          ${t('pages.Coronavirus.labels.' + option)}: 
        ${option === metric ? '</strong>' : ''}
        <span class="MuiTypography-root MuiTypography-${
          option === metric ? 'caption' : 'overline'
        }">
          ${option === metric ? '<strong>' : ''}
          {${option}}
          ${option === metric ? '</strong>' : ''}
        </span>
      </p>
    `
      )
      .join('')}
  </div>
  `;
};
