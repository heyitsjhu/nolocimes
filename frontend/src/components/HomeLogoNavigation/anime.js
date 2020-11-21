import anime from 'animejs/lib/anime.es.js';
import * as Utils from '../../utils';

const HOME_LOGO_CONTAINER = `.${Utils.getElClass('comp', 'homeLogo-container')}`;

export default (onStart = undefined, onEnd = undefined) => {
  return anime
    .timeline({
      autoplay: false,
      delay: 4000,
      duration: 5000,
      easing: 'easeInOutQuad',
      begin: onStart,
      complete: onEnd,
    })
    .add({
      targets: HOME_LOGO_CONTAINER,
      opacity: 1,
    });
};
