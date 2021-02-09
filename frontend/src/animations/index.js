import anime from 'animejs/lib/anime.es.js';

import palette from 'theme/palette';
import { getElClass } from 'utils';

const PARTICLE_CANVAS = `.${getElClass('page', 'particleCanvas')}`;
const SPLASH_LOGO = getElClass('comp', 'splash-logo');
const LOGO_SET_1 = getElClass(null, 'logo__set--1');
const LOGO_SET_2 = getElClass(null, 'logo__set--2');

/**
 * The argument strings denoted by '+=' and '-=' determine when the next
 * animation will begin in relation to the previous animation's completion.
 * For example, an argument string of '+=300' means the animation will begin
 * 300ms after the completion of the previous animation, causing a pause
 * between the two. And conversely, an argument string of '-=300' means the
 * animation will start 300ms before the end of the previous animation, causing
 * an overlap between the two.
 */
const animateInLogoTransitions = () => [
  {
    config: {
      targets: `.${SPLASH_LOGO} #logo-stroke-8`,
      opacity: 1,
      delay: 1500,
    },
  },
  {
    config: {
      targets: [`.${SPLASH_LOGO} #logo-stroke-6`, `.${SPLASH_LOGO} #logo-stroke-7`],
      opacity: 1,
    },
    offset: '+=300',
  },
  // start flicker
  {
    config: {
      targets: `.${SPLASH_LOGO} .${LOGO_SET_1}`,
      opacity: 0.4,
      duration: 160,
    },
    offset: '+=750',
  },
  {
    config: {
      targets: `.${SPLASH_LOGO} .${LOGO_SET_1}`,
      opacity: 0.2,
      duration: 50,
    },
  },
  {
    config: {
      targets: `.${SPLASH_LOGO} .${LOGO_SET_1}`,
      opacity: 0.6,
      duration: 150,
    },
  },
  {
    config: {
      targets: `.${SPLASH_LOGO} .${LOGO_SET_1}`,
      opacity: 0.2,
      duration: 40,
    },
  },
  // end flicker
  {
    config: {
      targets: `.${SPLASH_LOGO} .${LOGO_SET_1}`,
      opacity: 1,
      duration: 2000,
    },
  },
  {
    config: {
      targets: `.${SPLASH_LOGO} .${LOGO_SET_2}`,
      fill: palette.primary.main,
      duration: 2500,
    },
    offset: '-=2000',
  },
  {
    config: {
      targets: `.${SPLASH_LOGO} .${LOGO_SET_1}`,
      fill: '#f1f1f1',
      duration: 2700,
    },
    offset: '-=2500',
  },
];

const animateParticleCanvas = (startDuration = 7000, offset = '-=3500') => [
  {
    config: {
      targets: PARTICLE_CANVAS,
      opacity: 1,
      duration: startDuration,
      delay: 500,
      easing: 'easeInQuad',
    },
  },
  {
    config: {
      targets: `.${SPLASH_LOGO} .${LOGO_SET_1}`,
      fill: palette.grey[600],
      opacity: 0.9,
      duration: 5000,
      easing: 'easeInQuad',
    },
    offset: offset,
  },
  {
    config: {
      targets: `.${SPLASH_LOGO} .${LOGO_SET_2}`,
      fill: palette.primary.dark,
      opacity: 0.9,
      duration: 5000,
      easing: 'easeInQuad',
    },
    offset: '-=5000',
  },
];

const animateHeaderFooter = () => ({
  config: {
    targets: ['header', 'footer', `.${getElClass('comp', 'breadcrumb')}`],
    opacity: 1,
    duration: 5000,
  },
  offset: '-=3500',
});

const fullIntroFrames = [
  ...animateInLogoTransitions(),
  ...animateParticleCanvas(7000, '-=5000'),
  animateHeaderFooter(),
];

const shortIntroFrames = [...animateParticleCanvas(1000), animateHeaderFooter()];

export default (opts = {}) => {
  const timeline = anime.timeline({
    autoplay: false,
    easing: 'easeInQuad',
    duration: 1750,
    begin: opts.onStartAnimation,
    complete: opts.onEndAnimation,
  });
  const frames = opts.skipIntro ? shortIntroFrames : fullIntroFrames;

  frames.forEach(frame => timeline.add(frame.config, frame.offset));

  return timeline;
};
