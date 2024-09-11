/**
 * MYFREESTYLE - USER REGISTRATION
 **/

/**
 * @function
 * Summary: Called before request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
 function updateRequestLatamnutritionUserRegistration(data) {
  let phoneNumber = data.body['number'];
  let country = data.body["country"] ? data.body["country"] : data.headers['x-country-code'];
  let cityName = data.body["city"] ? data.body["city"]: "";
  data.body.userInfo = {};
  data.body.contacts =[];
  data.body.addresses = [];
  data.body.additionalProfileProperties = {};
  data.body.userInfo['firstName'] = data.body['firstName'];
  data.body.userInfo['lastName']  = data.body['lastName'];
  data.body.userInfo['dateOfBirth'] = data.body['dateOfBirth'];
  data.body.userInfo['userName'] = data.body['userName'];
  data.body.userInfo['password'] = data.body['password'];
  data.body.userInfo['id'] = data.body['id'];
  data.body.userInfo['idType'] = data.body['idType'];
  data.body.userInfo['gender'] = data.body['gender'];
  data.body.contacts.push({'number':phoneNumber});
  data.body.addresses.push({"city": cityName,"country": country});
  data.body.additionalProfileProperties['department'] = data.body['department'];
  data.body.additionalProfileProperties['consumer'] = data.body['consumer'] || data.body['consumer__c'] || data.body['Consumer__c'];
  data.body.additionalProfileProperties['lmsCode'] = data.body['lmsCode'];
  data.body.additionalProfileProperties['nutriSelect'] = data.body['nutriSelect'];
  data.body.additionalProfileProperties['recommendedBy'] = data.body['Recomendación'] || data.body['RecommendedBy__c'] || data.body['Recommended_By__c'] || data.body['Recommended_by__c'];
  data.body.additionalProfileProperties['howDidYouKnowAbout'] = data.body['howDidYouKnowAbout'];
  data.body.additionalProfileProperties['diabetesStage'] = data.body['diabetesStage'];

//process consents
let consentArray = getConsentsArray(data);

//final consents array
data.body['consents'] = consentArray;

//removed extra data
delete data.body['requestType'];
delete data.body['checkbox1'];
delete data.body['g-recaptcha-response'];
delete data.body['node'];
delete data.body['tncAgree'];
delete data.body['marketingeducationemail'];
delete data.body['marketingsurveyemail'];
delete data.body['addMarketingconsents'];
delete data.body['consentsAll'];  
delete data.body['dateOfBirth'];
delete data.body['firstName'];
delete data.body['lastName'];
delete data.body['number'];
delete data.body['password'];
delete data.body['id'];
delete data.body['userName'];
delete data.body['idType'];
delete data.body['country'];
delete data.body['city'];

// encrypt and store data
let regUsObj = {
  'firstName': data.body.userInfo['firstName'] || '' ,
  'lastName': data.body.userInfo['lastName']  || '',
  'number': data.body.contacts['number'] || '',
  'dateOfBirth': data.body.userInfo['dateOfBirth'] || '',
  'email': data.body.userInfo['userName'] || '',
  'consents': data.body['consents'] || ''
}

setUsObj(regUsObj);
  console.log("updated data", data);

//final registration data
return data;
}

function gtmCountry() {
	let gtm_countryCode = $("body").attr("data-country-code") ? $("body").attr("data-country-code").toLowerCase() : $('[name="x-country-code"]').val().toLowerCase();
	let gtm_countryList = $('[name="gtm_country"]').val();
	let countryCount = 0;
	if(gtm_countryList != undefined) {
		if(gtm_countryList.indexOf(",") > -1) {
			let gtmCountrySplit = gtm_countryList.toLowerCase().split(",");
			for(let i in gtmCountrySplit) {
				if(gtmCountrySplit[i] === gtm_countryCode) {
					countryCount++;
				}
			}
		}
		else if(gtm_countryList.toLowerCase() === gtm_countryCode) {
			countryCount++;
		}
	}
	return countryCount;
}

function onBeforeLatamnutritionUserRegistration(data) {
	let countryStatus = gtmCountry();
	if(countryStatus != 0) {
		dataLayer.push({
			'formType': 'Registration_form',
			'event': 'clickToSendRegistrationData'
		});
	}
}

/**
* @function
* Summary: Called on successful login to process response. 
* Parameters: data {Object} is the API response.
*/
function onSuccessLatamnutritionUserRegistration(data) {
	let countryStatus = gtmCountry();
	if (data.errorCode !== 0) {
		onErrorLatamnutritionUserRegistration(data);
		if(countryStatus != 0) {
			dataLayer.push({
				'formType': 'Registration_form',
				'event': ' registrationNotCompleted'
			});
		}
	}
	else {
		if(countryStatus != 0) {
			dataLayer.push({
				'formType': 'Registration_form',
				'event': 'registrationCompleted'
			});
		}
	}
}

/**
* @function
* Summary: Called on error response of login. 
* Parameters: error {Object} is the API response.
*/
function onErrorLatamnutritionUserRegistration(error) {
deleteCookie('pk', true);
deleteCookie('usObj', true);
deleteCookie('usFn', true);
removeItemLocalStorage('cJwt', true);
removeItemLocalStorage('userDetails', false);
}

function registerprformdataupdate(data) {
	let identificationData = data.body.identification;
	if(identificationData != undefined && identificationData.length) {
		data.body.identification = [];
		for(let i in identificationData) {
			let identificationObj = {};
			identificationObj[identificationData[i].consentName] = identificationData[i].consentValue;
			data.body.identification.push(identificationObj);
		}
	}
}