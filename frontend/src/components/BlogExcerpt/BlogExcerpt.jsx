import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import { POSTS, ROUTES } from 'const';
import { useCopy } from 'hooks/useCopy';
import * as PostUtils from 'utils/postHelpers';
import { PostRenderer } from '../renderers';

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  excerptComponent: {
    display: 'flex',
    position: 'relative',
    padding: `${spacing(6)}px ${spacing(2)}px`,
    width: '100%',
    transition: 'all 400ms linear',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: palette.common.black,
      transition: 'all 400ms linear',
      opacity: 0,
      zIndex: -1,
    },
    '&:hover': {
      borderColor: palette.grey[800],
      '&::before': { opacity: 0.6 },
      "& div[class*='excerptImage']::before": {
        opacity: 0.1,
      },
    },
    '& > div': {
      flex: 1,
      minHeight: '100%',
    },
  },
  reverseDirection: { flexDirection: 'row-reverse' },
  contentRight: { alignItems: 'flex-start', paddingLeft: spacing(5) },
  contentLeft: { alignItems: 'flex-end', paddingRight: spacing(5) },
  excerptContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: spacing(3),
    paddingBottom: spacing(3),
    "& [class*='postDate'], & [class*='postTags']": {
      textAlign: 'center',
    },
  },
  excerptImage: {
    position: 'relative',
    height: '33vw',
    maxHeight: 450,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: palette.common.black,
      transition: 'all 400ms linear',
      opacity: 0.5,
    },
  },
}));

export default ({ component, post, reverseLayout }) => {
  const classes = useStyles();
  const { t } = useCopy();
  const postDate = PostUtils.getPostDate(post);
  const postTags = PostUtils.getPostTags(post);
  const postSlug = PostUtils.getPostSlug(post);
  const postTitle = PostUtils.getPostTitle(post);
  const postDescription = PostUtils.getPostDescription(post);
  const postCoverImageUrl = PostUtils.getPostHeroImageUrl(post);
  const postUrl = `${ROUTES.BLOG}/${postSlug}`; //add date

  return (
    <Box
      className={classnames([classes.excerptComponent, reverseLayout && classes.reverseDirection])}
      component={component}
    >
      <Box
        className={classnames([
          classes.excerptContent,
          reverseLayout && classes.contentRight,
          !reverseLayout && classes.contentLeft,
        ])}
      >
        {PostRenderer(POSTS.POST_DATE, postDate)}
        {PostRenderer(POSTS.EXCERPT_TITLE, postTitle, { postUrl })}
        {/* {PostRenderer(POSTS.POST_TAGS, postTags)} */}
        {PostRenderer(POSTS.EXCERPT_DESCRIPTION, postDescription, { postUrl })}
      </Box>
      <Box className={classes.excerptImage}>
        {PostRenderer(POSTS.POST_HERO_IMAGE, postCoverImageUrl)}
      </Box>
    </Box>
  );
};
