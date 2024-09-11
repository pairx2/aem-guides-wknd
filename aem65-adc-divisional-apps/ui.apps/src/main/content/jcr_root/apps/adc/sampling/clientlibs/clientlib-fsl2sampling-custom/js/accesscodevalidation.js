/**
 * Access Code Validation Check
 */
function reCaptchaOnLoadCall(){
    /**AccessCode Validation Check -- start**/
    var fsl2acs = $('#fsl2AccessCode'); //check if page has id element

    if (fsl2acs.length > 0 && wcmmodeOff) {
        $('#acsDynamicCheckForm').hide();
        $('#acsManualCheckForm').show();
        $('#page-spinner').hide();
    }

}

/**AccessCode Validation Check -- end**/

$(document).ready(function() {

	//Updated for the dataLayer push
	$('#dataProtectionButtonId').on('click', function() {
        console.log("pushing the data layer updates for Teilnahmebedingungen-1");
        pushDataLayerUpdates('Pageview', '/de-de/teilnahmebedingungen-1','Teilnahmebedingungen-1');
    });

    $('#fsl2ConsentsFormSubmit').on('click', function() {
   		console.log("pushing the data layer updates for Teilnahmebedingungen-2");
        pushDataLayerUpdates('Pageview', '/de-de/teilnahmebedingungen-2','Teilnahmebedingungen-2');

    });

    $('#Continue').on('click', function() {
        console.log("pushing the data layer updates for Qualifizierungsfrage");
        pushDataLayerUpdates('Pageview', '/de-de/qualifizierungsfrage','Qualifizierungsfrage');

    });
	//questionaireSubmit for answering the questions

    //Feature card click button
    $('#acsFeatureBtnSubmit').on('click', function() {
		//Updated for the dataLayer push
        console.log("pushing the data layer updates for Datenschutz");
        pushDataLayerUpdates('Pageview', '/de-de/datenschutz','Datenschutz');

        var featureBtnParent = $(this).attr('data-form-button');
        if (featureBtnParent == 'acsFeatureDynamicBtn') {
            focusAnimateToId('acsDynamicCheckForm');
            $('#acsDynamicBtnSubmit').trigger('click');
        } else {
            focusAnimateToId('acsManualCheckForm');
            $('#acsManualBtnSubmit').trigger('click');
        }
    });

    //Manual Access Code Submit Button Click
    $('#acsManualBtnSubmit').on('click', function() {
		//Updated for the dataLayer push
        console.log("pushing the data layer updates for Datenschutz");
        pushDataLayerUpdates('Pageview', '/de-de/datenschutz','Datenschutz');

        $('#page-spinner').show();
        $('#acsManualBtnSubmit').parents('.a-button').addClass('a-button--spinner');
        $('#accessManualCodeWaitMsg').show();
        var gSiteKey = $('#acsCodeForm').attr('data-site-key');
        var token_value;
        grecaptcha.ready(function() {
            grecaptcha.execute(gSiteKey, {
                action: 'submit'
            }).then(function(token) {
                token_value = token;
                accessCodeValidCheck('#acsManualCheckForm', '#acsManualBtnSubmit', token_value);
            }).catch(function(error) {

                acsCodeErorHideShow('#acsManualCheckForm', '#acsManualBtnSubmit');
                $('#redirect-buttons #btnModalError500').parent('.m-popup').trigger('click');
            });
        });

    });

    //Dynamic Access Code Submit Button Click
    $('#acsDynamicBtnSubmit').on('click', function() {
        var dataCheck = $('#acsDynamicCheckForm .a-input-field input').attr('data-check');
        if (dataCheck == 'valid') {
            window.location.href = $(this).attr('href');
        }
    });

});

//Dynammic Access Code Validation Check
function accessCodeAvailCheck(cookieAccessCode) {
    if (cookieAccessCode && cookieAccessCode !== '') {
        $('#acsDynamicCheckForm .a-input-field input').val(cookieAccessCode);
        $('#acsDynamicCheckForm').show();
        $('#acsManualCheckForm').hide();
        $('#acsDynamicBtnSubmit').parents('.a-button').addClass('a-button--spinner');
        $('#accessDynamicCodeWaitMsg').show();
        $('#page-spinner').show();
        var gSiteKey = $('#acsCodeForm').attr('data-site-key');
        var token_value;
        setTimeout(function() {
            grecaptcha.ready(function() {
                grecaptcha.execute(gSiteKey, {
                    action: 'submit'
                }).then(function(token) {
                    token_value = token;
                    accessCodeValidCheck('#acsDynamicCheckForm', '#acsDynamicBtnSubmit', token_value);
                }).catch(function(error) {
                    console.log(error);
                    acsCodeErorHideShow('#acsDynamicCheckForm', '#acsDynamicBtnSubmit');
                    $('#redirect-buttons #btnModalError500').parent('.m-popup').trigger('click');
                });
            });
        }, 1000);
    } else {
        $('#acsDynamicCheckForm').hide();
        $('#acsManualCheckForm').show();
        $('#page-spinner').hide();
    }
}

//Access Code Ajax setting here
function accessCodeValidCheck(parentID, btnSubmitID, token_value) {
    var acsURL = $('#acsCodeForm form').attr('action');
    var acsURLWithCode = acsURL;
    var obj = {action:"assignAccessCode",userInfo:{additionalProperties:{reCaptcha:token_value}}};
    var myJSON = JSON.stringify(obj);
    var settings = {
        "url": acsURLWithCode + '?captchaValue=' + token_value,
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
            var acsCodeStatus = JSON.stringify(response.response);
            var errorMessageText, redirectURL;
            var acsAccessCode = response.response.accessCode;
            //Redirection as per status response
            if (acsAccessCode && acsAccessCode !== '') {
                redirectURL = $('#acsBtnQuestionnairePage').attr('href');
                $(btnSubmitID).attr('href', redirectURL);
                $('#acsFeatureBtnSubmit').attr('href', redirectURL);
                successACSCodeResponseSteps(parentID, btnSubmitID, acsCodeStatus, acsAccessCode);
            } else if (acsAccessCode == null && acsAccessCode == '') {
                errorMessageText = $('#ACC-CODE-1010').text();
                $(parentID + ' .a-input-field .a-input-field--text-error').text(errorMessageText);
                $(parentID + ' .a-input-field .a-form-grp').addClass('validation-error');
                acsCodeErorHideShow(parentID, btnSubmitID);
            }else {
                errorMessageText = $('#ACC-CODE-ERROR').text();
                $(parentID + ' .a-input-field .a-input-field--text-error').text(errorMessageText);
                $(parentID + ' .a-input-field .a-form-grp').addClass('validation-error');
                acsCodeErorHideShow(parentID, btnSubmitID);
            }
        } else {
            //error
            accessCodeApiError(response, parentID, btnSubmitID);
        }
    });
}

//If Access Code status will be available, consent signed or QueCompleted then follow below steps
function successACSCodeResponseSteps(parentID, btnSubmitID, acsCodeStatus, acsAccessCode) {
    $(parentID + ' .a-input-field .a-form-grp').removeClass('validation-require');
    $(parentID + ' .a-input-field .a-form-grp').removeClass('validation-error');

    if (parentID == '#acsDynamicCheckForm') {
        $(parentID + ' .abt-icon-tick').show();
        $(btnSubmitID).removeAttr('disabled');
        $(parentID + ' .a-input-field input').attr('data-check', 'valid');
        $('#acsFeatureBtnSubmit').removeAttr('disabled');
        $('#acsFeatureBtnSubmit').attr('data-form-button', 'acsFeatureDynamicBtn');
        $("#accessDynamicCodeWaitMsg").hide();

    } else if (parentID == '#acsManualCheckForm') {
        window.location.href = $(btnSubmitID).attr('href');
        $('#acsFeatureBtnSubmit').removeAttr('disabled');
        $('#acsFeatureBtnSubmit').attr('data-form-button', 'acsFeatureManualBtn');
        $("#accessManualCodeWaitMsg").hide();
    } else {
        $('#acsDynamicCheckForm .abt-icon-tick').hide();
        $(btnSubmitID).removeAttr('disabled');
        $('#acsFeatureBtnSubmit').removeAttr('disabled');
        $('#acsFeatureBtnSubmit').removeAttr('data-form-button');
    }
    $(btnSubmitID).parents('.a-button').removeClass('a-button--spinner');
    $('#page-spinner').hide();
    setCookie('accessCodeStatus', acsCodeStatus, '');
    setCookie('accessCode', acsAccessCode, '');
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
        $('#apierror_400').hide();
        var acsErrorMessageText = $('#' + i18nKey).text();
        $(parentID + ' .a-input-field .a-input-field--text-error').text(acsErrorMessageText);
        $(parentID + ' .a-input-field .a-form-grp').addClass('validation-error');
    } else {
        //hide all errors
        $('#apierror_400').hide();
        $(parentID + ' .a-input-field .a-form-grp').removeClass('validation-error');
        //show error500 modal
        $('#redirect-buttons #btnModalError500').parent('.m-popup').trigger('click');
    }
}

//if error occures then show and hide all divs
function acsCodeErorHideShow(parentID, btnSubmitID){
    if (parentID == '#acsDynamicCheckForm') {
        $('#acsDynamicCheckForm .abt-icon-tick').hide();
        $('#acsDynamicCheckForm .a-input-field input').attr('data-check', 'invalid');
    }
    $(btnSubmitID).parents('.a-button').removeClass('a-button--spinner');
    $("#accessManualCodeWaitMsg").hide();
    $("#accessDynamicCodeWaitMsg").hide();
    $('#page-spinner').hide();
}
