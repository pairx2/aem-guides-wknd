$(document).ready(function () {


  $(".m-hbanner-slider").each(function () {
    const isAutoPlay = $(this).parents().eq(1).find('input').val();

    var autoPlay = true;
    if (isAutoPlay === "true") {
      autoPlay = false;
    }
    $(this).slick({
      // normal options...
      infinite: true,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 3000,
      arrows: true,
      autoplay: autoPlay,
      autoplaySpeed: 3000,

      responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            dots: true,
            arrows: false,
          },
        },
        {
          breakpoint: 300,
          settings: {
            slidesToShow: 1,
            dots: true,
            arrows: false,
          },
        },
      ],
    });
  });

  /* Header Banner Content height and mobile equal container height function */
  function hbContentHeight() {
    $(".m-hbanner .m-hbanner-slider").each(function () {
      var customH = -1;

      var hbHeight;
      $(this).find('.m-hbanner-slider__wrapper .m-hbanner-container')
        .each(function () {
          hbHeight = $(this).height();
          customH = hbHeight > customH ? hbHeight : customH;
        });
      $(this).find('.m-hbanner-slider__wrapper .m-hbanner-container')
        .each(function () {
          if ($(window).width() <= 767) {
            $(this).css("height", customH);
          } else if (
            $(this).closest(".m-hbanner").hasClass("m-hbanner--content-height")
          ) {
            if ($(window).width() >= 768) {
              $(this).parent(".m-hbanner-slider__wrapper").css("height", customH);
            } else {
              $(this).css("height", customH);
            }
          }
        });
    });
  }

  hbContentHeight();
});

/* ready function close*/