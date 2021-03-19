import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
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
  dark: () => responsiveFontSizes(createMuiTheme({ ...themeBase, palette })),
  light: () =>
    responsiveFontSizes(
      createMuiTheme({
        ...themeBase,
        palette: {
          type: 'light',
          background: { paper: palette.grey[200] },
          grey: palette.grey,
          primary: palette.primary,
          secondary: palette.secondary,
          overlay: palette.overlay,
        },
      })
    ),
};
