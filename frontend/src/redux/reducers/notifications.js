import { deepClone } from 'utils';

import setNextState from '../setNextState';

const initialState = {
  buttonText: null,
  message: null,
  onClick: () => {},
  severity: 'info',
  show: false,
  title: null,
};

export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
export const RESET_NOTIFICATIONS = 'RESET_NOTIFICATIONS';

export const updateNotification = (firstLevel, secondLevel, thirdLevel, payload) => {
  return { type: UPDATE_NOTIFICATIONS, firstLevel, secondLevel, thirdLevel, payload };
};

export const resetNotification = () => {
  return { type: RESET_NOTIFICATIONS };
};

export default (state = initialState, action) => {
  let newState = deepClone(state);

  switch (action.type) {
    case UPDATE_NOTIFICATIONS:
      newState = setNextState(newState, action);
      break;
    case RESET_NOTIFICATIONS:
      newState = initialState;
      break;
    default:
      break;
  }

  return newState;
};
