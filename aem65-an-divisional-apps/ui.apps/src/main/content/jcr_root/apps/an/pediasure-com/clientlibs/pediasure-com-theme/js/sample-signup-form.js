function UpdateSampleSignUpRequest(formData) {
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
    let oid = getUrlParameter('oid');
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
                "questionId": "2031",
                "answerId": "OPEN",
                "question": "HCP Invitation PediaSure Source Order ID",
                "answer": oid
            },
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
        "riskCheck": isEnableKount,
        "riskSessionValue": sessionID,
        "action" : "oasis_registration",
        "registrationType" : "oasis_type"
    }
    return formData
}

$(window).on('load',function () {
    if($('#sample-signup').length > 0) {
        let orderId = getUrlParameter('oid');
        if(orderId) {
            $('#sample-signup').show();
        }
        else {
            $('#sample-signup-error').closest('.container').show();
        }
    }
});