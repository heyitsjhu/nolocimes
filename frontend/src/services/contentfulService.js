import { useSelector, useDispatch } from 'react-redux';

import contentfulApi from 'api/contentful';
import { STORE_KEYS } from 'const';
import { updateContentful } from 'redux/reducers/contentful';
import Logger from 'utils/logger';

export const useContentfulService = () => {
  const dispatch = useDispatch();
  const content = useSelector(state => state.content);

  const getAssets = async () => {
    try {
      const response = await contentfulApi.getAssets();
      const assets = response.data.items;

      if (assets) {
        dispatch(updateContentful(STORE_KEYS.ASSETS, null, null, assets));

        return assets;
      }
    } catch (error) {
      Logger.error(error);
    }
  };

  const getImages = async () => {
    const imageTypes = ['image/jpeg'];
    let assets;

    try {
      if (content?.assets?.length > 0) {
        assets = content.assets;
      } else {
        const response = await contentfulApi.getAssets();
        assets = response.data.items;
        dispatch(updateContentful(STORE_KEYS.ASSETS, undefined, assets));
      }
      const images = assets.filter(asset => imageTypes.includes(asset.fields.file.contentType));

      dispatch(updateContentful(STORE_KEYS.IMAGES, undefined, images));

      return images;
    } catch (error) {
      Logger.error(error);
    }
  };

  const getPosts = async () => {
    try {
      const resp = await contentfulApi.getEntries({ content_type: 'blogPost', include: 2 });
      const posts = resp.data.items;
      dispatch(updateContentful(STORE_KEYS.POSTS, null, null, posts));

      return posts;
    } catch (error) {
      Logger.error(error);
    }
  };

  const getTags = async () => {
    try {
      // const resp = await contentfulApi.getTags(); // Only Contentful Early Access Members have this endpoint
      const tags = ['general'];

      dispatch(updateContentful(STORE_KEYS.TAGS, null, null, tags));

      return tags;
    } catch (error) {
      Logger.error(error);
    }
  };

  return { getAssets, getImages, getPosts, getTags };
};
