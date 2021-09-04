/*! - production.js
 *
 * In most production environments - for example, platforms like Heroku - there
 * is a setting where you can add environment variables for your application.
 * You can then reference those variables here as part of the process.env property.
 *
 * Because we're using process.env to access our environment variables in production,
 * this approach does not expose any sensitive information to the public, which means
 * we can include this file in our repository. This is not the case for development.js.
 *
 * To learn how to setup enviroment variables on Heroku, visit:
 *
 * Remember, the api keys and information you use for these environment variables
 * should be different from the ones you use in development.
 *
 */
module.exports = {
  baseUrl: process.env.BASE_URL,
  contentfulSpace: process.env.CONTENTFUL_SPACE,
  contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  contentfulAccessTokenPreview: process.env.CONTENTFUL_ACCESS_TOKEN_PREVIEW,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  iexApiBaseUrl: process.env.IEX_API_BASE_URL,
  iexClientPublishable: process.env.IEX_CLIENT_PUBLISHABLE,
  iexClientSecret: process.env.IEX_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey1: process.env.COOKIE_KEY_1,
  cookieKey2: process.env.COOKIE_KEY_2,
  rapidApiCovidStatsUrl: process.env.RAPIDAPI_COVID_STATS_URL,
  rapidApiCovidTotalsUrl: process.env.RAPIDAPI_COVID_TOTALS_URL,
  rapidApiKey: process.env.RAPIDAPI_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
  rollbarServerToken: process.env.ROLLBAR_SERVER_TOKEN,
};
