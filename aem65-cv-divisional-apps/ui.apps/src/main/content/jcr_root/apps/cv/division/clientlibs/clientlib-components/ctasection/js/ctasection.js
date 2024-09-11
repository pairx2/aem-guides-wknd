$(document).ready(function () {
  $(".ctasection").each(function () {
    var eleLength = $(this).find(".button").length;
    if (eleLength == 1) {
      $(this).find(".button").addClass("button-spacing-bottom");
      $(this).find(".o-cta-section__sub-title").addClass("spacing-bottom");
    }
  });
});