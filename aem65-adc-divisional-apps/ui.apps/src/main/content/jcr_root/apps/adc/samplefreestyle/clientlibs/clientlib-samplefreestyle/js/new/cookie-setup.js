//setting cookie for survey consesnts request form

$(document).ready(function () {
  let srvyQnsBtn = $(".btnSrvyQustnry");
  let samplRdrt = $(".btnSamplePage");
  if (srvyQnsBtn.length) {
    srvyQnsBtn.on("click", function () {
      if (isOnPublish() && samplRdrt.length) {
        setCookie("usConSmp", 1, 1, true);
        samplRdrt[0].click();
      }
    });
  }
  //checking for survey consesnts cookie and redirecting user to consents page
  let srvyQnscheckBtn = $(".btnSampleTC");
  let smplFrm = $("#sampleFreestyleRegistration");
  let usConCke = getCookie("usConSmp", true);
  if (smplFrm.length && srvyQnscheckBtn.length && !usConCke && isOnPublish()) {
    srvyQnscheckBtn[0].click();
  }

  //enable and disable the t&c button
  $(".srvy-qustnry-form")
    .find(".a-checkbox__input")
    .on("change", function () {
      if ($(this).prop("checked")) {
        $(this).prop("checked", true);
      } else {
        $(this).prop("checked", false);
      }
      btnEnblDsbl();
    });

  function btnEnblDsbl() {
    if (
      $(".srvy-qustnry-form").find($('input[type="checkbox"]:checked'))
        .length == 2
    ) {
      $(".btnSrvyQustnry").prop("disabled", false);
    } else $(".btnSrvyQustnry").prop("disabled", true);
  }
  setTimeout(() => {
    btnEnblDsbl();
  }, "1000");
});
