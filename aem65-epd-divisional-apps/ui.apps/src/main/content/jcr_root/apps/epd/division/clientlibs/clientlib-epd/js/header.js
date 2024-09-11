$(document).ready(function () {

  let blueButtonPresent = $('.primary-btn-link');

  if (blueButtonPresent.length > 0) {
    $('.o-header').addClass('o-header__adc');
  }

  // Use 'aria-label-custom' class at the parent level to set the aria label attr manually via js
  $('.aria-label-custom').each(function () {
    var target = $(this).find('a');
    var label = target.text().trim();
    target.attr('aria-label', label);
  });

  // Hide the Blue Button (Order Now) when search bar open and show once closed
  $('.o-header__mob-search .a-search--icon-left').on('click', function () {
    $('.o-header__mob-primary-btn').addClass('hide');
  });
  $('.o-header__mob-search .a-search--icon-right').on('click', function () {
    $('.o-header__mob-primary-btn').removeClass('hide');
  });

  //checking search text is present or not
  if (($(".o-header__search .a-search__input").attr("placeholder")) != undefined) {
    $(".o-header__wrapper .o-header__user-activity").css("margin-right", "60px");
    $(".sticky-primary-sec-btn-section").css("margin-right", "60px");
  }
  else {
    $(".o-header__wrapper .o-header__user-activity").css("margin-right", "0px");
    $(".sticky-primary-sec-btn-section").css("margin-right", "0px");
    $(".o-header__secondary-top-nav .o-header__search, .o-header__sticky-search").css("margin-right", "15px");
    $(".o-header__secondary-top-nav .o-header__search, .o-header__sticky-search").css("margin-left", "-16px");
    $(".o-header__secondary-top-nav .o-header__search .a-search").addClass('a-search-align');
  }

  //If header left link not authored then show it blank
  $('.header-left-link .a-link').each(function () {
    if ($(this).text().trim() == '') {
      $(this).closest('.header-left-link').addClass('emptyLink');
    }
  });

  replaceDuplicateId("#top-btn-section", "#menu-btn-section", "menu-");
  replaceDuplicateId("#top-signup-section", "#menu-signup-section", "menu-");
  replaceDuplicateId("#top-langnav-section", "#menu-langnav-section", "menu-");
  replaceDuplicateId("#top-btn-section", "#logo-btn-section", "logo-");
  replaceDuplicateId("#top-signup-section", "#logo-signup-section", "logo-");



});
function replaceDuplicateId(srcElem, destElem, idPrefixToReplace) {
  var srcContent = $(srcElem).html();
  $(srcElem).find("*").each(function () {
    if (this.id != null) {
      $('#' + this.id).attr("id", idPrefixToReplace + this.id);
    }
  });
  $(destElem).append($(srcElem).html());
  $(srcElem).html(srcContent);
}
