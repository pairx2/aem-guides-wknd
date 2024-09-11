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

    //process consents
    consentsArr = getConsentsArray(data);

    //final consents array
    data.body['consents'] = consentsArr;

    //removed extra data
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['marketingeducationemail'];
    delete data.body['marketingsurveyemail'];
    delete data.body['addMarketingconsents'];

    // remove unwanted data from payload
    let exceptionList = $(`[id*='marketingConsent-form'] [name="exceptionList"]`).val();
    removeDataPayload(exceptionList, data.body);

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
        onErrorMyFreestyleCommon(data);
    }
}

/**
 * @function
 * Summary: Function that executes after API call completion
 * Parameters: -
 */
function onCompleteMyFreestyleUserConsent() {
    if (isAPISuccess) {
        initializeUserConsentCheckList($(document).find('#marketingConsent-section'));
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
    myAccountUserObj = (usObj && decryptData(usObj, pk, 'object')) || {};
    for (const userData in data.body.userInfo) {
        if (data.body.userInfo[userData] !== undefined) {
            myAccountUserObj[userData] = data.body.userInfo[userData];
        }
    }

    //salutation
    let salutationValue;
    if (data.body['title'] !== undefined) {
        if(Array.isArray(data.body['title'])) {
            salutationValue = radioValue(data.body['title']);
        } else if (typeof data.body['title'] == "string") {
            salutationValue = data.body['title'];
        }
        data.body.userInfo['title'] = salutationValue;
        myAccountUserObj['title'] = salutationValue;
    }

    //removed extra data
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['title'];

    // remove unwanted data from payload
    let exceptionList = $(`[id*='myUserInfo-update'] [name="exceptionList"]`).val();
    removeDataPayload(exceptionList, data.body);

    return data;
}

function onsuccessMyFreestyleUserInfo(data) {
    if (data.errorCode == 0) {
        let tempUsObj = encryptData(myAccountUserObj, pk);
        setCookie('usObj', tempUsObj, 1, true);
        setSessionValues();
        isAPISuccess = true;
    } else {
        onErrorMyFreestyleCommon(data);
    }
}

function onCompleteMyFreestyleUserInfo() {
    if (isAPISuccess) {
        initializeUserInfo($(document).find('#myfreestyle-myUserInfo-update'));
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
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];

    if(data.body['newPassword'] && !data.body['confirmPassword']) {
        data.body['confirmPassword'] = data.body['newPassword'];
    }

    // remove unwanted data from payload
    let exceptionList = $(`[id*='emailPassword-update'] [name="exceptionList"]`).val();
    removeDataPayload(exceptionList, data.body);

    return data;
}

function onSuccessMyFreestyleEmailPassword(data) {
    if (data.errorCode == 0) {
        isAPISuccess = true;
    } else {
        onErrorMyFreestyleCommon(data);
    }
}

function onCompleteMyFreestyleEmailPassword() {
    if (isAPISuccess) {
        initializeUserInfo($(document).find('#myfreestyle-emailPassword-update'));
        isAPISuccess = false;
    }
    myAccountUserObj = {};
}