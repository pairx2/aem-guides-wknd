var dataGenValue = jQuery("#commonError").val();
var dob="";
var submitButtonId = jQuery("#submit-button-id");
var overlayLoader = jQuery("#overlay");
var appJson = "application/json";
var templatePara = jQuery("#template.global-error p");
var templateBody = jQuery("#template");
var htmlBody = jQuery("html, body");
function ajaxCommonPropertyGetProfile(apiURL) {
  return {
    url: apiURL,
    method: "GET",
    headers: {
      "content-type": appJson,
      "x-country-code": "US",
      "x-application-id": "similac",
      "x-preferred-language": "en-US",
      "x-id-token": ABBOTT.utils.getSessionInfo()
    },
    async: true,
    beforeSend: function() {
      overlayLoader.show();
    }
  };
}

function ajaxCommonPropertyUpdateProfile(apiURL, formData) {
  return {
    url: apiURL,
    method: "POST",
    headers: {
      "content-type": appJson,
      "x-country-code": "US",
      "x-application-id": "similac",
      "x-preferred-language": "en-US",
      "x-id-token": ABBOTT.utils.getSessionInfo()
    },
    data: formData,
    beforeSend: function() {
      overlayLoader.show();
    }
  };
}
const getMessageError = (errorCode, errorCodeInfo = []) => {
  return errorCodeInfo.find((item) => (item.errorCode.toString().trim() === String(errorCode).toString()));
}

const getMessageForRegError = (errorCode) => {
  const {errorCodeInfo=[]} = (window.errorCodeData || {});
  const mess = getMessageError(errorCode,errorCodeInfo);
  if(mess){
      const {errorMessage} = mess;
      return errorMessage;
  }
  else{
      return "";
  }
};

async function updatePampersOpt(e) {
  const lc = ABBOTT.cookie("profile");
  var lp = JSON.parse(lc);
  var formData = {
    userInfo: {
      unlockPamersClub: getBooleanValue(
        jQuery("#pampers-id-options input:checked").val()
      )
    },
    category: "pampersClubOpt",
    children: [
      {
        birthDate:dob
      }
    ]
  };
  formData = JSON.stringify(formData);
  const commonAjaxPropsUpdateProfile = ajaxCommonPropertyUpdateProfile(
    document.getElementById("update-profile-info").value,
    formData
  );
  jQuery.ajax({
    ...commonAjaxPropsUpdateProfile,
    success: function(updateProfile) {
        overlayLoader.hide();
        window.sessionStorage.removeItem("isChallengerForm");
      if (updateProfile.errorCode === 0 && updateProfile.status === true && updateProfile.response.i18nMessageKey === "0") {
        $("#success-welcome").show();
        $(".formcontainer").hide();
        lp.unlockPamersClub = "true";
        ABBOTT.removeCookie("profile");
        const cookieConfig = {
          path: "/",
          domain: domainName
        };
        ABBOTT.cookie("profile", JSON.stringify(lp), cookieConfig);
      } else {
        let errDataValue = getMessageForRegError("GEN_ERR");
        templatePara.html(errDataValue);
        templateBody.show();
        htmlBody.animate({ scrollTop: 0 }, "slow");
      }
    }
  });
}

function showOrHidePampersOptForm(results_get_profile) {
  if (results_get_profile.response.userInfo.unlockPamersClub) {
    $(".formcontainer").hide();
  }
}

$('#pampers-id-options input').click(function() {
    if ($(this).is(':checked')) {
      submitButtonId.removeAttr("disabled");
    }
    else{  
      submitButtonId.attr("disabled", "disabled");  
    }
});

jQuery(document).ready(function() {
  var neo = window.sessionStorage.getItem("isNeosurePage");
  var hasChallengeForm = window.sessionStorage.getItem("isChallengerForm");
  var neosurePage =  window.sessionStorage.getItem("formNeosure");
  if((!neo && neosurePage === 'neosure') || (!hasChallengeForm && neosurePage === "alimentum")){
    jQuery("#container-welcome-pampers").hide();
  }
  const validForms = ['strongmoms', 'digitalrewards'];
  const isRewardsCoreWelcome = window.location.href.indexOf("rewards/core-welcome") > -1;
  const isDigitalRewardsWelcome = window.location.href.indexOf("digitalrewards/welcome") > -1;
  const isValidForm = validForms.includes(neosurePage);

  if ((isRewardsCoreWelcome || neo || hasChallengeForm || isDigitalRewardsWelcome) && isValidForm) {
  const commonAjaxPropsGetProfile = ajaxCommonPropertyGetProfile(
    document.getElementById("profile-info").value
  );
  submitButtonId.attr("disabled", "disabled"); 
    jQuery.ajax({
      ...commonAjaxPropsGetProfile,
      success: function(results_get_profile) {
        overlayLoader.hide();
        if (results_get_profile.status && results_get_profile.errorCode === 0) {
          showOrHidePampersOptForm(results_get_profile);
          dob= results_get_profile.response.children[0].birthDate;
          if(results_get_profile.response.offerPreferenceInfo.enableDigital){
            $('#goPaperless').removeClass("d-none");
          }
        }
      }
    });
 
  if(submitButtonId){
  $(submitButtonId).click(function(){
    updatePampersOpt();
  });
  }
}
});
function getBooleanValue(paramVal) {
    if(paramVal === undefined || paramVal === null || paramVal === "undefined"){
        return false;
    }
    return true;
}



