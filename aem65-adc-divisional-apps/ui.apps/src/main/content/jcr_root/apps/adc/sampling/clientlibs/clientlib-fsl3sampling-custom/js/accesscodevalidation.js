

    //Manual Access Code Submit Button Click
    function getAccessCode() {
      $('#page-spinner').show();
      $("#fsl3ConsentsFormSubmit").parents('.a-button').removeClass('a-button--spinner');
      $('#accessManualCodeWaitMsg').show();
      let gSiteKey = $('#acsQuestionForm').attr('data-site-key');
      let token_value;
      
      if ($('body').attr('data-enable-enterprise-recaptcha') === 'true') {
        window?.grecaptcha?.enterprise?.render({
          sitekey: gSiteKey,
          size: 'invisible',
          hl: 'de',
        });
        grecaptcha.enterprise.ready(function () {
          grecaptcha.enterprise.execute().then(function (token) {
            token_value = token;
            accessCodeValidCheck('#fsl3ConsentsForm', '#fsl3ConsentsFormSubmit', token_value);
          }).catch(function (error) {
            acsCodeErorHideShow('#fsl3ConsentsForm', '#fsl3ConsentsFormSubmit');
            $('#redirect-buttons #btnModalError500').parent('.m-popup').trigger('click');
          });
        });
      } else {
        grecaptcha.ready(function () {
          grecaptcha.execute(gSiteKey, {
            action: 'submit'
          }).then(function (token) {
            token_value = token;
            accessCodeValidCheck('#fsl3ConsentsForm', '#fsl3ConsentsFormSubmit', token_value);
          }).catch(function (error) {
            acsCodeErorHideShow('#fsl3ConsentsForm', '#fsl3ConsentsFormSubmit');
            $('#redirect-buttons #btnModalError500').parent('.m-popup').trigger('click');
          });
        });
      }
      
    }


//Access Code Ajax setting here
function accessCodeValidCheck( parentID, btnSubmitID, token_value) {
  let acsURL = $('#acsQuestionForm input[name="requestType"]')[0].value;
  let acsURLWithCode = acsURL
  let isCaptchaTypeEntAcvc = $('body').attr('data-enable-enterprise-recaptcha') === 'true' ? 'ENT' : '';
  let obj = {action:"assignAccessCode",userInfo:{additionalProperties:{reCaptcha:token_value,captchaType: isCaptchaTypeEntAcvc}}};
  let myJSON = JSON.stringify(obj);
  let settings = {
    "url": acsURLWithCode + '?captchaValue=' + token_value +'&captchaType=' + isCaptchaTypeEntAcvc,
    "method": "POST",
    "headers": {
      "x-application-id": xApplicationId,
      "x-country-code": xCountryCode,
      "x-preferred-language": xPreferredLanguage,
      "Content-Type": "application/json"
    },
    data:myJSON
  };

    //Access Code Ajax Call here
    function accessCodeValidCheckAjax() {
        // returns a promise that can be used later.
        return $.ajax(settings);
    }
    //Access Code Ajax Call After Response Code here
    accessCodeValidCheckAjax().then(function(response) {
      $('#page-spinner').hide();
        // Run this when your request was successful
        if (processResponse(response)) {
            let acsCodeStatus = JSON.stringify(response.response);
          let acsAccessCode = response.response.accessCode;
          //Redirection as per status response
          if (acsAccessCode && acsAccessCode !== '') {
            successACSCodeResponseSteps(parentID, btnSubmitID, acsCodeStatus, acsAccessCode);
          } else {
            $('#apierror_400').css('display', 'block');
            $('#ACC-CODE-ERROR').show();
            $(parentID + ' input[type=checkbox]').attr("disabled","true");
            acsCodeErorHideShow(parentID, btnSubmitID);
          }
        } else {
          //error
          accessCodeApiError(response, parentID, btnSubmitID);
        }
    });
}

//If Access Code status will be available, consent signed or QueCompleted then follow below steps
function successACSCodeResponseSteps(parentID, btnSubmitID, acsCodeStatus, UserAccessCode) {
  $("#accessManualCodeWaitMsg").hide();
  $(btnSubmitID).parents('.a-button').removeClass('a-button--spinner');
  $('#page-spinner').hide();
  setCookie('accessCodeStatus', acsCodeStatus, '');
  setCookie('accessCode', UserAccessCode, '');
}

//Access code Api Errors
function accessCodeApiError(response, parentID, btnSubmitID) {
    let errorCode = response.errorCode;
    let i18nKey;
    if (response.response) {
        i18nKey = response.response.i18nMessageKey ? response.response.i18nMessageKey : ""
    } else {
        i18nKey = "";
    }

    let i18nKeyDiv = $('#' + i18nKey);

    acsCodeErorHideShow(parentID, btnSubmitID);

    if (errorCode == 400 && i18nKey !== "" && i18nKeyDiv.length > 0) {
        //hide error500 modal
        $('#btnModalError500-modal').hide();
        $('#btnModalError500-modal .generic-modal--close').trigger('click');
        //show matched 400 error

        let acsErrorMessageText = $('#' + i18nKey).text();
      $('#apierror_400').css('display', 'block');
      $('#ACC-CODE-ERROR').text(acsErrorMessageText).show();
      $(parentID + ' input[type=checkbox]').attr("disabled","true");
    } else {
        //show error500 modal
        $('#redirect-buttons #btnModalError500').parent('.m-popup').trigger('click');
    }
}

//if error occures then show and hide all divs
function acsCodeErorHideShow(parentID, btnSubmitID){
    $(btnSubmitID).parents('.a-button').removeClass('a-button--spinner');
    $("#accessManualCodeWaitMsg").hide();
    $('#page-spinner').hide();
}
