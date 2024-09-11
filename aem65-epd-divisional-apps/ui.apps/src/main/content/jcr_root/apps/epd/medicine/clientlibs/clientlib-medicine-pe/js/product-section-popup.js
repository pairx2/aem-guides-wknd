$(document).ready(function () {
  var path = window.location.pathname;
  if (path.includes("/product-category.html")) {
    if (localStorage.getItem("forhcpuser") == null) {
      var descBtn = "";
      var titleText =
        "<h4>" +
        $("#site-leaving-popup-content").find(".cmp-title__text").text() +
        "</h4>";
      var buttonCheck = $("#site-leaving-popup-content").find(".btn");

      $(buttonCheck).each(function (index) {
        if (index == 0) {
          descBtn +=
            '<button class="disc-popup-btn-ok" ' +
            'data-url="' +
            $(this).attr("href") +
            '">' +
            $(this).text() +
            "</button>";
        }
        if (index == 1) {
          descBtn +=
            '<button class="disc-popup-btn-close"' +
            'data-url="' +
            $(this).attr("href") +
            '">' +
            $(this).text() +
            "</button>";
        }
      });

      disclaimerPopup(titleText, descBtn);
    }
  }
});

function disclaimerPopup(titleText, descBtn) {
  var discHTML = "";

  discHTML =
    '<div class="popup-production-section popup-wrapper footer-popup footer-oly">' +
    "<style></style>" +
    '<div class="popup-content"><div class="popup-container"><span class="popup-close" data-dismiss="modal" aria-hidden="true"><span class="close-txt"></span></span><div class="popup-text">';

  discHTML += titleText;
  discHTML +=
    '</div><div class="popup-button">' +
    descBtn +
    '</div><div class="disclaimer-num"><p style="text-align: right;">' +
    "</p></div></div></div></div>";

  $("body").append(discHTML);

  $("body").addClass("show-popup");
  $(".disc-popup-btn-ok").on("click", function (e) {
    e.preventDefault();
    var url = $(this).attr("data-url");
    window.open(url, "_self");
    localStorage.setItem("forhcpuser", $(this).text());
    $(this).closest(".popup-wrapper").remove();
    $("body").removeClass("show-popup");
  });
  $(".disc-popup-btn-close").on("click", function (e) {
    e.preventDefault();
    localStorage.setItem("forhcpuser", $(this).text());
    $(this).closest(".popup-wrapper").remove();
    $("body").removeClass("show-popup");
  });
}
