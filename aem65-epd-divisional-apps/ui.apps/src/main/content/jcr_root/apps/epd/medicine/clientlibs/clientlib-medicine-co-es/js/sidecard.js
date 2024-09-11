$(document).ready(function () {
  var firstColoumn = $("[role=side-card]").find(".row");
  for (var i = 0; i < firstColoumn.length; i++) {
    var textColumn = $(firstColoumn[i]).children();
    $(textColumn[1]).addClass("text-pannel");
  }
  sideCardHeight(firstColoumn);
  $(firstColoumn).mouseover(function () {
    var targetObj = $(this).children();
    var targetSpan = $(targetObj[0]).find("span");
    $(targetSpan[0]).show();
    $(targetSpan[0]).unbind("click");
    $(targetSpan[0]).bind("click", function () {
      var location_url = $(this).prev().attr("href");
      window.location.href = location_url;
    });
    $(targetObj[1]).addClass("bgColorWhite");
    $(targetObj[1]).unbind("click");
    $(targetObj[1]).bind("click", function () {
      var targetAnchor = $(this).find("a");
      var location_url = $(targetAnchor[0]).attr("href");
      window.location.href = location_url;
    });
  });
  $(firstColoumn).mouseout(function () {
    var targetObj = $(this).children();
    var targetSpan = $(targetObj[0]).find("span");
    $(targetSpan[0]).hide();
    $(targetObj[1]).removeClass("bgColorWhite");
  });

  $(window).on("load resize", () => {
    sideCardHeight(firstColoumn);
  });
});
function sideCardHeight(firstColoumn) {
  var width = $(window).width();
  if (width >= 768 && width <= 991) {
    $(firstColoumn).each(function () {
      var imageHeight = $(this).children().find(".image");
      var textPannel = $(this).children().find(".text-pannel");
      setTimeout(() => {
        $(textPannel).css("height", $(imageHeight).height() + "px");
      }, 500);
    });
  } else {
    $(firstColoumn).each(function () {
      var textPannel = $(this).children().find(".text-pannel");
      $(textPannel).css("height", "auto");
    });
  }
}