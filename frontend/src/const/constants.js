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

export const SITE_NAVIGATION = {
  anchorPosition: 'right',
  mapping: [
    {
      altText: '',
      disabled: true,
      grouping: 1,
      icon: 'none',
      id: 'nav-id-1',
      placement: 'left',
      text: 'components.HomeLogoNavigation.navMapping.navId1',
      title: '',
      url: ROUTES.POWERED_BY_SCROLL,
    },
    {
      altText: '',
      disabled: true,
      grouping: 1,
      icon: 'coronavirus',
      id: 'nav-id-2',
      placement: 'right',
      text: 'components.HomeLogoNavigation.navMapping.navId2',
      title: '',
      url: ROUTES.CORONAVIRUS,
    },
    {
      altText: '',
      disabled: true,
      grouping: 1,
      icon: 'nolocimes',
      id: 'nav-id-3',
      placement: 'left',
      text: 'components.HomeLogoNavigation.navMapping.navId3',
      title: '',
      url: ROUTES.PROJECT_NOLOCIMES,
    },
    {
      altText: '',
      disabled: true,
      grouping: 1,
      icon: 'candlemonkeys',
      id: 'nav-id-4',
      placement: 'left',
      text: 'components.HomeLogoNavigation.navMapping.navId4',
      title: '',
      url: ROUTES.CANDLEMONKEYS,
    },
    {
      altText: '',
      disabled: true,
      grouping: 1,
      icon: 'none',
      id: 'nav-id-5',
      placement: 'right',
      text: 'components.HomeLogoNavigation.navMapping.navId5',
      title: '',
      url: ROUTES.DRUNKEN_NAVIGATOR,
    },
    {
      altText: '',
      disabled: true,
      grouping: 2,
      icon: 'none',
      id: 'nav-id-6',
      placement: 'left',
      text: 'components.HomeLogoNavigation.navMapping.navId6',
      title: '',
      url: ROUTES.PROFILE,
    },
    {
      altText: '',
      disabled: false,
      grouping: 2,
      icon: 'blog',
      id: 'nav-id-7',
      placement: 'right',
      text: 'components.HomeLogoNavigation.navMapping.navId7',
      title: '',
      url: ROUTES.BLOG,
    },
    {
      altText: '',
      disabled: false,
      grouping: 2,
      icon: 'photography',
      id: 'nav-id-8',
      placement: 'left',
      text: 'components.HomeLogoNavigation.navMapping.navId8',
      title: '',
      url: ROUTES.PHOTOGRAPHY,
    },
  ],
};
// export const SITE_NAVIGATION = {
//   'nav-id-1': {
//     altText: '',
//     placement: 'left',
//     text: 'components.HomeLogoNavigation.navMapping.navId1',
//     title: '',
//     url: ROUTES.POWERED_BY_SCROLL,
//     disabled: true,
//   },
//   'nav-id-2': {
//     altText: '',
//     placement: 'right',
//     text: 'components.HomeLogoNavigation.navMapping.navId2',
//     title: '',
//     url: ROUTES.CORONAVIRUS,
//     disabled: true,
//   },
//   'nav-id-3': {
//     altText: '',
//     placement: 'left',
//     text: 'components.HomeLogoNavigation.navMapping.navId3',
//     title: '',
//     url: ROUTES.PROJECT_NOLOCIMES,
//     disabled: true,
//   },
//   'nav-id-4': {
//     altText: '',
//     placement: 'left',
//     text: 'components.HomeLogoNavigation.navMapping.navId4',
//     title: '',
//     url: ROUTES.CANDLEMONKEYS,
//     disabled: true,
//   },
//   'nav-id-5': {
//     altText: '',
//     placement: 'right',
//     text: 'components.HomeLogoNavigation.navMapping.navId5',
//     title: '',
//     url: ROUTES.DRUNKEN_NAVIGATOR,
//     disabled: true,
//   },
//   'nav-id-6': {
//     altText: '',
//     placement: 'left',
//     text: 'components.HomeLogoNavigation.navMapping.navId6',
//     title: '',
//     url: ROUTES.PROFILE,
//     disabled: true,
//   },
//   'nav-id-7': {
//     altText: '',
//     placement: 'right',
//     text: 'components.HomeLogoNavigation.navMapping.navId7',
//     title: '',
//     url: ROUTES.BLOG,
//     disabled: false,
//   },
//   'nav-id-8': {
//     altText: '',
//     placement: 'left',
//     text: 'components.HomeLogoNavigation.navMapping.navId8',
//     title: '',
//     url: ROUTES.PHOTOGRAPHY,
//     disabled: false,
//   },
// };
