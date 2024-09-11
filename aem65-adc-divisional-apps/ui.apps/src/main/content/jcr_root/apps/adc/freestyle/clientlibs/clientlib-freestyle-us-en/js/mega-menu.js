/**
 * MEGA-MENU - COMPONENT
**/

$(function () {
  var $navbarCtaButton = $('.m-mega-menu__mobile-item-wrapper .a-button'),
    isMob = isMobile();

  if ($navbarCtaButton) {
    $navbarCtaButton.addClass('a-button-cta');
    $navbarCtaButton.parent().addClass('a-button-cta-wrapper');
  }

  //appned button in navbar for mobile and tablet
  if (isMob) {
    var $navbarCtaButtonClone = $navbarCtaButton.clone().addClass('a-button-cta d-lg-none d-xl-none');
    $('nav.navbar').append($navbarCtaButtonClone);

    $navbarCtaButton.parent().detach();
  }
  
});
