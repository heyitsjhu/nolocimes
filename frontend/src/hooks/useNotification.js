import { useContext } from 'react';
import { DEFAULT_NOTIFICATION_DELAY, STORE_KEYS } from 'const';
import { AppContext } from 'stores';
import { updateAppState } from 'stores/actions/appActions';

/**
 * Sets a global notification.
 */
export const useNotification = () => {
  const [appState, dispatch] = useContext(AppContext);

  const setNotification = ({ buttonText, delay, message, onClose, severity, title }) => {
    setTimeout(() => {
      dispatch(
        updateAppState(STORE_KEYS.NOTIFICATION, null, {
          ...(buttonText ? { buttonText } : {}),
          ...(message ? { message } : {}),
          ...(onClose ? { onClose } : {}),
          ...(severity ? { severity } : {}),
          ...(title ? { title } : {}),
          show: true,
        })
      );
    }, delay || DEFAULT_NOTIFICATION_DELAY);
  };

  const resetNotification = () => {
    dispatch(updateAppState(STORE_KEYS.NOTIFICATION, STORE_KEYS.RESET));
  };

  return { resetNotification, setNotification };
};
