import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Chip, Typography, List, ListItem } from '@material-ui/core';
import SmsFailedOutlinedIcon from '@material-ui/icons/SmsFailedOutlined';
import classnames from 'classnames';

import { ROUTES, STORE_KEYS } from 'const';
import { useQueryParams, URL_PARAMS } from 'hooks/useQueryParams';
import { useCopy } from 'hooks/useCopy';
import { getElClass } from 'utils';

const useStyles = makeStyles(({ palette, spacing }) => ({
  newsContainer: { height: '100%' },
  newsItem: {
    position: 'relative',
    display: 'flex',
    padding: `${spacing(3)}px ${spacing(2)}px`,
    '&:not(:last-child)': {
      borderBottom: `1px solid ${palette.grey[300]}`,
    },
    '& > div:first-of-type': { flex: 1 },
  },
  newsItemMetaData: {
    '& > *': {
      marginRight: spacing(2) / 2,
    },
  },
  metaIcon: {
    position: 'relative',
    top: 3,
    fontSize: 14,
  },
  metaSource: { fontWeight: 600, letterSpacing: 0.25 },
  metaDate: {},
  relatedTickerList: {
    display: 'flex',
    paddingTop: spacing(1) / 2,
    paddingBottom: spacing(1) / 2,
    '& .MuiListItem-root': {
      padding: 0,
      marginRight: spacing(1),
      width: 'auto',
    },
    '& .MuiChip-label': {
      fontSize: 11,
    },
  },
  imageContainer: {
    paddingLeft: spacing(8),
    width: 300,
    height: 200,
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  anchorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: 'all 300ms ease-in',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.05)',
    },
  },
  scrollable: {
    overflow: 'auto',
  },
}));

export default props => {
  const { t } = useCopy();
  const classes = useStyles();
  const candleMonkeys = useSelector(state => state.candleMonkeys);
  const stockState = candleMonkeys[STORE_KEYS.STOCK_DATA];
  const ticker = useQueryParams(URL_PARAMS.TICKER);

  return (
    <Box
      className={classnames([
        getElClass('comp', 'companyNews'),
        classes.newsContainer,
        classes.scrollable,
      ])}
    >
      {stockState.news &&
        stockState.news.map((newsItem, index) => {
          return (
            <Box key={index} className={classes.newsItem}>
              <Box>
                <Box className={classes.newsItemMetaData}>
                  <SmsFailedOutlinedIcon className={classes.metaIcon} />
                  <Typography className={classes.metaSource} variant="overline">
                    {newsItem.source}
                  </Typography>
                  <Typography color="textSecondary" variant="caption">
                    TODO - DATE
                    {/* {moment(newsItem.datetime).format('MMM Do')} */}
                  </Typography>
                </Box>

                <List className={classes.relatedTickerList} disablePadding>
                  {newsItem.related.split(',').map(relatedTicker => (
                    <ListItem key={relatedTicker} disableGutters>
                      <Chip
                        label={relatedTicker}
                        clickable
                        color={relatedTicker === ticker ? 'primary' : 'default'}
                        component="a"
                        href={ROUTES.TO_TICKER(relatedTicker)}
                        size="small"
                        variant="outlined"
                      />
                    </ListItem>
                  ))}
                </List>

                <Typography gutterBottom variant="h5">
                  {newsItem.headline || 'This is a headline'}
                </Typography>
                <Typography variant="body2">{newsItem.summary}</Typography>
              </Box>
              <Box className={classes.imageContainer}>
                <img src={newsItem.image || 'http://placehold.it/300x300'} alt="" />
              </Box>
              {/* <Link
                className={classes.anchorOverlay}
                href={newsItem.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
              </Link> */}
            </Box>
          );
        })}
    </Box>
  );
};
