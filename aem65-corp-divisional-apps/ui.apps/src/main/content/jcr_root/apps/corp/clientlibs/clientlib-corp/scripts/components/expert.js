$(document).ready(function () {
  if ($("#expert-component").length > 0 && isOnPublish()) {
    const list = $(
      "#expert-component .m-custom-list__wrapper .m-custom-list__content p"
    );
    list.each(function () {
      const item_href = $(this).find("a").attr("href");
      $(this).click(function () {
        window.location.href = item_href;
      });
    });
  }
});
