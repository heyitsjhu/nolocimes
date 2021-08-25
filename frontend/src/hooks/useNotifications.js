import { useDispatch } from 'react-redux';
import { DEFAULT_NOTIFICATION_DELAY } from 'const';
import { resetNotification, updateNotification } from 'redux/reducers/notifications';

/**
 * Sets a global notification.
 */
export const useNotifications = () => {
  const dispatch = useDispatch();

  const setNotification = ({ buttonText, delay, message, onClose, severity, title }) => {
    setTimeout(() => {
      const notification = {
        ...(buttonText ? { buttonText } : {}),
        ...(message ? { message } : {}),
        ...(onClose ? { onClose } : {}),
        ...(severity ? { severity } : {}),
        ...(title ? { title } : {}),
        show: true,
      };

      dispatch(updateNotification(null, null, null, notification));
    }, delay || DEFAULT_NOTIFICATION_DELAY);
  };

  return { resetNotification, setNotification };
};
