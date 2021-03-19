import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { useNotification } from 'hooks/useNotification';
import { AppContext } from 'stores';

const useStyles = makeStyles(({ transitions, spacing, zIndex }) => ({
  notificationBanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: spacing(1),
    width: '100%',
    borderRadius: 0,
    zIndex: zIndex.notificationBanner,
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
  const classes = useStyles();
  const [appState, dispatch] = useContext(AppContext);
  const { resetNotification } = useNotification();
  const { buttonText, message, onClose, severity, show, title } = appState[STORE_KEYS.NOTIFICATION];

  const handleOnClose = () => {
    onClose && onClose();
    resetNotification();
  };

  const renderActionButton = () => {
    return (
      buttonText && (
        <Button color="inherit" size="small" onClick={handleOnClose}>
          {buttonText}
        </Button>
      )
    );
  };

  const renderAlertMessage = () => {
    if (typeof message === 'string') {
      return <Typography>{t(message)}</Typography>;
    } else {
      return message;
    }
  };

  return appState[STORE_KEYS.SITE_SETTINGS].isInteractive && message ? (
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
