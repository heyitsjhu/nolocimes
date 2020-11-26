import anime from 'animejs/lib/anime.es.js';
import theme from 'theme';
import { getElClass } from '../../utils';

const HOME_LOGO_CONTAINER = `.${getElClass('comp', 'homeLogo-container')}`;
const LOGO_SET_1 = getElClass(null, 'logo__set--1');
const LOGO_SET_2 = getElClass(null, 'logo__set--2');

export default (opts = {}) => {
  return anime
    .timeline({
      autoplay: false,
      delay: opts.skipDelay ? 0 : 4000,
      duration: opts.skipDelay ? 2500 : 5000,
      easing: 'easeInOutQuad',
      begin: opts.onStart,
      complete: opts.onEnd,
    })
    .add({
      targets: HOME_LOGO_CONTAINER,
      opacity: 1,
    });
  // .add(
  //   {
  //     targets: `${HOME_LOGO_CONTAINER} .${LOGO_SET_1}`,
  //     keyframes: [{ fill: theme.palette.grey[100] }, { fill: theme.palette.grey[600] }],
  //     duration: 1500,
  //     easing: 'easeInOutSine',
  //     loop: false,
  //   },
  //   '+=500'
  // )
  // .add(
  //   {
  //     targets: `${HOME_LOGO_CONTAINER} .${LOGO_SET_2}`,
  //     keyframes: [{ fill: theme.palette.primary.main }, { fill: theme.palette.primary.dark }],
  //     duration: 1500,
  //     easing: 'easeInOutSine',
  //     loop: false,
  //   },
  //   '+=500'
  // );
};
