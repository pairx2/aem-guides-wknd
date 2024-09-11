function UpdateSignUpRequest(formData){
	let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
	let countryCode = document.querySelector('input[name="x-country-code"]').value;
	let preferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    let optDate = new Date().toISOString();
    let getUrlParameter = function getUrlParameter(sParam) {
    let returnVal = "";
    let sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'), 
    sParameterName, i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                returnVal = sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return returnVal;
    };

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
    
    let answerId1  = $('input[name="Product-checkbox"]:checked').val();
    let question1Value= $('input[name="Product-checkbox"]:checked')?.closest('.a-radio--vertical').find('.a-radio__text').text()?.trim();
    let check1 = $('input[name="check1"]').is(':checked')? 'true' : 'false';

    formData.body = {
            "userInfo": {
            "email": formData.body.emailAddress,
            "firstName": formData.body.firstName,
            "lastName": formData.body.lastName,
            "phoneNumber":formData.body.number,
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
        "surveyQuestions": [
            {
                "questionId": "3012",
                "answerId": answerId1,
                "question": "Select the EleCare product you would like to receive free of charge",
                "answer": question1Value
            }
        ], 
        "externalTracking": [
            {
                "source": "ELECARE_FULL"
            }
        ],
        "consents": [
            {
                "consentName" : "ElecareConsent",
                "consentUpdatedTime" : optDate,
                "consentValue" : check1
            }
        ],
        "additionalProfileProperties": {
            "source": utmSource,
            "medium": utmMedium,
            "content": utmContent,
            "term": utmTerm,
            "campaign": utmCampaign
        },
        "g-recaptcha-response": formData.body["g-recaptcha-response"],
        "captchaType": "ENT",
        "captchaAction": "submit"
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
        }else{
            $("#signup-form .o-form-container__error-msg").text(responseData.response?.statusReason);  
        }
    }
}

$(document).ready(function() {
    $('#signup-form button[type="reset"]').on('click', function() {
        $('#signup-form .form-group').removeClass('validation-require validation-regex validation-error');
        $('#signup-form .checkbox, #signup-form .a-dropdown, #signup-form .radio').removeClass('validation-require ');
    });
    $('#signup-form input').on('blur', function() {
        setTimeout( function() {
            $('#signup-form button[name="next"]').removeAttr('disabled');
            $('#signup-form button[type="submit"]').removeAttr('disabled');
        }, 100);
    });
    $('#signup-form .a-dropdown__field ul li').on('click', function() {
        setTimeout( function() {
            $('#signup-form button[name="next"]').removeAttr('disabled');
            $('#signup-form button[type="submit"]').removeAttr('disabled');
        }, 100);
    });
    $('#signup-form button[type="submit"]').on('click', function() {
        setTimeout( function() {
            $('#signup-form .a-dropdown[data-required="true"]').on('each', function() {
                if($(this).find('.selected').length < 1) {
                    $(this).addClass('validation-require');
                }
            });
            $('#signup-form .a-checkbox__input[data-required="true"]').each(function() {
                if (!$(this).is(':checked')) {
                    $(this).closest('.checkbox').addClass('validation-require');
                }
            });
        }, 100);
    });
    $('#street_number').on('keyup', function(event) {
        let key = event.keyCode || event.charCode;
        if( key == 8 || key == 46 ) {
            $('#locality, #postal_code').val('');
            if($('#state-options .a-dropdown-selected').length > 0) {
                $('#state-options .a-dropdown-selected').text('Select a State');
            }
            $('#state-options ul li').removeClass('selected').removeAttr('aria-selected');
        }
    });
});
