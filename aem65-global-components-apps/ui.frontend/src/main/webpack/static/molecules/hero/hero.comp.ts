import { ParallaxImage } from '../../common/parallax-image';
import { TextSlideUp } from '../../common/text-slide-up';

$(function () {
  const $parallaxWrapperElements: JQuery = $('.m-hero__parallax-wrapper');

  if ($parallaxWrapperElements.length) {
    $parallaxWrapperElements.each((i, parallaxEl) => {
      new ParallaxImage(parallaxEl, {
        imageSelector: '.m-hero__parallax-image',
      });
    });
  }

  const $textSlideUpWrapperElements: JQuery = $(
    '.m-hero__content[data-animated="true"]'
  );

  if ($textSlideUpWrapperElements.length) {
    $textSlideUpWrapperElements.each((i, element) => {
      new TextSlideUp(element);
    });
  }
});
