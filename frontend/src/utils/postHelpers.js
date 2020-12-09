export const getPostBody = post => {
  return post ? post.fields.body : post;
};

export const getPostCoverImage = post => {
  // fields.heroImage.sys.id
  return null;
  // return post ? post.find(part => part.type === 'coverImage') : post;
};

export const getPostDate = post => {
  return post ? post.fields.publishDate : post;
};

export const getPostDescription = post => {
  return post ? post.fields.description : post;
};

// export const getPostParts = post => {
//   return post ? post.filter(part => !PARTS_TO_IGNORE.includes(part.type)) : post;
// };

export const getPostSlug = post => {
  return post ? post.fields.slug : post;
};

export const getPostTags = post => {
  return post ? post.fields.tags : post;
};

export const getPostTitle = post => {
  return post ? post.fields.title : post;
};
