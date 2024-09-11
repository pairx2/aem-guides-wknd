$(function () {
  let currPageUrl = window.location.pathname,
    currPageName = currPageUrl.split('/').pop(),
    menuLinks = $("li.m-mega-menu__mobile-item-wrapper"),
    linkEle = $(menuLinks).find("a[href*='" + currPageName + "']");

  if (linkEle.length) {
    linkEle.parents('.m-mega-menu__mobile-item-wrapper').addClass('m-mega-menu__mobile-item-wrapper--underline');
  }
});
