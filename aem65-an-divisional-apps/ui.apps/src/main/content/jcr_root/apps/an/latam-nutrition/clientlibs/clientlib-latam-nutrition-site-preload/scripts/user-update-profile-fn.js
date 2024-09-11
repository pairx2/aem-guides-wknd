// **************************
// My Info Section
// **************************

/**
 * @function
 * Summary: Function that executes before triggering API call
 * Parameters: data -> payload
 */
function requestUserInfo(data){
    let cityName = data.body["city"] ? data.body["city"]: "";
    data.body.userInfo['idType'] = data.body['idType'] || "";
    data.body.userInfo['idNumber'] = data.body['identification'] || "";
    data.body.userInfo['id'] = data.body['id'] || "";
    data.body.additionalProfileProperties['department'] = data.body['department'] || "";
    data.body.additionalProfileProperties['haveChildren'] = data.body['Have_Children__c'] || "";
    data.body.additionalProfileProperties['noChildren'] = data.body['No_Children__c'] || "";
    data.body.additionalProfileProperties['recommendedBy'] = data.body['Recomendación'] || data.body['RecommendedBy__c'] || data.body['Recommended_By__c'] || data.body['Recommended_by__c'] || "";
    data.body.additionalProfileProperties['consumer'] = data.body['consumer'] || data.body['consumer__c'] || data.body['Consumer__c'] || "";
    data.body.contacts.push({'number':data.body['number']});
    data.body.addresses.push({"zipCode":data.body['zipCode'],"country":data.body['country'], "lineOne":data.body.lineOne, "city": cityName});
}

function updateRequestLatamnutritionUserInfo(data) {
    data.body.userInfo = {};
    data.body.additionalProfileProperties = {};
    data.body.contacts =[];
    data.body.addresses = [];
    let successfulLogin = getItemLocalStorage('cJwt',true);
    data.headers['x-id-token'] = successfulLogin;
    data.body.userInfo['firstName'] = data.body['firstName'];
	data.body.userInfo['lastName']  = data.body['lastName'];
    data.body.userInfo['dateOfBirth'] = data.body['dateOfBirth'];
    data.body.userInfo['email'] = data.body['userName'];
    data.body.userInfo['gender'] = data.body['gender'];
    requestUserInfo(data);

    let xAppId = $('[name="x-application-id"]').val();
    switch(xAppId) {
        case 'anensure':
            data.body.additionalProfileProperties['Ensure_Profile__c'] = data.body['Ensure_Profile__c'] || "";
            data.body.additionalProfileProperties['interestedIn'] = data.body['Interested_in_Ensure__c'] || "";
            data.body.additionalProfileProperties['reasonToTake'] = data.body['Ensure_Profile__c'] || "";
            break;
        case 'anpediasure':
            data.body.additionalProfileProperties['Pediasure_Profile__c'] = data.body['Pediasure_Profile__c'] || "";
            data.body.additionalProfileProperties['interestedIn'] = data.body['Interest_in_Pediasure__c'] || "";
            break;
        case 'anglucerna':
            data.body.additionalProfileProperties['Glucerna_Profile__c'] = data.body['Glucerna_Profile__c'] || "";
            data.body.additionalProfileProperties['interestedIn'] = data.body['Interested_in_Glucerna__c'] || "";
            data.body.additionalProfileProperties['diabetesStage'] = data.body['Glucerna_Profile__c'] || "";
            break;
        case 'anmastermama':
            data.body.additionalProfileProperties['Mastermama_Profile__c'] = data.body['Mastermama_Profile__c'] || "";
            data.body.additionalProfileProperties['interestedIn'] = data.body['Interested_in_Mastermama__c'] || "";
            data.body.additionalProfileProperties['reasonToTake'] = data.body['Mom_Interest__c'] || "";
            break;
    }   

    //removed extra data
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];
    delete data.body['zipCode'];
    delete data.body['city'];
    delete data.body['country'];
    delete data.body['dateOfBirth'];
    delete data.body['firstName'];
    delete data.body['lastName'];
    delete data.body['number'];
    delete data.body['id'];
    delete data.body['email'];
    delete data.body['gender'];
    delete data.body['lineOne'];
    delete data.body['identification'];
    delete data.body['idType'];
    delete data.body['Have_Children__c'];
    delete data.body['Recomendación'];
}

function onsuccessLatamnutritionUserInfo(data) {
    if (data.errorCode == 0) {
        if (data.response && data.response.email) {
        	setUsObj(data.response);
        }
  	}
}

function onCompleteLatamnutritionUserInfo() {
    console.log("profile done");
}