/** User Login -- starts**/
function updateRequestUserLogin(data) {

    delete data.body['requestType'];
    delete data.body['node'];

    data.body.reCaptcha = data.body['g-recaptcha-response'];
    delete data.body['g-recaptcha-response'];

    return data;
}

function onSuccessUserLogin(data) {

    if(data.errorCode == 0) {

        let jwtToken = data.response.jwtToken;
        setCookie('jwtToken', jwtToken, '');
    
        let addParam = processUserData(data.response);

        var checkoutPage = $("#btnOrderCheckoutPage").attr('href');
        var urlpath = checkoutPage + "?" + addParam;
        window.location.href = window.location.origin + urlpath;

    } else {
        onErrorUserLogin(data);
    }
}

function onErrorUserLogin(error) {
    showHideApiError(error);

    deleteCookie('jwtToken');
    deleteCookie('userAccInfo');
}
/** User Login -- end**/
/** User Login Varify - start**/
function updateRequestUserLoginVerify(data) {

    delete data.body['requestType'];
    delete data.body['node'];
    delete data.body['g-recaptcha-response'];

    return data;
}

function onSuccessUserLoginVerify(data) {
    // console.log('onSuccessUserLoginVerify');
    if(data.errorCode == 0) {
        //hide all errors
        $('#apierror, #apierror_400').hide();
        
        $('#page-spinner').hide();
        deleteCookie('activationKey');
    } else {
        onErrorUserLoginVerify(data);
    }
}

function onErrorUserLoginVerify(error) {
    // console.log('onErrorUserLoginVerify');
    // showHideApiError(error);

    $('#page-spinner').hide();
    
    let i18nKey, i18KeyEle;
    if(error.response) {
        i18nKey = error.response.i18nMessageKey ? error.response.i18nMessageKey : ""
    } else {
        i18nKey = "";
    }

    i18KeyEle = (i18nKey !== "" && $('#'+i18nKey).length > 0) ? true : false;

    if (error.errorCode == 400 && i18nKey !== "" && i18KeyEle) {
        //hide error500 modal
        $('#btnModalError500-modal').hide();
        $('#btnModalError500-modal .generic-modal--close').trigger('click');

        //show matched 400 error
        $('#btnVerifyUserModal-modal .modal-body').find('#'+i18nKey).css('display', 'block');
        //show error verify user modal
        $('#redirect-buttons #btnVerifyUserModal').parent('.m-popup').trigger('click');

    } else {
        //hide error400
        $('#apierror, #apierror_400').hide();

        //hide error verify user modal
        $('#btnVerifyUserModal-modal').hide();
        $('#btnVerifyUserModal-modal .generic-modal--close').trigger('click');

        //show error500 modal
        $('#redirect-buttons #btnModalError500').parent('.m-popup').trigger('click');
    }
    
    deleteCookie('activationKey');
}
/** User Login Varify - end**/