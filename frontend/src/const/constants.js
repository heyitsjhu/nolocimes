import SHA256 from 'crypto-js/sha256';

export const ANBU_SAMPLE_USERS = [
  'user1',
  'user2',
  'user3',
  'user4',
  'user5',
  'user6',
  'user7',
  'user8',
];
export const ANBU_SAMPLE_USER_HASHES = ANBU_SAMPLE_USERS.map(user => SHA256(user).toString());
export const ANBU_SAMPLE_USER = SHA256('sample_user').toString();
export const BIG_NUMBER_PREFIXES = [
  { number: 1e3, suffix: 'K' },
  { number: 1e6, suffix: 'M' },
  { number: 1e9, suffix: 'B' },
  { number: 1e12, suffix: 'T' },
];
export const DEFAULT_NOTIFICATION_DELAY = 1000;
export const DEFAULT_NOTISTACK_PROPS = {
  anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
  maxSnack: 3,
  preventDuplicate: true,
};
export const DEFAULT_TOOLTIP_ENTER_DELAY = 500;
export const DEFAULT_TOOLTIP_LEAVE_DELAY = 200;
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
  ANBU_BLOCKCHAIN: '/anbu-blockchain',
  BLOG: '/blog',
  BLOG_POST: '/blog/:postId',
  BLOG_TAGS: '/blog/tags?tag=:tagId',
  CORONAVIRUS: '/coronavirus',
  PAGE_NOT_FOUND: '/404',
  PHOTOGRAPHY: '/photography',
  STYLE_GUIDE: '/style-guide',
};

export const SITE_NAVIGATION = {
  anchorPosition: 'right',
  mapping: [
    {
      altText: '',
      disabled: false,
      grouping: 1,
      icon: 'none',
      id: 'nav-id-1',
      placement: 'left',
      text: 'components.HomeLogoNavigation.navMapping.navId1',
      title: '',
      url: ROUTES.ANBU_BLOCKCHAIN,
    },
    {
      altText: '',
      disabled: true,
      grouping: 1,
      icon: 'candlemonkeys',
      id: 'nav-id-2',
      placement: 'right',
      text: 'components.HomeLogoNavigation.navMapping.navId2',
      title: '',
      url: ROUTES.CANDLEMONKEYS,
    },
    {
      altText: '',
      disabled: false,
      grouping: 1,
      icon: 'coronavirus',
      id: 'nav-id-3',
      placement: 'left',
      text: 'components.HomeLogoNavigation.navMapping.navId3',
      title: '',
      url: ROUTES.CORONAVIRUS,
    },
    {
      altText: '',
      disabled: true,
      grouping: 1,
      icon: 'nolocimes',
      id: 'nav-id-4',
      placement: 'left',
      text: 'components.HomeLogoNavigation.navMapping.navId4',
      title: '',
      url: ROUTES.PROJECT_NOLOCIMES,
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
      url: ROUTES.POWERED_BY_SCROLL,
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
