import anime from 'animejs/lib/anime.es.js';
import * as Utils from '../../utils';

const PARTICLE_CANVAS = `.${Utils.getElClass('page', 'particleCanvas')}`;

export default (onStart = undefined, onEnd = undefined) => {
  return anime
    .timeline({
      autoplay: false,
      duration: 5000,
      easing: 'easeInOutQuad',
      begin: onStart,
      complete: onEnd,
    })
    .add({
      targets: PARTICLE_CANVAS,
      opacity: 1,
    });
};
