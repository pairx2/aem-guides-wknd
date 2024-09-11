let formattedData;
let reCaptchaKeyFsl;
let userProductInterested;
let currentDate;

function lookupRequestProcess(data) {
  return buildLookupRequestData(data);
}


function buildLookupRequestData(data) {


  currentDate = (new Date()).toISOString().split('T')[0];


  reCaptchaKeyFsl = $('[name="reCaptchaAPIKey"]').val();
  let formAcquisitionProgram = $('[name="acquisitionProgram"]').val();
  if(formAcquisitionProgram == null || formAcquisitionProgram == undefined || formAcquisitionProgram.length == 0){
    formAcquisitionProgram = "FSL.US Signup" ;
}
  const captchaValue = data.body["g-recaptcha-response"];

 let previousMeter =  data.body.PreviousMeter;
  formattedData = {
      "userInfo" : {
    	"email": data.body.email,
    	"firstName": data.body.firstName,
    	"lastName": data.body.lastName,
        "previousMeter" :  previousMeter,
        "gender":"Unknown",
        "accountId": "",
        "optInVersion": "Email Only",
        "marketingOptIn": "Opt-In",
        "type":"Patient",
        "preferredContactMethod":"Email",
        "SMSOptIn":"Opt-Out",
        "rxRetrievalOptIn":"Opt-Out",
        "insuranceType":"Unknown",
        "insurancesubType":"None",
        "acquisitionProgram": formAcquisitionProgram,
        "acquisitionDate": currentDate,
        "eligiblitySelfCertification":"",
        "leadSource": "Abbott/FreeStyle Website",
        "accountOrigin": "EC3 Website"
                 },
    "registrationType": "accountcreate",
    "subRegistrationType": "fslussignup"
}

  let lookupData = {
    "requestType": "fslussignup",
        "userInfo" : {
            "email": formattedData.userInfo.email,
            "firstName": formattedData.userInfo.firstName,
            "lastName": formattedData.userInfo.lastName
      }
  }

  if(captchaValue==="") {
      data.headers["x-secret-header"] = reCaptchaKeyFsl;
  } else {
      lookupData.userInfo.captchaValue = captchaValue;
      let enterpriseRecaptcha = document.querySelector('input[name="enterpriseRecaptcha"]')?.value
      if(enterpriseRecaptcha === "true") {
        lookupData.userInfo.captchaType = "ENT";
        lookupData.userInfo.captchaAction = "submit";
      }
  }

  data.body = lookupData;

  return data;
}

function onSuccessUserLookup(data) {
    hideSuccessFailureHome();
    let rxRetrievalOptIn = data.response.accountInfo.RxROptIn==undefined?formattedData.userInfo.rxRetrievalOptIn:data.response.accountInfo.RxROptIn;
    let accountID = data.response.accountInfo.AccountId==undefined?'':data.response.accountInfo.AccountId;
    if(data.status)
    {
        formattedData = {
            "userInfo" : {
                    "email": formattedData.userInfo.email,
                    "firstName": formattedData.userInfo.firstName,
                    "lastName": formattedData.userInfo.lastName,
                    "previousMeter" :  formattedData.userInfo.previousMeter,
                    "accountId": accountID,
                    "marketingOptIn": formattedData.userInfo.marketingOptIn,
                    "optInVersion": formattedData.userInfo.optInVersion,
                    "type":formattedData.userInfo.type,
                    "acquisitionProgram":  formattedData.userInfo.acquisitionProgram
            },

            "registrationType": formattedData.registrationType,
            "subRegistrationType":formattedData.subRegistrationType
        }
    } else {
        formattedData = {
            "userInfo" : {
                    "email": formattedData.userInfo.email,
                    "firstName": formattedData.userInfo.firstName,
                    "lastName": formattedData.userInfo.lastName,
                    "previousMeter" :  formattedData.userInfo.previousMeter,
                    "gender": formattedData.userInfo.gender,
                    "accountId":formattedData.userInfo.accountId,
                    "optInVersion": formattedData.userInfo.optInVersion,
                    "marketingOptIn": formattedData.userInfo.marketingOptIn,
                    "type":formattedData.userInfo.type,
                    "preferredContactMethod":formattedData.userInfo.preferredContactMethod,
                    "SMSOptIn":formattedData.userInfo.SMSOptIn,
                    "rxRetrievalOptIn":rxRetrievalOptIn,
                    "insuranceType":formattedData.userInfo.insuranceType,
                    "insurancesubType":formattedData.userInfo.insurancesubType,
                    "acquisitionProgram": formattedData.userInfo.acquisitionProgram,
                    "acquisitionDate": currentDate,
                    "eligiblitySelfCertification":formattedData.userInfo.eligiblitySelfCertification,
                    "leadSource": formattedData.userInfo.leadSource,
                    "accountOrigin": formattedData.userInfo.accountOrigin
            },
            "registrationType": formattedData.registrationType,
            "subRegistrationType":formattedData.subRegistrationType
        }
    }
    $('#create_account').trigger('click');
}

function onErrorUserLookup(data) {
    if(!data?.status){
        hideSuccessFailureHome();
        $('#create_account').trigger('click');
    }

}

// Function for signup form request processing
function signupRequestProcess(data) {
  let captchaValue = data.body["g-recaptcha-response"];
  if(captchaValue==="") {
      data.headers["x-secret-header"] = reCaptchaKeyFsl;
  } else {
      formattedData.userInfo.captchaValue = captchaValue;
      let enterpriseRecaptcha = document.querySelector('input[name="enterpriseRecaptcha"]')?.value
      if(enterpriseRecaptcha === "true") {
        formattedData.userInfo.captchaType = "ENT";
        formattedData.userInfo.captchaAction = "submit";
      }
  }

  data.body = formattedData;

  return data;
}

function onSuccessUserSignup(data) {
    hideSuccessFailureHome();
    sessionStorage.firstName = formattedData.userInfo.firstName;
    sessionStorage.lastName = formattedData.userInfo.lastName;
    sessionStorage.email = formattedData.userInfo.email;
    sessionStorage.previousMeter = formattedData.userInfo.previousMeter;
    sessionStorage.acquisitionProgramName = formattedData.userInfo.acquisitionProgram;
    sessionStorage.success = 'success';
    setCookie('signUpSuccess', 1, '');
}

function onErrorUserSignup(data) {
    $("#submit_form .o-form-container__error-msg").show();
    $("#fsllookup .o-form-container__error-msg").hide();
    $("#fsllookup .o-form-container__success-msg").hide();
    $("#submit_form .o-form-container__success-msg").hide();
}

function hideSuccessFailureHome(){
    $("#submit_form .o-form-container__error-msg").hide();
    $("#fsllookup .o-form-container__error-msg").hide();
    $("#fsllookup .o-form-container__success-msg").hide();
    $("#submit_form .o-form-container__success-msg").hide();
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    let results = regex.exec(url);
    if (!results) return '';
    if (!results[2]) {
      return ''
    } else {
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
  }

//function to setCookie
function setCookie(cname, cvalue, exdays) {
	let expires = "";
	if (exdays !== '') {
		let d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		expires = "expires="+ d.toUTCString();
	}
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;Secure;";
}
