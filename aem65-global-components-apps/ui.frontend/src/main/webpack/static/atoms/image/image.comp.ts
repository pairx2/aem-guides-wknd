import { ParallaxImage } from '../../common/parallax-image';

$(function () {
  const $parallaxWrapperElements: JQuery = $('.parallax-wrapper');

  if ($parallaxWrapperElements.length) {
    $parallaxWrapperElements.each((i, parallaxEl) => {
      new ParallaxImage(parallaxEl, {
        imageSelector: '.parallax-wrapper__parallax-image',
      });
    });
  }
});
