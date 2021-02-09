import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import FormatQuoteRoundedIcon from '@material-ui/icons/FormatQuoteRounded';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import { DateTime } from 'luxon';

import TruncateText from 'components/TruncateText/TruncateText';
import { POSTS, STORE_KEYS } from 'const';
import { AppContext } from 'stores';

const useStyles = makeStyles(({ palette, spacing }) => ({
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
    textIndent: '5%',
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

const PostTitle = ({ title, ...otherProps }) => (
  <Typography {...otherProps} component="h1" variant="h1">
    {title}
  </Typography>
);

const PostBlockquote = ({ contentPart, ...otherProps }) => (
  <Box {...otherProps} component={contentPart.nodeType}>
    <FormatQuoteRoundedIcon color="disabled" />
    <Typography component="p">{contentPart.content[0].content[0].value}</Typography>
  </Box>
);

const PostHeading = ({ contentPart, ...otherProps }) => {
  const variant = contentPart.nodeType[0] + contentPart.nodeType[contentPart.nodeType.length - 1];
  return (
    <Typography {...otherProps} component={variant} variant={variant} gutterBottom>
      {contentPart.content[0].value}
    </Typography>
  );
};

const PostImage = ({ contentPart, ...otherProps }) => {
  const srcUrl = contentPart.data.target.fields.file.url;
  const altText = contentPart.data.target.fields.description;

  return <Box {...otherProps} component="img" alt={altText} src={srcUrl} />;
};

const PostList = ({ contentPart, ...otherProps }) => {
  const component = contentPart.nodeType === 'ordered-list' ? 'ol' : 'ul';

  const renderListItems = () => {
    return contentPart.content.map((listItem, i) => {
      return (
        <ListItem
          key={`${i}-${listItem.content[0].content[0].value}`}
          className={classnames([typeof listItem === 'object' && 'hideBullet'])}
        >
          {listItem.content[0].content[0].value}
          {listItem.content[1] && (
            <PostList
              className={classnames(otherProps.className)}
              contentPart={listItem.content[1]}
            />
          )}
        </ListItem>
      );
    });
  };

  return (
    <List {...otherProps} component={component}>
      {renderListItems()}
    </List>
  );
};

const PostParagraph = ({ contentPart, ...otherProps }) => {
  // need to handle contentPart.marks = [] for bold and italics
  return (
    <Typography {...otherProps} component="p" variant="body1" gutterBottom>
      {contentPart.content[0].value}
    </Typography>
  );
};

const PostContents = ({ className, postParts }) => {
  return postParts.map((contentPart, i) => {
    return (
      <RenderContentPart
        key={'renderContentPart' + i}
        className={className}
        contentPart={contentPart}
      />
    );
  });
};

const contentfulHeadings = [
  'heading-1',
  'heading-2',
  'heading-3',
  'heading-4',
  'heading-5',
  'heading-6',
];
const contentfulLists = ['ordered-list', 'unordered-list'];

const RenderContentPart = ({ className, contentPart }) => {
  const classes = useStyles();

  if (contentfulHeadings.includes(contentPart.nodeType)) {
    return (
      <PostHeading
        className={classnames(className, classes.postHeading)}
        contentPart={contentPart}
      />
    );
  } else if (contentPart.nodeType === 'paragraph') {
    return (
      <PostParagraph
        className={classnames(className, classes.postParagraphs)}
        contentPart={contentPart}
      />
    );
  } else if (contentfulLists.includes(contentPart.nodeType)) {
    return (
      <PostList className={classnames(className, classes.postList)} contentPart={contentPart} />
    );
  } else if (contentPart.nodeType === 'embedded-asset-block') {
    return (
      <PostImage className={classnames(className, classes.postImage)} contentPart={contentPart} />
    );
  } else if (contentPart.nodeType === 'blockquote') {
    return (
      <PostBlockquote
        className={classnames(className, classes.postBlockquote)}
        contentPart={contentPart}
      />
    );
    // } else if (contentPart.nodeType === 'hr') {
    //   // TODO
  } else {
    return <></>;
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
  [POSTS.POST_CONTENT]: (className, postParts, options) => (
    <PostContents className={className} postParts={postParts} />
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
  const className = classnames(classes[postType]);

  return postMapping[postType](className, postPart, options);
};
