
const isEnableKount = $("#signup-form").attr("data-kount");
let kountConfig, sessionID;
function uuid() {
    let r = crypto.randomUUID().replace(/-/g, '');
    return r.toString();
}
$(document).ready(function() {
    $('#question1-options ul li').on('click', function() {
        $('#reason-option-options').css('display', 'block');
        $('.try-pds').closest('.title').css('display', 'block');
        setTimeout(function() {
            let selectedID =  $('#question1-options ul').find('.selected')?.attr('data-optionvalue');
            if (selectedID === '1') {
                $('.buy-pds').css('display', 'block');
                $('.try-pds').css('display', 'none');
            } else {
                $('.buy-pds').css('display', 'none');
                $('.try-pds').css('display', 'block');
            }
            },50);        
        });
        $('#other-answer').closest('.a-input-field').attr('data-required', 'false');
        $('#reason-option-options ul li').on('click', function() {
        if ($(this).attr('data-optionvalue') === "OPEN") {
            $('#other-answer').closest('.fields').css('display', 'block');
            $('#other-answer').closest('.a-input-field').attr('data-required', 'true');
        } else {
            $('#other-answer').closest('.fields').css('display', 'none');
            $('#other-answer').closest('.a-input-field').attr('data-required', 'false');
        }
    });
    
    if(isEnableKount === "true") {
        const kountClientId = $("input[name=kountClientID]").length ? $("input[name=kountClientID]").val() : "101722";
        const kountEnvironment = $("input[name=kountEnvironment]").length ? $("input[name=kountEnvironment]").val() : "TEST";
        const isSPA = ($("input[name=isSPA]").val() === "true");
    
        kountConfig = {
          "clientID": kountClientId,
          "environment": kountEnvironment,
          "isSinglePageApp": isSPA
        }
        sessionID = uuid();
        kountSDK(kountConfig, sessionID);
      }     
});

$(window).on('load', function() {
    $('#dob').on('blur', function() {
        let today = new Date();
        let endDate = today.getFullYear();
        let startDate = today.getFullYear() - 18;
        let dateformat = /^\d{2}[- /.]\d{2}[- /.]\d{4}$/;
        let date_val = $('#dob').val();
        if ( date_val != '' && date_val != null ) {
            if (date_val.match(dateformat)) {    
                let date_seperator1 = date_val.split('/');
                let date_seperator2 = date_val.split('-');
                let splitdate;
                if (date_seperator1.length > 1) {
                        splitdate = date_val.split('/');
                }
                else if (date_seperator2.length > 1) {
                    splitdate = date_val.split('-');
                }
                let selectedYear = parseInt(splitdate[2]);                
                if (selectedYear > endDate || selectedYear < startDate) {
                    $("#dob").closest('.form-group').addClass("validation-error");
                }
                else {
                    $("#dob").closest('.form-group').removeClass("validation-error");
                }
            }
        }
    });
});

let getUrlParameter = function getUrlParameter(sParam) {
    let returnVal = "";
    let sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            returnVal = sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return returnVal;
};

function UpdateSignUpRequest(formData) {
	let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
	let countryCode = document.querySelector('input[name="x-country-code"]').value;
	let preferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    let check1 = $('input[name="check1"]').is(':checked')? 'true' : 'false';
    let windowWidth = $(window).width();
    let source;
    if (windowWidth >= 1200) {
        source = 'PEDIASURE_FULL';
    }
    else {
        source = 'PDS_MOBILE';
    }   
    let optDate = new Date().toISOString();
    let utmSource = getUrlParameter('utm_source');
    let utmMedium = getUrlParameter('utm_medium');
    let utmContent = getUrlParameter('utm_content');
    let utmTerm = getUrlParameter('utm_term');
    let utmCampaign = getUrlParameter('utm_campaign');
	formData.headers = {
        'x-preferred-language': preferredLanguage,
		'x-country-code': countryCode,
        'x-application-id': headerApplicationId
	}
    let state = $('[name="state"]').find('.selected')?.attr('data-optionvalue');
    let clientId = $('#client_analytics_id').val();
    let fulladdressline1 = $("#street_number").val(); 
    let addressLine1 = fulladdressline1.split(",")[0];
    
    let question1 = $('[name="drop1"]').closest('.a-dropdown').find('.a-dropdown__title-text').text()?.trim();
    let question1Value = $('[name="drop1"]').find('.selected span').text()?.trim();
    let answerId1 = $('[name="drop1"]').find('.selected')?.attr('data-optionvalue');
    let question2, questionID2, question2Value;
    if (answerId1 == 1) {
        question2 = $('[name="drop2"]').closest('.options').prev('.title').find('.buy-pds').text()?.trim();
        questionID2 = '2033';
    } else {
        question2 = $('[name="drop2"]').closest('.options').prev('.title').find('.try-pds').text()?.trim();
        questionID2 = '2034';
    } 
    let answerId2 = $('[name="drop2"]').find('.selected')?.attr('data-optionvalue');
    if (answerId2 === 'OPEN') {
        question2Value = $('#other-answer').val();
    } else {
        question2Value = $('[name="drop2"]').find('.selected span').text()?.trim();
    }

    // encrypt account id for recaptcha
    const accountId = window.btoa(formData.body.emailAddress);
    formData.body = {
            "userInfo": {
            "email": formData.body.emailAddress,
            "firstName": formData.body.firstName,
            "lastName": formData.body.lastName,
            "addressInfo": {
                "lineOne": addressLine1,
                "lineTwo": formData.body.address2,
                "city": formData.body.city,
                "state": state,
                "zipCode": formData.body.Zip
            },
            
            "additionalProperties": {
                "clientAnalyticsId": clientId
            }
        },        
        "consents": [
            {
                "consentName" : "PediaSureConsent",
                "consentUpdatedTime" : optDate,
                "consentValue" : check1
            }
        ],
        "surveyQuestions": [
            {
                "questionId": "2000",
                "answerId": "OPEN",
                "question": "PEDIASURE : CHILD DOB",
                "answer": formData.body.dob
            },
            {
                "questionId": "2032",
                "answerId": answerId1,
                "question": question1,
                "answer": question1Value
            },
            {
                "questionId": questionID2,
                "answerId": answerId2,
                "question": question2,
                "answer": question2Value
            }
        ], 
        "externalTracking": [
            {
                "source": source
            }
        ],
        "receiveSpecialOffers": {
            "optOut": "false",
            "optDate":  optDate
        },
        "additionalProfileProperties": {
            "source": utmSource,
            "medium": utmMedium,
            "content": utmContent,
            "term": utmTerm,
            "campaign": utmCampaign
        },
        "g-recaptcha-response": formData.body["g-recaptcha-response"],
        "captchaType": "ENT",
        "captchaAction": "submit",
        "captchaAccountId": accountId,
        "riskCheck": isEnableKount,
        "riskSessionValue": sessionID
    }
    return formData
}

function getMonthFromString(mon){
    let d = Date.parse(mon + "1, 2012");
    if(!isNaN(d)){
        let monthValue = new Date(d).getMonth() + 1;
        if(monthValue < 10){
            monthValue = '0'+monthValue;
        }
        return monthValue;
    }
    return -1;
}

function signUpError(responseData){
    if(responseData.errorCode != 0) {
        if(responseData.response.i18nMessageKey == "REG-USER-1030"){
            $("#signup-form .o-form-container__error-msg").text($('[name="alreadyexist"]').val());
        } else if (responseData.response.i18nMessageKey == 'AUTH-1005') {
            $("#signup-form .o-form-container__error-msg").text($('[name="captcha-error"]').val());
        } else {
            $("#signup-form .o-form-container__error-msg").text(responseData.response?.statusReason);  
        }
    }
}

$(document).ready(function() {
    $('#signup-form input').on('blur', function() {
        setTimeout( function() {
            $('#signup-form button[type="submit"]').removeAttr('disabled');
        }, 100);
    });
    $('#signup-form .a-dropdown__field ul li').on('click', function() {
        setTimeout( function() {
            $('#signup-form button[type="submit"]').removeAttr('disabled');
        }, 100);
    });
    $('#signup-form button[type="submit"]').on('click', function() {
        $('#signup-form .a-dropdown[data-required="true"]').each(function() {
            if(!$(this).find('.selected').length > 0) {
                $(this).addClass('validation-require');
            }
        });
        $('#signup-form .a-checkbox__input[data-required="true"]').each(function() {
            if (!$(this).is(':checked')) {
                $(this).closest('.checkbox').addClass('validation-require');
            }
        });
    });
    $('#street_number').on('keyup', function(event) {
        let key = event.keyCode || event.charCode;
        if( key == 8 || key == 46 ) {
            $('#locality, #postal_code').val('');
            if($('#state-options .a-dropdown-selected').length > 0) {
                $('#state-options .a-dropdown-selected').text('State');
                $('#state-options .a-dropdown-selected').addClass('a-dropdown__placeholder').removeClass('a-dropdown-selected');
            }
            $('#state-options ul li').removeClass('selected').removeAttr('aria-selected');
        }
    });
});