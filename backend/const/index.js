import keys from '../config/keys';

const CONTENTFUL_PREVIEW_HOST = 'preview.contentful.com';
const CONTENTFUL_HOST = 'cdn.contentful.com';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export default {
  CONTENTFUL_HOST: IS_PRODUCTION ? CONTENTFUL_HOST : CONTENTFUL_PREVIEW_HOST,
  CONTENTFUL_SPACE: keys.contentfulSpace,
  CONTENTFUL_ACCESS_TOKEN: IS_PRODUCTION
    ? keys.contentfulAccessToken
    : keys.contentfulAccessTokenPreview,
  // iexBaseUrl: 'https://cloud.iexapis.com/stable',
  iexBaseUrl: keys.iexApiBaseUrl,
  iexToken: keys.iexClientPublishable,
  ROLLBAR_SERVER_TOKEN: keys.rollbarServerToken,
};
