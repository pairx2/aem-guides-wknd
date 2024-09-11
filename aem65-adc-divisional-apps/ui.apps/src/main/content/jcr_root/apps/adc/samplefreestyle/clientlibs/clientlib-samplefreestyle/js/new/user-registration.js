//sample freestyle sign up flow

const USER = {
  status: {
    LOGIN: "LoggedIn",
    NOTLOGIN: "ExistingUserNotLoggedIn",
    NEW: "newUser",
  },
};

//Handling Thankyoupage Visibilty on Logged In and New User cases
const thankyouVisibleHandler = () => {
  const isLoggedInStatus = isUserInLogedInState() || getCookie('cJwt_smpl', true);
    if ((isLoggedInStatus || sessionStorage.getItem('LoggedInUserSampling')) && isOnPublish() && sessionStorage.getItem('userData') == null) {
      $("div[data-conditional-case='ExistingUser']").show();
      sessionStorage.setItem('LoggedInUserSampling', true);
      deleteCookie('cJwt_smpl', true);
    } else if (sessionStorage.getItem('userData') == null && isOnPublish() && sessionStorage.getItem('LoggedInUserSampling') == null ) {
      $("div[data-conditional-case='newUser']").show();
    }
};

$(document).ready(function () {
  const isLoggedIn = isUserInLogedInState() || getCookie('cJwt_smpl', true);
  const sampleFreeStylePage = $("#sampleFreestyleRegistration");
  const radioCheckVal = sampleFreeStylePage
    .find('#sample-form-options input[type="radio"]:checked')
    .val();
  if (sampleFreeStylePage && isOnPublish()) {
    if (isLoggedIn) {
      $("#sample-form-options").hide();
      dsplyReqForm(USER.status.LOGIN,sampleFreeStylePage);
      $("div[data-conditional-case='LoggedIn']")
        .find(".a-checkbox__input")
        .prop("checked", false);
    } else {
      sampleFreeStylePage
        .find('#sample-form-options input[type="radio"]')
        .click(function () {
          dsplyReqForm($(this).val(),sampleFreeStylePage);
        });      
        dsplyReqForm(radioCheckVal,sampleFreeStylePage);
      
    }
  }
  //removing icon for alert

  $("div[data-conditional-variable='userEmailcheck']")
    .find(".m-alert__close-icon")
    .remove();

  //selecting all check boxes
  const mfRegConsents = $("#sampleFreestyleRegistration").find(
    '.a-checkbox__input:not([name="consentsAll"]):not([name="tncAgree"]):not([name="requiredConsents"])'
  );
  const mfRegSelectAll = $("#sampleFreestyleRegistration").find(
    '.a-checkbox__input[name="consentsAll"]'
  );
  
  selectCheckBox(mfRegSelectAll,mfRegConsents)

  //Thankyoupage call
  thankyouVisibleHandler();

  //loggedin user custom functionality for checkboxes and button
  $("div[data-conditional-case='LoggedIn']")
    .find(".a-checkbox__input")
    .on("change", function () {
      if ($(this).prop("checked")) {
        $(this).prop("checked", true);
      } else {
        $(this).prop("checked", false);
      }
      if (
        $("div[data-conditional-case='LoggedIn']").find(
          $('input[type="checkbox"]:checked')
        ).length == 2
      ) {
        $("#btn-continue").removeAttr("disabled");
      }
    });

  $("#btn-continue").on("click", function () {
    setConsents()
  });
});

//function to display required form based on radio button click
function dsplyReqForm(val,page) {
  if(page.length){
  $(".conditional__case").each(function () {
    if ($(this).attr("data-conditional-case") == val) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}
}

//function to store email,consents in sessionstorage

function setConsents(){
const consentNames = [
  "termsofuse",
  "dataprivacy",
  "marketingeducationemail",
];
const consents = consentNames.map((consentName) => ({
  consentName,
  consentValue: true,
}));
const loginDetails = JSON.parse(sessionStorage.getItem("userData"));
let email1 = loginDetails ? loginDetails["email"] : ''
    if(!email1 || isUserInLogedInState()){
      let xCntryCode=$('[name="x-country-code"]').val().toLowerCase();
      let usrData = JSON.parse(getItemLocalStorage(
        `commerceInfo-libreemea_sv_${xCntryCode}`) ,
        false) ?? JSON.parse(getItemLocalStorage(`commerceInfo-freestyle-${xCntryCode}`),
        false);
      if (usrData) {
        email1 = usrData.profile.userInfo['email'];
  }
}
sessionStorage.setItem(
  "userData",
  JSON.stringify({ email: email1, consents: consents })
);
showNextStep();

}

function selectCheckBox(allConsents,regConsents){
  allConsents.on("change", function () {
    if ($(this).prop("checked")) {
      regConsents.prop("checked", true);
    } else if (!$(this).prop("checked")) {
      regConsents.prop("checked", false);
    }
  });  
}