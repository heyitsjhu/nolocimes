import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { Helmet } from 'components';
import { useCopy } from 'hooks/useCopy';
import theme from 'theme';
import { formatThemeProperty } from 'utils';

import { PageLayout } from '..';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  typographySegment: {
    display: 'flex',
    width: '100%',
    '& > div': {
      flex: 1,
      padding: theme.spacing(2),
      '&:first-child': {
        display: 'flex',
        alignItems: 'center',
      },
    },
  },
}));

const themeTypography = [
  'body1',
  'body2',
  'button',
  'caption',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'overline',
];

const textMapping = {
  body1: 'This is an example body text (vers 1).',
  body2: 'This is an example body text (vers 2).',
  button: 'Button text',
  caption: 'This is a caption text.',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  subtitle1: 'This is an example subtitle text (vers 1).',
  subtitle2: 'This is an example subtitle text (vers 2).',
  overline: 'Overline text',
};

export default props => {
  const { t } = useCopy();
  const classes = useStyles();

  const renderTypography = theme => {
    return Object.keys(theme.typography)
      .filter(type => themeTypography.includes(type))
      .map(type => {
        const settings = theme.typography[type];

        return (
          <>
            <Helmet
              title={t('components.Helmet.styleGuide.title')}
              meta={[
                {
                  name: 'description',
                  content: t('components.Helmet.styleGuide.meta.description'),
                },
              ]}
            />
            <Box className={classes.typographySegment} key={type}>
              <Box display="flex" alignItems="center">
                <Typography variant={type}>{textMapping[type]}</Typography>
              </Box>
              <Box>
                {Object.keys(settings)
                  .filter(property => !property.includes('@media'))
                  .map(property => (
                    <Box key={`${type}-${property}`}>
                      <Typography variant="overline">{formatThemeProperty(property)}</Typography>
                      <Typography>{settings[property]}</Typography>
                    </Box>
                  ))}
              </Box>
            </Box>
          </>
        );
      });
  };

  return (
    <PageLayout pageName="style-guide" pageLayoutClassName={classes.styleGuideLayout}>
      {renderTypography(theme)}
    </PageLayout>
  );
};
