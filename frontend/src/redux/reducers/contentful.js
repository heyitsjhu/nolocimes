import { STORE_KEYS } from 'const';
import { deepClone } from 'utils';

import setNextState from '../setNextState';

const initialState = {
  [STORE_KEYS.ASSETS]: [],
  [STORE_KEYS.IMAGES]: [],
  [STORE_KEYS.POSTS]: [],
  [STORE_KEYS.TAGS]: [],
};

export const UPDATE_CONTENTFUL = 'UPDATE_CONTENTFUL';

export const updateContentful = (firstLevel, secondLevel, thirdLevel, payload) => {
  return { type: UPDATE_CONTENTFUL, firstLevel, secondLevel, thirdLevel, payload };
};

export default (state = initialState, action) => {
  let newState = deepClone(state);

  switch (action.type) {
    case UPDATE_CONTENTFUL:
      newState = setNextState(newState, action);

      if (action.firstLevel === STORE_KEYS.ASSETS) {
        const imageTypes = ['image/jpeg'];
        const images = action.payload.filter(asset =>
          imageTypes.includes(asset.fields.file.contentType)
        );

        newState[STORE_KEYS.IMAGES] = images;
      }

      break;
    default:
      break;
  }

  return newState;
};
