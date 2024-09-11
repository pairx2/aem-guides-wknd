const mediaQueryLargeScreen = window.matchMedia("(max-width:1024px)");
const footerLinkStacks = $(".o-footer__top");

function prepareHeader() {
  if (mediaQueryLargeScreen.matches) {
    footerLinkStacks.appendTo(".navbar-collapse-wrapper");
  } else {
    footerLinkStacks.insertAfter(".o-footer__bottom-section .a-logo-comp");
  }
}
prepareHeader();
