import fetchApi from './fetch';

class ContentfulAPI {
  getAsset = async id => {
    const response = await fetchApi.get('/api/contentful/asset', { id });

    return response;
  };

  getAssets = async () => {
    const response = await fetchApi.get('/api/contentful/assets');

    return response;
  };

  getContentType = async id => {
    const response = await fetchApi.get('/api/contentful/contentType', { id });

    return response;
  };

  getEntries = async query => {
    const response = await fetchApi.get('/api/contentful/entries', { query });

    return response;
  };

  getTags = async () => {
    const response = await fetchApi.get('/api/contentful/tags');
    return response;
  };
}

export default new ContentfulAPI();
