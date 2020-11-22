import contentfulApi from 'api/contentful';
import Logger from 'utils/logger';

import * as TYPES from '../types';

export const fetchBlogPosts = async () => {
  try {
    const resp = await contentfulApi.getEntries({ content_type: 'blogPost' });
    const posts = resp.data.items;

    return { type: TYPES.FETCH_BLOG_POSTS, payload: posts };
  } catch (error) {
    Logger.error(error);
  }
};
