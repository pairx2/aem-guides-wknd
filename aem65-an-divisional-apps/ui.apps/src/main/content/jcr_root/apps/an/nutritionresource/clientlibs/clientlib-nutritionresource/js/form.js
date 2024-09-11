let speciality_cdr = jQuery("#specialityCDR").val();
let autoService,
  placeService = null;
let value =
  document.getElementById("streetAddress") &&
  document.getElementById("streetAddress").value;
let vJzipCode = document.getElementById("zipCode");
let jQzipCode = jQuery("#zipCode");
let cityId = jQuery("#city");
let input = document.getElementById("streetAddress");
let appJson = "application/json";
let country = jQuery("input[name=x-country-code]").val();
let language = jQuery("input[name=x-preferred-language]").val();
let application = jQuery("input[name=x-application-id]").val();
let npiValidation = jQuery("#npiValidationURL").val();
let apiURL = jQuery("#apiURL").val();
let thankURL = jQuery("#thankyou_url").val();
let reloadConfig = jQuery("#reload-config-id").val();
let cdrTemp = jQuery("#cdrTemp").val();
let npiTemp = jQuery("#npiTemp").val();
let specialtyAPI = jQuery("#specialtyAPI").val();
let gSiteKey = $("[data-site-key]").attr("data-site-key");
let npi_temp, cdr_temp, specialtyResponse;
let userSpecialty;
const isEnterpriseRecaptchaEnabled = jQuery("input[name=enterpriseRecaptcha]").length ? jQuery("input[name=enterpriseRecaptcha]").val() : false;

jQuery(document).ready(function() {
  $("#npiNum")
    .parents(".fields")
    .addClass("npi_field");
  $("#cdrNum")
    .parents(".fields")
    .addClass("cdr_field");
  $("#registrationLastName")
    .parents(".fields")
    .addClass("lastname_field");
  $("#continue-step2")
    .parents(".o-wizard__btn")
    .addClass("hidden_wizard_btn");
  npi_temp = $(".npi_field");
  cdr_temp = $(".cdr_field");
  document
    .getElementById("streetAddress")
    .addEventListener("keyup", callGetPredictions);
  document
    .getElementById("streetAddress")
    .addEventListener("blur", addrFocusOut);
  $("#continue-step2a").attr("disabled", "disabled");
  getSpecialty(specialtyAPI);
});

/** Add class to checkbox consents */
$("#consentCheck-options .a-checkbox__input").each(function(i) {
  $(this).addClass("consentCheck-options-" + i);
});

/** Add class to radio button consents */
$("#consentRadio-options .a-radio__input").each(function(i) {
  $(this).addClass("consentRadio-options-" + i);
});

/**
 * @method
 * @desc enable submit based on consents
 * @event click
 */
$("#consentCheck-options .a-checkbox__input").click(function(e) {
  if ($(this).is(":checked")) {
    $(".a-checkbox__input").attr("data-required", "false");
    $(this).attr("data-required", "true");
  } else {
    $(".a-checkbox__input").attr("data-required", "true");
    $(this).attr("data-required", "false");
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
 * @desc Toggle NPI/CDR based on speciality selection
 * @event click
 */
$("#specialtyField-options .a-dropdown__menu li").click(function() {
  if (
    $(this)
      .find("span")
      .text()
      .trim() === speciality_cdr
  ) {
    $(".npi_field").hide();
    $("#cdrNum").val("");
    $("#npiNum").val(npiTemp);
    $(".cdr_field").show();
  } else {
    $(".cdr_field").hide();
    $("#npiNum").val("");
    $("#cdrNum").val(cdrTemp);
    $(".npi_field").show();
  }
});

/**
 * @method
 * @desc call geocode when address length less than five characters
 */
function addrFocusOut() {
  if (input.value.length < 5) {
    doGeocode();
  }
}

/**
 * @method
 * @desc call address prediction based on length of the user input
 */
function callGetPredictions() {
  const len = input.value.length;
  if (len > 4 || len + 1 > 4) {
    getPredictions();
  }
  if (len < 5) {
    jQuery("div.pac-container").remove();
  }
}

/**
 * @method
 * @desc fetch address sugesstions
 */
function getPredictions() {
  let options = {
    componentRestrictions: { country: "us" },
    types: ["geocode"]
  };
  let autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.addListener("place_changed", () => {
    let place = autocomplete.getPlace();
    placeChangedEvent(place);
  });
}

/**
 * @method
 * @desc address field populte function call
 * @param {string} place user selected address
 * @return {string} true
 */
function placeChangedEvent(place) {
  fillInAddress(place);
  if (!place.geometry || !place.geometry.location) {
    return;
  }
}

/**
 * @method
 * @desc populate input fields from address sugesstions
 * @param {string} place parameter
 */
function fillInAddress(place) {
  if (place) {
    const { address_components = [] } = place;
    const commonTypesMap = {
      postal_code: { api: "zipCode", nameType: "long_name" },
      country: { api: "country", nameType: "short_name" },
      administrative_area_level_1: { api: "state", nameType: "short_name" },
      administrative_area_level_2: { api: "state", nameType: "short_name" },
      locality: { api: "city", nameType: "long_name" },
      sublocality: { api: "city", nameType: "long_name" },
      neighborhood: { api: "neighborhood", nameType: "long_name" },
      route: { api: "route", nameType: "long_name" },
      street_number: { api: "street_number", nameType: "long_name" }
    };

    const tempData = {};

    address_components.forEach(({ types = [], ...names }) => {
      types.forEach(typeName => {
        if (commonTypesMap.hasOwnProperty(typeName)) {
          const commonMap = commonTypesMap[typeName];
          const apiKey = commonMap["api"];
          const _value = names[commonMap["nameType"]];
          tempData[apiKey] = _value;
        }
      });
    });

    const lineOne = [tempData["street_number"], tempData["route"]]
      .filter(item => item)
      .join(" ");

    document.getElementById("streetAddress").value = lineOne ? lineOne : "";
    jQzipCode.val(tempData["zipCode"] ? tempData["zipCode"] : "");
    cityId.val(tempData["city"] ? tempData["city"] : "");
    let stateReturn = tempData["state"] ? tempData["state"] : "";
    addrStateBinding(stateReturn);
    let el = document.getElementById("suite");
    el.value = "";
    el.dispatchEvent(new Event("change"));
  }
}

/** Initiate google instance */
function getGoogleMapInstance() {
  return new Promise((resolve, reject) => {
    const { google } = window;
    if (google) {
      return resolve(google);
    } else {
      return reject("Error");
    }
  });
}

/**
 * @method
 * @desc get geocode and define google instance
 * @param {string} prefill name parameter
 */
function doGeocode(prefillAddress = "") {
  let addr = prefillAddress;
  if (prefillAddress.length < 1) {
    addr = document.getElementById("streetAddress").value;
  }
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode(
    {
      address: addr
    },
    function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        getGoogleMapInstance().then(() => {
          let tempDiv = document.createElement("div");
          tempDiv.className = "google-map-div";
          tempDiv.style.display = "none";
          document.body.appendChild(tempDiv);
          placeService = new window.google.maps.places.PlacesService(tempDiv);
        });
      }
    }
  );
}

/**
 * @method
 * @desc show page load spinner
 */
function showLoadingNutrition() {
  $("#page-spinner-nutrition").show();
}

/**
 * @method
 * @desc hide page load spinner
 */
function hideLoadingNutrition() {
  $("#page-spinner-nutrition").hide();
}

/**
 * @method
 * @desc Show the error when API failed
 */
function showApiError(id) {
  if (typeof id == "undefined" || id == "") {
    id = "500";
  }
  let error = $("#" + id);
  if (error.length) {
    $("[id^=apiError] .cmp-text").hide();
    $(".o-form-container__error-msg-custom").hide();
    error.show();
    $("[id^=apiError]").show();
  } else {
    $(".o-form-container__error-msg-custom").show();
  }
}

/**
 * @method
 * @desc Hide API error
 */
function hideApiError() {
  $("[id^=apiError] .cmp-text").hide();
  $("[id^=apiError]").hide();
  $(".o-form-container__error-msg-custom").hide();
}

/**
 * @method
 * @desc Subscription form submit call the subscription function
 * @event click
 */

function checkSpecialty(){
  specialtyResponse &&
  specialtyResponse.map(el => {
    if (
      el.key ===
      $("#specialtyField-options .a-dropdown-selected")
        .text()
        .trim()
    ) {
      userSpecialty = el.value;
    }
  });
}

function assignCdrOrNpi(formData){
  if (
    $("#dropdown_label_specialtyField")
      .text()
      .trim() === speciality_cdr
  ) {
    formData["userInfo"]["cdrNumber"] = $("#cdrNum").val();
  } else {
    formData["userInfo"]["npiNumber"] = $("#npiNum").val();
  }
}

$("#submit").click(function(e) {
  showLoadingNutrition();
  e.preventDefault();
  e.stopPropagation();
  $(this).attr("disabled", "disabled");
  
  let userEmail = jQuery("#registrationEmail").val();
  let userFirstName = jQuery("#registrationFirstName").val();
  let userLastName = jQuery("#registrationLastName").val();

  checkSpecialty();
  
  let patientCountPerMonth = jQuery("#patientCount").val();
  let practiceName = jQuery("#practiceName").val();
  let careSetting =jQuery("ul[name=careSetting] .selected").attr("data-optionvalue");
  let zipCode = jQuery("#zipCode").val();
  let lineTwo = jQuery("#suite").val();
  let city = jQuery("#city").val();
  let street = jQuery("#streetAddress").val();
  let state = jQuery("#state-options .a-dropdown-selected")
    .text()
    .trim();
  let consentValueEnsure = getValue(
    jQuery(".consentCheck-options-0:checked").val()
  );
  let consentNameEnsure = jQuery("#ensure").val();
  let consentValueGlucerna = getValue(
    jQuery(".consentCheck-options-2:checked").val()
  );
  let consentNameGlucerna = jQuery("#glucerna").val();
  let consentValueProtality = getValue(
    jQuery(".consentCheck-options-1:checked").val()
  );
  let consentNameProtality = jQuery("#protality").val();
  
  let consentValueGeneral = "true";
  let consentNameGeneral = jQuery("#generalConsents").val();

  let consentValueMailNo = getValue(
    jQuery(".consentRadio-options-1:checked").val()
  );
  let consentValueMail = consentValueMailNo == "true" ? "false" : "true"; 
  let consentNameMail = jQuery("#mailConsent").val();
  let userSpecialtyVal = userSpecialty? userSpecialty : ""
  let consentTime =
    new Date().toLocaleDateString("sv") +
    " " +
    new Date().toLocaleTimeString("sv");
  let formData = {
    userInfo: {
      email: userEmail,
      firstName: userFirstName,
      lastName: userLastName,
      specialty: userSpecialtyVal,
      patientCountPerMonth: patientCountPerMonth,
      practiceName: practiceName,
      careSetting: careSetting
    },
    addresses: [
      {
        zipCode: zipCode,
        country: country,
        lineTwo: lineTwo,
        city: city,
        street: street,
        state: state
      }
    ],
    consents: [
      {
        consentValue: consentValueEnsure,
        consentName: consentNameEnsure,
        consentUpdatedTime: consentTime,
        consentCreatedTime: consentTime
      },
      {
        consentValue: consentValueGlucerna,
        consentName: consentNameGlucerna,
        consentUpdatedTime: consentTime,
        consentCreatedTime: consentTime
      },
      {
        consentValue: consentValueProtality,
        consentName: consentNameProtality,
        consentUpdatedTime: consentTime,
        consentCreatedTime: consentTime
      },
      {
        consentValue: consentValueGeneral,
        consentName: consentNameGeneral,
        consentUpdatedTime: consentTime,
        consentCreatedTime: consentTime
      },
      {
        consentValue: consentValueMail,
        consentName: consentNameMail,
        consentUpdatedTime: consentTime,
        consentCreatedTime: consentTime
      }
    ]
  };

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
            assignCdrOrNpi(formData);
            
            userSubscription(formData, e);
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
            if (
              $("#dropdown_label_specialtyField")
                .text()
                .trim() === speciality_cdr
            ) {
              formData["userInfo"]["cdrNumber"] = $("#cdrNum").val();
            } else {
              formData["userInfo"]["npiNumber"] = $("#npiNum").val();
            }
            userSubscription(formData, e);
          })
          .catch(function(error) {});
      });
    }
  }
});

/**
 * @method
 * @desc function for user subscription api call
 * @param {JSON} JSONFormData
 */

function userSubscription(data, evt) {
  const formJsonData = JSON.stringify(data);
  const commonAjaxProps = ajaxCommonProperty(formJsonData, apiURL);
  jQuery
    .ajax({
      ...commonAjaxProps,
      success: function(results) {
        hideLoadingNutrition();
        $("#submit").removeAttr("disabled");
        const { errorCode, status, response } = results;
        if (status && errorCode === 0) {
          window.location = thankURL;
        } else {
          showStep3();
          $("#submit").attr("disabled", "disabled");
          if(errorCode === 400 && response.i18nMessageKey === "SFDC-LTNG-004") {
            $(".o-form-container__error-msg-npi").show();
          } else {
            $("#registerContainer .o-form-container__error-msg-custom").show();
          }
        }
      },
      fail: function(jqXHR, textStatus, error) {       
        showStep3();
        $("#submit").attr("disabled", "disabled");
        $("#registerContainer .o-form-container__error-msg-custom").show();
        hideLoadingNutrition();

      }
    })
    .fail(function(jqXHR, textStatus, error) {
      showStep3();
      $("#submit").attr("disabled", "disabled");
      $("#registerContainer .o-form-container__error-msg-custom").show();
      hideLoadingNutrition();
    });
}

function showStep3() {
  setTimeout(function() {
    document.querySelector('[data-wizarditem="2"]').style.opacity = 1;
    document.querySelector('[data-wizarditem="2"]').style.display = "block";
    document.querySelector('[data-wizarditem="2"]').style.position = "relative";
  }, 300);
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
 * @desc ajax common property function specialty
 * @param {string} and API URL
 * @return {JSON} API syntax
 */

function ajaxCommonPropertySpecialty(specialtyURL) {
  return {
    url: specialtyURL,
    method: "GET",
    headers: {
      "x-country-code": country,
      "x-application-id": application,
      "x-preferred-language": language
    },
    async: false,
    beforeSend: function() {}
  };
}

/**
 * @method
 * @desc function for user subscription api call
 * @param {JSON} JSONFormData
 */

function getSpecialty(urlSpecialty) {
  const commonAjaxProps = ajaxCommonPropertySpecialty(urlSpecialty);
  jQuery
    .ajax({
      ...commonAjaxProps,
      success: function(results) {
        const { errorCode, status, response } = results;
        if (status && errorCode === 0) {
          specialtyResponse = response;
        }
      },
      fail: function(jqXHR, textStatus, error) {}
    })
    .fail(function(jqXHR, textStatus, error) {});
}

/**
 * @method
 * @desc bind state to the dropdown field
 * @param {string} statename
 */
function addrStateBinding(stateName) {
  let stateTxt;
  jQuery("#state-options ul li").removeClass("selected");
  jQuery("#state-options ul li").each(function() {
    let optionVal = jQuery(this).data("optionvalue");
    let stTxt = jQuery.trim(jQuery(this).text());
    if (optionVal === stateName || stTxt === stateName) {
      jQuery("#state-options ul li").removeClass("selected");
      jQuery(this).addClass("selected");
      stateTxt = jQuery(this).text();
    }
  });
  jQuery("#state-options")
    .find("span.a-dropdown__placeholder")
    .addClass("a-dropdown-selected")
    .removeClass("a-dropdown__placeholder");
  jQuery("#state-options span.a-dropdown-selected").text(stateTxt);
}

/**
 * @method
 * @desc function for NPI validation call
 * @param {event}
 */

function validateNPI() {
  $("#continue-step2a").attr("disabled", "disabled");
  $("#continue-step2").attr("disabled", "disabled");
  let userLastName = jQuery("#registrationLastName").val();
  let npiNumber = jQuery("#npiNum").val();
  let formData = {
    userInfo: {
      lastName: userLastName,
      npiNumber: npiNumber
    }
  };
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
            let updatedFormData = JSON.stringify(formData);
            npiValidationCall(updatedFormData);
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
            let updatedFormData = JSON.stringify(formData);
            npiValidationCall(updatedFormData);
          })
          .catch(function(error) {});
      });
    }
  }
}

/**
 * @method
 * @desc function for NPI validation
 * @param {JSON, event} JSON and event
 */
async function npiValidationCall(updatedFormData) {
  const commonAjaxProps = ajaxCommonProperty(updatedFormData, npiValidation);
  await jQuery
    .ajax({
      ...commonAjaxProps,
      success: function(results) {
        const { errorCode, status, response } = results;
        let interError = response.i18nMessageKey;
        if (status && errorCode === 400 && interError === "LOOKUP-USER-1001") {
          $("#npiNum")
            .parents(".a-form-grp")
            .addClass("validation-error");
          $(".npi_field .a-input-field--text-error")
            .show()
            .addClass("d-flex");
          $(".npi_field .a-input-field--text-require").removeAttr("style");
          $(".npi_field .a-input-field--text-regex").removeAttr("style");
          $("#continue-step2a").attr("disabled", "disabled");
          $("#continue-step2").attr("disabled", "disabled");
        } else if (
          errorCode === 400 &&
          (interError === "400" || interError === "AUTH-1005")
        ) {
          disableStep2();
        } else if (status && errorCode === 0) {
          $("#continue-step2a").removeAttr("disabled");
          $("#continue-step2").removeAttr("disabled");
          $(".o-wizard__btn #continue-step2")[0].click();
        }
        hideLoadingNutrition();
      },
      fail: function(jqXHR, textStatus, error) {
        disableStep2();
        hideLoadingNutrition();
      }
    })
    .fail(function(jqXHR, textStatus, error) { 
      disableStep2();
      hideLoadingNutrition();
    });
}

/** Function to disable step2 on error from step1 */
function disableStep2() {
  $("#contactInformation .o-form-container__error-msg-custom").show();
  $("#continue-step2a").attr("disabled", "disabled");
  $("#continue-step2").attr("disabled", "disabled");
}

/**
 * @method
 * @desc call the NPI validation function
 * @param {event}
 */

$("#continue-step2a").click(function(e) {
  if (
    $("#specialtyField-options .a-dropdown-selected")
      .text()
      .trim() !== speciality_cdr  
  ) {
    showLoadingNutrition();
    validateNPI();
  } else {
    $(".o-wizard__btn #continue-step2")[0].click();
  }
});

/**
 * @method
 * @desc update continue button based on component button keyup
 */

$("#contactInformation input").keyup(function() {
  setTimeout(function() {
    let state = $("#continue-step2").attr("disabled");
    if (state) {
      $("#continue-step2a").attr("disabled", state);
    } else {
      $("#continue-step2a").removeAttr("disabled");
    }
  }, 200);
});

$("#npiNum").keyup(function() {
  $("#npiNum")
    .parents(".a-form-grp")
    .removeClass("validation-error");
  $(".npi_field .a-input-field--text-error")
    .hide()
    .removeClass("d-flex");
});

$("#registrationLastName").keyup(function() {
  $("#npiNum")
    .parents(".a-form-grp")
    .removeClass("validation-error");
  $(".npi_field .a-input-field--text-error")
    .hide()
    .removeClass("d-flex");
});

