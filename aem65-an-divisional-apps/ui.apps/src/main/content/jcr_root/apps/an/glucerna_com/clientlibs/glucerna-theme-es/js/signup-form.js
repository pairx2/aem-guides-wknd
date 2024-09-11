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
    let question1Value = $('[name="drop1"]').find('.selected')?.attr('data-optionvalue');
    let answerId1 = $('[name="drop1"]').find('.selected')?.index() + 1;
    answerId1 = answerId1.toString();
    let question2Value = $('[name="drop2"]').find('.selected span').text()?.trim();
    let answerId2 = $('[name="drop2"]').find('.selected')?.attr('data-optionvalue');
    let state = $('[name="state"]').find('.selected')?.attr('data-optionvalue');
    let clientId = $('#client_analytics_id').val();
    let windowWidth = $(window).width();
    let source;
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

    formData.body = {
        "userInfo": {
            "email": formData.body.userName,
            "firstName": formData.body.firstName,
            "lastName": formData.body.lastName,
            "dob": `${formData.body.year}-${getMonthFromString(formData.body.month)}-${formData.body.day}`,
            "addressInfo": {
                "lineOne": formData.body.address1,
                "lineTwo": formData.body.address2,
                "city": formData.body.city,
                "state": state,
                "zipCode": formData.body.Zip
            },     
            "additionalProperties": {
                "clientAnalyticsId": clientId
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
                "questionId": "047",
                "answerId": answerId1,
                "question": "Which best describes you?",
                "answer": question1Value
            },
            {
                "questionId": "016",
                "answerId": answerId2,
                "question": "If yes, how many packages of Glucerna products have you or someone in your household purchased or consumed in the past 6 months?",
                "answer": question2Value
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
        "requestType" : "es",
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

$(window).on("load", function() {
    $('.o-form-container__main-form [name="userNameConfirm"]').on('keyup input change blur', function (e) {
		e.preventDefault();
		setTimeout(() => {
			$(this).closest('.form-group').removeClass('validation-error');
		}, 50);
		if ($(this).val().length > 0) {
			if ($(this).val() != $(this).closest('.fields').prev('.fields').find('[name="userName"]').val())  {
				setTimeout(() => {
					$(this).closest('.form-group').addClass('validation-error');
					$('.o-form-container .btn').attr('disabled', true);
				}, 50);
			}
			else {
				setTimeout(() => {
					$(this).closest('.form-group').removeClass('validation-error');
				}, 100);
			}
		}
	});
	$('.o-form-container__main-form [name="userName"]').on('keyup input change blur', function (e) {
		e.preventDefault();
		setTimeout(() => {
			$(this).closest('.fields').next('.fields').find('.form-group').removeClass('validation-error');
		}, 50);
		if ($(this).val().length > 0) {
			if ($(this).val() != $(this).closest('.fields').next('.fields').find('[name="userNameConfirm"]').val()) {
				setTimeout(() => {
					if ($(this).closest('.fields').next('.fields').find('[name="userNameConfirm"]').val().length > 1) {
						$(this).closest('.fields').next('.fields').find('.form-group').addClass('validation-error');
						$('.o-form-container .btn').attr('disabled', true);

					}
				}, 50);
			}
			else {
				setTimeout(() => {
					$(this).closest('.fields').next('.fields').find('.form-group').removeClass('validation-error');
				}, 150);
			}
		}
	});
	$('.o-form-container__main-form [name="userName"],.o-form-container__main-form [name="userNameConfirm"]').on('keydown', function (e) {
		if(e.keyCode == 32) {
			e.preventDefault();
			return false;
		}
	});
    $('[name="day"]').closest('.form-group').find('.a-dropdown__title--required').css('display', 'none');
    $('[name="year"]').closest('.form-group').find('.a-dropdown__title--required').css('display', 'none');
});

$(document).ready(function() {
    if($('#signup-form').length > 0) {  
        $('#signup-form button[type="submit"]').removeAttr('disabled');
    }
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
});