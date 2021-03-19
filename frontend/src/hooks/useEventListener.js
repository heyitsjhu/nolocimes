import { useEffect, useRef } from 'react';

/**
 * Credit: {@link https://usehooks.com/useEventListener/}
 * @param {*} eventName
 * @param {*} handler
 * @param {*} element
 */
export const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;

    if (!isSupported) return;

    const eventListener = event => savedHandler.current(event);

    element.addEventListener(eventName, eventListener);

    return () => element.removeEventListener(eventName, eventListener);
  }, [eventName, element, handler]);
};
