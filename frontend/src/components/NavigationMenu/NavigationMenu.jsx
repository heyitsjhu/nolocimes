import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import CreateIcon from '@material-ui/icons/Create';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import MenuIcon from '@material-ui/icons/Menu';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import TimelineIcon from '@material-ui/icons/Timeline';

import { FeatureToggle, IconButton } from 'components';
import { FEATURE_FLAGS, SITE_NAVIGATION } from 'const';
import { useCopy } from 'hooks/useCopy';

const useStyles = makeStyles(({ breakpoints, palette, shared, spacing, zIndex }) => ({
  paperContainer: {
    width: '100%',
    maxWidth: 300,
  },
}));

const ICON_MAPPING = {
  about: () => <PersonRoundedIcon fontSize="small" />,
  anbu: () => <DeveloperBoardIcon fontSize="small" />,
  blog: () => <CreateIcon fontSize="small" />,
  candlemonkeys: () => <DashboardIcon fontSize="small" />,
  coronavirus: () => <TimelineIcon fontSize="small" />,
  nolocimes: () => <AccountTreeIcon fontSize="small" />,
  photography: () => <PhotoLibraryIcon fontSize="small" />,
  poweredbyscroll: () => <ImportExportIcon fontSize="small" />,
};

export default props => {
  const { t } = useCopy();
  const history = useHistory();
  const classes = useStyles();
  const siteSettings = useSelector(state => state.siteSettings);
  const [open, setOpen] = useState(false);

  const { isInteractive } = siteSettings;
  const PROJECTS_NAV_SET = SITE_NAVIGATION.items.filter(item => item.grouping === 1);
  const JHU_NAV_SET = SITE_NAVIGATION.items.filter(item => item.grouping === 2);
  const hasDisabledItem = SITE_NAVIGATION.items.some(item => item.disabled === true);

  const toggleMenu = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  const handleOnClick = url => event => {
    history.push(url);
  };

  const renderNavList = () => {
    return (
      <Box
        className={classes.menuListContainer}
        onClick={toggleMenu(false)}
        onKeyDown={toggleMenu(false)}
        role="presentation"
      >
        <List>
          {PROJECTS_NAV_SET.map((navItem, index) => (
            <ListItem
              button
              disabled={navItem.disabled}
              key={t(navItem.text)}
              onClick={handleOnClick(navItem.url)}
            >
              {ICON_MAPPING[navItem.icon] && (
                <ListItemIcon>{ICON_MAPPING[navItem.icon]()}</ListItemIcon>
              )}
              <ListItemText primary={`${t(navItem.text)}${navItem.disabled ? ' *' : ''}`} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {JHU_NAV_SET.map((navItem, index) => (
            <ListItem
              button
              disabled={navItem.disabled}
              key={t(navItem.text)}
              onClick={handleOnClick(navItem.url)}
            >
              {ICON_MAPPING[navItem.icon] && (
                <ListItemIcon>{ICON_MAPPING[navItem.icon]()}</ListItemIcon>
              )}
              <ListItemText primary={`${t(navItem.text)}${navItem.disabled ? ' *' : ''}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <FeatureToggle flag={FEATURE_FLAGS.NAVIGATION_MENU}>
      <IconButton
        aria-label={t('a11y.ariaLabel.mobileMenuButton')}
        onClick={isInteractive ? toggleMenu(true) : undefined}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={SITE_NAVIGATION.anchorPosition}
        open={open}
        PaperProps={{ className: classes.paperContainer }}
        onClose={toggleMenu(false)}
      >
        {renderNavList()}

        {hasDisabledItem && (
          <Box py={1} px={2}>
            <Typography color="textSecondary" style={{ fontStyle: 'italic' }} variant="caption">
              * {t('common.comingSoon')}
            </Typography>
          </Box>
        )}
      </Drawer>
    </FeatureToggle>
  );
};
