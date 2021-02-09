export * from './dataHandlers';
export * from './dom';
export * from './formatters';
export * from './postHelpers';
export * from './rfdc';

/**
 *
 * @param {*} str
 */
export const capitalize = str => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};

/**
 *
 * @param {*} length
 * @param {*} decimals
 */
export const getRandomNumber = (length, decimals = 3) => {
  const len = length || Math.floor(Math.random() * 5);
  return (Math.random() * Math.pow(10, len)).toFixed(decimals);
};
