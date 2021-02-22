import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { BlogExcerpt, BlogHero, Helmet } from 'components';
import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import { fetchContentPosts, fetchContentTags } from 'stores/actions/contentActions';
// import * as PostUtils from 'utils/postHelpers';

import { PageLayout } from '..';

const useStyles = makeStyles(({ breakpoints, palette, shared, spacing }) => ({
  blogLayout: { padding: '0 !important' },
  excerptsContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    margin: '0 auto',
    padding: spacing(4),
    maxWidth: breakpoints.values.lg,
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: spacing(4),
    paddingTop: spacing(2),
    borderTop: shared.borderDefault,
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    color: palette.text.primary,
  },
  button: { fontSize: 14, textTransform: 'uppercase' },
  prev: { alignItems: 'flex-start' },
  next: { alignItems: 'flex-end' },
}));

// const getFilteredPosts = (posts, activeTag) => {
//   return posts.filter(post => {
//     const postTags = PostUtils.getPostTags(post);
//     return postTags.value.includes(activeTag);
//   });
// };

export default props => {
  const { t } = useCopy();
  const classes = useStyles();
  const [appState, dispatch] = useContext(AppContext);
  const { posts, tags } = appState[STORE_KEYS.CONTENT];
  // const [posts, setPosts] = useState(appState[STORE_KEYS.CONTENT][STORE_KEYS.POSTS]);
  // const [tags, setTags] = useState(appState[STORE_KEYS.CONTENT][STORE_KEYS.TAGS]);

  useEffect(() => {
    if (posts.length === 0) {
      fetchContentPosts().then(dispatch);
    }
    if (tags.length === 0) {
      fetchContentTags().then(dispatch);
    }
  }, []);

  return (
    <PageLayout pageName="blog" pageLayoutClassName={classes.blogLayout}>
      <Helmet
        title={t('components.Helmet.blog.title')}
        meta={[{ name: 'description', content: t('components.Helmet.blog.meta.description') }]}
      />
      <BlogHero />
      <Box className={classes.excerptsContainer}>
        <Typography>{t('pages.Blog.mainDescription')}</Typography>
      </Box>
      <Box className={classes.excerptsContainer} component="ul">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <BlogExcerpt component="li" key={i} post={post} reverseLayout={i % 2 !== 0} />
          ))
        ) : (
          <Typography align="center" variant="overline">
            {t('pages.Blog.emptyPostsListing')}
          </Typography>
        )}
      </Box>
      {/* TODO: PAGINATION  */}
    </PageLayout>
  );
};
