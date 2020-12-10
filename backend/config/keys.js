/*! - keys.js
 * In this file, we use a conditional statement to load api keys,
 * database uri and other sensitive information depending on whether
 * our application in running in production or development environments.
 *
 * Once the environment is determined, the application exports, or makes
 * available, the corresponding file, which contains the information our
 * application needs.
 *
 * If you look at the prod.js and dev.js files, you'll notice they're both
 * just regular JavaScript objects, containing key/value pairings, and use
 * module.exports so it can be made available elsewhere in the application.
 * For example, in this file via the require() statement.
 *
 * process.env is a Node.js property that returns an object containing the
 * user environment. NODE_ENV is an environment variable made popular by
 * Express.js and primarily used to state whether a particular environment
 * is a production or development environment.
 *
 * Read more about process.env here: https://nodejs.org/api/process.html#process_process_env
 * Read more about NODE_ENV here: https://stackoverflow.com/questions/16978256/what-is-node-env-in-express
 */

const KEYS =
  process.env.NODE_ENV !== 'production' ? require('./development') : require('./production');

export default KEYS;
