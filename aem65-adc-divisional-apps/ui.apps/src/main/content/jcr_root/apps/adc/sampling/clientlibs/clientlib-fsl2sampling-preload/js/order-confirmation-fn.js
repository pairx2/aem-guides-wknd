/** Order Confirmation -- starts**/
function updateRequestOrderConfirm(data) {

    delete data.body['requestType'];
    delete data.body['node'];
    delete data.body['g-recaptcha-response'];

    let consentTraining;

    let consentCookie = getCookie('consentTraining') == "true" ? true : false;
    if(consentCookie) {
        consentTraining = consentCookie;
    } else {
        consentTraining = $('input[name="consentTraining"]').is(':checked');
        // setCookie('consentTraining', consentTraining, '');
    }

    data.body['consentTraining'] = consentTraining;

    let userAccInfo = getCookiesObj('userAccInfo');
    if(userAccInfo && userAccInfo !== "") {
        $.each(userAccInfo, function(key, val){
            if(key !== "userType") {
                data.body[key] = val;
            }
        });
    }

    return data;
}

function onSuccessOrderConfirm(data) {

    if(data.errorCode == 0) {
        //hide all errors
        $('#apierror, #apierror_400').hide();

        let acsCodeStatus = {
            "statusReason": "Redeemed",
            "allowUser": "false"
        }
    
        setCookie('accessCodeStatus', JSON.stringify(acsCodeStatus), '');

        deleteCookie('jwtToken');
        deleteCookie('userAccInfo');
        deleteCookie('consentTraining');

    } else {
        showHideApiError(data);
    }

}

function onErrorOrderConfirm(error) {

    if(error.errorCode !== 400 && error.errorCode !== 500) {

        //show matched 400 error
        $('#apierror_400 .text .cmp-text').hide();
        $('#SBM-ORD-LGN-EXP').css('display', 'block');
        $('#apierror_400').css('display', 'block');

    } else {
        $('#SBM-ORD-LGN-EXP').hide();
        showHideApiError(error);
    }

    let consentCookie = getCookie('consentTraining') == "true" ? true : false;
    checkOrderButtonStatus(consentCookie, true);
	
	//To disable the order confirm button on time out and to avoild duplicate orders due to multiple clicks
	var i18nKey = error.response.i18nMessageKey ? error.response.i18nMessageKey : "";
	console.log("i18nKey is : " + i18nKey);
	if( i18nKey === "ES-004"){
		$('#orderConfirmForm button[type="submit"]').attr('disabled', 'true');
	}
}
/** Order Confirmation -- ends**/