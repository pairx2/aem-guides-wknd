/**********************************
Form Container
**********************************/

let appJson = "application/json";
let language = jQuery("input[name=x-preferred-language]").val();
let application = jQuery("input[name=x-application-id]").val();
let apiURL = $("#apiURL").val();
let unsubscribe_apiURL = $("#unsubscribeURL").val();
let thankURL = jQuery("#thankyouURL").val();
let thankUnsubscribe = jQuery("#thankURLUnsubscribe").val();
let gSiteKey = $("[data-site-key]").attr("data-site-key");
let country = jQuery("input[name=x-country-code]").val(); 
let min_age = jQuery("#min-age").val();
let age_range = jQuery("#age-range").val();
const isEnterpriseRecaptchaEnabled = jQuery("input[name=enterpriseRecaptcha]").length ? jQuery("input[name=enterpriseRecaptcha]").val() : false;
const isEnableKount = jQuery("#juven_registration_form").attr("data-kount");
let kountConfig, sessionID, formData;

function uuid() {
  let r = crypto.randomUUID().replace(/-/g, '');
  return r.toString();
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
  $("#sign_up_navigation").parents("li").addClass("sign-up-li");
  $("#where_to_buy_navigation").parents("li").addClass("where-buy-li"); 
  if($("#juven_registration_form").length > 0){
  updateJuvenDropdown();
  }
  
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
 * @desc update to years
 */
function updateJuvenDropdown() {
  let ul_list;
  if (
    document
      .getElementById("field_label_yearofbirth-options")
      .getElementsByClassName("a-dropdown__menu")[0]
  ) {
    ul_list = document
      .getElementById("field_label_yearofbirth-options")
      .getElementsByClassName("a-dropdown__menu")[0];
    ul_list.innerHTML = "";
    const latest = new Date().getFullYear() - min_age;
    const start = latest - age_range;
    for (let year = latest, inc = 1; year >= start; year--, inc++) {
      let list = document.createElement("li");
      let sp = document.createElement("span");
      const txtYear = document.createTextNode(year);
      sp.appendChild(txtYear);
      sp.classList.add("a-dropdown__option-text");
      list.setAttribute("data-optionvalue", year);
      list.setAttribute("id", "field_label_field_label_yearofbirth_" + inc);
      list.appendChild(sp);
      ul_list.appendChild(list);
    }
  }
}

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

$(".a-input-field--text-require").each(function() {
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
 * @desc return month in number
 */
function getNumericMonth(monthAbbr) {
  return String(
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ].indexOf(monthAbbr) + 1
  );
}

/**
 * @method
 * @desc show page load spinner
 */
function showLoadingJuven() {
  $("#page-spinner-juven").show();
}

/**
 * @method
 * @desc hide page load spinner
 */
function hideLoadingJuven() {
  $("#page-spinner-juven").hide();
}

function setAdditionalProperties(queryString,formData) {
  const parameters = {};  
  for (let key of queryString.keys()) {
    parameters[key] = queryString.get(key);
    if ((key === "utm_campaign")) {
      let campaignProfile = queryString.get(key);
      formData["additionalProfileProperties"]["campaign"]=campaignProfile;
    }
    if ((key === "utm_source")) {
      let sourceProfile = queryString.get(key);
      formData["additionalProfileProperties"]["source"]=sourceProfile;
    }
    if ((key === "utm_medium")) {
      let mediumProfile = queryString.get(key);
      formData["additionalProfileProperties"]["medium"]=mediumProfile;
    }
    if ((key === "utm_content")) {
     let contentProfile = queryString.get(key);
     formData["additionalProfileProperties"]["content"]=contentProfile;
    }
    if ((key === "utm_term")) {
     let termProfile = queryString.get(key);
     formData["additionalProfileProperties"]["term"]=termProfile;
    }
  }
}

/**
 * @method
 * @desc Subscription form submit call the subscription function
 * @event click
 */

$("#registration_form_submit_button").click(function(e) {
  showLoadingJuven();
  e.preventDefault();
  e.stopPropagation();
  $("#registration_form_submit_button").addClass("disabled");
  $("#o-form-container__error-msg-custom_API").hide();
  $("#o-form-container__error-msg-custom").hide();
  if (
    $(".validation-require").length === 0 &&
    $(".validation-regex").length === 0 &&
    $(".validation-error").length === 0
  ) {
    let email = $("#forms_referenceEmail").val();
    let firstname = $("#forms_firstname").val();
    let lastname = $("#forms_lastname").val();
    let mob = getNumericMonth(
      $("#dropdown_label_dropdown_label_monthofbirth")
        .text()
        .trim()
    );
    let yob = $("#dropdown_label_field_label_yearofbirth")
      .text()
      .trim();
    let answer = $("#dropdown_label_dropdown_label_condition")
      .text()
      .trim();
    let answer_id = $("#dropdown_label_condition-options .selected").attr(
      "data-optionvalue"
    );
    let submit_time = new Date().toISOString();
    let device = isDevice() ? "MOBILE" : "DESKTOP";
    let consent1 = $("#juvenConsentOne").val();
    let consent2 = $("#juvenConsentTwo").val();
    const accountId = window.btoa(email); //encrypt the email for accountId
    formData = {
      userInfo: {
        email: email,
        firstName: firstname,
        lastName: lastname,
        birthMonth: mob,
        birthYear: yob
      },

      surveyQuestions: [
        {
          answerId: answer_id,
          answer: answer
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
        },
        {
          consentName: consent2,
          consentValue: "true",
          consentUpdatedTime: submit_time
        }
      ]
    };


    const queryString = new URLSearchParams(window.location.search);
    if(queryString.size>0){formData["additionalProfileProperties"]={}}
    setAdditionalProperties(queryString,formData);

    formData["riskSessionValue"] = sessionID;
    formData["riskCheck"] = isEnableKount;

    if (typeof grecaptcha != "undefined") {
      if(isEnterpriseRecaptchaEnabled) {
        grecaptcha.enterprise.ready(function() {
          grecaptcha.enterprise
            .execute(gSiteKey, {
              action: "submit"
            })
            .then(function(captcha) {
              formData["captchaValue"] = captcha;
              formData["captchaType"]="ENT";
              formData["captchaAction"]="submit";
              formData["captchaAccountId"]= accountId;
              userSubscription(formData);
            })
            .catch(function(error) {});
        });
      } else {
        grecaptcha.ready(function() {
          grecaptcha
            .execute(gSiteKey, {
              action: "submit"
            })
            .then(function(captcha) {
              formData["captchaValue"] = captcha;
              formData["captchaType"]="NON_ENT";
              formData["captchaAction"]="submit";
              formData["captchaAccountId"]= accountId;
              userSubscription(formData);
            })
            .catch(function(error) {});
        });
      }
    }
  } else {
    hideLoadingJuven();
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
      success: function(results) {
        hideLoadingJuven();
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
          (status &&
          errorCode === 400 &&
          response.i18nMessageKey !== "REG-USER-1030") ||          
          (status && 
          response.i18nMessageKey.includes("RISK"))
        ) {
          showUsersubscribeError();
        } else if (!status && errorCode === 500) {
          showUsersubscribeError();
        }
      },
      fail: function(jqXHR, textStatus, error) {
        showUsersubscribeError();
        hideLoadingJuven();
      }
    })
    .fail(function(jqXHR, textStatus, error) {
      showUsersubscribeError();
      hideLoadingJuven();
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
    beforeSend: function() {}
  };
}

/**
 * @method
 * @desc Unsubscription form submit call the Unsubscription function
 * @event click
 */
$("#unsubscribe_button").click(function(e) {
  showLoadingJuven();
  e.preventDefault();
  e.stopPropagation();
  $("#unsubscribe_button").addClass("disabled");
  $("#o-form-container__error-msg-custom_API").hide();
  $("#o-form-container__error-msg-custom").hide();
  $("#juven_unsubscribe_form .form-group input").each(function() {
    if ($(this).val() === "") {
      $(this)
        .parents(".form-group")
        .addClass("validation-require");
      hideLoadingJuven();
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
      if(isEnterpriseRecaptchaEnabled) {
        grecaptcha.enterprise.ready(function() {
          grecaptcha.enterprise
            .execute(gSiteKey, {
              action: "submit"
            })
            .then(function(captcha) {
              formDataUnsubscribe["captchaValue"] = captcha;
              formDataUnsubscribe["captchaType"]="ENT";
              formDataUnsubscribe["captchaAction"]="submit";
              userUnsubscription(formDataUnsubscribe);
            })
            .catch(function(error) {});
        });
      } else {
        grecaptcha.ready(function() {
          grecaptcha
            .execute(gSiteKey, {
              action: "submit"
            })
            .then(function(captcha) {
              formDataUnsubscribe["captchaValue"] = captcha;
              formDataUnsubscribe["captchaType"]="NON_ENT";
              formDataUnsubscribe["captchaAction"]="submit";
              userUnsubscription(formDataUnsubscribe);
            })
            .catch(function(error) {});
        });
      }
    }
  } else {
    hideLoadingJuven();
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
      success: function(results) {
        hideLoadingJuven();
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
      fail: function(jqXHR, textStatus, error) {
        showUnsubscribeError();
        hideLoadingJuven();
      }
    })
    .fail(function(jqXHR, textStatus, error) {
      showUnsubscribeError();
      hideLoadingJuven();
    });
}

/**
 * @method
 * @desc call validation for every user action
 */
$("#juven_registration_form .form-group input").keyup(function() {
  registrationValidation();
});
$("#juven_registration_form #forms_referenceEmail").keyup(function() {
  $(this)
    .parents(".form-group")
    .removeClass("validation-error");
});
$("#juven_registration_form .checkbox input").change(function() {
  registrationValidation();
});
$("#juven_unsubscribe_form .form-group input").keyup(function() {
  unsubscribeValidation();
});

/**
 * @method
 * @desc validate fields and enable submit button for registration
 */
function registrationValidation() {
  let state_array = [];
  $("#juven_registration_form .form-group input").each(function() {
    if ($(this).val() === "") {
      state_array.push("true");
    }
  });
  $("#juven_registration_form .checkbox input").each(function(el) {
    if (!this.checked) {
      state_array.push("true");
    }
  });
  setTimeout(function() {
    $("#juven_registration_form .drop-down").each(function(el) {
      if ($(this).find(".a-dropdown__placeholder").length > 0) {
        state_array.push("true");
      }
    });
  }, 50);
  setTimeout(function() {
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

$(".a-dropdown__option-text").click(function() {
  $(this)
    .parents(".a-dropdown")
    .removeClass("validation-require");
  registrationValidation();
});

$(".a-dropdown__field").click(function() {
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

$(".a-dropdown__field").keypress(function(e) {
  if((e.which == 13) && ($(".a-dropdown__field").hasClass('active'))) {
      $(this).find(".a-dropdown__placeholder").addClass('a-dropdown-selected').removeClass('a-dropdown__placeholder');
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
}
});
/**
 * @method
 * @desc validate fields and enable submit button for unsubscribe
 */
function unsubscribeValidation() {
  let state_array_un = [];
  $("#juven_unsubscribe_form .form-group input").each(function() {
    if ($(this).val() === "") {
      state_array_un.push("true");
    }
  });
  setTimeout(function() {
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

$("#referenceConfirmEmailAddresss").keyup(function() {
  emailMatch();
});
$("#referenceEmailAddress").keyup(function() {
  emailMatch();
});
$("#referenceConfirmEmailAddresss").blur(function() {
  let email = $("#referenceEmailAddress").val();
  let cEmail = $("#referenceConfirmEmailAddresss").val();
  if (cEmail !== "" && email === "") {
    $(".referenceConfirmEmailAddresss .a-input-field--text-error").hide();
  }
});
function emailMatch() {
  setTimeout(function() {
    let cEmailValidateReq = $("#referenceConfirmEmailAddresss")
      .parents(".form-group")
      .hasClass("validation-require");
    let cEmailValidateReg = $("#referenceConfirmEmailAddresss")
      .parents(".form-group")
      .hasClass("validation-regex");
    let email = $("#referenceEmailAddress").val();
    let cEmail = $("#referenceConfirmEmailAddresss").val();
    if (email !== cEmail && !cEmailValidateReq && !cEmailValidateReg) {
      $(".referenceConfirmEmailAddresss .a-input-field--text-error").show();
      $(".referenceConfirmEmailAddresss").addClass("validation-error");
    } else {
      $(".referenceConfirmEmailAddresss .a-input-field--text-error").hide();
      $(".referenceConfirmEmailAddresss").removeClass("validation-error");
    }
  }, 50);
}

/*Nutrion Copy end*/

$(function() {
  if (
    isOnPublish() &&
    $("#verifyEmail").length &&
    $("#referenceEmail").length
  ) {
    $("#verifyEmail, #referenceEmail").on("keyup change input", function() {
      let verifyEmailHTML = $(this)
        .parents(".form-container")
        .find("#verifyEmail");
      let verifyEmailVal = verifyEmailHTML.val().toLowerCase();
      let referenceEmailVal = $(this)
        .parents(".form-container")
        .find("#referenceEmail")
        .val()
        .toLowerCase();

      // Settimeout to let the platform code run first
      setTimeout(function() {
        if (
          verifyEmailVal &&
          verifyEmailVal.length &&
          referenceEmailVal &&
          referenceEmailVal.length
        ) {
          if (referenceEmailVal !== verifyEmailVal) {
            let emailField = verifyEmailHTML.parents(
              'div[data-component="input-field"]'
            );
            !(
              emailField.hasClass("validation-require") ||
              emailField.hasClass("validation-regex")
            ) &&
              verifyEmailHTML
                .parents('div[data-component="input-field"]')
                .addClass("validation-error");
          } else {
            verifyEmailHTML
              .parents('div[data-component="input-field"]')
              .removeClass("validation-error");
          }
        }
      }, 200);
    });
  }
});

$(window).on("load", function() {
  if (isOnPublish() && $("#form-var--products").length) {
    let productsForm = $("#form-var--products");
    productsForm.parents(".formcontainer").hide();
    // Hide placeholders
    $("#nutrition-data").hide();
    $("#ingredients-data").hide();
    $("#vitamin-data").hide();
    $("#mineral-data").hide();
    // making the API call
    productsForm
      .find(
        '.o-form-container__element .o-form-container__buttons .btn[type="submit"]'
      )[0]
      .click();
  }
});
