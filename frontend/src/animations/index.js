import anime from 'animejs/lib/anime.es.js';
import { getElClass } from 'utils';

// fades in the header and footer sections
export const getAnimation = (opts = {}) => {
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
      targets: ['header', 'footer', `.${getElClass('comp', 'breadcrumb')}`],
      opacity: 1,
    });
};
