import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import { POSTS, ROUTES, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import * as PostUtils from 'utils/postHelpers';
import { PostRenderer } from '../renderers';

const useStyles = makeStyles(({ palette, shared, spacing, transitions }) => ({
  excerptComponent: {
    display: 'flex',
    position: 'relative',
    padding: `${spacing(6)}px ${spacing(2)}px`,
    width: '100%',
    transition: 'all 400ms linear',
    overflow: 'hidden',
    '& > div': { flex: 1, minHeight: '100%' },
    // '&:not([class*="reverseDirection"]) p[class*="excerptDescription"]': {
    //   textAlign: 'right',
    // },
  },
  reverseDirection: { flexDirection: 'row-reverse' },
  contentRight: { alignItems: 'flex-start', paddingLeft: spacing(5) },
  contentLeft: { alignItems: 'flex-end', paddingRight: spacing(5) },
  excerptContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: spacing(3),
    paddingBottom: spacing(3),
  },
  excerptImage: {
    height: '33vw',
    maxHeight: 450,
  },
}));

export default ({ component, post, reverseLayout }) => {
  const classes = useStyles();
  const { t } = useCopy();
  const [appState, dispatch] = useContext(AppContext);
  const { isOnMobile } = appState[STORE_KEYS.SITE_SETTINGS];
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
          !isOnMobile && reverseLayout && classes.contentRight,
          !isOnMobile && !reverseLayout && classes.contentLeft,
        ])}
      >
        {PostRenderer(POSTS.POST_DATE, postDate)}
        {PostRenderer(POSTS.EXCERPT_TITLE, postTitle, { postUrl })}
        {/* {PostRenderer(POSTS.POST_TAGS, postTags)} */}
        {PostRenderer(POSTS.EXCERPT_DESCRIPTION, postDescription, { postUrl })}
      </Box>
      {!isOnMobile && (
        <Box className={classes.excerptImage}>
          {PostRenderer(POSTS.POST_HERO_IMAGE, postCoverImageUrl, { postUrl })}
        </Box>
      )}
    </Box>
  );
};
