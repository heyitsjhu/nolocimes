// Major Third Type Scale (https://type-scale.com/)
import { greys } from './palette';

export default {
  htmlFontSize: 16,
  fontFamily: ['Nunito Sans', 'sans-serif'].join(', '),
  fontSize: 16,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 800,
  // TODO: Add text color to all variants
  h1: {
    fontSize: '3.052rem',
    fontWeight: 600,
  },
  h2: {
    fontSize: '2.441rem',
    fontWeight: 600,
  },
  h3: {
    fontSize: '1.953rem',
    fontWeight: 600,
  },
  h4: {
    fontSize: '1.563rem',
    fontWeight: 600,
  },
  h5: {
    fontSize: '1.254em',
    fontWeight: 600,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
  },
  subtitle1: {},
  subtitle2: {},
  body1: {
    fontSize: '1rem',
  },
  body2: {},
  button: {
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.875rem',
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 800,
    color: greys[600],
    letterSpacing: '0.05em',
    lineHeight: 1.1,
  },
};
