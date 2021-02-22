// https://material.io/resources/color
import { fade } from '@material-ui/core/styles/colorManipulator';

const black = '#000';
const white = '#fff';
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
  overlay: {
    dark: fade(black, 0.6),
    darker: fade(black, 0.8),
    darkest: fade(black, 0.9),
  },
  primary: {
    ...primary,
    transparent: fade(primary.main, 0.7),
  },
  secondary: {
    ...secondary,
    transparent: fade(secondary.main, 0.7),
  },
  text: {
    primary: greys[200],
    secondary: greys[400],
    disabled: fade(greys[200], 0.5),
    hint: fade(greys[200], 0.5),
    icon: fade(greys[200], 0.5),
  },
  tonalOffset: 0.2,
};
