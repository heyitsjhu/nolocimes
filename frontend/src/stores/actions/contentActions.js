import contentfulApi from 'api/contentful';
import { STORE_KEYS } from 'const';
import Logger from 'utils/logger';

import * as TYPES from '../types';

export const updateContentState = (firstLevelKey, secondLevelKey, payload) => {
  return { type: TYPES.UPDATE_APP_STATE, firstLevelKey, secondLevelKey, payload };
};

export const fetchContentAssets = async () => {
  try {
    const resp = await contentfulApi.getAssets();
    const assets = resp.data.items;

    return updateContentState(STORE_KEYS.CONTENT, STORE_KEYS.ASSETS, assets);
  } catch (error) {
    Logger.error(error);
  }
};

export const fetchContentImages = async contentState => {
  const imageTypes = ['image/jpeg'];
  let assets;

  try {
    if (contentState && contentState.assets.length > 0) {
      assets = contentState.assets;
    } else {
      const resp = await contentfulApi.getAssets();
      assets = resp.data.items;

      return updateContentState(STORE_KEYS.CONTENT, STORE_KEYS.ASSETS, assets);
    }
    const images = assets.filter(asset => imageTypes.includes(asset.fields.file.contentType));

    return updateContentState(STORE_KEYS.CONTENT, STORE_KEYS.IMAGES, images);
  } catch (error) {
    Logger.error(error);
  }
};

export const fetchContentPosts = async () => {
  try {
    const resp = await contentfulApi.getEntries({ content_type: 'blogPost', include: 2 });
    const posts = resp.data.items;

    return updateContentState(STORE_KEYS.CONTENT, STORE_KEYS.POSTS, posts);
  } catch (error) {
    Logger.error(error);
  }
};
