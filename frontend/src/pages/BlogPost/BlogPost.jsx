import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, ButtonBase, Typography } from '@material-ui/core';
import classnames from 'classnames';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import Link from '@material-ui/core/Link';

import { BlogExcerpt, BlogHero, Helmet, Post } from 'components';
import { ROUTES, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import { fetchContentAssets, fetchContentPosts } from 'stores/actions/contentActions';
import * as PostUtils from 'utils/postHelpers';

import { PageLayout } from '..';

const useStyles = makeStyles(({ palette, spacing }) => ({
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
    paddingBottom: spacing(2),
    borderTop: `2px solid ${palette.primary.main}`,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    color: palette.grey[600],
  },
  buttonOverline: {
    fontSize: '0.65rem',
    fontWeight: 300,
    lineHeight: 1.6,
    color: palette.primary.main,
  },

  // button: { fontSize: 14, textTransform: 'uppercase' },
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
  const { assets, posts } = appState.content;
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
    if (posts && posts.length === 0) {
      fetchContentAssets().then(dispatch);
      fetchContentPosts().then(dispatch);
    }
  }, []);

  useEffect(() => {
    setPostFromURL();
  }, [dispatch, posts]);

  const handleClick = post => {
    const postSlug = PostUtils.getPostSlug(post);
    history.push(`${ROUTES.JOTTINGPAD}/${postSlug.value}`);
  };

  const renderButton = (type, post) => {
    const postTitle = post && PostUtils.getPostTitle(post);
    return (
      <Box className={classnames([classes.buttonContainer, classes[type.toLowerCase()]])}>
        <Typography className={classes.buttonOverline} variant="overline">
          {type}
        </Typography>
        <ButtonBase className={classes.button} disableRipple onClick={() => handleClick(post)}>
          {postTitle.value}
        </ButtonBase>
      </Box>
    );
  };

  return (
    <PageLayout pageName="blogPost" pageLayoutClassName={classes.blogPostLayout}>
      <BlogHero srcUrl={heroImageUrl} />
      <Box className={classes.backButtonContainer}>
        <ArrowRightAltRoundedIcon className={classes.arrowIcon} fontSize={'small'} />
        <Link href={`${ROUTES.BLOG}`} color="textSecondary" variant="overline">
          To Blog
        </Link>
      </Box>
      {typeof post !== 'undefined' && <Post post={post} />}
      <Box className={classes.paginationContainer}>
        {posts[postIndex + 1] && renderButton(t('common.previous'), posts[postIndex + 1])}
        <Box />
        {posts[postIndex - 1] && renderButton(t('comon.next'), posts[postIndex - 1])}
      </Box>
    </PageLayout>
  );
};
