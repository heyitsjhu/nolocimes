import { fade } from '@material-ui/core/styles/colorManipulator';

const black = '#000';
const white = '#fff';
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
  background: {
    default: greys[1300],
    // paper
  },
  common: {
    black,
    white,
  },
  grey: greys,
  overlay: {
    dark: 'rgba(0,0,0,0.6)',
    darker: 'rgba(0,0,0,0.8)',
    darkest: 'rgba(0,0,0,0.9)',
  },
  primary: {
    light: '#ffc97f',
    main: '#cc9851',
    dark: '#986a25',
    contrastText: black,
    transparent: fade('#cc9851', 0.7),
  },
  secondary: {
    light: '#4a4c50',
    main: '#222428',
    dark: black,
    contrastText: white,
  },
  text: {
    primary: greys[100],
    secondary: greys[300],
  },
};
