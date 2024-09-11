/**
 * MEGA-MENU - COMPONENT
**/

$(function () {
  let $navbarCtaButton = $('.m-mega-menu__mobile-item-wrapper .a-button'),
    isMob = isMobile();

  if ($navbarCtaButton) {
    $navbarCtaButton.addClass('a-button-cta');
    $navbarCtaButton.parent().addClass('a-button-cta-wrapper');
  }

  //appned button in navbar for mobile and tablet
  if (isMob) {
    const $navbarCtaButtonClone = $navbarCtaButton.clone().addClass('a-button-cta d-lg-none d-xl-none');
    $('nav.navbar').append($navbarCtaButtonClone);

    $navbarCtaButton.parent().detach();
  }


  // Add country/language dropdown, Links inside hamburger menu - Mobile
  const secondaryNav = $('.o-header .o-header__secondary-top-nav'),
    headerLeftLinks = secondaryNav.find('.header-left-link'),
    countrySelect = secondaryNav.find('.country-dropdown'),
    languageNavigation = secondaryNav.find('[id^="languagenavigation"]'),
    megaMenu = $('.o-header__mega-menu .m-mega-menu__mobile .navbar-nav'),
    menuLi = '<li class="m-mega-menu__mobile-item-wrapper"></li>';

  if (isMob && headerLeftLinks.length) {
    headerLeftLinks.each(function (i, elm) {
      let isEmpty = $(this).find('.a-link__inner-text').text() == '' ? true : false;
      if(i==0 && !isEmpty) {
        $(this).appendTo(megaMenu).wrap(menuLi).parent().addClass('menu-border-top');
      } else if(!isEmpty) {
        $(this).appendTo(megaMenu).wrap(menuLi);
      }
    });
  }
  if (isMob && countrySelect.length) {
    countrySelect.appendTo(megaMenu).wrap(menuLi);
  }
  if (isMob && languageNavigation.length) {
    languageNavigation.appendTo(megaMenu).wrap(menuLi);
  }

});
