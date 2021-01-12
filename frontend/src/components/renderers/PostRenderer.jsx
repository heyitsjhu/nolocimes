import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import FormatQuoteRoundedIcon from '@material-ui/icons/FormatQuoteRounded';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import Table from "@material-ui/core/Table";
// import TableHead from "@material-ui/core/TableHead";
// import TableBody from "@material-ui/core/TableBody";
// import TableRow from "@material-ui/core/TableRow";
// import TableCell from "@material-ui/core/TableCell";
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import { DateTime } from 'luxon';

// import { DEFAULT_POST_COVER_IMAGE } from '../../const';
import { POSTS, STORE_KEYS } from '../../const';
import { AppContext } from 'stores';
import TruncateText from '../../components/TruncateText/TruncateText';

const useStyles = makeStyles(({ palette, spacing }) => ({
  base: { color: palette.text.primary },
  [POSTS.POST_BLOCKQUOTE]: {
    position: 'relative',
    margin: `${spacing(6)}px 0`,
    padding: spacing(4),
    paddingLeft: '12em',
    borderTop: `2px solid ${palette.primary.main}`,
    borderBottom: `2px solid ${palette.primary.main}`,
    '& .MuiSvgIcon-root': {
      position: 'absolute',
      top: -10,
      left: '1em',
      fontSize: '8em',
      color: palette.primary.main,
      transform: 'rotate(180deg)',
      opacity: 0.15,
    },
    '& p.MuiTypography-root': {
      fontFamily: 'cursive',
      fontSize: '2em',
      fontStyle: 'italic',
      color: palette.grey[600],
    },
    '& span.MuiTypography-root': {
      display: 'block',
      marginTop: spacing(2),
      color: palette.grey[600],
      textAlign: 'right',
    },
  },
  [POSTS.POST_CONTENT]: {},
  [POSTS.POST_HERO_IMAGE]: {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  [POSTS.POST_DATE]: {
    display: 'block',
    marginBottom: spacing(1),
    textAlign: 'center',
    lineHeight: 1,
  },
  [POSTS.POST_HEADING]: {
    marginTop: spacing(4),
    marginBottom: spacing(4),
  },
  [POSTS.POST_IMAGE]: {
    marginBottom: spacing(4),
    width: '100%',
  },
  [POSTS.POST_LIST]: {
    marginLeft: spacing(2),
    marginBottom: spacing(3),
    padding: 0,
    '& .MuiListItem-root': {
      paddingTop: 3,
      paddingBottom: 3,
      '&:not(.hideBullet)::before': {
        content: '""',
        position: 'relative',
        display: 'inline-block',
        left: '-1em',
        width: '0.4em',
        height: '0.4em',
        borderRadius: '50%',
        backgroundColor: palette.grey[600],
      },
      '& > .MuiList-root': {
        marginBottom: 0,
      },
    },
  },
  postParagraphs: {
    marginBottom: spacing(4),
    lineHeight: 1.8,
    textIndent: '10%',
  },
  [POSTS.POST_TAGS]: {
    marginBottom: spacing(4),
    textAlign: 'center',
    '& .MuiChip-root': {
      margin: spacing(1) / 2,
      height: spacing(3.5),
      color: palette.grey[400],
    },
  },
  [POSTS.POST_TITLE]: {
    marginTop: spacing(4),
    textAlign: 'center',
  },
  [POSTS.EXCERPT_TITLE]: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
  [POSTS.EXCERPT_DESCRIPTION]: {
    width: '100%',
    marginBottom: spacing(4),
    lineHeight: 1.8,
    textAlign: 'justify',
    // textIndent: "10%",
  },
}));

const PostDate = ({ date, ...otherProps }) => {
  return (
    <Typography {...otherProps} component="span" variant="overline">
      {DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
    </Typography>
  );
};

const PostCoverImage = ({ postPart, heroImage, ...otherProps }) => {
  const url = (postPart && postPart.src) || 'https:///placehold.it/800x300';
  return <Box {...otherProps} style={{ backgroundImage: `url('${url}')` }}></Box>;
};

const PostTags = ({ tags, ...otherProps }) => {
  const [appState] = useContext(AppContext);
  const { activeTag } = appState[STORE_KEYS.BLOG];

  return (
    <Box {...otherProps}>
      {tags.map(tag => (
        <Chip
          key={tag}
          color={tag === activeTag ? 'primary' : 'default'}
          label={tag}
          variant="outlined"
        />
      ))}
    </Box>
  );
};

const ExcerptTitle = ({ title, postUrl, ...otherProps }) => (
  <Typography variant="h2" gutterBottom {...otherProps}>
    <Link href={postUrl} color="textPrimary" underline="none">
      {title}
    </Link>
  </Typography>
);

const ExcerptDescription = ({ description, postUrl, ...otherProps }) => {
  return (
    <TruncateText
      ellipsis="..."
      readMoreLabel="Read more"
      readMoreUrl={postUrl}
      textContent={description}
      {...otherProps}
    />
  );
};

const PostTitle = ({ title, ...otherProps }) => (
  <Typography {...otherProps} component="h1" variant="h1">
    {title}
  </Typography>
);

// const PostBlockquote = ({ blockquote, ...otherProps }) => (
//   <Box {...otherProps} component={postPart.type}>
//     <FormatQuoteRoundedIcon color="disabled" />
//     <Typography component="p">{postPart.value.quote}</Typography>
//     {postPart.value.quoter && (
//       <Typography component="span" variant="overline">
//         &mdash; {postPart.value.quoter}
//       </Typography>
//     )}
//   </Box>
// );

const PostHeading = ({ postPart, ...otherProps }) => (
  <Typography {...otherProps} component={postPart.type} variant={postPart.type} gutterBottom>
    {postPart.value}
  </Typography>
);

const RenderContentPart = ({ className, postPart }) => {
  const classes = useStyles();

  if (['h2', 'h3', 'h4', 'h5', 'h6'].includes(postPart.type)) {
    return (
      <PostHeading className={classnames(className, classes.postHeading)} postPart={postPart} />
    );
  } else if (postPart.type === 'content') {
    return (
      <PostParagraphs
        className={classnames(className, classes.postParagraphs)}
        postPart={postPart}
      />
    );
  } else if (postPart.type === 'image') {
    return <PostImage className={classnames(className, classes.postImage)} postPart={postPart} />;
  } else if (postPart.type === 'list') {
    return <PostList className={classnames(className, classes.postList)} postPart={postPart} />;
  } else if (postPart.type === 'blockquote') {
    // return (
    //   <PostBlockquote
    //     className={classnames(className, classes.postBlockquote)}
    //     postPart={postPart}
    //   />
    // );
  } else {
    return <></>;
  }
};

const PostContents = ({ className, content }) => {
  return content.map((postPart, i) => {
    return (
      <RenderContentPart key={'renderContentPart' + i} className={className} postPart={postPart} />
    );
  });
};

const PostImage = ({ postPart, ...otherProps }) => (
  <Box {...otherProps} component="img" alt={postPart.value.alt} src={postPart.value.src} />
);

// TODO: ordered list
const PostList = ({ postPart, ...otherProps }) => {
  if (Array.isArray(postPart.value) && postPart.value.length) {
    const renderListItems = () => {
      return postPart.value.map((listItem, i) => {
        return (
          <ListItem
            key={`${i}-${listItem}`}
            className={classnames([typeof listItem === 'object' && 'hideBullet'])}
          >
            {typeof listItem === 'object' ? (
              <PostList className={classnames(otherProps.className)} postPart={listItem} />
            ) : (
              listItem
            )}
          </ListItem>
        );
      });
    };

    return <List {...otherProps}>{renderListItems()}</List>;
  }
};

const PostParagraphs = ({ postPart, ...otherProps }) => {
  if (Array.isArray(postPart.value) && postPart.value.length) {
    return postPart.value.map((paragraph, i) => {
      return (
        <Typography
          key={`${i}-${paragraph.slice(0, 9)}`}
          {...otherProps}
          component="p"
          variant="body1"
          gutterBottom
        >
          {postPart.value}
        </Typography>
      );
    });
  }
};

const postMapping = {
  [POSTS.EXCERPT_DESCRIPTION]: (className, postDescription, options) => (
    <ExcerptDescription
      className={className}
      description={postDescription}
      postUrl={options.postUrl}
    />
  ),
  [POSTS.EXCERPT_TITLE]: (className, postTitle, options) => (
    <ExcerptTitle className={className} title={postTitle} postUrl={options.postUrl} />
  ),
  [POSTS.POST_CONTENT]: (className, postContent, options) => (
    <PostContents className={className} content={postContent} />
  ),
  [POSTS.POST_HERO_IMAGE]: (className, postImage) => (
    <PostCoverImage className={className} heroImage={postImage} />
  ),
  [POSTS.POST_DATE]: (className, postDate, options) => (
    <PostDate className={className} date={postDate} />
  ),
  [POSTS.POST_TAGS]: (className, postTags, options) => (
    <PostTags className={className} tags={postTags} />
  ),
  [POSTS.POST_TITLE]: (className, postTitle, options) => (
    <PostTitle className={className} gutterBottom title={postTitle} />
  ),
};

export const PostRenderer = (postType, postPart, options) => {
  const classes = useStyles();
  const className = classnames(classes.base, classes[postType]);

  return postMapping[postType](className, postPart, options);
};
