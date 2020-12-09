import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

const useStyles = makeStyles(({ palette, spacing }) => ({
  ellipsis: {
    paddingLeft: spacing(1) / 2,
    paddingRight: spacing(1) / 2,
    letterSpacing: 1.8,
  },
  padLeft: {
    paddingLeft: spacing(1) / 2,
  },
}));

export default ({ ellipsis, readMoreLabel, readMoreUrl, textContent, ...otherProps }) => {
  const classes = useStyles();
  const [isTruncated, setIsTruncated] = useState(false);
  const [truncateLimit, setTruncateLimit] = useState(400);
  const [truncatedText, setTruncateText] = useState(textContent);
  const truncateRef = useRef({});

  const renderEllipsis = () => {
    return ellipsis === '...' ? (
      <Typography className={classes.ellipsis} component="span">
        {ellipsis}
      </Typography>
    ) : (
      ellipsis
    );
  };

  useEffect(() => {
    if (textContent && textContent.length > truncateLimit) {
      setIsTruncated(true);
      setTruncateText(textContent.slice(0, truncateLimit));
    }
  }, [textContent, truncateLimit]);

  return (
    <Typography component="p" {...otherProps} ref={truncateRef}>
      {truncatedText}
      {isTruncated && renderEllipsis()}

      <Link
        className={classnames([!isTruncated && classes.padLeft])}
        href={readMoreUrl}
        variant="overline"
      >
        {readMoreLabel}
      </Link>
    </Typography>
  );
};
