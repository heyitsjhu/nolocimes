import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fade from '@material-ui/core/Fade';
import transitions from 'theme/transitions';
import classnames from 'classnames';

const useStyles = makeStyles(({ palette, shared, spacing }) => ({
  dialog: {},
  paper: {
    borderRadius: 0,
    border: shared.borderDefault,
    borderTop: shared.borderSignature,
    backgroundColor: palette.background.default,
    width: '100%',
  },
  dialogActions: {
    '& > :not(:first-child)': {
      marginLeft: spacing(2),
    },
  },
  marginAndPadding: {
    marginLeft: spacing(2),
    marginRight: spacing(2),
    padding: `${spacing(2)}px ${spacing(1)}px`,
  },
  title: {
    paddingBottom: spacing(1),
    borderBottom: shared.borderDefault,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} disableStrictModeCompat />;
});

export default ({
  children,
  description,
  dialogActions,
  id,
  open,
  onClose,
  PaperProps,
  title,
  useDialogContent,
  ...otherDialogProps
}) => {
  const classes = useStyles();
  // TODO: create a validation system for props across all components

  const renderDialogContent = () => {
    if (children) {
      return useDialogContent ? (
        <DialogContent className={classes.marginAndPadding}>{children}</DialogContent>
      ) : (
        children
      );
    } else if (description) {
      return (
        <DialogContent className={classes.marginAndPadding}>
          <DialogContentText id={`${id}-description`}>{description}</DialogContentText>
        </DialogContent>
      );
    }
    return null;
  };

  return (
    <Dialog
      aria-labelledby={title ? `${id}-title` : ''}
      aria-describedby={description ? `${id}-description` : ''}
      className={classes.dialog}
      open={open}
      PaperProps={{ className: classnames([classes.paper, PaperProps && PaperProps.className]) }}
      TransitionComponent={Transition}
      transitionDuration={{
        enter: transitions.duration.longest,
        exit: transitions.duration.longest,
      }}
      onClose={onClose}
      {...otherDialogProps}
    >
      {title && (
        <DialogTitle
          className={classnames(classes.title, classes.marginAndPadding)}
          id={`${id}-title`}
        >
          {title}
        </DialogTitle>
      )}
      {renderDialogContent()}
      {dialogActions && (
        <DialogActions className={classnames([classes.dialogActions, classes.marginAndPadding])}>
          {dialogActions()}
        </DialogActions>
      )}
    </Dialog>
  );
};
