$(function(){
  const textBanner = $(document.querySelector(".text-banner"));
  if (textBanner.length > 0) {
    // remove text banner top spacing
    $(textBanner).css("margin-top", 0);

    // remove hero banner bottom spacing
    const heroBanner = $(textBanner).prev();
    heroBanner.css({"margin-bottom": "0", "padding-bottom": "0"});

    const textWrapper = $(textBanner).find(".a-text-banner");
    textWrapper.css({ "margin": "0 auto", "max-width": "1200px"})
  }
});