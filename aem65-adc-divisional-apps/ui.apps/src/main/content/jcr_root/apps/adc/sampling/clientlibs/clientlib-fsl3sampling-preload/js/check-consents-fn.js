/** Consents -- starts**/
function updateRequestConsents(data) {

    delete data.body['g-recaptcha-response'];
    delete data.body['requestType'];
    delete data.body['node'];

    let consentObj = {
        "accessCode": getCookie("accessCode"),
        "consentDataPrivacy": data.body.consentDataPrivacy,
        "consentTermsAndConditions": data.body.consentTermsAndConditions,
        "consentDataProcessing": data.body.consentDataProcessing

    };

    setCookie('consentObj', JSON.stringify(consentObj), '');
    data.body.accessCode = getCookie("accessCode");

    let userInfo = {
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
        let acsCodeStatus = {
            "statusReason": "ConsentSigned",
            "allowUser": "true"
        }

        setCookie('accessCodeStatus', JSON.stringify(acsCodeStatus), '');

        //hide all errors
        $('#apierror, #apierror_400').hide();

        $('#page-spinner').hide();
        $('#consentsWaitMsg').hide();
        $('#fsl3ConsentsForm button[type="Submit"]').hide();
        wizardNextButton(false, false, true);
    } else {
        onErrorConsents(data);
    }


}

function onErrorConsents(error) {
    $('#page-spinner').hide();
    $('#consentsWaitMsg').hide();
    wizardNextButton(true, false, false);
    $('#fsl3ConsentsForm button[type="Submit"]').show();

    showHideApiError(error);

    deleteCookie('consentObj');
}

function onCompleteConsents() {
    $('#page-spinner').hide();
    $('#consentsWaitMsg').hide();

    let consentObj = getCookie('consentObj');
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
