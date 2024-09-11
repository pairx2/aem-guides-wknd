function unsubscribeRequestData(unsubscribeData) {
  return buildUnsubscribeRequestData(unsubscribeData);
}


function buildUnsubscribeRequestData(unsubscribeData) {
    let reCaptchaUnsubscribe = $('[name="reCaptchaAPIKey"]').val();
    let subscribeVal = $('[name="subscribe"]').val();
    let captchaValue = unsubscribeData.body["g-recaptcha-response"];
    let firstName = unsubscribeData.body.firstName.trim();
    let lastName = unsubscribeData.body.lastName.trim();

    let unsubData = {
    	"email": unsubscribeData.body.email,
    	"firstName": firstName,
    	"lastName": lastName,
        "requestType": unsubscribeData.body.requestType,
        "node":location.href,
        "subscribe": subscribeVal
      }

    if(captchaValue==="") {
     	 unsubscribeData.headers["x-secret-header"] = reCaptchaUnsubscribe;
  	} else {
     	 unsubData.captchaValue = captchaValue;
        let enterpriseRecaptcha = document.querySelector('input[name="enterpriseRecaptcha"]')?.value
        if(enterpriseRecaptcha === "true") {
          unsubData.captchaType = "ENT";
          unsubData.captchaAction = "submit";
        }
  	}

  unsubscribeData.body = unsubData;
  return unsubscribeData;
}
