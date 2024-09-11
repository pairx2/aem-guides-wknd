$(function () {
  // Create an observer instance
  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      let newNodes = mutation.addedNodes; // DOM NodeList
      if (newNodes !== null) {
        // If there are new nodes added
        slider();
      }
    });
  });
  // Configuration of the observer:
  let config = {
    attributes: true,
    childList: true,
    characterData: true,
  };

  // Pass in the target node, as well as the observer options
  setTimeout(function () {
    let target = $(".slick-slide")[0];
    if (
      $(".a-container--base .o-hero-carousel .slick-slide").length
    ) {
      observer.observe(target, config);
    }
  }, 1000);
});

function slider() {
  setTimeout(() => {
    $(".a-container--base .o-hero-carousel .slick-slide").each(
      function () {
        if ($(this).hasClass("slick-active")) {
          let height = $(this).height();
          $(this).parents(".slick-list").css("height", height);
        }
      }
    );
  }, 5500);
}

function applyHeight() {
  setTimeout(() => {
    $(".a-container--base .o-hero-carousel .slick-dots li").click(
      function () {
        $(".o-hero-carousel .slick-slide").each(
          function () {
            if ($(this).hasClass("slick-active")) {
              let height = $(this).height();
              $(this).parents(".slick-list").css("height", height);
            }
          }
        );
      }
    );
  }, 5500);
}

$(window).on("load", function () {
  applyHeight();
  slider();
});

$(window).on("resize", function () {
  slider();
  applyHeight();
});

$(".o-hero-carousel").bind(
  "mousedown mouseup ",
  function (e) {
    slider();
  }
);

$(".o-hero-carousel").bind(
  "touchstart touchend ",
  function (e) {
    slider();
  }
);
