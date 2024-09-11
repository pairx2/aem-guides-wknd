/**********************************
Form Container
**********************************/
/*****Nutrion Copy Start******/

let appJson = "application/json";
let language = jQuery("input[name=x-preferred-language]").val();
let application = jQuery("input[name=x-application-id]").val();
let apiURL = $("#apiURL").val();
let thankURL = jQuery("#thankyouURL").val();
let gSiteKey = $("[data-site-key]").attr("data-site-key");
let country = jQuery("input[name=x-country-code]").val();
const isEnterpriseRecaptchaEnabled = jQuery("input[name=enterpriseRecaptcha]").length ? jQuery("input[name=enterpriseRecaptcha]").val() : false;

$(document).ready(function() {
  $("#submit-btn").addClass("disabled");
  $("#varpersonalemail")
    .parents(".form-group")
    .addClass("varpersonalemail");
  $("#personalemail")
    .parents(".a-input-field")
    .addClass("userEmail");
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
 * @desc show page load spinner
 */
function showLoading() {
  $("#page-spinner").show();
}

/**
 * @method
 * @desc hide page load spinner
 */
function hideLoading() {
  $("#page-spinner").hide();
}

/**
 * @method
 * @desc Subscription form submit call the subscription function
 * @event click
 */

$("#submit-btn").click(function(e) {
  showLoading();
  e.preventDefault();
  e.stopPropagation();
  $("#submit-btn").addClass("disabled");
  $("#o-form-container__error-msg-custom_API").hide();
  $("#o-form-container__error-msg-custom").hide();
  if (
    $(".validation-require").length === 0 &&
    $(".validation-regex").length === 0 &&
    $(".validation-error").length === 0
  ) {
    let firstnameVal = $("#first-name").val();
    let lastnameVal = $("#last-name").val();
    let perEmailVal = $("#personalemail").val();
    let refEmailVal = $("#varpersonalemail").val();
    let studyNo = $("#study-number").val();
    let cSiteVal = $("#clinical-site").val();
    let countryVal = $("#country").val();
    let phNoVal = $("#phonenumber").val();
    let subjectVal = $("#dropdown_label_subject")
      .text()
      .trim();
    let formSuppliesVal = $("#case-report-form-supplies").val();
    let reqTypeVal = $("#reqTypeVal").val();
    let qVal = $("#questions").val();
    let formData = {
      firstName: firstnameVal,
      lastName: lastnameVal,
      emailAddress: perEmailVal,
      verifyEmailAddress: refEmailVal,
      studyNumberName: studyNo,
      clinicalSite: cSiteVal,
      country: countryVal,
      phone: phNoVal,
      subject: subjectVal,
      aesaeSuppliesDescription: "",
      caseReportFormSuppliesDescription: formSuppliesVal,
      comments: qVal,
      requestType: reqTypeVal
    };

    if (typeof grecaptcha != "undefined") {
      if(isEnterpriseRecaptchaEnabled) {
        grecaptcha.enterprise.ready(function() {
          grecaptcha.enterprise
          .execute(gSiteKey, {
            action: "submit"
          })
          .then(function(captcha) {
            formData["g-recaptcha-response"] = captcha;
            formData["captchaType"]="ENT";
            formData["captchaAction"]="submit";
            userContact(formData);
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
            formData["g-recaptcha-response"] = captcha;
            formData["captchaType"]="NON_ENT";
            formData["captchaAction"]="submit";
            userContact(formData);
          })
          .catch(function(error) {});
        });        
      }
    }
  } else {
    hideLoading();
  }
});
let caseReportSupplies = jQuery("#case-report-form-supplies").attr("id");
$("#subject-options .a-dropdown__menu li").click(function() {
  if (
    $(this)
      .find("span")
      .text()
      .trim().toLowerCase().replace(/ /g,'-') === caseReportSupplies
  ) {
    $("#case-report-form-supplies").show();
    $("#case-report-form-supplies").attr("required","true");
    $("#case-report-form-supplies").addClass("requiredField");
}   else {
    $(
      "#case-report-form-supplies"
    ).hide();
    $("#case-report-form-supplies").removeClass("requiredField");
    $("#case-report-form-supplies").removeAttr("required");
  }
});

/**
 * @method
 * @desc function for user subscription api call
 * @param {JSON} JSONFormData
 */
function userContact(data) {
  const formJsonData = JSON.stringify(data);
  const commonAjaxProps = ajaxCommonProperty(formJsonData, apiURL);
  jQuery
    .ajax({
      ...commonAjaxProps,
      success: function(results) {
        hideLoading();
        const { errorCode, status, response } = results;
        if (status && errorCode === 0) {
          window.location = thankURL;
        } else if (
          status &&
          errorCode === 400 &&
          response.i18nMessageKey !== "REG-USER-1030"
        ) {
          showUserContactError();
        } else if (!status && errorCode === 500) {
          showUserContactError();
        }
      },
      fail: function(jqXHR, textStatus, error) {
        showUserContactError();
        hideLoading();
      }
    })
    .fail(function(jqXHR, textStatus, error) {
      showUserContactError();
      hideLoading();
    });
}

function showUserContactError() {
  $("#o-form-container__error-msg-custom").show();
  $("#submit-btn").addClass("disabled");
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
 * @desc call validation for every user action
 */

$("#cdm-form #personalemail").keyup(function() {
  $(this)
    .parents(".form-group")
    .removeClass("validation-error");
});

/**
 * @method
 * @desc validate fields and enable submit button for registration
 */
function contactValidation() {
  let state_array = [];
  $("#cdm-form .form-group input.requiredField:visible").each(function() {
    if ($(this).val() === "") {
      state_array.push("true");
    }
  });
  setTimeout(function() {
    $("#cdm-form .a-dropdown").each(function(el) {
      if ($(this).attr("data-required") === "true" && $(this).find(".a-dropdown__placeholder").length > 0) {
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
      $("#submit-btn").removeClass("disabled");
    } else {
      $("#submit-btn").addClass("disabled");
    }
  }, 300);
}
$("#cdm-form form input").each(function() {
  if ($(this).prop("required")) {
    $(this)
      .parents(".form-group")
      .addClass("requiredFG");
    $(this).addClass("requiredField");
  }
});

$(".a-dropdown__option-text").click(function() {
  $(this)
    .parents(".a-dropdown")
    .removeClass("validation-require");
  contactValidation();
});

$(".a-dropdown__field").click(function() {
  if ($(this).find(".a-dropdown__placeholder").length > 0) {
    $(this)
      .parents(".a-dropdown")
      .addClass("validation-require");
    contactValidation();
  } else {
    $(this)
      .parents(".a-dropdown")
      .removeClass("validation-require");
      $("#case-report-form-supplies").parents(".form-group").removeClass("validation-require");
      $("#case-report-form-other").parents(".form-group").removeClass("validation-require");
    contactValidation();
  }
});

$("#subject-options .a-dropdown__menu li").click(function(){
  $("#case-report-form-supplies").val("");
  $("#case-report-form-other").val("");
  $("#submit-btn").addClass("disabled");
});

$(document).on('keyup','#cdm-form .form-group input.requiredField',function() {
  contactValidation();
});

/**
 * @method
 * @desc show email mismatch error
 */

$("#varpersonalemail").keyup(function() {
  emailMatch();
});
$("#personalemail").keyup(function() {
  if ($("#varpersonalemail").val() !== "") {
    emailMatch();
  }
});
$("#varpersonalemail").blur(function() {
  emailMatch();
});
function emailMatch() {
  setTimeout(function() {
    let cEmailValidateReq = $("#varpersonalemail")
      .parents(".form-group")
      .hasClass("validation-require");
    let cEmailValidateReg = $("#varpersonalemail")
      .parents(".form-group")
      .hasClass("validation-regex");
    let email = $("#personalemail").val();
    let cEmail = $("#varpersonalemail").val();
    if (email !== cEmail && !cEmailValidateReq && !cEmailValidateReg) {
      $(".varpersonalemail .a-input-field--text-error").show();
      $(".varpersonalemail").addClass("validation-error");
    } else {
      $(".varpersonalemail .a-input-field--text-error").hide();
      $(".varpersonalemail").removeClass("validation-error");
    }
  }, 50);
}
