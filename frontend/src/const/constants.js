export const LOCAL_STORAGE_KEY = 'dl_heyitsjhu';
export const PAGE_LAYOUT_FADE_TIMEOUT = 1500;
export const PARTICLE_CANVAS_DEFAULTS = {
  particleColor: { r: 204, g: 152, b: 81 },
  particleCount: 40,
  particlePulseFrequency: 0.02,
  particleRadius: 2,
  particleThreshold: 40,
  linkColor: { r: 204, g: 152, b: 81 },
  linkWidth: 0.8,
  linkDistanceLimit: 260,
  slowMultiplier: 30,
  cursorParticle: { x: 0, y: 0, vx: 0, vy: 0, r: 0, type: 'mouse' },
};
export const PARTICLE_CANVAS_MOBILE_DEFAULTS = {
  particleColor: { r: 204, g: 152, b: 81 },
  particleCount: 12,
  particlePulseFrequency: 0.04,
  particleRadius: 2,
  particleThreshold: 20,
  linkColor: { r: 204, g: 152, b: 81 },
  linkWidth: 0.6,
  linkDistanceLimit: 200,
  slowMultiplier: 24,
  cursorParticle: { x: 0, y: 0, vx: 0, vy: 0, r: 0, type: 'mouse' },
};
export const POSTS = {
  EXCERPT_DESCRIPTION: 'excerptDescription',
  EXCERPT_TITLE: 'excerptTitle',
  POST_BLOCKQUOTE: 'postBlockQuote',
  POST_CONTENT: 'postContent',
  POST_DATE: 'postDate',
  POST_HEADING: 'postHeading',
  POST_HERO_IMAGE: 'postHeroImage',
  POST_IMAGE: 'postImage',
  POST_LIST: 'postList',
  POST_TAGS: 'postTags',
  POST_TITLE: 'postTitle',
};
export const ROUTES = {
  HOME: '/',
  BLOG: '/blog',
  BLOG_POST: '/blog/:postId',
  BLOG_TAGS: '/blog/tags?tag=:tagId',
  PAGE_NOT_FOUND: '/404',
  PHOTOGRAPHY: '/photography',
  STYLE_GUIDE: '/style-guide',
};
