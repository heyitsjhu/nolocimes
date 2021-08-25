import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { useCopy } from 'hooks/useCopy';
import { useNotifications } from 'hooks/useNotifications';

const useStyles = isMobile =>
  makeStyles(({ spacing, zIndex }) => ({
    notificationBanner: {
      position: 'absolute',
      top: 0,
      left: 0,
      flexDirection: isMobile ? 'column' : 'row',
      padding: spacing(1),
      width: '100%',
      borderRadius: 0,
      zIndex: zIndex.notificationBanner,
      '& .MuiAlert-icon': {
        display: isMobile ? 'none' : 'flex',
      },
      '& .MuiAlert-message': {
        padding: '7px 0',
      },
      '& .MuiAlert-action': {
        paddingRight: spacing(2),
      },
    },
  }));

export default () => {
  const { t } = useCopy();
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications);
  const siteSettings = useSelector(state => state.siteSettings);
  const { resetNotification } = useNotifications();

  const { buttonText, message, onClose, severity, show, title } = notifications;
  const { isInteractive, isOnMobile } = siteSettings;
  const classes = useStyles(isOnMobile)();

  const handleOnClose = () => {
    onClose && onClose();
    dispatch(resetNotification());
  };

  const renderActionButton = () => {
    return (
      buttonText && (
        <Button color="inherit" size="small" onClick={handleOnClose}>
          {t(buttonText)}
        </Button>
      )
    );
  };

  const renderAlertMessage = () => {
    if (typeof message === 'function') {
      return message();
    } else if (typeof message === 'string') {
      return <Typography>{t(message)}</Typography>;
    } else {
      return message;
    }
  };

  return isInteractive && message ? (
    <Fade in={show}>
      <Alert
        className={classnames(classes.notificationBanner)}
        severity={severity}
        action={renderActionButton()}
        onClose={handleOnClose}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {renderAlertMessage()}
      </Alert>
    </Fade>
  ) : null;
};
