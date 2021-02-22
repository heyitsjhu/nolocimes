import contentfulApi from 'api/contentful';
import { STORE_KEYS } from 'const';
import Logger from 'utils/logger';

import * as TYPES from '../types';

// TODO update firstLevelKey because function implies it's for content state
export const updateContentState = (secondLevelKey, thirdLevelKey, payload) => {
  return {
    type: TYPES.UPDATE_APP_STATE,
    firstLevelKey: STORE_KEYS.CONTENT,
    secondLevelKey,
    thirdLevelKey,
    payload,
  };
};

export const fetchContentAssets = async () => {
  try {
    const resp = await contentfulApi.getAssets();
    const assets = resp.data.items;

    return updateContentState(STORE_KEYS.ASSETS, undefined, assets);
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
      // return updateContentState(STORE_KEYS.ASSETS, undefined, assets);
    }
    const images = assets.filter(asset => imageTypes.includes(asset.fields.file.contentType));

    return updateContentState(STORE_KEYS.IMAGES, undefined, images);
  } catch (error) {
    Logger.error(error);
  }
};

export const fetchContentPosts = async () => {
  try {
    const resp = await contentfulApi.getEntries({ content_type: 'blogPost', include: 2 });
    const posts = resp.data.items;

    return updateContentState(STORE_KEYS.POSTS, undefined, posts);
  } catch (error) {
    Logger.error(error);
  }
};

export const fetchContentTags = async () => {
  try {
    // const resp = await contentfulApi.getTags(); // Only Contentful Early Access Members have this endpoint
    const tags = ['general'];
    return updateContentState(STORE_KEYS.TAGS, undefined, tags);
  } catch (error) {
    Logger.error(error);
  }
};
