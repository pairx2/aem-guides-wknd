const mediaQueryLargeScreen = window.matchMedia("(max-width:1024px)");
const footerLinkStacks = $(".o-footer__top");

function prepareHeader() {
  if (mediaQueryLargeScreen.matches) {
    footerLinkStacks.appendTo(".navbar-collapse-wrapper");
  } else {

    $('.o-footer__disclaimer-section').appendTo('.o-footer__bottom-section .a-logo-comp');
    footerLinkStacks.insertAfter(".o-footer__bottom-section .a-logo-comp");
  }
}
prepareHeader();

let resizeTimer;
const debounceTime = 250;
window.onresize = function () {
  clearInterval(resizeTimer); //clearing timer if browser resized before debounce time
  resizeTimer = setTimeout(function () {
    //loading Header
    prepareHeader();
  }, debounceTime);
}