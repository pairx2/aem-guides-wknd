$(function () {
  var openSearch = $('[data-search-click="click"]');
  var searcInput = $('.a-search__input');
  var closeSearch = $('[data-search-close="close"]');

  // Disable Keyboard Tab when search bar is open
  $('body').on('click', openSearch, function () {
    if ($('.a-search.a-search--expand').length > 0) {
      closeSearch.attr('tabindex', 0);
    }
  });

  //code for sticky search click
  $(document).on('keydown', '.o-header__sticky-section .o-header__sticky-search .a-search', function (e) {
    if (e.keyCode == 13) {
      if (($(e.target).attr("data-search-close") !== 'close') && !($(this).hasClass('a-search--expand'))) {
        e.preventDefault();
        openSearch.trigger('click')
      }
    }
  });

  // Close search bar on Enter key press
  closeSearch.on('keydown', function (e) {
    if (e.keyCode == 13) {
      closeSearch.trigger('click');
      $(this).blur()
    }
  });

  // Keep the focus within the search bar when search is open
  var KEYCODE_TAB = 9;
  $('.a-search form').on('keydown', function (e) {
    closeSearch.attr('tabindex', 0);
    if (e.key === 'Tab' || e.keyCode === KEYCODE_TAB && $('.a - search.a - search--expand ').length > 0) {
      if (e.shiftKey) /* shift + tab */ {
        if (document.activeElement === searcInput[0] || document.activeElement === searcInput[1] || document.activeElement === searcInput[2]) {
          closeSearch.focus();
          e.preventDefault();
        }
      } else /* tab */ {
        if (document.activeElement === closeSearch[0] || document.activeElement === closeSearch[1] || document.activeElement === closeSearch[2]) {
          searcInput.focus();
          e.preventDefault();
        }
      }
    }
  });

  // Adding tabindex & aria-expanded to each dropdown,so that user can access them via Tab Key 
  // Adding role tag to ul and li for accessibility 
  $(".drop-down .a-dropdown__field:not(.disabled)").each(function (i) {
    $(this).attr('tabindex', 0).find('ul').attr('role', "listbox").find('li').each(function () {
      $(this).attr('role', "option")
    });
  });

  // Adding language attr to the langugage navigation anchor
  var langLink = $(".o-header__secondary-top-nav .m-link-stack__list .a-link__text");
  langLink.each(function () {
    var href = $(this).attr("href");
    var isFr = href.indexOf("/fr/") > -1 || href.indexOf("/ca-fr/") > -1;
    var isEn = href.indexOf("/en/") > -1 || href.indexOf("/ca-en/") > -1;
    var isZh = href.indexOf("/zh/") > -1 || href.indexOf("/ca-zh/") > -1;
    if(isFr) { $(this).attr("lang", "fr"); }
    if(isEn) { $(this).attr("lang", "en"); }
    if(isZh) { $(this).attr("lang", "zh"); }
  });
});
/* Images should have an empty alt attribute for crownpeak and accessibility */
$(document).ready(function () {
  
  var x = $('img:not([alt])');
  for (var i = -1; i < x.length; i++) {
    $(x[i]).attr("alt", "");
  }

  //accessibility focus issue code start here
  $("img:not('.a-logo-comp--image'):not([alt='']), a.nav-item, a.a-link__text, a[target='selfTag'], button.m-accordion__icon-wrapper, a.cmp-download__title-link, a[target='_blank'], .a-dropdown__field ul.a-dropdown__menu, .a-dropdown__field ul.a-dropdown__menu li, a.a-logo-comp--link, .o-header__logo-right img.a-logo-comp--image, .a-link a.btn.a-link--text, .m-accordion__options .coll-exp-title, .o-header__sticky-section .o-header__sticky-search .a-search, .m-popup[role='link']").attr('tabindex', 0);
  $(".o-header__left-links span.emptyLink a.a-link__text, #warrenty-reg-month-options .a-dropdown__field, .m-popup[role='link'] img").removeAttr('tabindex', 0);

  //if mpopup anchor tag has no link then add role presentation
  $('.m-popup a').each(function(){
    if($(this).attr('href') === undefined) { 
      // Element 'a' has no href
      $(this).attr('role','presentation');
    }
  });

  $('.coll-exp-title, .m-popup').on('keypress', function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      $(this).trigger('click');
    }
  });

  $('.a-dropdown__field').on('keypress', function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      $('.a-dropdown__field').removeClass('active');
      $(this).addClass('active');
    }
  });

  $('.a-dropdown__menu li').on('keypress', function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      $(this).trigger('click');
      event.stopPropagation();
    }
  });

  $(document).on('keyup', function (e) {
    if (e.key == "Escape") {
      $('.m-mega-menu__mobile-item-wrapper').find('[data-js-component="mega-menu"]').fadeOut();
    }
  });

  //warrenty form month field change as per year value change code
  $(document).on('blur', '#warrenty-reg-year-options .a-dropdown .a-dropdown__field', function() {
		if($(this).hasClass('active') !== true){
			var listItem = $('#warrenty-reg-year-options .a-dropdown__field ul li');
			if(listItem.hasClass('selected')){
				$('#warrenty-reg-month-options .a-dropdown__field').attr('tabindex', 0);
			}
		}
	});
  //warrenty form month field change as per year value change code

  // Let the document know when the mouse is being used]
  $('body').on('mousedown', function () {
    $('body').addClass('using-mouse');
  });

  // Re-enable focus styling when Tab is pressed
  $('body').on('keydown', function (event) {
    if (event.keyCode === 9) {
      $('body').removeClass('using-mouse');
    }
  });

  $(document).on('focus', '.a-dropdown__field', function (evt) {
    var $this = $(this);
    $this.on('keydown', function (e) {
      // Close dropdown list when user tab out from the current dropdown 
      if (e.key === 'Tab' || e.keyCode === 9) {
        if (e.shiftKey) /* shift + tab */ {
          if ($(document.activeElement).hasClass('active')) {
            $('.a-dropdown__field').removeClass('active');
          }
        } else /* tab */ {
          if ($this.find('li:last-child').attr('data-optionvalue') == $(document.activeElement).attr('data-optionvalue')) {
            $('.a-dropdown__field').removeClass('active');
          }
        }
      }

      // Close the dropdown on Esc key press
      if (e.key === 'Escape' || e.keyCode === 27) {
        $this.removeClass('active');
        e.preventDefault()
      }
    });
  });

  $('.m-mega-menu__item a.nav-item').on('keypress', function (event) {
    $('.m-mega-menu__mobile-item-wrapper').find('[data-js-component="mega-menu"]').fadeOut();
    $('body').trigger('click');
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      $(this).parents('.m-mega-menu__mobile-item-wrapper').find('[data-js-component="mega-menu"]').fadeIn();
    }
  });

  $('.m-mega-menu__item a.nav-item').on('focus', function (event) {
    $('.m-mega-menu__mobile-item-wrapper').find('[data-js-component="mega-menu"]').fadeOut();
  });

  //language toggle aria expanded code 
  $('.o-header__left-links .m-link-stack .a-link__text, .o-header__user-activity .m-link-stack .a-link__text').attr('aria-expanded', 'false');
  $('.o-header__left-links .m-link-stack .a-link__text, .o-header__user-activity .m-link-stack .a-link__text').on('click', function () {
    if ($(this).hasClass('active')) {
      $(this).attr('aria-expanded', 'false');
    } else {
      $(this).attr('aria-expanded', 'true');
    }
  });
  //language toggle aria expanded code 

  //form option legend issue code
  legendSwap('titleLegend');
  legendSwap('genderLegend');
  //accessibility focus issue code end here

});

//accessibility focus issue code start here
function legendSwap(elementName) {
  $("#" + elementName + "-options legend").text('');
  $("label[for='" + elementName + "']").appendTo("#" + elementName + "-options legend");
  $("#" + elementName + "-options legend").addClass('d-block');
}
//accessibility focus issue code end here

$(window).on('load', function () {
  $(".modal .modal-header .generic-modal--close").attr('tabindex', 0);

  $('.modal-header .generic-modal--close').on('keypress', function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      $(this).trigger('click');
    }
  });
  $(".m-mega-menu__mobile-header").attr("tabIndex", "0");
  $(".m-mega-menu__mobile-item-link").attr("tabIndex", "0");
  $(".abt-icon-hamburger").attr("tabIndex", "0");
  $(".navbar-toggler").attr("tabIndex", "-1");

  $(".m-mega-menu__mobile-item .m-mega-menu__mobile-header").on("keydown", function (event) {
    var enterKeyCode = 13;
    var spaceKeyCode = 32;
    var escapeKeyCode = 27;
    $(".navbar-toggler").attr("tabIndex", "0");
    if (event.keyCode == enterKeyCode || event.keyCode == spaceKeyCode) {
      $(".m-mega-menu__mobile-item .m-mega-menu__mobile-header").attr("aria-expanded", "false");
      $(".m-mega-menu__mobile-products").addClass('d-none');
      $(this).attr("aria-expanded", "true");
      $(this).siblings(".m-mega-menu__mobile-products").removeClass('d-none');
    }
    if (event.keyCode == escapeKeyCode) {
      $(".navbar-toggler").attr("tabIndex", "-1");
      $(this).close();
    }
  });

});
