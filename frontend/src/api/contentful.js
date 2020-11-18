import fetchApi from './fetch';

class ContentfulAPI {
  getContentType = async id => {
    const response = await fetchApi.get('/api/contentful/contentType', { id });

    return response;
  };

  getEntries = async query => {
    const response = await fetchApi.get('/api/contentful/entries', { query });

    return response;
  };
}

export default new ContentfulAPI();
