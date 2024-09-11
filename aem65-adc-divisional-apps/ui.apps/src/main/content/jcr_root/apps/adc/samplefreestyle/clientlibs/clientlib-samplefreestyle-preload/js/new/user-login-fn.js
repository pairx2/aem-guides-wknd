function updateRequestSamplingLogin(data) {
    let requestPayload = data;
    delete data.body['requestType'];
    delete data.body['node'];
    let marketingObj = {
        consentName: "marketingeducationemail",
        consentValue: data.body["marketingeducationemail"]
    };
    data.body["requiredConsents"].push(marketingObj);
    if (data.body['loginID'] && data.body['password'] && data.body['requiredConsents']) {
        sessionStorage.setItem('userData',
            JSON.stringify({ email: data.body['loginID'], password: data.body['password'], consents: data.body['requiredConsents'] }));
    }
    const consents = data.body['requiredConsents'];
    if (consents?.length) {
        const loginDetails = JSON.parse(sessionStorage.getItem('userData'));
        requestPayload = {
            ...data,
            body: {
                ...data.body,
                loginID: loginDetails['email'],
                password: loginDetails['password']
            }
        }
    }
    $('#page-spinner').show();
    return requestPayload;
}

function onSuccessSamplingLogin(data) {
    if (data.errorCode == 0) {
        let jwtToken = data.response && data.response.jwtToken;
        if (jwtToken) { //On Success - Login
          setCookie('cJwt_smpl', jwtToken, 0.15, true)
        }
        showNextStep();
        scrollToTop();
    } else {
        onErrorSamplingLogin(data);
    }
    $('#page-spinner').hide();
}

function onErrorSamplingLogin(error) {
    showHideApiError(error);
    $('#page-spinner').hide();
}