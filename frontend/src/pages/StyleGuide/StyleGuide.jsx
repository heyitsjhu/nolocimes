import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { Helmet, SGColorBox, SGSection } from 'components';
import { CLASSES, SEO, SITE_KEYS, STYLE_GUIDE } from 'const';
import { useCopy } from 'hooks/useCopy';
import { updateSiteSettings } from 'redux/reducers/siteSettings';
import themeMapping from 'theme';
import { formatThemeProperty } from 'utils';

import { PageLayout } from '..';
import theme from 'theme';

const useStyles = makeStyles(({ palette, shared, spacing }) => ({
  paletteSectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  paletteSegmentContainer: {
    padding: spacing(2),
  },
  paletteSegment: {
    display: 'flex',
    flexGrow: 1,
  },
  colorGroup: {
    flexGrow: 1,
    // margin: `0 ${spacing(2)}px`,
    maxWidth: 200,
    '&:first-child': {
      marginLeft: 0,
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  typographySegment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: 100,
    padding: `${spacing(2)}px 0`,
    borderBottom: shared.borderDefault,
    '& > div': {
      flex: 1,
      '&:first-child': {
        display: 'flex',
        alignItems: 'center',
      },
    },
    [`&.${CLASSES.IS_MOBILE}`]: {
      flexDirection: 'column',
    },
  },
}));

const paletteMapping = [
  {
    label: 'common.main',
    items: STYLE_GUIDE.OPTIONS.COLORS.MAIN,
    render: (items, classes, themePalette) => {
      return (
        <Box className={classes.paletteSegment}>
          {items.map(type => (
            <Box className={classes.colorGroup} key={`palette-${type.value}`}>
              {STYLE_GUIDE.OPTIONS.COLORS.VARIANTS.map(variant => (
                <SGColorBox
                  color={themePalette?.[type.value]?.[variant.value]}
                  getContrastText={themePalette.getContrastText}
                  key={`palette-main-${type.value}-${variant.value}`}
                  label={type.label}
                  sublabel={variant.label}
                />
              ))}
            </Box>
          ))}
        </Box>
      );
    },
  },
  {
    label: 'common.text',
    items: STYLE_GUIDE.OPTIONS.COLORS.TEXT,
    render: (items, classes, themePalette) => {
      return (
        <Box className={classes.paletteSegment}>
          {items.map(text => (
            <SGColorBox
              color={themePalette.text[text.value]}
              getContrastText={themePalette.getContrastText}
              key={`palette-text-${text.value}`}
              themePalette={themePalette}
              label={text.label}
            />
          ))}
        </Box>
      );
    },
  },
  {
    label: 'common.actions',
    items: STYLE_GUIDE.OPTIONS.COLORS.ACTIONS,
    render: (items, classes, themePalette) => {
      return (
        <Box className={classes.paletteSegment}>
          {items.map(action => (
            <SGColorBox
              color={themePalette.action[action.value]}
              getContrastText={themePalette.getContrastText}
              key={`palette-actions-${action.value}`}
              themePalette={themePalette}
              label={action.label}
            />
          ))}
        </Box>
      );
    },
  },
  {
    label: 'common.others',
    items: STYLE_GUIDE.OPTIONS.COLORS.OTHERS,
    render: (items, classes, themePalette) => {
      return (
        <Box className={classes.paletteSegment}>
          {items.map(type => {
            const variantOptions =
              type.value === 'background'
                ? STYLE_GUIDE.OPTIONS.COLORS.VARIANTS_BACKGROUND
                : STYLE_GUIDE.OPTIONS.COLORS.VARIANTS_OVERLAY;

            return (
              <Box className={classes.colorGroup} key={`palette-${type.value}`}>
                {variantOptions.map(variant => (
                  <SGColorBox
                    color={themePalette[type.value][variant.value]}
                    getContrastText={themePalette.getContrastText}
                    key={`palette-others-${type.value}-${variant.value}`}
                    label={type.label}
                    sublabel={variant.label}
                  />
                ))}
              </Box>
            );
          })}
        </Box>
      );
    },
  },
  {
    label: 'common.common',
    items: STYLE_GUIDE.OPTIONS.COLORS.COMMON,
    render: (items, classes, themePalette) => {
      return (
        <Box className={classes.paletteSegment}>
          {items.map(type => (
            <SGColorBox
              color={themePalette.common[type.value]}
              getContrastText={themePalette.getContrastText}
              key={`palette-common-${type.value}`}
              themePalette={themePalette}
              label={type.label}
            />
          ))}
        </Box>
      );
    },
  },
];

export default () => {
  const { t } = useCopy();
  const classes = useStyles();
  const siteSettings = useSelector(state => state.siteSettings);

  const { isOnMobile, isDarkMode } = siteSettings;
  const theme = themeMapping[isDarkMode ? 'dark' : 'light']();

  console.log(theme);

  const renderTypography = (theme, t) => {
    return (
      <SGSection title={t('common.typography')}>
        {STYLE_GUIDE.OPTIONS.TYPOGRAPHY.map(type => {
          const settings = theme.typography[type];
          const columns = [
            t('pages.StyleGuide.' + type),
            `${settings.fontSize} / ${settings.lineHeight}`,
            `${settings.fontFamily}`,
          ];

          return (
            <Box
              className={classnames([classes.typographySegment, isOnMobile && CLASSES.IS_MOBILE])}
              key={type}
            >
              {columns.map((column, index) => (
                <Box key={`typography-${type}-column-${index}`}>
                  <Typography component="span" variant={index === 0 ? type : null}>
                    {column}
                  </Typography>
                </Box>
              ))}
            </Box>
          );
        })}
      </SGSection>
    );
  };

  const renderPaletteSection = (theme, t) => {
    return (
      <SGSection className={classes.paletteSectionContainer} title={t('common.palette')}>
        {paletteMapping.map(paletteGroup => (
          <Box className={classes.paletteSegmentContainer} key={paletteGroup.label}>
            <Typography>{t(paletteGroup.label)}</Typography>
            {paletteGroup.render(paletteGroup.items, classes, theme.palette)}
          </Box>
        ))}
      </SGSection>
    );
  };

  return (
    <PageLayout pageName={SITE_KEYS.STYLE_GUIDE} pageLayoutClassName={classes.styleGuideLayout}>
      <Helmet {...SEO.STYLE_GUIDE(t)} />
      {renderTypography(theme, t)}
      {renderPaletteSection(theme, t)}
    </PageLayout>
  );
};
