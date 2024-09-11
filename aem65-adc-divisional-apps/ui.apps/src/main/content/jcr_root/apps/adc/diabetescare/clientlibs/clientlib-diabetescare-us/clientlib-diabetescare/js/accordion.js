$(document).ready(function () {
  // Set the Open / close Icons
  $('.m-accordion').find('.abt-icon-plus').parent('.m-accordion-icon').addClass('icon-visible');
  $('.m-accordion').find('.abt-icon-minus').parent('.m-accordion-icon').removeClass('icon-visible');

  // Initial close for accordion content    
  $('.m-accordion').find('.m-accordion__body').removeClass('show');
  $('.m-accordion').find('.m-accordion__icon-wrapper').attr('aria-expanded', 'false');
  $('.m-accordion').find('.m-accordion__icon-wrapper span').attr('data-toggle', 'expand');

    //for career page 
    $('.a-accordion-removal').find('.accordion:first').find('.m-accordion .m-accordion__body').addClass("show");

  // Expand Single Accordion Only
  $('.m-accordion').find('.m-accordion__header').click(function () {

    setTimeout(() => {
      if ($(this).find('.m-accordion__icon-wrapper').attr('aria-expanded') === 'true') {

        $('.m-accordion').find('.m-accordion__body').removeClass('show');
        $('.m-accordion').find('.m-accordion__icon-wrapper').attr('aria-expanded', 'false');
        $('.m-accordion').find('.m-accordion__icon-wrapper span').attr('data-toggle', 'expand');

        $('.m-accordion').find('.abt-icon-plus').parent('.m-accordion-icon').addClass('icon-visible');
        $('.m-accordion').find('.abt-icon-minus').parent('.m-accordion-icon').removeClass('icon-visible');

        $(this).find('.m-accordion__body').removeClass('show');
        $(this).find('.m-accordion__icon-wrapper').attr('aria-expanded', 'false');
        $(this).find('.m-accordion__icon-wrapper span').attr('data-toggle', 'expand');
        $(this).find('.abt-icon-plus').parent('.m-accordion-icon').removeClass('icon-visible');
        $(this).find('.abt-icon-minus').parent('.m-accordion-icon').addClass('icon-visible');

      } else {
        $('.m-accordion').find('.m-accordion__body').removeClass('show');
        $('.m-accordion').find('.m-accordion__icon-wrapper').attr('aria-expanded', 'false');
        $('.m-accordion').find('.m-accordion__icon-wrapper span').attr('data-toggle', 'expand');

        $('.m-accordion').find('.abt-icon-plus').parent('.m-accordion-icon').addClass('icon-visible');
        $('.m-accordion').find('.abt-icon-minus').parent('.m-accordion-icon').removeClass('icon-visible');

      }
    }, 0);
  });
});

