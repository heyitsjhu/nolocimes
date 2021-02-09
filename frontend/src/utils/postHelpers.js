export const getPostBody = post => {
  return post ? post.fields.body.content : null;
};

export const getPostDate = post => {
  return post ? post.fields.publishDate : post;
};

export const getPostDescription = post => {
  return post ? post.fields.description : post;
};

export const getPostHeroImageUrl = post => {
  if (post && post.fields && post.fields.heroImage) {
    return post.fields.heroImage.fields.file.url;
  } else {
    return null;
  }
};

export const getPostSlug = post => {
  return post ? post.fields.slug : post;
};

export const getPostTags = post => {
  return post ? post.fields.tags : post;
};

export const getPostTitle = post => {
  return post ? post.fields.title : post;
};
