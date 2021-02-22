import palette from './palette';
import typography from './typography';

export default {
  MuiCssBaseline: {
    '@global': {
      '*,*::before,*::after': {
        boxSizing: 'inherit',
      },
      'html, body': {
        minHeight: '100%',
        height: '100%',
        minWidth: '100%',
        width: '100%',
        fontSize: typography.fontSize,
        WebkitFontSmoothing: 'auto',
      },
      '#root': {
        width: 'inherit',
        height: 'inherit',
        overflow: 'auto',
      },
      'strong,b': {
        fontWeight: typography.fontWeightBold,
      },
      'a:hover': {
        cursor: 'pointer',
      },
      '::-webkit-scrollbar': {
        width: '2px',
      },
      '::-webkit-scrollbar-track': {
        background: palette.common.black,
      },
      '::-webkit-scrollbar-thumb': {
        background: palette.grey[800],
        borderRadius: '4px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: palette.grey[500],
      },
    },
  },
};
