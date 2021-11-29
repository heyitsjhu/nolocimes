import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { BlogExcerpt, BlogHero, Helmet } from 'components';
import { SEO, STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { useContentfulService } from 'services/contentfulService';
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

export default () => {
  const { t } = useCopy();
  const classes = useStyles();
  const content = useSelector(state => state.content);
  const { getPosts } = useContentfulService();
  const { posts } = content;

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PageLayout pageName={STORE_KEYS.BLOG} pageLayoutClassName={classes.blogLayout}>
      <Helmet {...SEO.BLOG(t)} />
      <BlogHero />
      <Box className={classes.excerptsContainer}>
        <Typography>{t('pages.Blog.mainDescription')}</Typography>
      </Box>
      <Box className={classes.excerptsContainer} component="ul">
        {posts?.length > 0 ? (
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
