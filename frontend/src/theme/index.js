import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import breakpoints from './breakpoints';
import overrides from './overrides';
import palette from './palette';
import presets from './presets';
import shared from './shared';
import transitions from './transitions';
import typography from './typography';
import zIndex from './zIndex';

const themeBase = {
  breakpoints,
  presets,
  shared,
  transitions,
  typography,
  zIndex,
  overrides,
};

export default {
  // TODO: revisit if responsive font sizes is what we want.
  dark: () =>
    createTheme({ ...themeBase, palette }) ||
    responsiveFontSizes(createTheme({ ...themeBase, palette })),
  light: () =>
    // responsiveFontSizes(
    createTheme({
      ...themeBase,
      palette: {
        type: 'light',
        background: { paper: palette.grey[200] },
        grey: palette.grey,
        primary: palette.primary,
        secondary: palette.secondary,
        overlay: palette.overlay,
      },
    }),
  // ),
};
