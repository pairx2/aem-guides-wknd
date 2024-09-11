let getUrlParameter = function getUrlParameter(sParam) {
    let returnVal = "";
    let sPageURL = window.location.search.substring(1),
        sURLletiables = sPageURL.split('&'),
        sParameterName,        i;
    for (i = 0; i < sURLletiables.length; i++) {
        sParameterName = sURLletiables[i].split('=');

        if (sParameterName[0] === sParam) {
            returnVal = sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return returnVal;
};
function UpdateSignUpRequest(formData){
	let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
	let countryCode = document.querySelector('input[name="x-country-code"]').value;
	let preferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
	formData.headers = {
        'x-preferred-language': preferredLanguage,
		'x-country-code': countryCode,
        'x-application-id': headerApplicationId,
        'Content-Type': 'application/json'
	}
    let question1 = $('[name="drop2"]').closest('.a-dropdown').find('.a-dropdown__title-text').text()?.trim();
    let question1Value = $('[name="drop2"]').find('.selected span').text()?.trim();
    let answerId1 = $('[name="drop2"]').find('.selected')?.attr('data-optionvalue');
    let state = $('[name="state"]').find('.selected')?.attr('data-optionvalue');
    let clientId = $('#client_analytics_id').val();
    let fulladdressline1 = $("#street_number").val();
    let addressLine1; 
    if (fulladdressline1.indexOf(',') > -1) {
        addressLine1 = fulladdressline1.split(",")[0];
    }
    else {
        addressLine1 = fulladdressline1;
    }

    let windowWidth = $(window).width();
    let source, check1, terms;
    check1 = $('input[value="ch1"]').is(':checked')? 'true' : 'false';
    terms = $('input[name="terms"]').is(':checked')? 'true' : 'false';
    if (windowWidth >= 1200) {
        source = 'DESKTOP';
    }
    else if (windowWidth >= 768 && windowWidth < 1200 ) {
        source = 'TABLET';
    }
    else {
        source = 'MOBILE';
    }
    let optDate = new Date().toISOString();
    let utmSource = getUrlParameter('utm_source');
    let utmMedium = getUrlParameter('utm_medium');
    let utmContent = getUrlParameter('utm_content');
    let utmTerm = getUrlParameter('utm_term');
    let utmCampaign = getUrlParameter('utm_campaign');
    let encodedYear = htmlEncodeInput(formData.body.year);
    let encodedMonth = htmlEncodeInput(formData.body.month)

    formData.body = {
        "userInfo": {
            "email": formData.body.userName,
            "firstName": formData.body.firstName,
            "lastName": formData.body.lastName,
            "dob": `${encodedYear}-${getMonthFromString(encodedMonth)}-01`,
            "addressInfo": {
                "lineOne": addressLine1,
                "lineTwo": formData.body.address2,
                "city": formData.body.city,
                "state": state,
                "zipCode": formData.body.Zip
            },     
            "additionalProperties": {
                "clientAnalyticsId": clientId,
                "consentReceiveInformationEnsure": check1 
            }        
        },
        "couponCodes": [
            {
                "couponCode": "126894",
                "couponCodeDate": optDate
            }
        ],
        "surveyQuestions": [
            {
                "questionId": "016",
                "answerId": answerId1,
                "question": question1,
                "answer": question1Value
            },
            {
                "questionId": "1000",
                "answerId": "2",
                "question": "Did you come from Phreesia?",
                "answer": "No"
            },
            {
                "questionId": "1001",
                "answerId": "1",
                "question": "GLUCERNA : DID YOU COME FROM PROGRAM30?",
                "answer": "YES"
            },
            {
                "questionId": "1002",
                "answerId": "1",
                "question": "GLUCERNA PROGRAM30 SURVEY_FIELD_FLAG",
                "answer": "YES"
            } 
        ],  
        "externalTracking": [
            {
                "source": source
            }
        ],
        "consents": [
            {
                "consentName" : "GlucernaConsent",
                "consentUpdatedTime" : optDate,
                "consentValue" : terms
            }
        ],
        "receiveSpecialOffers": {
            "optOut": "false",
            "optDate": optDate
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
            $('#locality').closest('.fields').show();
            $('#zip').show();
            $('#locality, #postal_code').val('');
            if($('#state-options .a-dropdown-selected').length > 0) {
                $('#state-options .a-dropdown-selected').text('Select a State');
            }
            $('#state-options ul li').removeClass('selected').removeAttr('aria-selected');
        }
    });
});
 
//function to sanitize input
function htmlEncodeInput(usrinput){
    let lt = /</g, 
    gt = />/g, 
    sq = /'/g, 
    dq = /"/g;
    const encodedInput = usrinput.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(sq, "&#39;").replace(dq, "&#34;");

    return encodedInput;
}