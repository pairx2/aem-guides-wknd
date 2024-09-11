let appJson = "application/json";
let language = jQuery("input[name=x-preferred-language]").val();
let application = jQuery("input[name=x-application-id]").val();
let apiURL = $("#apiURL").val();
let unsubscribe_apiURL = $("#unsubscribeURL").val();
let thankURL = jQuery("#thankyouURL").val();
let thankUnsubscribe = jQuery("#thankURLUnsubscribe").val();
let gSiteKey = $("[data-site-key]").attr("data-site-key");
let country = jQuery("input[name=x-country-code]").val();
const isEnterpriseRecaptchaEnabled = jQuery("input[name=enterpriseRecaptcha]").length ? jQuery("input[name=enterpriseRecaptcha]").val() : false;
const isEnableKount = jQuery("#pedialyte_registration_form").attr("data-kount");
let kountConfig, sessionID, formData, accountId;


function uuid() {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/x/g, function(c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

function setSurveyAnswers(sourceProfile) {  
  switch (sourceProfile) {
    case 'pdl-primarycare':
      formData["surveyQuestions"][0]["answer"] = $('#hcpPrimary').attr("name");
      formData["surveyQuestions"][0]["answerId"] = $('#hcpPrimary').attr("value");
      break;
    case 'pdl-obstetrics':
      formData["surveyQuestions"][0]["answer"] = $('#hcpObstetrics').attr("name");
      formData["surveyQuestions"][0]["answerId"] = $('#hcpObstetrics').attr("value");
      break;
    case 'pdl-onocology':
      formData["surveyQuestions"][0]["answer"] = $('#hcpOncology').attr("name");
      formData["surveyQuestions"][0]["answerId"] = $('#hcpOncology').attr("value");
      break;
    case 'pdl-pediatrics':
      formData["surveyQuestions"][0]["answer"] = $('#hcpPediatrics').attr("name");
      formData["surveyQuestions"][0]["answerId"] = $('#hcpPediatrics').attr("value");
      break;
  }
}

function setAdditionalProfileProperties(queryString) {  
  const parameters = {};
  for (let key of queryString.keys()) {
    parameters[key] = queryString.get(key);
    if ((key === "utm_campaign")) {
      let campaignProfile = queryString.get(key);
      formData["additionalProfileProperties"]["campaign"] = campaignProfile;
    }
    if ((key === "utm_source")) {
      let sourceProfile = queryString.get(key);
      formData["additionalProfileProperties"]["source"] = sourceProfile;
      if ($('#hcpRewards').attr("value") === "true") {
        setSurveyAnswers(sourceProfile);
      }
    }
    if ((key === "utm_medium")) {
      let mediumProfile = queryString.get(key);
      formData["additionalProfileProperties"]["medium"] = mediumProfile;
    }
    if ((key === "utm_content")) {
      let contentProfile = queryString.get(key);
      formData["additionalProfileProperties"]["content"] = contentProfile;
    }
    if ((key === "utm_term")) {
      let termProfile = queryString.get(key);
      formData["additionalProfileProperties"]["term"] = termProfile;
    }
  }
}
function setCaptchaValues() {
  
  if (typeof grecaptcha != "undefined") {
    if (isEnterpriseRecaptchaEnabled) {
      grecaptcha.enterprise.ready(function () {
        grecaptcha.enterprise
          .execute(gSiteKey, {
            action: "submit"
          })
          .then(function (captcha) {
            formData["captchaValue"] = captcha;
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

$(document).ready(function() {
  $("#registration_form_submit_button").addClass("disabled");
  $("#unsubscribe_button").addClass("disabled");
  $("#referenceConfirmEmailAddresss")
    .parents(".form-group")
    .addClass("referenceConfirmEmailAddresss");
  $("#forms_referenceEmail")
    .parents(".a-input-field")
    .addClass("userEmail");
  $("#pedialyte_registration_form .a-dropdown").each(function () {
    if ($(this).attr("data-required") === "true") {
      $(this)
        .parents(".drop-down")
        .addClass("required");
    }
  });  

  if(isEnableKount === "true") {
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
 
});


/**
 * @method
 * @desc to convert to string values
 * @return string
 */
function getValue(paramVal) {
  if (
    paramVal === undefined ||
    paramVal === null ||
    paramVal === "undefined" ||
    paramVal === 0
  ) {
    return "false";
  }
  return "true";
}

/**
 * @method
 * @desc Add icon to error
 */

$(".a-input-field--text-require").each(function () {
  if ($(this).find("em").length === 0) {
    $(this).prepend('<em class="abt-icon abt-icon-exclamation"></em>');
  }
});

/**
 * @method
 * @desc to convert to boolean values
 * @return boolean
 */
function getBooleanValue(paramVal) {
  return !(paramVal === undefined ||
    paramVal === null ||
    paramVal === "undefined" ||
    paramVal === 0 ||
    paramVal === "");
}

/**
 * @method
 * @desc find the loading device
 */
function isDevice() {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(
    navigator.userAgent
  );
}



/**
 * @method
 * @desc show page load spinner
 */
function showLoadingPedialyte() {
  $("#page-spinner-pedialyte").show();
}

/**
 * @method
 * @desc hide page load spinner
 */
function hideLoadingPedialyte() {
  $("#page-spinner-pedialyte").hide();
}

/**
 * @method
 * @desc Subscription form submit call the subscription function
 * @event click
 */

$("#registration_form_submit_button").click(function (e) {
  showLoadingPedialyte();
  e.preventDefault();
  e.stopPropagation();
  $("#registration_form_submit_button").addClass("disabled");
  $("#o-form-container__error-msg-custom_API").hide();
  $("#o-form-container__error-Invalid_captcha_API").hide()
  $("#o-form-container__error-msg-custom").hide();
  if (
    $(".validation-require").length === 0 &&
    $(".validation-regex").length === 0 &&
    $(".validation-error").length === 0
  ) {
    let email = $("#forms_referenceEmail").val();
    let firstname = $("#forms_firstname").val();
    let lastname = $("#forms_lastname").val();
    let drpdwnQuestion, dropdwnQuestion_id, drpdwnAnswer, drpdwnAnswer_id;
    let surveyAnswer, surveyAnswer_id, surveyQuestion, surveyQuestion_id;

    if ($('#hcpRewards').attr("value") === "false") {
      drpdwnQuestion = $("#field_label_dropdown_label_dropdown_label_condition")
        .text()
        .trim();
      dropdwnQuestion_id = $(".a-dropdown__menu").attr("name");
      drpdwnAnswer = $("#dropdown_label_dropdown_label_condition")
        .text()
        .trim();
      drpdwnAnswer_id = $("#dropdown_label_condition-options .selected").attr(
        "data-optionvalue"
      );

      surveyAnswer = $('#surveyAnswer').attr("name");
      surveyAnswer_id = $('#surveyAnswer').attr("value");
    }
    else {
      surveyAnswer = $('#hcpOpen').attr("name");
      surveyAnswer_id = $('#hcpOpen').attr("value");
    }

    surveyQuestion = $("#surveyQuestion").attr("name");
    surveyQuestion_id = $("#surveyQuestion").attr("value");



    let submit_time = new Date().toISOString();
    let device = isDevice() ? "MOBILE" : "DESKTOP";
    let consent1 = $("#pedialyteConsentOne").val();
    accountId = window.btoa(email); //encrypt the email for accountId
    if ($('#hcpRewards').attr("value") === "true") {
      formData = {
      userInfo: {
        email: email,
        firstName: firstname,
        lastName: lastname
      },

      surveyQuestions: [
        {
          answerId: surveyAnswer_id,
          answer: surveyAnswer,
          question: surveyQuestion,
          questionId: surveyQuestion_id
        }
      ],
      externalTracking: [
        {
          source: device
        }
      ],
      receiveSpecialOffers: {
        optOut: "false",
        optDate: submit_time
      },
      consents: [
        {
          consentName: consent1,
          consentValue: "true",
          consentUpdatedTime: submit_time
        }
      ]
    };
  }
  else{
    formData = {
      userInfo: {
        email: email,
        firstName: firstname,
        lastName: lastname
      },

      surveyQuestions: [
        {
          answerId: drpdwnAnswer_id,
          answer: drpdwnAnswer,
          question: drpdwnQuestion,
          questionId: dropdwnQuestion_id
        },
        {
          answerId: surveyAnswer_id,
          answer: surveyAnswer,
          question: surveyQuestion,
          questionId: surveyQuestion_id
        }
      ],
      externalTracking: [
        {
          source: device
        }
      ],
      receiveSpecialOffers: {
        optOut: "false",
        optDate: submit_time
      },
      consents: [
        {
          consentName: consent1,
          consentValue: "true",
          consentUpdatedTime: submit_time
        }
      ]
    };
  }

    const queryString = new URLSearchParams(window.location.search);
    if (queryString.size > 0) { formData["additionalProfileProperties"] = {} }

    setAdditionalProfileProperties(queryString);
    formData["riskSessionValue"] = sessionID;    
    formData["riskCheck"] = "true";
    setCaptchaValues();
  }               
  else {
    hideLoadingPedialyte();
  }
});

/**
 * @method
 * @desc function for user subscription api call
 * @param {JSON} JSONFormData
 */
function userSubscription(data) {
  const formJsonData = JSON.stringify(data);
  const commonAjaxProps = ajaxCommonProperty(formJsonData, apiURL);
  jQuery
    .ajax({
      ...commonAjaxProps,
      success: function (results) {
        hideLoadingPedialyte();
        const { errorCode, status, response } = results;
        if (status && errorCode === 0 && !response.i18nMessageKey.includes("RISK")) {
          window.location = thankURL;
        } else if (
          status &&
          errorCode === 400 &&
          response.i18nMessageKey === "REG-USER-1030"
        ) {
          $("#o-form-container__error-msg-custom_API").show();
          $("#forms_referenceEmail")
            .parents(".form-group")
            .addClass("validation-error");
          $("#registration_form_submit_button").addClass("disabled");
        } else if (
          status &&
          errorCode === 400 &&
          response.i18nMessageKey !== "REG-USER-1030" &&
          response.i18nMessageKey !== "AUTH-1005"
        ) {
          showUsersubscribeError();
        } else if (
          status &&
          errorCode === 400 &&
          response.i18nMessageKey === "AUTH-1005" ||
          status && 
          response.i18nMessageKey.includes("RISK")
        ) {
          $("#o-form-container__error-Invalid_captcha_API").show();
          $("#registration_form_submit_button").addClass("disabled");
        } else if (!status && errorCode === 500) {
          showUsersubscribeError();
        }
      },
      fail: function (jqXHR, textStatus, error) {
        showUsersubscribeError();
        hideLoadingPedialyte();
      }
    })
    .fail(function (jqXHR, textStatus, error) {
      showUsersubscribeError();
      hideLoadingPedialyte();
    });
}

function showUnsubscribeError() {
  $("#o-form-container__error-msg-custom").show();
  $("#unsubscribe_button").addClass("disabled");
}
function showUsersubscribeError() {
  $("#o-form-container__error-msg-custom").show();
  $("#registration_form_submit_button").addClass("disabled");
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
$("#unsubscribe_button").click(function (e) {
  showLoadingPedialyte();
  e.preventDefault();
  e.stopPropagation();
  $("#unsubscribe_button").addClass("disabled");
  $("#o-form-container__error-msg-custom_API").hide();
  $("#o-form-container__error-msg-custom").hide();
  $("#pedialyte_unsubscribe_form .form-group input").each(function () {
    if ($(this).val() === "") {
      $(this)
        .parents(".form-group")
        .addClass("validation-require");
      hideLoadingPedialyte();
    }
  });
  let email = $("#referenceEmailAddress").val();
  let action = $("#forms_UnsubscribeAction_Value").val();
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
              formDataUnsubscribe["captchaValue"] = captcha;
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
                               
  }  else {
    hideLoadingPedialyte();
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
        hideLoadingPedialyte();
        const { errorCode, status, response } = results;
        if (status && errorCode === 0) {
          window.location = thankUnsubscribe;
        } else if (
          status &&
          errorCode === 400 &&
          response.i18nMessageKey === "REG-USER-1006"
        ) {
          $("#o-form-container__error-msg-custom_API").show();
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
        hideLoadingPedialyte();
      }
    })
    .fail(function (jqXHR, textStatus, error) {
      showUnsubscribeError();
      hideLoadingPedialyte();
    });
}

/**
 * @method
 * @desc call validation for every user action
 */
$("#pedialyte_registration_form .form-group input").keyup(function () {
  registrationValidation();
});
$("#pedialyte_registration_form #forms_referenceEmail").keyup(function () {
  $(this)
    .parents(".form-group")
    .removeClass("validation-error");
});
$("#pedialyte_registration_form .checkbox input").change(function () {
  registrationValidation();
});
$("#pedialyte_unsubscribe_form .form-group input").keyup(function () {
  unsubscribeValidation();
});

/**
 * @method
 * @desc validate fields and enable submit button for registration
 */
function registrationValidation() {
  let state_array = [];
  $("#pedialyte_registration_form .form-group input").each(function () {
    if ($(this).val() === "" && $(this).attr("required") === "required") {
      state_array.push("true");
    }
  });
  $("#pedialyte_registration_form .checkbox input").each(function (el) {
    if (!this.checked && $(this).attr("data-required") === "true") {
      state_array.push("true");
    }
  });

  setTimeout(function () {
    $("#pedialyte_registration_form .drop-down.required").each(function (el) {
      if ($(this).find(".a-dropdown__placeholder").length > 0) {
        state_array.push("true");
      }
    });
  }, 50);
  setTimeout(function () {
    if (
      state_array.length === 0 &&
      $(".validation-require").length === 0 &&
      $(".validation-regex").length === 0 &&
      $(".validation-error").length === 0
    ) {
      $("#registration_form_submit_button").removeClass("disabled");
    } else {
      $("#registration_form_submit_button").addClass("disabled");
    }
  }, 300);
}


$(document).on('click', '.drop-down.required .a-dropdown__option-text', function () {
  $(this)
    .parents(".a-dropdown")
    .removeClass("validation-require");
  registrationValidation();
});

$(document).on('click', '.drop-down.required .a-dropdown .a-dropdown__field', function () {
  if ($(this).find(".a-dropdown__placeholder").length > 0) {
    $(this)
      .parents(".a-dropdown")
      .addClass("validation-require");
    registrationValidation();
  } else {
    $(this)
      .parents(".a-dropdown")
      .removeClass("validation-require");
    registrationValidation();
  }
});
/**
 * @method
 * @desc validate fields and enable submit button for unsubscribe
 */
function unsubscribeValidation() {
  let state_array_un = [];
  $("#pedialyte_unsubscribe_form .form-group input").each(function () {
    if ($(this).val() === "") {
      state_array_un.push("true");
    }
  });
  setTimeout(function () {
    if (
      state_array_un.length === 0 &&
      $(".validation-require").length === 0 &&
      $(".validation-regex").length === 0 &&
      $(".validation-error").length === 0
    ) {
      $("#unsubscribe_button").removeClass("disabled");
    } else {
      $("#unsubscribe_button").addClass("disabled");
    }
  }, 300);
}

/**
 * @method
 * @desc show email mismatch error
 */

$("#referenceConfirmEmailAddresss").keyup(function () {
  emailMatch();
});
$("#referenceEmailAddress").keyup(function () {
  emailMatch();
});
$("#referenceConfirmEmailAddresss").blur(function () {
  let email = $("#referenceEmailAddress").val();
  let cEmail = $("#referenceConfirmEmailAddresss").val();
  if (cEmail !== "" && email === "") {
    $(".referenceConfirmEmailAddresss .a-input-field--text-error").hide();
  }
});
function emailMatch() {
  setTimeout(function () {
    let cEmailValidateReq = $("#referenceConfirmEmailAddresss")
      .parents(".form-group")
      .hasClass("validation-require");
    let cEmailValidateReg = $("#referenceConfirmEmailAddresss")
      .parents(".form-group")
      .hasClass("validation-regex");
    let email = $("#referenceEmailAddress").val();
    let cEmail = $("#referenceConfirmEmailAddresss").val();
    if (email !== cEmail && cEmail !== "" && !cEmailValidateReq && !cEmailValidateReg) {
      $(".referenceConfirmEmailAddresss .a-input-field--text-error").show();
      $(".referenceConfirmEmailAddresss").addClass("validation-error");
    } else {
      $(".referenceConfirmEmailAddresss .a-input-field--text-error").hide();
      $(".referenceConfirmEmailAddresss").removeClass("validation-error");
    }
  }, 50);
}

if ($(window).width() > 767) {
  $("#nfilink").click(function () {
    $('html, body').animate({
      scrollTop: $("#section-pedialyte_registration_notice").offset().top - 100
    }, 2000);
  });
}
if ($(window).width() < 767) {
  $("#nfilink").click(function () {
    $('html, body').animate({
      scrollTop: $("#section-pedialyte_registration_notice").offset().top - 50
    }, 2000);
  });
}
$(document).ready(function () {
  $(".o-header__mob-options .a-link a").prop("id", "");
});