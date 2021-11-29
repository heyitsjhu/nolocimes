import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import NotesRoundedIcon from '@material-ui/icons/NotesRounded';
import classnames from 'classnames';

import { IconButton, Loader, Popover, ProgressBar } from 'components';
import { PAGE_LAYOUT_FADE_TIMEOUT, ROUTES } from 'const';
import { useCopy } from 'hooks/useCopy';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { getElId } from 'utils';

const useStyles = ({ isOnMobile, noPadding }) =>
  makeStyles(({ spacing, zIndex }) => ({
    pageLayout: {
      position: 'relative',
      padding: spacing(noPadding ? 0 : 4),
      zIndex: zIndex.pageLayout,
      ...(isOnMobile
        ? {
            marginTop: spacing(5),
            marginBottom: spacing(5),
            minHeight: `calc(100% - ${spacing(10)}px)`,
            height: `calc(100% - ${spacing(10)}px)`,
            overflowY: 'scroll',
          }
        : { minHeight: '100%', height: '100%' }),
    },
    pageActionsContainer: {
      padding: spacing(1),
      width: '100%',
      zIndex: zIndex.pageLayoutPageActions,
    },
    pageInfoContainer: {
      position: 'absolute',
      top: 8,
      right: 8,
    },
    progressBar: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
  }));

export default ({
  barLoading,
  children,
  iconLoading,
  noPadding,
  pageActions,
  pageDescription,
  pageLayoutClassName,
  pageName,
  ...otherProps
}) => {
  const { t } = useCopy();
  const history = useHistory();
  const layoutRef = useRef(null);
  const [fadeIn, setFadeIn] = useState(false);
  const siteSettings = useSelector(state => state.siteSettings);
  const { isOnMobile } = siteSettings;
  const classes = useStyles({ isOnMobile, noPadding })();
  const handleClose = () => history.push(ROUTES.HOME);

  useOnClickOutside(layoutRef, useCallback(handleClose, [handleClose]));

  useEffect(() => {
    setFadeIn(true);
  }, []);

  // TODO: Update pageDescription to be "Author's Note"

  return (
    <Box
      id={getElId('page', pageName)}
      className={classnames([classes.pageLayout, pageLayoutClassName])}
      ref={layoutRef}
    >
      <ProgressBar className={classes.progressBar} isLoading={barLoading} />
      <Loader isLoading={iconLoading} />
      {pageDescription && (
        <Box className={classes.pageInfoContainer}>
          <Popover
            id={'my-id'}
            anchorReference="anchorEl"
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            title={t(pageDescription)}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            TriggerElement={
              <IconButton noPadding>
                <NotesRoundedIcon fontSize="small" />
              </IconButton>
            }
          />
        </Box>
      )}
      {pageActions && <Box className={classes.pageActionsContainer}>{pageActions}</Box>}
      <Fade in={fadeIn} timeout={PAGE_LAYOUT_FADE_TIMEOUT}>
        <Box height="100%" {...otherProps}>
          {children}
        </Box>
      </Fade>
    </Box>
  );
};
