$(document).ready(function () {
  $(".m-hero__content h1").each(function (index) {
    let smallScreen = window.matchMedia("(max-width: 767px)");
    if (!$(this).text().trim() && smallScreen.matches) {
      $(this)
        .parent()
        .css({
          backgroundColor: "unset",
          minHeight: "unset",
          padding: "unset",
        });
    }
  });

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
      $(".o-hero-carousel--base.o-hero-carousel--medium .slick-slide").length
    ) {
      observer.observe(target, config);
    }
  }, 1000);
});

function slider() {
  setTimeout(() => {
    $(".o-hero-carousel--base.o-hero-carousel--medium .slick-slide").each(
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
    $(".o-hero-carousel--base.o-hero-carousel--medium .slick-dots li").click(
      function () {
        $(".o-hero-carousel--base.o-hero-carousel--medium .slick-slide").each(
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

$(".o-hero-carousel--base.o-hero-carousel--medium").bind(
  "mousedown mouseup ",
  function (e) {
    slider();
  }
);

$(".o-hero-carousel--base.o-hero-carousel--medium").bind(
  "touchstart touchend ",
  function (e) {
    slider();
  }
);
