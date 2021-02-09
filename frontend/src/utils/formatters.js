import { DateTime } from 'luxon';

/**
 *
 * @param {*} type
 * @param {*} name
 */
export const formatThemeProperty = property => {
  if (!property) return '';

  const formatted = property.replace(/([A-Z])/g, ' $1');

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const formatHash = (hash, length = 8) => {
  return hash.slice(0, length);
};

export const formatTimestamp = timestamp => {
  return DateTime.fromMillis(timestamp).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
};
