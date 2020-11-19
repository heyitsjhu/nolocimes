import Logger from 'js-logger';

// TODO: Figure out how to set development in dev and production in prod automatically
if (process.env.NODE_ENV !== 'production') {
  Logger.useDefaults(); // eslint-disable-line react-hooks/rules-of-hooks
} else {
  Logger.setLevel(Logger.OFF);
}

// Logger.setHandler((messages, context) => {
//   // Send messages to a custom logging endpoint for analysis.
//   // TODO: Add some security? (nah, you worry too much! :P)
//   console.log('log', Logger, messages, context);
//   console.debug('debug');
//   console.info('info');
//   console.warn('warn');
//   console.error('error');
// });

export default Logger;
