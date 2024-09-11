/**
 * MYFREESTYLE - MY ACCOUNT
 **/

// **************************
// Marketing Consent Section
// **************************

let consentsArr = []; // Consent array that should contain user selections and send to backend
let myAccountUserObj = {}; // User Obj that should contain updated values of user data to send to backend
let isAPISuccess = false;
/**
 * @function
 * Summary: Function that executes before triggering API call
 * Parameters: data -> payload
 */
function updateRequestMyFreestyleUserConsent(data) {

    data.headers['x-id-token']=getCookie('cJwt', true);

    //process consents
    consentsArr = data.body['consents'];

    delete data.body['g-recaptcha-response'];
    delete data.body['node'];


    //final consent data/payload
    return data;
}

/**
 * @function
 * Summary: Function that executes when the API call is successful
 * Parameters: data -> response
 */
function onSuccessMyFreestyleUserConsent(data) {
    if (data.errorCode == 0) {
        let tempUsCon = encryptData(consentsArr, pk);
        setCookie('usCon', tempUsCon, 1, true);
        setSessionValues();
        isAPISuccess = true;
    } else {
        onErrorMyFreestyleUserConsent(data);
    }
}

/**
 * @function
 * Summary: Function that executes when the API call is failed
 * Parameters: data -> response
 */
function onErrorMyFreestyleUserConsent(error) {
    showHideApiError(error);
}

/**
 * @function
 * Summary: Function that executes after API call completion
 * Parameters: -
 */
function onCompleteMyFreestyleUserConsent() {
    if (isAPISuccess) {
        initializeUserConsentCheckList($(document).find('#user-consents'));
        isAPISuccess = false;
    }
    consentsArr = [];
}

// **************************
// My Info Section
// **************************

/**
 * @function
 * Summary: Function that executes before triggering API call
 * Parameters: data -> payload
 */
function updateRequestMyFreestyleUserInfo(data) {

    data.headers['x-id-token']=getCookie('cJwt', true);

    myAccountUserObj = (usObj && decryptData(usObj, pk, 'object')) || {};
    for (const userData in myAccountUserObj) {
        if (data.body.userInfo[userData] !== undefined) {
            myAccountUserObj[userData] = data.body.userInfo[userData];
        }
    }
    if (data.body.title !== undefined) {

        //salutation
        let salutationValue;
        if((document.getElementById("hcp-de-title-options") !== null) && ($('#hcp-de-title-options :checked').length == 0)){
            salutationValue = '';
            } else {
            salutationValue = radioValue(data.body['title']);
        }
        
        data.body.userInfo['title'] = salutationValue;
        myAccountUserObj['title'] = salutationValue;
    }

    //removed extra data
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['title'];
    

    return data;
}

function onsuccessMyFreestyleUserInfo(data) {
    if (data.errorCode == 0) {
        let tempUsObj = encryptData(myAccountUserObj, pk);
        setCookie('usObj', tempUsObj, 1, true);
        setSessionValues();
        isAPISuccess = true;
        specialityValueRender();
    } else {
        onErrorMyFreestyleUserInfo(data);
    }
}

function onErrorMyFreestyleUserInfo(error) {
    showHideApiError(error);
}

function onCompleteMyFreestyleUserInfo() {
    if (isAPISuccess) {
        initializeUserInfo($(document).find('#myfreestyle-hcpDetails'));
        isAPISuccess = false;
    }
    myAccountUserObj = {};
}

// **************************
// Email & Password Section
// **************************

/**
 * @function
 * Summary: Function that executes before triggering API call
 * Parameters: data -> payload
 */
function updateRequestMyFreestyleEmailPassword(data) {

    data.headers['x-id-token']=getCookie('cJwt', true);
    
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];

    if(data.body['newPassword'] && !data.body['confirmPassword']) {
        data.body['confirmPassword'] = data.body['newPassword'];
    }

    return data;
}

function onSuccessMyFreestyleEmailPassword(data) {
    if (data.errorCode == 0) {
        isAPISuccess = true;
    } else {
        onErrorMyFreestyleEmailPassword(data);
    }
}

function onErrorMyFreestyleEmailPassword(error) {
    showHideApiError(error);
}

function onCompleteMyFreestyleEmailPassword() {
    if (isAPISuccess) {
        initializeUserInfo($(document).find('#myfreestyle-myUserInfo'));
        isAPISuccess = false;
    }
    myAccountUserObj = {};
}