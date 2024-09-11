/**********************************
container component
**********************************/

$(function () {
  if ($(".image-carousel-variation").length > 0 && isOnPublish()) {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setTimeout(function () {
        $(
          $(
            ".image-carousel-variation .o-hero-carousel .slick-slide:not(.slick-cloned)"
          )
            .get()
            .reverse()
        ).each(function () {
          let titlecontainer = $(this)
            .parents(".image-carousel-variation")
            .find(".title");
          let images = $(this).find(".container.a-container").clone(true);
          images
            .find(".panel-rotation-variation")
            .removeClass("panel-rotation-variation");
          images.insertAfter(titlecontainer);
        });
        $(".image-carousel-variation .o-hero-carousel").remove();
      }, 200);
    }
  }

  // Article ISI varaition - scroll page based on ID added to href
  if ($(".container-variation--article-isi").length > 0 && isOnPublish()) {
    $(".container-variation--article-isi .text a").each(function () {
      let hrefVal = $(this).attr("href");
      if (hrefVal.startsWith("#")) {
        $(this).attr("data-href", hrefVal);
        $(this).attr("href", "javascript:void(0)");
      }
    });
    $(".container-variation--article-isi .text a[data-href]").each(function () {
      $(this).on("click", function () {
        var dataHref = $(this).attr("data-href");
        $(this)
          .parents(".a-container__content")
          .animate(
            {
              scrollTop: $(dataHref).position().top - 10,
            },
            "slow"
          );
      });
    });
  }

});

$(window).on("load", function () {
  if ($(".video-popup__no-border").length > 0 && isOnPublish()) {
    $(".modal.generic-modal").addClass("no-border-varient");
  }
})