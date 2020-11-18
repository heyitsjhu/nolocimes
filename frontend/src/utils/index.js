export * from './dom';
export * from './rfdc';

/**
 *
 * @param {*} str
 */
export const capitalize = str => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};