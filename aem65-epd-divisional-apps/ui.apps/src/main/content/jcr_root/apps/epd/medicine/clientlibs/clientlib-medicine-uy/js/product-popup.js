$(document).on("click", ".productlist-page", function (e) {
  var anchorHref = $(this).attr("href");

  e.preventDefault();

  var sitePopupContent = "";

  if ($("#siteLeavingPopupFragmentPathModal").length != 0) {
    sitePopupContent = $("#siteLeavingPopupFragmentPathModal");
  } else {
    sitePopupContent = $("#site-leaving-popup-content");
  }

  var descMsg = "";
  var descBtn = "";

  var externalcountrywmsgHeading = $(sitePopupContent)
    .find(".cmp-title__text")
    .children()
    .text();

  var externalcountrywmsgDescription = $(sitePopupContent)
    .find(".section-subtitle")
    .find("p");

  var externalcountrywmsgButton = $(sitePopupContent)
    .find(".button")
    .find("span");

  $(externalcountrywmsgDescription).each(function () {
    descMsg += "<p>" + $(this).text() + "</p>";
  });

  $(externalcountrywmsgButton).each(function (index) {
    if (index == 0) {
      descBtn += '<button class="popup-btn ok">' + $(this).text() + "</button>";
    }
    if (index == 1) {
      descBtn +=
        '<button class="popup-btn close">' + $(this).text() + "</button>";
    }
  });

  var msgAppend = "<h4>" + externalcountrywmsgHeading + "</h4>" + descMsg;

  var externalmsg = {
    msg: msgAppend,
    btnText: descBtn,
  };
  customwarnOnLeave(externalmsg, anchorHref);
});

function customwarnOnLeave(msg, url) {
  var warnHtml = "";
  var warnMsgDesc = msg.msg;
  var warnMsgBtn = msg.btnText;
  warnHtml =
    '<div class="popup-wrapper footer-popup footer-oly">' +
    "<style></style>" +
    '<div class="popup-content"><div class="popup-container"><span class="popup-close" data-dismiss="modal" aria-hidden="true"><span class="close-txt"></span></span><div class="popup-text">';

  warnHtml += warnMsgDesc;
  warnHtml +=
    '</div><div class="popup-button">' +
    warnMsgBtn +
    '</div><div class="disclaimer-num"><p style="text-align: right;">' +
    "</p></div></div></div></div>";

  $("body").append(warnHtml);

  $("body").addClass("show-popup");
  $(".popup-btn.ok").on("click", function (e) {
    window.open(url, "_blank");
    $(this).closest(".popup-wrapper").remove();
    $("body").removeClass("show-popup");
  });
  $(".popup-btn.close").on("click", function (e) {
    e.preventDefault();
    $(this).closest(".popup-wrapper").remove();
    $("body").removeClass("show-popup");
  });
  $(".popup-close").on("click", function (e) {
    e.preventDefault();
    $(this).closest(".popup-wrapper").remove();
    $("body").removeClass("show-popup");
  });
}
