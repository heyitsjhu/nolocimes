// Major Third Type Scale (https://type-scale.com/)
import { greys } from './palette';

const fontWeightLight = 300;
const fontWeightRegular = 400;
const fontWeightMedium = 600;
const fontWeightBold = 800;

export default {
  htmlFontSize: 16,
  fontFamily: ['Nunito Sans', 'sans-serif'].join(', '),
  fontSize: 16,
  fontWeightLight,
  fontWeightRegular,
  fontWeightMedium,
  fontWeightBold,
  // TODO: Add text color to all variants
  h1: {
    fontSize: '3.052rem',
    fontWeight: fontWeightMedium,
    lineHeight: 1.167,
    letterSpacing: '0em',
  },
  h2: {
    fontSize: '2.441rem',
    fontWeight: fontWeightMedium,
    lineHeight: 1.235,
    letterSpacing: '0.00735em',
  },
  h3: {
    fontSize: '1.953rem',
    fontWeight: fontWeightMedium,
    lineHeight: 1.235,
    letterSpacing: '0.00735em',
  },
  h4: {
    fontSize: '1.563rem',
    fontWeight: fontWeightMedium,
    lineHeight: 1.334,
    letterSpacing: '0em',
  },
  h5: {
    fontSize: '1.254em',
    fontWeight: fontWeightMedium,
    lineHeight: 1.334,
    letterSpacing: '0em',
  },
  h6: {
    fontSize: '1rem',
    fontWeight: fontWeightMedium,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: fontWeightRegular,
    lineHeight: 1.75,
    letterSpacing: '0.00938em',
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: fontWeightMedium,
    lineHeight: 1.57,
    letterSpacing: '0.00714em',
  },
  body1: {
    fontSize: '1rem',
    fontWeight: fontWeightRegular,
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: fontWeightRegular,
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: fontWeightMedium,
    lineHeight: 1.75,
    letterSpacing: '0.02857em',
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: fontWeightRegular,
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: fontWeightBold,
    color: greys[500],
    letterSpacing: '0.05em',
    lineHeight: 1.1,
  },
};
