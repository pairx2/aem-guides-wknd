/** Request Sample -- starts**/
let consumerEmail;

function updateRequestRequestSample(data) {    

    delete data.body['g-recaptcha-response'];
    delete data.body['requestType'];
    delete data.body['node'];

    let jwtToken =  getSessionStorage('jwtToken');

    data.headers['x-id-token'] = jwtToken;

    consumerEmail = data.body['consumerEmail'];

    return data;
}

function onBeforeRequestSample() {
    showLoading();
}

function onSuccessRequestSample(data) {    

    if (data.errorCode == 0) {
        //hide all errors
        hideApiError();

        hideLoading();

        // Generate Request Sample Form URL
        let requestSampleFormPath = $("[name=requestSampleFormPath]").val();

        let requestSampleUrl = requestSampleFormPath.replaceAll(".html", "-successful.html") +
            "#/?productImage=" + encodeBase64(productImage) +
            "&productName=" + encodeBase64(productName) +
            "&consumerEmail=" + encodeBase64(consumerEmail);

        location.href = requestSampleUrl;

        return false;
    } else {
        onErrorRequestSample(data);
    }
}

function onErrorRequestSample(error) {    

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
}
/** Request Sample -- ends**/