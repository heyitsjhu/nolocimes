// TODO: Smart Args Assignment - Use the ...args method to intelligently assign incoming payload
// TODO: Add smart boolean checking - only set if incoming boolean is different from existing boolean
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
