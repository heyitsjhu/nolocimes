import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AspectRatioOutlinedIcon from '@material-ui/icons/AspectRatioOutlined';
import classnames from 'classnames';

// import { DetailedViewModal } from './DetailedViewModal';
import { getElClass } from 'utils';

const useStyles = makeStyles(({ palette, spacing, typography }) => ({
  widgetContainer: {
    position: 'relative',
    height: '100%',
    padding: spacing(1),
    transition: `all 600ms linear`,
    '&:hover [class*="detailedViewIcon"]': { opacity: 1 },
  },
  hoverBackground: {
    backgroundColor: palette.background.paper,
  },
  detailedViewIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
    fontSize: typography.fontSizeSmall,
    opacity: 0,
    transition: `all 600ms linear`,
    '&:hover': { color: palette.grey[500], cursor: 'pointer' },
  },
  withFooter: {
    paddingBottom: spacing(2),
  },
  accordion: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    '&::before': { display: 'none' },
    '&.Mui-expanded': {
      borderTop: `1px solid ${palette.grey[300]}`,
      borderBottom: `1px solid ${palette.grey[300]}`,
    },
  },
  accordionSummary: {
    height: spacing(2),
    minHeight: 'auto',
    '&:hover': { backgroundColor: palette.grey[50] },
    '&.Mui-expanded': { minHeight: 'auto' },
    '& .MuiAccordionSummary-content': { display: 'none' },
  },
  accordionDetails: {
    padding: spacing(1),
  },
  expandIcon: { color: palette.grey[500] },
}));

export default ({ detailedContent, widgetContent, ...otherProps }) => {
  const classes = useStyles();
  const [onDetailedViewHover, setOnDetailedViewHover] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOnDetailedViewClick = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Box
        {...otherProps}
        boxShadow={onDetailedViewHover ? 2 : 0}
        className={classnames([
          getElClass('comp', 'widget'),
          classes.widgetContainer,
          onDetailedViewHover && classes.hoverBackground,
          otherProps.className,
        ])}
      >
        {widgetContent()}
        {detailedContent && (
          <AspectRatioOutlinedIcon
            className={classes.detailedViewIcon}
            onMouseOver={() => setOnDetailedViewHover(true)}
            onMouseLeave={() => setOnDetailedViewHover(false)}
            onClick={handleOnDetailedViewClick}
          />
        )}
      </Box>
      {/* {detailedContent && (
        <DetailedViewModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          detailedContent={detailedContent()}
        />
      )} */}
    </>
  );
};

export const WidgetFooter = props => {
  const classes = useStyles();
  return (
    <Accordion className={classes.accordion} elevation={0} square>
      <AccordionSummary
        className={classnames([getElClass('comp', 'widgetFooter'), classes.accordionSummary])}
        expandIcon={<ExpandLessIcon className={classes.expandIcon} />}
        IconButtonProps={{
          disableRipple: true,
          edge: false,
          style: { padding: 0 },
        }}
        // aria-controls="panel1a-content"
        // id="panel1a-header"
      />

      <AccordionDetails className={classes.accordionDetails}>{props.children}</AccordionDetails>
    </Accordion>
  );
};
