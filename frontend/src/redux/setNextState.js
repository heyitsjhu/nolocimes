export default (state, action) => {
  return !action.firstLevel
    ? action.payload
    : {
        ...state,
        [action.firstLevel]: !action.secondLevel
          ? action.payload
          : {
              ...state[action.firstLevel],
              [action.secondLevel]: !action.thirdLevel
                ? action.payload
                : {
                    ...state[action.firstLevel][action.secondLevel],
                    [action.thirdLevel]: action.payload,
                  },
            },
      };
};
