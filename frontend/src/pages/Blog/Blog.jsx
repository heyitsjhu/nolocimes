import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// import JottingPadHero from '../../components/JottingPadHero/JottingPadHero';
// import JottingPadTabs from '../../components/JottingPadTabs/JottingPadTabs';
// import JottingPadExcerpt from '../../components/JottingPadExcerpt/JottingPadExcerpt';
import { BlogHero, Helmet } from 'components';
import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { ContentContext } from 'stores';
import { fetchContentPosts } from 'stores/actions/contentActions';
// import * as PostUtils from 'utils/postHelpers';

import { PageLayout } from '..';

const useStyles = makeStyles(({ breakpoints, palette, spacing }) => ({
  blogLayout: { padding: 0 },
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
    borderTop: `1px solid ${palette.grey[800]}`,
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
  const [contentState, dispatch] = useContext(ContentContext);
  const { t } = useCopy();
  const classes = useStyles();
  const [posts, setPosts] = useState(contentState[STORE_KEYS.POSTS]);

  useEffect(() => {
    if (posts && posts.length === 0) {
      fetchContentPosts().then(dispatch);
    }
  }, [dispatch]);

  useEffect(() => {
    setPosts(contentState[STORE_KEYS.POSTS]);
  }, [contentState[STORE_KEYS.POSTS]]);

  // useEffect(() => {
  //   // const { activeTag, posts } = appState[STORE_KEYS.JOTTING_PAD];
  //   // const filteredPosts = activeTag === 'all' ? posts : getFilteredPosts(posts, activeTag);
  //   // setPosts(filteredPosts);
  // }, [appState[STORE_KEYS.JOTTING_PAD].activeTag]);

  return (
    <PageLayout pageName="blog" className={classes.blogLayout}>
      <Helmet
        title={t('components.Helmet.blog.title')}
        meta={[{ name: 'description', content: t('components.Helmet.blog.meta.description') }]}
      />
      <BlogHero />
      <Box className={classes.excerptsContainer}>
        <Typography>
          My mind often travels at a million miles per second. Theres never really a shortage of
          thoughts going on up there. Writing them down though is a different story. And while Ive
          set this section aside to encourage myself to do so, as you can see, its still very much a
          work in progress. So, stay tuned...
        </Typography>
      </Box>

      {/* <JottingPadTabs
        activeTab={appState[STORE_KEYS.JOTTING_PAD].activeTag}
        tabOptions={appState[STORE_KEYS.JOTTING_PAD].tags}
      />
      <Box className={classes.excerptsContainer} component="ul">
        {posts.map((post, i) => (
          <JottingPadExcerpt
            key={i}
            post={post}
            component="li"
            reverseLayout={i % 2 !== 0}
          />
        ))}
      </Box> */}
    </PageLayout>
  );
};
