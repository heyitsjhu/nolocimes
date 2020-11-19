import Logger from 'js-logger';
import Rollbar from 'rollbar';
import constants from '../const';

const consoleHandler = Logger.createDefaultHandler();

const rollbar = new Rollbar({
  accessToken: constants.ROLLBAR_SERVER_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV || 'development',
  logLevel: 'info',
  reportLevel: 'error',
});

rollbar.global({ itemsPerMinute: 3, maxItems: 5 });

const rollbarHandler = (messages, context) => {
  const rollbarLogMapper = {
    DEBUG: messages => messages[0] && rollbar.debug(messages[0]),
    INFO: messages => messages[0] && rollbar.info(messages[0]),
    WARN: messages => messages[0] && rollbar.warning(messages[0]),
    ERROR: messages => messages[0] && rollbar.error(messages[0]),
  };

  rollbarLogMapper[context.level.name](messages);
};

Logger.useDefaults(); // eslint-disable-line

Logger.setHandler((messages, context) => {
  consoleHandler(messages, context); // use default handler
  rollbarHandler(messages, context); // report to rollbar
});

export { rollbar };
export default Logger;
