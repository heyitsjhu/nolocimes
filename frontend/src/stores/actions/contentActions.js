import contentfulApi from 'api/contentful';
import Logger from 'utils/logger';

import * as TYPES from '../types';

export const fetchContentAssets = async () => {
  try {
    const resp = await contentfulApi.getAssets();
    const assets = resp.data.items;

    return { type: TYPES.FETCH_CONTENT_ASSETS, payload: assets };
  } catch (error) {
    Logger.error(error);
  }
};

export const fetchContentImages = async contentState => {
  const imageTypes = ['image/jpeg'];
  try {
    let assets;
    if (contentState && contentState.assets.length > 0) {
      assets = contentState.assets;
    } else {
      const resp = await contentfulApi.getAssets();
      assets = resp.data.items;

      return { type: TYPES.FETCH_CONTENT_IMAGES, payload: assets };
    }

    const images = assets.filter(asset => imageTypes.includes(asset.fields.file.contentType));

    return { type: TYPES.FETCH_CONTENT_IMAGES, payload: images };
  } catch (error) {
    Logger.error(error);
  }
};

export const fetchContentPosts = async () => {
  try {
    const resp = await contentfulApi.getEntries({ content_type: 'blogPost' });
    const posts = resp.data.items;

    return { type: TYPES.FETCH_CONTENT_POSTS, payload: posts };
  } catch (error) {
    Logger.error(error);
  }
};
