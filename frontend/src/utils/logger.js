import * as Logger from 'js-logger';
import Rollbar from 'rollbar';

const consoleHandler = Logger.createDefaultHandler();

const rollbar = new Rollbar({
  accessToken: process.env.REACT_APP_ROLLBAR_CLIENT_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV,
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

export default Logger;
