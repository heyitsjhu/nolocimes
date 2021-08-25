import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';

const useStyles = makeStyles(({ palette, spacing }) => ({
  container: {},
  listItem: {
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
    paddingLeft: spacing(1),
    paddingRight: spacing(1),
    borderLeft: '2px solid transparent',
    '& .MuiListItemIcon-root': {
      minWidth: 'auto',
    },
    '&.Mui-selected': {
      borderLeft: `2px solid ${palette.primary.main}`,
    },
  },
}));

const MENU_ITEMS = [
  {
    id: '',
    label: 'Price Chart',
    icon: <TimelineOutlinedIcon fontSize="small" />,
  },
  {
    id: '',
    label: 'News',
    icon: <AnnouncementOutlinedIcon fontSize="small" />,
  },
  {
    id: '',
    label: 'Fundamentals',
    icon: <LibraryBooksOutlinedIcon fontSize="small" />,
  },
  { id: '', label: 'Profile', icon: <BusinessOutlinedIcon fontSize="small" /> },
];

export const CompanySideNav = props => {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);

  return (
    <List className={classes.container} disablePadding>
      {MENU_ITEMS.map((item, i) => (
        <ListItem key={item.label} className={classes.listItem} button selected={selected === i}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          {/* <ListItemText>{item.label}</ListItemText> */}
        </ListItem>
      ))}
    </List>
  );
};
