import anime from 'animejs/lib/anime.es.js';

// fades in the header and footer sections
export const getAnimation = (onStart = undefined, onEnd = undefined) => {
  return anime
    .timeline({
      autoplay: false,
      delay: 7000,
      duration: 5000,
      easing: 'easeInOutQuad',
      begin: onStart,
      complete: onEnd,
    })
    .add({
      targets: ['header', 'footer', '.dl-breadcrumbs'],
      opacity: 1,
    });
};
