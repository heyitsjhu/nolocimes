import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link, Typography } from '@material-ui/core';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import classnames from 'classnames';

import { BlogHero, Helmet, Post } from 'components';
import { ROUTES, SEO, SITE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
// import { useGetEntriesQuery } from 'api/contentful';
import * as PostUtils from 'utils/postHelpers';

import { PageLayout } from '..';
import { useContentfulService } from 'services/contentfulService';

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  blogPostLayout: {},
  backButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: spacing(3),
    color: palette.text.secondary,
    '& > a': {
      position: 'relative',
      top: 1,
      marginLeft: spacing(1),
    },
    '& > svg': {
      transform: 'scaleX(-1)',
    },
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: spacing(4),
    paddingTop: spacing(2),
    paddingBottom: spacing(4),
    borderTop: `2px solid ${palette.primary.main}`,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    color: palette.grey[600],
    transition: `all ${transitions.duration.longest}ms ${transitions.easing.easeInOut}`,
    '&:hover': {
      color: palette.grey[400],
    },
  },
  buttonOverline: {
    letterSpacing: '1.1px',
    lineHeight: 1.8,
  },
  previous: { alignItems: 'flex-start' },
  next: { alignItems: 'flex-end' },
}));

export default props => {
  const { t } = useCopy();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const content = useSelector(state => state.content);
  const { getPosts } = useContentfulService();
  const { posts } = content;

  const [post, setPost] = useState();
  const [postIndex, setPostIndex] = useState(null);
  const heroImageUrl = PostUtils.getPostHeroImageUrl(post);

  const setPostFromURL = useCallback(() => {
    const urlSlug = location.pathname.split('/')[2];
    const post = posts.find((post, index) => {
      setPostIndex(index);
      return PostUtils.getPostSlug(post) === urlSlug;
    });

    setPost(post);
  }, [location.pathname, posts]);

  useEffect(() => {
    if (posts.length === 0) {
      getPosts();
    }
  }, []);

  // useEffect(() => {
  //   if (postsData) {
  //     dispatch(updateContentful(STORE_KEYS.POSTS, null, null, postsData.items));
  //   }
  // }, [postsData]);

  useEffect(() => {
    setPostFromURL();
  }, [location.pathname, posts]);

  const handleClick = post => {
    if (post) {
      const postSlug = PostUtils.getPostSlug(post);
      history.push(`${ROUTES.BLOG}/${postSlug}`);
    } else {
      history.push(ROUTES.BLOG);
    }
  };

  const renderButton = (type, post) => {
    const postTitle = post && PostUtils.getPostTitle(post);

    return (
      <Box className={classnames([classes.buttonContainer, classes[type.toLowerCase()]])}>
        <Typography className={classes.buttonOverline} color="primary" variant="overline">
          {type}
        </Typography>
        <Link
          className={classes.button}
          color="textSecondary"
          variant="overline"
          onClick={e => handleClick(post)}
        >
          {postTitle}
        </Link>
      </Box>
    );
  };

  return (
    <PageLayout
      pageName={SITE_KEYS.BLOG_POST}
      pageLayoutClassName={classes.blogPostLayout}
      noPadding
    >
      {typeof post !== 'undefined' && (
        <Helmet {...SEO.BLOG_POST(t, post.fields.title, post.fields.description)} />
      )}
      <BlogHero srcUrl={heroImageUrl} />
      <Box className={classes.backButtonContainer}>
        <ArrowRightAltRoundedIcon className={classes.arrowIcon} fontSize="small" />
        <Link color="textSecondary" variant="overline" onClick={() => handleClick()}>
          {t('pages.BlogPost.backToBlog')}
        </Link>
      </Box>
      {typeof post !== 'undefined' && <Post post={post} />}
      <Box className={classes.paginationContainer}>
        {posts[postIndex + 1] && renderButton(t('common.previous'), posts[postIndex + 1])}
        <Box />
        {posts[postIndex - 1] && renderButton(t('common.next'), posts[postIndex - 1])}
      </Box>
    </PageLayout>
  );
};
