import anime from 'animejs/lib/anime.es.js';

import { getElClass } from '../../utils';

const HOME_LOGO_CONTAINER = `.${getElClass('comp', 'homeLogo-container')}`;

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
};
