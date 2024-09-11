/**
 * My Account page - Contact Details
 **/

$(document).ready(function () {
  let myAccountPage = $(document).find("#myaccount-details");
  if (myAccountPage.length > 0 && isOnPublish()) {
    let userInfoSection = myAccountPage.find("#myfreestyle-hcpDetails");
    let mailingSection = myAccountPage.find("#myfreestyle-myUserInfo");

    // **************************
    // My Info Section
    // **************************

    if (userInfoSection.length > 0) {
      // Assign initial values to the MyInfo Section
      initializeUserInfo(userInfoSection);

      userInfoSection.on("click", "#userMyInfo-edit", function () {
        // On click of Edit link in read-only mode
        userInfoWriteMode(userInfoSection);
      });

      userInfoSection.on("click", "#userMyInfo-cancel", function () {
        // On click on Cancel Changes button in edit mode
        initializeUserInfo(userInfoSection);
      });
    }

    // **************************
    // Mailing Section
    // **************************
    if (mailingSection.length > 0) {
      // Assign initial values to the MyInfo Section
      initializeUserInfo(mailingSection);

      mailingSection.on("click", "#emailPassword-edit", function () {
        // On click of Edit link in read-only mode
        userInfoWriteMode(mailingSection);
      });

      mailingSection.on("click", "#emailPassword-cancel", function () {
        // On click on Cancel Changes button in edit mode
        initializeUserInfo(mailingSection);
      });
    }

    // **************************
    //User Consents
    // **************************
    let marketingConsectSectionEle = myAccountPage.find("#user-consents");
    let marketingConsentFormEle,
      marketingConsectSectionSave,
      marketingConsentEditLinkEle;

    if (marketingConsectSectionEle.length > 0) {
      marketingConsentFormEle = marketingConsectSectionEle.find(
        "#myfreestyle-marketingConsent-form"
      );
      marketingConsentEditLinkEle = marketingConsentFormEle.find(
        "#marketingConsent-edit"
      );
      marketingConsectSectionEle
        .find("#myfreestyle-forgetme-form")
        .parent()
        .addClass("hidden-forgetme-form");
      marketingConsectSectionSave = marketingConsentFormEle.find(
        "#marketingConsent-save"
      );

      // Function to disable the checkboxes and to provide on load values to checkboxes
      initializeUserConsentCheckList(marketingConsectSectionEle);

      // Event listener for "Edit" link
      marketingConsentEditLinkEle.length &&
        marketingConsentEditLinkEle.on("click", function () {
          consentCheckListWriteMode(marketingConsectSectionEle);
        });

      // Event listener for "CANCEL CHANGES" button
      marketingConsectSectionEle.on(
        "click",
        "#marketingConsent-cancel",
        function () {
          initializeUserConsentCheckList(marketingConsectSectionEle);
        }
      );

      marketingConsectSectionSave.on("click", function () {
      });
    }
  }
});
let myHCPaccountWelcome = $("#myaccount-welcome");
function initializeUserInfo(formSection, readMode = 1) {
  let userData = usObj && decryptData(usObj, pk, "object");
  renderUserDetails(userData, myHCPaccountWelcome);
  specialityValueRender();
  formSection.find('form ul,input:not([type="hidden"])').each(function () {
    let nameAttr = $(this).attr("name");
    let inputName =
      nameAttr && nameAttr.includes("userInfo")
        ? nameAttr.split(".")[1]
        : nameAttr;

    if (userData) {
      if (checkUserData(inputName,"title",userData)
         &&
        $(this).attr("value").toLowerCase() === userData.title.toLowerCase()
      ) {
        $(this).prop("checked", true);
      } else if (checkUserData(inputName,"territoryOfExcercise",userData,$(this))
      ) { 
        tertrySpecltyDrpdwn($(this),userData,'territoryOfExcercise')     
          
      } else if (checkUserData(inputName,"speciality",userData,$(this))
        ) {
        tertrySpecltyDrpdwn($(this),userData,'speciality')  
      } else if (userFullNameCheck(inputName,"fullName")
      ) {
        $(this).val(
          userData.title + " " + userData.firstName + " " + userData.lastName
        );
      } else if (userData[inputName] !== undefined && inputName !== "title") {
        $(this).val(userData[inputName]);
      }   
         else if (inputName === "title") {
          $(this).val($(this).prevAll(".a-radio__text").text());
        } 
        else if (inputName === 'password' && $(this).attr('readOnly') !== undefined);
        else if (inputName == "validatioType") {
          valddtionTyp(userData,$(this))
        } 
      }
    }
  );

  readMode && userInfoReadMode(formSection); // To show the form in read mode
}

function checkUserData(inputName,inputValue,userData,thisVal){
  if(thisVal){
  return (inputName === inputValue &&
        userData[inputValue] && thisVal.parents(".options").length !== 0)
  }
  else {
    return (inputName === inputValue &&
      userData[inputValue])
  }
}
function userFullNameCheck(inputName,inputValue){
  return (inputName === inputValue &&
        userData.title &&
        userData.firstName &&
        userData.lastName)
}

function valddtionTyp(userData,thisVal){
  if (userData["invitationCode"] !== "") {
    thisVal.val(userData.invitationCode);
  } else {
    thisVal.val(userData.rppsNumber) &&
    thisVal
        .closest("div.fields.text")
        .find("label")
        .text($('#lable_value').length?$('#lable_value').val():'N° RPPS');
  }
}

function userInfoReadMode(formSection) {
  let saluteEle = formSection.find("#salute-options");
  let section = saluteEle.length ? "userMyInfo" : "emailPassword";
  if (saluteEle.length) {
    saluteEle.hide();
  }
  formSection
    .find(
      '.a-input-field input:not([type="hidden"]):not([type="radio"]):not([class*="hidden-"]):not([name="email"])'
    )
    .each(function () {
      if ($(this).attr("readOnly") !== undefined) {
        $(this).parents(".a-input-field").show();
      } else {
        $(this).parents(".a-input-field").hide();
      }
    });
  formSection.find(`#${section}-required`).hide();
  formSection.find(`#${section}-edit`).show();
  formSection.find(".button.a-button").hide();
  formSection.find(".o-form-container__success-msg").text("");
  formSection.find(".a-dropdown.a-input-field").hide();
}

function userInfoWriteMode(formSection) {
  let saluteEle = formSection.find("#salute-options");
  let section = saluteEle.length ? "userMyInfo" : "emailPassword";
  if (saluteEle.length) {
    saluteEle.show();
  }
  formSection
    .find(
      '.a-input-field input:not([type="hidden"]):not([type="radio"]):not([class*="hidden-"]):not([name="email"])'
    )
    .each(function () {
      if ($(this).attr("readOnly") !== undefined) {
        $(this).parents(".a-input-field").hide();
      } else {
        $(this).parents(".a-input-field").show();
      }
    });
  formSection.find(`#${section}-required`).show();
  formSection.find(`#${section}-edit`).hide();
  formSection.find(".button.a-button").show();
  formSection.find(".a-dropdown.a-input-field").show();
}

function initializeUserConsentCheckList(
  marketingConsectSectionEle,
  readMode = 1
) {
  let userConsen = usCon && decryptData(usCon, pk, "object");

  if (userConsen && userConsen.length) {
    for (const consent of userConsen) {
      let checkEle = marketingConsectSectionEle.find(
        `input[value=${consent.consentName}]`
      );
      if (consent.consentValue) {
        checkEle.prop("checked", true);        
      } else {
        checkEle.prop("checked", false);        
      }
    }
  }
  readMode && consentCheckListReadMode(marketingConsectSectionEle);
}

/**
 * @function
 * Summary: Function to make consent form read only.
 * Parameters: Marketing consent container ID - Object
 */
function consentCheckListReadMode(marketingConsectSectionEle) {
  marketingConsectSectionEle.find("#marketingConsent-edit").show();
  marketingConsectSectionEle.find(".o-form-container__buttons button").hide();
  marketingConsectSectionEle.find("#marketingConsent-forget").hide();
  marketingConsectSectionEle
    .find("#myfreestyle-marketingConsent-form .a-checkbox input:checked")
    .prop("disabled", true)
    .parents(".a-checkbox")
    .addClass("a-checkbox--checked-disabled");
  marketingConsectSectionEle
    .find("#myfreestyle-marketingConsent-form .a-checkbox input:not(:checked)")
    .prop("disabled", true)
    .parents(".a-checkbox")
    .addClass("a-checkbox--disabled");
  marketingConsectSectionEle
    .find("#myfreestyle-marketingConsent-form .o-form-container__success-msg")
    .text("");
}

/**
 * @function
 * Summary: Function to make consent form editable.
 * Parameters: Marketing consent container ID - Object
 */
function consentCheckListWriteMode(marketingConsectSectionEle) {
  marketingConsectSectionEle.find("#marketingConsent-edit").hide();
  marketingConsectSectionEle.find(".o-form-container__buttons button").show();
  marketingConsectSectionEle.find("#marketingConsent-forget").show();
  marketingConsectSectionEle
    .find("#myfreestyle-marketingConsent-form .a-checkbox input:checked")
    .prop("disabled", false)
    .parents(".a-checkbox")
    .removeClass("a-checkbox--checked-disabled");
  marketingConsectSectionEle
    .find("#myfreestyle-marketingConsent-form .a-checkbox input:not(:checked)")
    .prop("disabled", false)
    .parents(".a-checkbox")
    .removeClass("a-checkbox--disabled");
}

/**
 * @function
 * Summary: Function to update backend variable value to frontend value.
 */

function specialityValueRender() {
  let HCPmyAccountID = $('#myfreestyle-hcpDetails');
  let HCPbackendVariableElement = $('#hcpspeciality-backend-variable-options')
  if(HCPmyAccountID.length && HCPbackendVariableElement){ 
    let userData = usObj && decryptData(usObj, pk, "object");
    let HcpFRBackendValueSelector = "li[data-optionvalue*='"+userData.speciality+"']";
    let HcpFRValueTextValue = HCPmyAccountID.find('#hcpspeciality-options').find(HcpFRBackendValueSelector).children('.a-dropdown__option-text').text();
    setTimeout(function () {
      HCPmyAccountID.find('input[name="speciality"]').val(HcpFRValueTextValue);
    },100)
  }
}


function tertrySpecltyDrpdwn(key,userData,type){
     key
          .children("li")
          .each(function () {
            if ($(this).text().trim() === userData[type]) {
              $(this).addClass("active");
              $(this)
                .parent()
                .prevAll(".a-dropdown__placeholder")
                .addClass("a-dropdown-selected");
              $(this)
                .parent()
                .prevAll(".a-dropdown__placeholder,.a-dropdown-selected")
                .text(userData[type]);
            }
          });
}
