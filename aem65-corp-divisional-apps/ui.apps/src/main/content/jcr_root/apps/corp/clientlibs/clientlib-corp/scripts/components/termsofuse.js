//function to setCookie
function setCookie(cname, cvalue, exdays) {
  var expires = "";
  if (exdays !== "") {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    expires = "expires=" + d.toUTCString();
  }
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;Secure;";
}

//function to getCookie
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//function to deleteCookie
function deleteCookie(name) {
  document.cookie =
    name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;Secure;";
}

$(function () {
  const pathName = window.location.pathname;
  if (pathName.includes("about-abbott/guideline") && isOnPublish()) {
    if (getCookie("termsOfuse") != "true") {
      window.location.href =
        "/content/corp/abbott/jp/ja/terms-of-use-agreement.html";
    } else {
      setTimeout(() => {
        deleteCookie("termsOfuse")
      }, "5000");
    }
  }
  if ($("#termsChekbox-options").length > 0 && isOnPublish()) {
    $("#termsBtn").addClass("disabled");
    $("#termsChekbox-options").click(function () {
      if ($("#termsChekbox-options input.a-checkbox__input").is(":checked")) {
        $("#termsBtn").removeClass("disabled");
      } else {
        $("#termsBtn").addClass("disabled");
      }
    });
    $("#termsBtn").click(function () {
      setCookie("termsOfuse", true);
    });
  }
});
