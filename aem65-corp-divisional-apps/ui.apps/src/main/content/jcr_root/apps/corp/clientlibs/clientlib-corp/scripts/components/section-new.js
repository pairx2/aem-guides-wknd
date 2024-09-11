//js funtionality for hubsection component for dropdown funtionality
$(function () {
  if ($(".section-title-container").length > 0 && isOnPublish()) {
    const dropdown = $(".category-name.section-dropdown");

    $("body").on("click", function (e) {
      if (dropdown.hasClass("open")) {
        if (!$(e.target).closest(".category-name.section-dropdown").length) {
          dropdown.removeClass("open");
          dropdown
            .find(".icon")
            .removeClass("icon-caret-up")
            .addClass("icon-caret-down");
        }
      }
    });

    dropdown.on("click", function (e) {
      $(this).toggleClass("open");
      const icon = $(this).find(".icon");
      if (icon.hasClass("icon-caret-down")) {
        icon.removeClass("icon-caret-down").addClass("icon-caret-up");
      } else if (icon.hasClass("icon-caret-up")) {
        icon.removeClass("icon-caret-up").addClass("icon-caret-down");
      }
    });
  }
});
