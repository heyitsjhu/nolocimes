import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import * as Utils from 'utils';

jest.mock('react-router-dom', () => ({
  useLocation: jest
    .fn()
    .mockReturnValueOnce({ pathname: '/' })
    .mockReturnValueOnce({ pathname: '/' })
    .mockReturnValueOnce({ pathname: '/blog' }),
}));

jest.mock('const', () => ({ STORE_KEYS: {}, ROUTES: { HOME: '/' } }));

import { useCopy } from './useCopy';
import { useDebounce } from './useDebounce';
import { useEventListener } from './useEventListener';
import { useIsHome } from './useIsHome';
import { useOnClickOutside } from './useOnClickOutside';
import { useScrollToTop } from './useScrollToTop';
import { useSearchQuery } from './useSearchQuery';

jest.useFakeTimers();

describe('[hooks] - useCopy', () => {
  const { result } = renderHook(() => useCopy());
  const spy = jest.spyOn(result.current, 't');

  test('it returns the react-i18next translation function', () => {
    expect(typeof result.current.t).toBe('function');
  });

  test('it calls the copy function when used', () => {
    act(() => {
      result.current.t('');
    });

    expect(spy).toBeCalled();
  });
});

describe('[hooks] - useDebounce', () => {
  test('calls setTimeout with provided delay and returns expected value', () => {
    const [value, delay] = [4, 1000];
    const { result } = renderHook(() => useDebounce(value, delay));

    expect(result.current).toBe(value);
    expect(setTimeout).toHaveBeenCalledTimes(2); // TODO not sure why it's called twice atm
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), delay);
  });
});

describe('[hooks] - useEventListener', () => {
  test('it attaches and captures the event listeners', () => {
    const el = <div>Test</div>;
    const handleClick = jest.fn();
    renderHook(() => useEventListener('click', handleClick));
    renderHook(() => useEventListener('mouseenter', handleClick));
    renderHook(() => useEventListener('mouseover', handleClick));

    render(el);

    fireEvent.click(screen.getByText(/test/i));
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.mouseEnter(screen.getByText(/test/i));
    expect(handleClick).toHaveBeenCalledTimes(2);

    fireEvent.mouseOver(screen.getByText(/test/i));
    expect(handleClick).toHaveBeenCalledTimes(3);
  });
});

describe('[hooks] useIsHome', () => {
  test("returns true if pathname is '/", () => {
    const { result } = renderHook(() => useIsHome());

    expect(result.current).toBe(true);
  });
  test("returns false if pathname is not '/", () => {
    const { result } = renderHook(() => useIsHome());

    expect(result.current).toBe(false);
  });
});

describe('[hooks] - useOnClickOutside', () => {
  const elementsToTriggerClose = [
    Utils.getElId('site', 'particle-canvas'),
    Utils.getElId('site', 'header'),
    Utils.getElId('site', 'footer'),
  ];

  const ParticleCanvas = () => <div id={elementsToTriggerClose[0]}>ParticleCanvas</div>;
  const Header = () => <header id={elementsToTriggerClose[1]}>Header</header>;
  const Footer = () => <footer id={elementsToTriggerClose[2]}>Footer</footer>;
  const NonTriggerEl = () => <div>NonTriggerEl</div>;
  const handleClick = jest.fn();
  const containsFn = jest.fn();
  const ref = { current: { contains: containsFn } };

  beforeEach(() => {
    handleClick.mockReset();
    containsFn.mockReset();
  });

  test('clicking on header triggers callback function', () => {
    render(<Header />);
    renderHook(() => useOnClickOutside(ref, handleClick));

    fireEvent.mouseDown(screen.getByText(/header/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(containsFn).toHaveBeenCalledTimes(1);
  });

  test('clicking on footer triggers callback function', () => {
    render(<Footer />);
    renderHook(() => useOnClickOutside(ref, handleClick));

    fireEvent.mouseDown(screen.getByText(/footer/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(containsFn).toHaveBeenCalledTimes(1);
  });

  test('clicking on particle canvas triggers callback function', () => {
    render(<ParticleCanvas />);
    renderHook(() => useOnClickOutside(ref, handleClick));

    fireEvent.mouseDown(screen.getByText(/particlecanvas/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(containsFn).toHaveBeenCalledTimes(1);
  });

  test('clicking on any other element should not trigger callback function', () => {
    render(<NonTriggerEl />);
    fireEvent.mouseDown(screen.getByText(/nontriggerel/i));

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});

describe('[hooks] - useScrollToTop', () => {
  const callback = jest.fn();
  const scrollMockFn = jest.fn();
  const ref = { current: { scrollTo: scrollMockFn } };
  const { result } = renderHook(() => useScrollToTop(ref, callback));

  test('returns the reference object supplied', () => {
    expect(result.current).toEqual(ref);
  });
  test('calls scrollTo function on reference object', () => {
    expect(scrollMockFn).toBeCalled();
  });
  test('calls the optional callback function, if supplied', () => {
    expect(callback).toBeCalled();
  });
});

describe('[hooks] - useSearchQuery', () => {
  const { result } = renderHook(() => useSearchQuery());
  const [data, setTicker] = result.current;

  test('it returns null for initial data', () => {
    expect(data).toBe(null);
  });

  // TODO: Test that the api is call?
  // act(() => setTicker('aapl'));
});
