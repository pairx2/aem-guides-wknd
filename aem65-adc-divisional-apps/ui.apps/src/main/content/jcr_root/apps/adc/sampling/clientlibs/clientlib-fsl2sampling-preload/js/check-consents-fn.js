/** Consents -- starts**/
function updateRequestConsents(data) {

    delete data.body['g-recaptcha-response'];
    delete data.body['requestType'];
    delete data.body['node'];

    var consentObj = {
        "accessCode": data.body.accessCode,
        "consentDataPrivacy": data.body.consentDataPrivacy,
        "consentTermsAndConditions": data.body.consentTermsAndConditions
        //"reCaptcha": data.body.reCaptcha
    };

    setCookie('consentObj', JSON.stringify(consentObj), '');

    var userInfo = {
        "action": "updateConsent",
        "userInfo": {
            "additionalProperties": data['body']
        }
    }
    data.body = userInfo;
    return data;
}


function onBeforeConsents() {
    $('#page-spinner').css('display', 'block');
    $('#consentsWaitMsg').css('display', 'block');
    wizardNextButton(true, true, false);
}

function onSuccessConsents(data) {

    if(data.errorCode == 0) {
        var acsCodeStatus = {
            "statusReason": "ConsentSigned",
            "allowUser": "true"
        }

        setCookie('accessCodeStatus', JSON.stringify(acsCodeStatus), '');

        //hide all errors
        $('#apierror, #apierror_400').hide();

        $('#page-spinner').hide();
        $('#consentsWaitMsg').hide();
        $('#fsl2ConsentsForm button[type="Submit"]').hide();
        wizardNextButton(false, false, true);
    } else {
        onErrorConsents(data);
    }


}

function onErrorConsents(error) {
    $('#page-spinner').hide();
    $('#consentsWaitMsg').hide();
    wizardNextButton(true, false, false);
    $('#fsl2ConsentsForm button[type="Submit"]').show();

    showHideApiError(error);

    deleteCookie('consentObj');
}

function onCompleteConsents() {
    $('#page-spinner').hide();
    $('#consentsWaitMsg').hide();

    var consentObj = getCookie('consentObj');
    if (consentObj && consentObj !== '') {
        consentObj = JSON.parse(consentObj);
        $.each(consentObj, function(key, val) {
            let inp = $('input[name="'+key+'"]');
            let inpTy = inp.attr('type');
            let inpReq = inp.attr('data-required') == 'true' ? true : false;

            if (inpTy == "checkbox" && inpReq) {
                inp.trigger('click').prop('checked', val);
            } else if (inpTy == "checkbox" && !inpReq) {
                inp.prop('checked', val);
            } else {
                inp.val(val);
            }
        });
        deleteCookie('consentObj');
    }
}

/** Consents -- end**/