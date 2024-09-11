/** Connect Expert -- starts**/
function updateRequestConnectExpert(data) {    

    delete data.body['node'];
    delete data.body['g-recaptcha-response'];

    let jwtToken =  getSessionStorage('jwtToken');

    data.body['subject'] = $("#connectExpertForm [name=subject]:checked").val()

    data.headers['x-id-token'] = jwtToken;

    return data;
}

function onBeforeConnectExpert() {
    showLoading();
}

function onSuccessConnectExpert(data) {   

    if (data.errorCode == 0) {
        //hide all errors
        hideApiError();

        hideLoading();
    } else {
        onErrorConnectExpert(data);
    }
}

function onErrorConnectExpert(error) {    

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
}
/** Connect Expert -- ends**/