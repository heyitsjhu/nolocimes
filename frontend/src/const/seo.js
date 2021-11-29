export default {
  ANBU_BLOCKCHAIN: t => ({
    title: t('components.Helmet.anbuBlockchain.title'),
    meta: [
      { name: 'description', content: t('components.Helmet.anbuBlockchain.meta.description') },
    ],
  }),
  BLOG: t => ({
    title: t('components.Helmet.blog.title'),
    meta: [{ name: 'description', content: t('components.Helmet.blog.meta.description') }],
  }),
  BLOG_POST: (t, title, description) => ({
    title: `${title} | ${t('common.jhuSoftwareEngineer')}`,
    meta: [{ name: 'description', content: description }],
  }),
  CANDLE_MONKEYS: t => ({
    title: t('components.Helmet.candleMonkeys.title'),
    meta: [{ name: 'description', content: t('components.Helmet.candleMonkeys.meta.description') }],
  }),
  HOMEPAGE: t => ({
    title: t('components.Helmet.home.title'),
    meta: [{ name: 'description', content: t('components.Helmet.home.meta.description') }],
  }),
  PHOTOGRAPHY: t => ({
    title: t('components.Helmet.photography.title'),
    meta: [{ name: 'description', content: t('components.Helmet.photography.meta.description') }],
  }),
  PROJECT_NOLOCIMES: t => ({
    title: t('components.Helmet.projectNolocimes.title'),
    meta: [
      { name: 'description', content: t('components.Helmet.projectNolocimes.meta.description') },
    ],
  }),
  STYLE_GUIDE: t => ({
    title: t('components.Helmet.styleGuide.title'),
    meta: [{ name: 'description', content: t('components.Helmet.styleGuide.meta.description') }],
  }),
};
