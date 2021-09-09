import { is } from '@amcharts/amcharts4/core';

const matchHEXRegex = /#?[0-9a-fA-F]{3,6}/;
const matchRGBARegex = /^rgba?\((\d+),\s?(\d+),\s?(\d+),?(\s?[^,\s)]+)?\)/;
const matchDigit = /(\d{1,3})/g;

export const convertRGBPartToHEXPart = RGBPart => {
  var hex = Number(RGBPart).toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

export const convertColorToHEX = colorString => {
  if (!colorString) return '';

  let hexColor = '';

  const isRGBString = colorString.match(matchRGBARegex);
  const isHEXString = colorString.match(matchHEXRegex);

  if (isRGBString) {
    const [color, r, g, b, alpha] = isRGBString;
    const hexValue = [r, g, b].map(convertRGBPartToHEXPart).join('');
    let a = alpha && alpha !== '' ? alpha : parseInt('01', 8);

    a = ((a * 255) | (1 << 8)).toString(16).slice(1);

    hexColor = hexValue + a;
  } else if (isHEXString) {
    const longHEX = colorString.replace('#', '').length === 6;
    const shortHEX = colorString.replace('#', '').length === 3;

    if (shortHEX) {
      hexColor =
        colorString[0] +
        colorString[1] +
        colorString[1] +
        colorString[2] +
        colorString[2] +
        colorString[3] +
        colorString[3];
    } else {
      hexColor = colorString;
    }
  }

  return (hexColor.includes('#') ? hexColor : `#${hexColor}`).toUpperCase();
};
