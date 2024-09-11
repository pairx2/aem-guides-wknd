// funtion to check if device is mobile
function isMobile() {
  return window.matchMedia("(max-width: 767.98px)").matches;
}

function isSmallMobileDevice() {
  return window.matchMedia("(max-width: 568px)").matches;
}

// funtion to check if device is Tablet
function isTablet() {
  return window.matchMedia("(min-width: 768px) and (max-width:991.98px)")
    .matches;
}

// function to check if page isOnPublish mode
function isOnPublish() {
  return $(`#wcmMode`).val() === "false";
}

//For adding sup tag dynamically
$("sup")
  .contents()
  .unwrap();
$("h1,h2,h3,h4,h5,h6,p,a,span,li,dl,td")
  .contents()
  .filter(function() {
    return this.nodeType === 3;
  })
  .replaceWith(function() {
    return this.nodeValue.replace(/[™®]/g, "<sup>$&</sup>");
  });

/** Play video for caregivers */
let brightcoveVideoPopupEle = document.querySelector("video.brightcove-video");
$(document).on("click", ".brightcove-video-link", function(evt) {
  if ($("#is-nutritional-resource").val() === "true") {
    onBrightCoveModalLinkClick(evt);
  }
});

function onBrightCoveModalLinkClick(evt) {
  let videoModal = document.getElementById("videoModal");
  let target = evt.target;
  let brightCovePopupEle = document.querySelector(".brightcove-video-wrapper");
  videoModal.style.backgroundColor = "#0000007a";
  videoModal.style.display = "block";
  videoAppend(brightCovePopupEle, target);
}

function videoAppend(popupEle, tgt) {
  brightcoveVideoPopupEle.dataset.account = tgt.dataset.account;
  brightcoveVideoPopupEle.dataset.player = tgt.dataset.player;
  brightcoveVideoPopupEle.dataset.videoId = tgt.dataset.videoId;
  let brightCoveScriptEle = document.createElement("script");
  brightCoveScriptEle.classList.add("scriptTag");
  brightCoveScriptEle.setAttribute(
    "src",
    "https://players.brightcove.net/" +
      tgt.dataset.account +
      "/" +
      tgt.dataset.player +
      "_default/index.min.js"
  );
  popupEle.innerHTML = brightcoveVideoPopupEle.outerHTML;
  popupEle.closest(".modal-body").appendChild(brightCoveScriptEle);
}

/** Dropdown toggle fix for sort dropdown in products page */
$("#selectedValue").click(function(e) {
  $("#menuItem").removeClass("d-none");
  $("#menuItem").addClass("d-block");
});

$("#menuItem a").click(function(e) {
  $("#menuItem").addClass("d-none");
  $("#menuItem").removeClass("d-block");
});

/** PWA Alert hide */

$(document).ready(function() {
  let is_modal_show = localStorage.getItem("toastmessage");
  if (is_modal_show === "true") {
    $(".pwaalertmessage").hide();
  } else {
    $(".pwaalertmessage").show();
  }
});

$(document).click(".closetoast", function() {
  localStorage.setItem("toastmessage", true);
});
