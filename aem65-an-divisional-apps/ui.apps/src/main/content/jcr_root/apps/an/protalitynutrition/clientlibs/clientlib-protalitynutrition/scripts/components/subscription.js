
let appJson = "application/json";
let language = jQuery("input[name=x-preferred-language]").val();
let application = jQuery("input[name=x-application-id]").val();
let country = jQuery("input[name=x-country-code]").val();
let apiURL = $("#apiURL").val();
let gSiteKey = $("[data-site-key]").attr("data-site-key");
let thankYouURL = jQuery("#thankyouURL").val();
let thankUnsubscribe = jQuery("#thankURLUnsubscribe").val();
let unsubscribe_apiURL = $("#unsubscribeURL").val();
const isEnableKount = jQuery("#protality_registration_form").attr("data-kount");
let kountConfig, sessionID;
const isEnterpriseRecaptchaEnabled = jQuery("input[name=enterpriseRecaptcha]").length ? jQuery("input[name=enterpriseRecaptcha]").val() : false;

function uuid() {
  let r = crypto.randomUUID().replace(/-/g, '');
  return r.toString();
}

$("#signup_form_submit_button").click(function (e) {
  e.preventDefault();
  e.stopPropagation();
  $('#page-spinner').show();
  $("#signup_form_submit_button").addClass("disabled");
  $("#o-form-container__error-msg-custom_api").hide();
  $("#o-form-container__error-invalid_captcha_api").hide()
  $("#o-form-container__error-msg-custom").hide();
  $("#o-form-container__error-msg-custom_risk-1").hide();
  $("#o-form-container__error-msg-custom_risk-2").hide();
  $("#o-form-container__error-msg-custom_risk-4").hide();
  $("#o-form-container__error-msg-custom_risk-5").hide();
  if (
    $(".validation-require").length === 0 &&
    $(".validation-regex").length === 0 &&
    $(".validation-error").length === 0
  ) {
    let email = $("#forms_referenceEmail").val();
    let firstname = $("#forms_firstname").val();
    let lastname = $("#forms_lastname").val();
    let submit_time = new Date().toISOString();
    let consent1 = $("#protalityConsentOne").val();
    let addressInfoLineOne = $("#street_number").val().split(',')[0];
    let addressInfoLineTwo = $("#forms_referenceAddress_2").val();
    let addressInfoCity = $("#locality").val();
    let addressInfoState = $("#state-options li.selected").attr('data-optionvalue');
    let addressInfoZipCode = $("#postal_code").val();
    let birthMonth = $("#forms_referenceBirthMonth-options li.selected").attr('data-optionvalue');
    let birthYear = $("#forms_referenceBirthYear-options .a-dropdown-selected")[0].innerText.trim();
    const accountId = window.btoa(email); //encrypt the email for accountId
    let formData = {
      subscribe: "true",
      email: email,
      firstName: firstname,
      lastName: lastname,
      birthMonth: birthMonth,
      birthYear: birthYear,
      addressInfo: {
        lineOne: addressInfoLineOne,
        lineTwo: addressInfoLineTwo,
        city: addressInfoCity,
        state: addressInfoState,
        zipCode: addressInfoZipCode
      },
      externalTracking: [
        {
          cookieTrackingCode: "",
          utmCampaign : "",
          utmMedium : "",
          utmContent : "",
          utmTerm: "",
          utmSource: "",
          webAction: "REGISTER"
        }
      ],

      consents: [
        {
          consentName: consent1,
          consentValue: "true",
          consentUpdatedTime: submit_time
        }
      ],
      riskCheck: isEnableKount,
      riskSessionValue: sessionID
    };
    if(sessionStorage.getItem('utmTracking')){
      formData =  readUTMTracking(formData); //update utm tracking
    }
    if (typeof grecaptcha != "undefined") {
      if (isEnterpriseRecaptchaEnabled) {
        grecaptcha.enterprise.ready(function () {
          grecaptcha.enterprise
            .execute(gSiteKey, {
              action: "submit"
            })
            .then(function (captcha) {
              formData["g-recaptcha-response"] = captcha;
              formData["captchaType"] = "ENT";
              formData["captchaAction"] = "submit";
              formData["captchaAccountId"] = accountId;
              userSubscription(formData);
            })
            .catch(function (error) { });
        });
      } else {
        grecaptcha.ready(function () {
          grecaptcha
            .execute(gSiteKey, {
              action: "submit"
            })
            .then(function (captcha) {
              formData["captchaValue"] = captcha;
              formData["captchaType"] = "NON_ENT";
              formData["captchaAction"] = "submit";
              formData["captchaAccountId"] = accountId;
              userSubscription(formData);
            })
            .catch(function (error) { });
        });
      }
    }
  }
});

$("#expand-address").click(expandAddress);
$("#expand-address").on("keyup", function (event) {
  if (event.which == 13) {
    expandAddress();
  }
});
//Read utm tracking from session storage and update form payload
 function readUTMTracking(subFormData){
    const utmObj =  JSON.parse(sessionStorage.getItem('utmTracking'));
    subFormData.externalTracking[0].utmCampaign = readValue(utmObj.utm_campaign);
    subFormData.externalTracking[0].utmMedium = readValue(utmObj.utm_medium);
    subFormData.externalTracking[0].utmContent = readValue(utmObj.utm_content);
    subFormData.externalTracking[0].utmTerm = readValue(utmObj.utm_term);
    subFormData.externalTracking[0].utmSource = readValue(utmObj.utm_source);

    return subFormData;
}
//Helper function read value to avoid code complexity 
function readValue(inputVal){
  return inputVal ? inputVal: "";
}

function expandAddress() {
  $("#expand-address").parents(".text").css("display", "none");
  $("#forms_referenceAddress_2").parents(".fields.text").css("display", "block");
}

/**
 * @method
 * @desc  function for user subscription api call
 * @param {JSON} JSONFormData
 */
function userSubscription(data) {
  const formJsonData = JSON.stringify(data);
  const commonAjaxProps = ajaxCommonProperty(formJsonData, apiURL);
  jQuery
    .ajax({
      ...commonAjaxProps,
      success: function (results) {
        $('#page-spinner').hide();
        sessionStorage.removeItem('utmTracking'); // Remove utm tracking after form sumbit
        const { errorCode, status, response } = results;
        let isError = (status && errorCode === 400);
        let i18nKey = response.i18nMessageKey;
        if (status && errorCode === 0) {
          handleSuccess(i18nKey);

        } else if (isError && (i18nKey.includes("RISK"))) {
          showRiskError(i18nKey);
        } else if (isError && i18nKey === "REG-USER-1030") {
          window.scrollTo(600, 600);
          $("#o-form-container__error-msg-custom_api").show();
          $("#forms_referenceEmail").parents(".form-group").addClass("validation-error");
          $("#signup_form_submit_button").addClass("disabled");

        } else if (isError && i18nKey === "AUTH-1005") {
          window.scrollTo(600, 600);
          $("#o-form-container__error-invalid_captcha_api").show();
          $("signup_form_submit_button").addClass("disabled");

        } else if ((isError && i18nKey !== "REG-USER-1030" && i18nKey !== "AUTH-1005") || (!status && errorCode === 500)) {
          showUsersubscribeError();
        }
      },
      fail: function (jqXHR, textStatus, error) {
        $('#page-spinner').hide();
        showUsersubscribeError();
      }
    })
    .fail(function (jqXHR, textStatus, error) {
      $('#page-spinner').hide();
      showUsersubscribeError();
    });
}

function handleSuccess(i18nKey) {
  if (i18nKey.includes("RISK")) {
    showRiskError(i18nKey);
  } else {
    window.location = thankYouURL;
  }
}

function showRiskError(i18nKey) {
  window.scrollTo(600, 600);
  if ((i18nKey === "RISK-0001") || (i18nKey === "RISK-0002")) {
    $("#o-form-container__error-msg-custom_risk-2").show();
    $("#signup_form_submit_button").addClass("disabled");

  } else if (i18nKey === "RISK-0004") {
    $("#o-form-container__error-msg-custom_risk-4").show();
    $("#signup_form_submit_button").addClass("disabled");

  } else if (i18nKey === "RISK-0005") {
    $("#o-form-container__error-msg-custom_risk-5").show();
    $("#signup_form_submit_button").addClass("disabled");

  } else {
    $("#o-form-container__error-msg-custom_risk-1").show();
    $("#signup_form_submit_button").addClass("disabled");

  }
}

function showUsersubscribeError() {
  window.scrollTo(600, 600);
  $("#o-form-container__error-msg-custom").show();
  $("#signup_form_submit_button").addClass("disabled");
}

function showUnsubscribeError() {
  $("#o-form-container__error-msg-custom").show();
  $("#unsubscribe_click").addClass("disabled");
}

/**
 * @method
 * @desc ajax common property function
 * @param {JSON, string} JSONFormData and API URL
 * @return {JSON} API syntax
 */

function ajaxCommonProperty(formJsonData, apiURLParam) {
  return {
    url: apiURLParam,
    method: "POST",
    headers: {
      "Content-Type": appJson,
      "x-country-code": country,
      "x-application-id": application,
      "x-preferred-language": language
    },
    data: formJsonData,
    dataType: "json",
    async: false,
    beforeSend: function () { }
  };
}

/**
 * @method
 * @desc Unsubscription form submit call the Unsubscription function
 * @event click
 */
$("#unsubscribe_click").click(function (e) {
  e.preventDefault();
  e.stopPropagation();
  $("#unsubscribe_click").addClass("disabled");
  $("#o-form-container__error-msg-custom_api").hide();
  $("#o-form-container__error-msg-custom").hide();
  $("#protality_unsubscribe_form .form-group input").each(function () {
    if ($(this).val() === "") {
      $(this)
        .parents(".form-group")
        .addClass("validation-require");
    }
  });
  let email = $("#referenceEmailAddress").val();
  let action = $("#forms_unsubscribe_action_value").val();
  let formDataUnsubscribe = {
    userInfo: {
      email: email
    },
    action: action
  };
  if (
    $(".validation-require").length === 0 &&
    $(".validation-regex").length === 0 &&
    $(".validation-error").length === 0
  ) {
    if (typeof grecaptcha != "undefined") {
      if (isEnterpriseRecaptchaEnabled) {
        grecaptcha.enterprise.ready(function () {
          grecaptcha.enterprise
            .execute(gSiteKey, {
              action: "submit"
            })
            .then(function (captcha) {
              formDataUnsubscribe["g-recaptcha-response"] = captcha;
              formDataUnsubscribe["captchaType"] = "ENT";
              formDataUnsubscribe["captchaAction"] = "submit";
              userUnsubscription(formDataUnsubscribe);
            })
            .catch(function (error) { });
        });
      } else {
        grecaptcha.ready(function () {
          grecaptcha
            .execute(gSiteKey, {
              action: "submit"
            })
            .then(function (captcha) {
              formDataUnsubscribe["captchaValue"] = captcha;
              formDataUnsubscribe["captchaType"] = "NON_ENT";
              formDataUnsubscribe["captchaAction"] = "submit";
              userUnsubscription(formDataUnsubscribe);
            })
            .catch(function (error) { });
        });
      }
    }
  }
});

/**
 * @method
 * @desc function for user Unsubscription api call
 * @param {JSON} JSONFormData
 */
function userUnsubscription(data) {
  const formJsonData = JSON.stringify(data);
  const commonAjaxProps = ajaxCommonProperty(formJsonData, unsubscribe_apiURL);
  jQuery
    .ajax({
      ...commonAjaxProps,
      success: function (results) {
        const { errorCode, status, response } = results;
        if (status && errorCode === 0) {
          window.location = thankUnsubscribe;
        } else if (
          status &&
          errorCode === 400 &&
          response.i18nMessageKey === "REG-USER-1006"
        ) {
          $("#o-form-container__error-msg-custom_api").show();
        } else if (
          status &&
          errorCode === 400 &&
          response.i18nMessageKey !== "REG-USER-1006"
        ) {
          showUnsubscribeError();
        } else if (!status && errorCode === 500) {
          showUnsubscribeError();
        }
      },
      fail: function (jqXHR, textStatus, error) {
        showUnsubscribeError();
      }
    })
    .fail(function (jqXHR, textStatus, error) {
      showUnsubscribeError();
    });
}
$(document).ready(function () {
  let exclamationIcon = '<em class="abt-icon abt-icon-exclamation"></em>';
  $("#expand-address").attr("tabindex", "0");
  $("#unsubscribe_click").addClass("disabled");
  $("#signup_form_submit_button").addClass("disabled");
  $('#state-options').find('span.a-input-field--text-require').prepend(exclamationIcon);
  $('#forms_referenceBirthMonth-options').find('span.a-input-field--text-require').prepend(exclamationIcon);
  $('#forms_referenceBirthYear-options').find('span.a-input-field--text-require').prepend(exclamationIcon);
  $("#protality_registration_form .abt-icon-exclamation").addClass("abt-icon-alert-tringle").removeClass("abt-icon-exclamation")

  if (isEnableKount === "true") {
    const kountClientId = jQuery("input[name=kountClientID]").length ? jQuery("input[name=kountClientID]").val() : "101722";
    const kountEnvironment = jQuery("input[name=kountEnvironment]").length ? jQuery("input[name=kountEnvironment]").val() : "TEST";
    const isSPA = (jQuery("input[name=isSPA]").val() === "true");
  
    kountConfig = {
      "clientID": kountClientId,
      "environment": kountEnvironment,
      "isSinglePageApp": isSPA
    }
    sessionID = uuid();
    kountSDK(kountConfig, sessionID);
  }
  getUTMParameters(); // Get UTM parameters on page load
});
// UTM tracking and save in session storage
function getUTMParameters(){
  const utmString = new URLSearchParams(window.location.search);
  const mediaParams = {};
  for (let value of utmString.keys()) {
      mediaParams[value] = utmString.get(value);
  }
  const objKeys = Object.keys(mediaParams);
  const utmParams = ["utm_campaign", "utm_source", "utm_content", "utm_term", "utm_medium"];
  if (objKeys.length > 0) {
      objKeys.forEach(e => {
          if (utmParams.includes(e)) {
              sessionStorage.setItem('utmTracking', JSON.stringify(mediaParams));
          }
      })
  }
} 
function registrationValidation() {
  let state_array = [];
  setTimeout(function () {
    $("#protality_registration_form .form-group input").each(function () {
      if ($(this).val() === "" && $(this).attr("required") === "required") {
        state_array.push("true");
      }
    });
  }, 50);
  $("#protality_registration_form .checkbox input").each(function (el) {
    if (!this.checked && $(this).attr("data-required") === "true") {
      state_array.push("true");
    }
  });

  setTimeout(function () {
    $("#protality_registration_form .a-dropdown__field").each(function (el) {
      if ($(this).find(".a-dropdown__placeholder").length > 0) {
        state_array.push("true");
      }
    });
  }, 50);
  setTimeout(function () {
    if (state_array.length === 0 && $(".validation-require").length === 0 && $(".validation-regex").length === 0 && $(".validation-error").length === 0) {
      $("#signup_form_submit_button").removeClass("disabled");
    } else {
      $("#signup_form_submit_button").addClass("disabled");
    }
  }, 300);
}
$('#protality_registration_form .a-dropdown__field li').on('click keyup', function () {
  registrationValidation();
});
$("#protality_registration_form .form-group input#street_number").on('blur', function () {
  registrationValidation();
});
$("#protality_registration_form .form-group input").keyup(function () {
  registrationValidation();
});
$("#protality_registration_form #forms_referenceEmail").keyup(function () {
  $(this).parents(".form-group").removeClass("validation-error");
});
$("#protality_registration_form .checkbox input").change(function () {
  registrationValidation();
});