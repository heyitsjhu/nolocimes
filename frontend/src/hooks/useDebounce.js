import { useEffect, useState } from 'react';

/**
 * Credit: {@link https://usehooks.com/useDebounce/|useHooks.com}
 * @param {*} eventName
 * @param {*} handler
 * @param {*} element
 */
export const useDebounce = (value, delay = 0) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, debouncedValue]);

  return debouncedValue;
};
