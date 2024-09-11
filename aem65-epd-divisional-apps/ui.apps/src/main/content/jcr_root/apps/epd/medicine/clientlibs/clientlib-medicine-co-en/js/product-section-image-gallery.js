$(document).ready(function () {
  setTimeout(function () {
    var curoselSlide = $(".slick-slide");
    var thumbnaiElement = $(".o-hero-carousel")
      .find(".cmp-carousel")
      .find("ul")
      .find("li");

    for (var i = 0; i < curoselSlide.length; i++) {
      var _index = $(curoselSlide[i]).attr("data-slick-index");

      var backgroundImage = $(curoselSlide[i])
        .find(".cmp-image")
        .attr("data-asset");

      var backgroundImageUrl = backgroundImage.replace(/ /g, "%20");

      var liElemnt = $(thumbnaiElement[_index]);

      if (liElemnt !== undefined && liElemnt.length > 0) {
        $(liElemnt[0]).attr(
          "style",
          "background-image:url(" + backgroundImageUrl + ")"
        );
      }
    }
  }, 50);
});
