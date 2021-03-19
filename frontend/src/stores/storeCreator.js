import React, { createContext, useReducer } from 'react';
import ReducerLogger from 'use-reducer-logger';

/**
 * Creates a new React context and provider with the given initial state and reducer, and
 * staticState (if provided). The context and provider is then returned in an array.
 * @param {Object} initialState
 * @param {Function} reducer - A reducer function.
 * @param {Object} [staticState]
 * @returns {Array} [Context, Provider]
 */
const createStore = (displayName, initialState, reducer, staticState = undefined) => {
  const isDev = process.env.NODE_ENV === 'development';
  const storeState = isDev && staticState ? staticState : initialState;

  const Context = createContext(initialState);

  return [
    Context,
    ({ children }) => {
      const appReducer = process.env.NODE_ENV === 'development' ? ReducerLogger(reducer) : reducer;
      const [state, dispatch] = useReducer(appReducer, storeState);

      return (
        <Context.Provider displayName value={[state, dispatch]}>
          {children}
        </Context.Provider>
      );
    },
  ];
};

export default createStore;
