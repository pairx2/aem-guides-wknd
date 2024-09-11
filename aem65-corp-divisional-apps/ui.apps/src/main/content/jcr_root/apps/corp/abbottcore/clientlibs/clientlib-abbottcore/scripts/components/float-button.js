/**********************************
Popup Experience Fragment
**********************************/

$(document).ready(function () {
  /* Going to next section */
  $(".scroll-btn-right").click(function () {
    if ($(".scroll-btn-right").hasClass("next")) {
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $(".recent-news").offset().top - 100,
        },
        2000
      );
    } else {
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $(".usefull-links").offset().top - 100,
        },
        2000
      );
    }
    $(".scroll-btn-right").toggleClass("next");
  });
});
