export const stateReducer = (state, action) => {
  if (action.key === 'post') {
    return { ...state, postContent: action.post };
  }

  const { index } = state;
  const prevIndexState = {
    prev: index.prev > 0 ? index.prev - 1 : null,
    current: index.prev,
    next: index.current,
  };
  const nextIndexState = {
    prev: index.current,
    current: index.next,
    next: index.next + 1,
  };
  const indexConfig = action.key === 'prev' ? prevIndexState : nextIndexState;

  return {
    ...state,
    index: indexConfig,
  };
};
