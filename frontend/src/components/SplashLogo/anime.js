import anime from 'animejs/lib/anime.es.js';

import { getElClass } from 'utils';

const SPLASH_CONTAINER = getElClass('comp', 'splash-container');
const SPLASH_LOGO = getElClass('comp', 'splash-logo');
const SPLASH_CURTAIN = getElClass('comp', 'splash-curtain');
const SPLASH_CURTAIN_LEFT = getElClass('comp', 'splash-curtain-left');
const SPLASH_CURTAIN_RIGHT = getElClass('comp', 'splash-curtain-right');
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
const timelineFrames = [
  // PHASE ZERO: Canvas fades from white to dark grey.
  {
    config: {
      targets: `.${SPLASH_CONTAINER}`,
      backgroundColor: '#101010',
      delay: 1250,
      easing: 'easeOutQuart',
    },
  },
  {
    config: {
      targets: `.${SPLASH_CURTAIN}`,
      opacity: 1,
      duration: 100,
    },
    offset: '-=100',
  },
  // PHASE ONE: Bottom set appears.
  {
    config: {
      targets: `.${SPLASH_LOGO} #logo-stroke-8`,
      opacity: 1,
    },
    offset: '+=250',
  },
  {
    config: {
      targets: [`.${SPLASH_LOGO} #logo-stroke-6`, `.${SPLASH_LOGO} #logo-stroke-7`],
      opacity: 1,
    },
    offset: '+=500',
  },
  // PHASE TWO: Top set flickers in and bottom set changes color.
  {
    config: {
      targets: `.${SPLASH_LOGO} .${LOGO_SET_1}`,
      opacity: 1,
      duration: 2750,
    },
    offset: '+=1000',
  },
  {
    config: {
      targets: `.${SPLASH_LOGO} .${LOGO_SET_2}`,
      fill: '#CC9851',
      duration: 2500,
    },
    offset: '-=2000',
  },
  {
    config: {
      targets: `.${SPLASH_LOGO} .${LOGO_SET_1}`,
      opacity: 1,
      fill: '#f1f1f1',
      duration: 2700,
    },
    offset: '-=2500',
  },
  // PHASE THREE: Logo fades out, curtain reveals and opens.
  {
    config: {
      targets: `.${SPLASH_LOGO}`,
      opacity: 0,
      duration: 2500,
    },
    offset: '+=1500',
  },
  {
    config: {
      targets: `.${SPLASH_CURTAIN}`,
      height: '100%',
      duration: 2000,
      easing: 'easeOutCubic',
    },
    offset: '+=1000',
  },
  {
    config: {
      targets: `.${SPLASH_CONTAINER}`,
      backgroundColor: 'rgba(0,0,0,0)',
      duration: 100,
    },
  },
  {
    config: {
      targets: `.${SPLASH_CURTAIN_LEFT}`,
      left: '-50%',
      duration: 1500,
      easing: 'easeInQuad',
    },
    offset: '+=500',
  },
  {
    config: {
      targets: `.${SPLASH_CURTAIN_RIGHT}`,
      right: '-50%',
      duration: 1500,
      easing: 'easeInQuad',
    },
    offset: '-=1500',
  },
  // PHASE FOUR: Move container behind everything else.
  {
    config: {
      targets: `.${SPLASH_CONTAINER}`,
      opacity: 0,
      zIndex: -99,
      duration: 100,
    },
    offset: '+=0',
  },
];

export default (onStart = undefined, onEnd = undefined) => {
  const timeline = anime.timeline({
    autoplay: false,
    easing: 'easeInOutQuad',
    duration: 1500,
    begin: onStart,
    complete: onEnd,
  });

  timelineFrames.forEach(frame => {
    timeline.add(frame.config, frame.offset);
  });

  return timeline;
};
