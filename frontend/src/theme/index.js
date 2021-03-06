import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import breakpoints from './breakpoints';
import palette from './palette';
import presets from './presets';
import shared from './shared';
import transitions from './transitions';
import typography from './typography';
import zIndex from './zIndex';

export default responsiveFontSizes(
  createMuiTheme({
    breakpoints,
    palette,
    presets,
    shared,
    transitions,
    typography,
    zIndex,
    overrides: {
      MuiCssBaseline: {
        '@global': {
          html: {
            WebkitFontSmoothing: 'auto',
            fontSize: '1rem',
          },
          body: {
            backgroundColor: 'inherit',
          },
        },
      },
    },
  })
);
