(function (win) {
  if(!win.ABBOTT){
      win.ABBOTT = {};
  }
  var ABBOTT = win.ABBOTT;
  ABBOTT.diaperDecoder = (function () {
    // init bx slider
    var slider = jQuery(".diaper-tool").bxSlider({
      minSlides: 2,
      maxSlides: 4,
      pager: false,
      controls: false,
      slideWidth: 184,
      infiniteLoop: false,
      speed: 3e3,
      oneToOneTouch: true,
      touchEnabled: false
    });

    // method called on next nav click
    jQuery("#nextNav").click(function () {
      slider.goToNextSlide();
      toggleNavIcons();
    });

    // method called on prev nav click
    jQuery("#prevNav").click(function () {
      slider.goToPrevSlide();
      toggleNavIcons();
    });

    // method called on changing next/prev nav icons
    function toggleNavIcons() {
      var totalImgs = jQuery(".diaper-tool .decoder-img-wrap").length;
      var perslide = 4;
      if (jQuery(window).width() < 768) {
        perslide = 2;
      }
      var totalslides = totalImgs / perslide;
      var count = slider.getCurrentSlide() + 1;
      jQuery("#prevNav, #nextNav").html("");
      if (count > 1) {
        jQuery("#prevNav").attr("data-icon", "left-nav");
      }
      if (count === 1) {
        jQuery("#prevNav").attr("data-icon", "left-nav-disabled");
      }
      if (count === totalslides) {
        jQuery("#nextNav").attr("data-icon", "right-nav-disabled");
      }
      if (count < totalslides) {
        jQuery("#nextNav").attr("data-icon", "right-nav");
      }
      ABBOTT.main.setSocialIcons();
    }

    // add active class to first image and content
    jQuery(".decoder-img-wrap:first, .diaper-decoder-content:first").addClass(
      "active"
    );
  

    // called on image click
    jQuery(".decoder-img").click(function (e) {
      e.preventDefault();
      var DECODER_SELECTOR = ".decoder-img-wrap";
      jQuery(DECODER_SELECTOR).removeClass("active");
      jQuery(this).closest(DECODER_SELECTOR).addClass("active");
      var imgIndex = jQuery(this).closest(DECODER_SELECTOR).index(),
        contentIndex = jQuery(
          ".diaper-decoder-section .diaper-decoder-content.active"
        ).index();
      return imgIndex === contentIndex
        ? false
        : (jQuery(".diaper-decoder-section .diaper-decoder-content")
            .removeClass("active")
            .removeClass("animated")
            .removeClass("fadeIn"),
          jQuery(".diaper-decoder-section .diaper-decoder-content")
            .eq(imgIndex)
            .addClass("active animated fadeIn"));
    });
  })();
})(window);
