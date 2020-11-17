import DLError from 'models/DLError';
import { capitalize } from './';

/**
 *
 * @param {*} type
 * @param {*} name
 */
export const getElClass = (type, name) => {
  if (!name) {
    throw new DLError('Name parameter cannot be empty');
  }

  type = type ? capitalize(type) : '';
  return `DL${type}-${name}`;
};

/**
 *
 * @param {*} type
 * @param {*} id
 */
export const getElId = (type, name) => {
  type = type ? `${type}-` : '';
  return `dlabs-${type}${name || Math.round(Math.random() * 100000)}`;
};

// export const preventDefault = event => event.preventDefault();
