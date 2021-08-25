import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import Typed from 'typed.js';

const useStyles = makeStyles(({ palette, spacing }) => ({
  typedContainer: {
    '& .typed-cursor--blink': {
      animationDuration: '1.5s !important',
    },
  },
  typed: {
    display: 'inline',
  },
}));

/**
 * TODO update props list documentation
 */
export default ({ className, component, id, ...typedProps }) => {
  const classes = useStyles();
  const [typed, setTyped] = useState();
  const typedRef = useRef({});

  const create = (id, options) => {
    const newTyped = new Typed(`#${id}`, options);
    setTyped(newTyped);

    typedRef.current = newTyped;
  };

  useEffect(() => {
    create(id, typedProps);
  }, []);

  useEffect(() => {
    if (typed) {
      typed.destroy();

      create(id, typedProps);
    }
  }, [typedProps.strings]);

  return (
    <Box className={classes.typedContainer}>
      <Typography
        className={classnames([classes.typed, className])}
        component={component}
        id={id}
      />
    </Box>
  );
};
