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

/**
 *
 * @param {*} type
 * @param {*} name
 */
export const getElTestId = name => {
  if (!name) {
    throw new DLError('Name parameter cannot be empty');
  }

  return `dlabs-test-id-${name}`;
};

// export const preventDefault = event => event.preventDefault();

export const scrollToLatestChildElement = (element, options) => {
  if (element && element.children.length) {
    const childrenLength = element.children.length;
    const latestChildElement = element.children[childrenLength - 1];

    const { verticalAdjustment } = options;

    const scrollToY =
      element.scrollHeight - latestChildElement.scrollHeight - (verticalAdjustment || 0);

    element.scrollTo({ behavior: 'smooth', left: 0, top: scrollToY });
  }
};
