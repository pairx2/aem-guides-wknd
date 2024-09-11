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

function UpdateSampleSignUpRequest(formData){
	let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
	let countryCode = document.querySelector('input[name="x-country-code"]').value;
	let preferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    
    function getFormattedDate(date) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return year + '-' + month + '-' + day;
      }
    let optDate = getFormattedDate(new Date()); 

    

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
            },
            {
                "questionId": "6013",
                "answerId": "OPEN",
                "question": "HCP INVITATION ELECARE SOURCE ORDER ID",
                "answer": oid
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
        "captchaAction": "submit",
        "action":"elecare_sample_registration",
        "registrationType" : "elecare_sample"
    }
    return formData
}

$(window).on('load',function () {
    if($('#sample-page-form').length > 0) {
        let orderId = getUrlParameter('oid');
        if(orderId) {
            $('#sample-page-form').show();
        }
        else {
            $('#invalid-id').show();
        }
    }
});