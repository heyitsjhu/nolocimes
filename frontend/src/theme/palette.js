// https://material.io/resources/color
import { alpha } from '@material-ui/core/styles/colorManipulator';

export const black = '#000000';
export const white = '#ffffff';
export const green = '#7ac74f';
export const red = '#b33951';
const primary = { light: '#ffc97f', main: '#cc9851', dark: '#986a25', contrastText: black };
const secondary = { light: '#87ceff', main: '#529dcc', dark: '#0b6f9b', contrastText: black };

export const greys = {
  50: '#ffffff',
  100: '#eaeaec',
  200: '#d5d6d9',
  300: '#bfc1c5',
  400: '#aaadb2',
  500: '#95989f',
  600: '#777a7f',
  700: '#595b5f',
  800: '#3c3d40',
  900: '#1e1e20',
  1000: '#18181a',
  1100: '#121213',
  1200: '#0c0c0d',
  1300: '#060606',
  A100: '#dfe0e2',
  A200: '#a0a2a9',
  A400: '#2d2e30',
  A700: '#595b5f',
};

export default {
  type: 'dark',
  background: { default: greys[1200], paper: greys[800] },
  common: { black, white },
  contrastThreshold: 3,
  grey: greys,
  tonalOffset: 0.2,
  action: {
    active: white,
  },
  overlay: {
    dark: alpha(black, 0.6),
    darker: alpha(black, 0.8),
    darkest: alpha(black, 0.9),
  },
  primary: {
    ...primary,
    transparent: alpha(primary.main, 0.7),
  },
  secondary: {
    ...secondary,
    transparent: alpha(secondary.main, 0.7),
  },
  error: {
    main: red,
  },
  success: {
    main: green,
  },
  text: {
    primary: greys[200],
    secondary: greys[400],
    disabled: alpha(white, 0.3),
    hint: alpha(greys[200], 0.5),
    icon: greys[700],
  },
};
