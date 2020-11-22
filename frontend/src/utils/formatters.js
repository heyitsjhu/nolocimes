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
