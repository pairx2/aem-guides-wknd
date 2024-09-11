$(function () {
  $(".pointer").click(function () {
    $(".isi-padding").animate({
      scrollTop: $($(this).attr("data-href")).position().top - 20,
    });
  });
});
