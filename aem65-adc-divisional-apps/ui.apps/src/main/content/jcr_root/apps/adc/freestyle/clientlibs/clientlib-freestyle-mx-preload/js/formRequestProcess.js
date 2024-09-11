// Function for Subscribe form request processing
function subscribeRequestProcess(data) {

  let consentArray = [];
  const personOptOut = stringToBool(data.body.personOptOut);
  const hasOptedOut = stringToBool(data.body.hasOptedOut);

  consentArray = formatCheckboxValues(data.body.consents);

  const formattedData = {
		"userInfo": {
			"email": data.body.email,
            "firstName": data.body.firstName,
            "lastName": data.body.lastName,
            "personOptOut": personOptOut,
            "hasOptedOut" : hasOptedOut,
            "emailOptIn": consentArray.emailOptIn,
            "leadSource": data.body.leadSource,
            "accountSource": data.body.accountSource,
          	"countryCode": data.body.countryCode,
            "g-recaptcha-response":  data.body["g-recaptcha-response"]
      	},
      "registrationType": "subscribe"
  }

  data.body = formattedData;
  return data;
}

// Function for unsubscribe form request processing
function unsubscribeRequestProcess(data) {

    const personOptOut = stringToBool(data.body.personOptOut);
    const hasOptedOut = stringToBool(data.body.hasOptedOut);

    const formattedData = {
       "userInfo":{
			"email": data.body.email,
            "personOptOut": personOptOut,
            "hasOptedOut" : hasOptedOut,
            "emailOptIn": data.body.emailOptIn,
            "leadSource": data.body.leadSource,
            "accountSource": data.body.accountSource,
          	"countryCode": data.body.countryCode,
            "g-recaptcha-response":  data.body["g-recaptcha-response"]
      	},
       "registrationType":"unsubscribe"
    }
    data.body = formattedData;
    return data;
}

//To restructure the checkbox data
function formatCheckboxValues(element) {

  const consentJSON = {};

  $.each(element, function(i, item) {
    consentJSON[item.consentName] = item.consentValue;
  });

  return consentJSON;
}

//To convert String values to boolean type
function stringToBool(stringValue){
    if (stringValue.toLowerCase() == "true"){
        return true;
    }else if(stringValue.toLowerCase() == "false"){
        return false;
    }else {
        return stringValue;
    }
}
