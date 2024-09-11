$(function () {
  const totalNumber = +$(".pressreleasesdynamicpull .total-result").text();
  const initialCount = +$(".pressreleasesdynamicpull .initialCount").text();
  let showNumber = initialCount;
  console.log(showNumber, totalNumber);
  $(".pressreleasesdynamicpull .item").slice(0, initialCount).show();
  if (totalNumber <= showNumber) {
    $(".pressreleasesdynamicpull #loadMore").hide();
    $(".pressreleasesdynamicpull .initialCountDisplay").text(totalNumber);
  }
  $(".pressreleasesdynamicpull #loadMore").on("click", function (e) {
    e.preventDefault();
    showNumber = showNumber + initialCount;
    if (totalNumber <= showNumber) {
      showNumber = totalNumber;
    }
    if (totalNumber <= showNumber) {
      $(".pressreleasesdynamicpull #loadMore").hide();
    }
    $(".pressreleasesdynamicpull .item:hidden")
      .slice(0, initialCount)
      .slideDown();
    if ($(".pressreleasesdynamicpull .item:hidden").length == 0) {
      $("#load").fadeOut("slow");
    }
    $(".pressreleasesdynamicpull .initialCountDisplay").text(showNumber);
  });
});
