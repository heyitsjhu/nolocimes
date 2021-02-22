import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link, Typography } from '@material-ui/core';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import classnames from 'classnames';

import { BlogHero, Helmet, Post } from 'components';
import { ROUTES, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import { fetchContentAssets, fetchContentPosts } from 'stores/actions/contentActions';
import * as PostUtils from 'utils/postHelpers';

import { PageLayout } from '..';

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  blogPostLayout: {
    padding: '0 !important',
  },
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
  const history = useHistory();
  const location = useLocation();
  const [appState, dispatch] = useContext(AppContext);
  const [post, setPost] = useState(undefined);
  const [postIndex, setPostIndex] = useState(null);
  const { assets, posts } = appState[STORE_KEYS.CONTENT];
  const heroImageUrl = PostUtils.getPostHeroImageUrl(post);

  const setPostFromURL = () => {
    const urlSlug = location.pathname.split('/')[2];
    const post = appState.content.posts.find((post, index) => {
      setPostIndex(index);
      return PostUtils.getPostSlug(post) === urlSlug;
    });

    setPost(post);
  };

  useEffect(() => {
    if (assets.length === 0) {
      fetchContentAssets().then(dispatch);
    }
    if (posts.length === 0) {
      fetchContentPosts().then(dispatch);
    }
  }, []);

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
    <PageLayout pageName="blogPost" pageLayoutClassName={classes.blogPostLayout}>
      {typeof post !== 'undefined' && (
        <Helmet
          title={`${post.fields.title} | ${t('common.jhuSoftwareEngineer')}`}
          meta={[{ name: 'description', content: post.fields.description }]}
        />
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
