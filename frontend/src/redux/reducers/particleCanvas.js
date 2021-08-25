import { PARTICLE_CANVAS_DEFAULTS } from 'const';
import { deepClone } from 'utils';

import setNextState from '../setNextState';

const initialState = PARTICLE_CANVAS_DEFAULTS;

export const UPDATE_PARTICLE_CANVAS = 'UPDATE_PARTICLE_CANVAS';

export const updateParticleCanvas = (firstLevel, secondLevel, thirdLevel, payload) => {
  return { type: UPDATE_PARTICLE_CANVAS, firstLevel, secondLevel, thirdLevel, payload };
};

export default (state = initialState || {}, action) => {
  let newState = deepClone(state);

  switch (action.type) {
    case UPDATE_PARTICLE_CANVAS:
      newState = setNextState(newState, action);
      break;
    default:
      break;
  }

  return newState;
};
