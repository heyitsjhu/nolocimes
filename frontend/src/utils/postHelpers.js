export const getPostBody = post => {
  return post ? post.fields.body.content : null;
};

export const getPostDate = post => {
  return post ? post.fields.publishDate : null;
};

export const getPostDescription = post => {
  return post ? post.fields.description : null;
};

export const getPostHeroImageUrl = post => {
  if (post && post.fields && post.fields.heroImage) {
    return post.fields.heroImage.fields.file.url;
  } else {
    return null;
  }
};

export const getPostSlug = post => {
  return post ? post.fields.slug : null;
};

export const getPostTags = post => {
  return post ? post.fields.tags : null;
};

export const getPostTitle = post => {
  return post ? post.fields.title : null;
};
