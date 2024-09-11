let formattedData;
let reCaptchaKey;
let userProductInterested;

function lookupMyselfRequestProcess(data) {
    let date_format = $('[name="dob_myself"]').closest('.a-date-picker').attr('data-date-format');
    data.body.dateOfBirth = formatDateofBirth(data.body.dob_myself, date_format);
    return buildLookupRequestData(data);
}

function lookupSomeoneRequestProcess(data) {
  let date_format = $('[name="dob_someone"]').closest('.a-date-picker').attr('data-date-format');
  data.body.dateOfBirth = formatDateofBirth(data.body.dob_someone, date_format);
  return buildLookupRequestData(data);
}

function buildLookupRequestData(data) {
  let dob = new Date(data.body.dateOfBirth);
  let userType = "Patient";
  let mydate = new Date(), currdate = new Date(), setDate = new Date();
  mydate.setFullYear(dob.getUTCFullYear(), dob.getUTCMonth(), dob.getUTCDate());
  setDate.setFullYear(mydate.getUTCFullYear() + 18, dob.getUTCMonth(), dob.getUTCDate());
  if ((setDate - currdate) > 0) {
      userType = "Minor";
  }

  let dateOfBirth = data.body.dateOfBirth;
  reCaptchaKey = $('[name="reCaptchaAPIKey"]').val();
  let captchaValue = data.body["g-recaptcha-response"];

  const productType = typeof data.body.productType == 'string'? data.body.productType : data.body.productType.filter(x=>x.consentValue===true);
  let productInterested = getProductInterested(productType);

  let utm_source = getParameterByName("utm_source");
  let formAcquisitionProgram = $('[name="acquisitionProgram"]').val();
  const ComenzarMiFreeStyle =  $('[name="ComenzarMiFreeStyle"]').val() ?? false;
  if(!formAcquisitionProgram || formAcquisitionProgram.length == 0){
    formAcquisitionProgram = getFormAcquisitionProgram(utm_source);
  }

let dayOneProgramEnrollmentSource = getDayoneEnrollmentSource(utm_source);

  formattedData = {
      "userInfo" : {
    	"email": data.body.email,
    	"firstName": data.body.firstName,
    	"lastName": data.body.lastName,
        "gender": data.body.gender,
        "zipCode": data.body.zipCode,
        "dob": dateOfBirth,
        "optInVersion":"Email Only",
        "marketingOptIn": "Opt-In",
        "acquisitionProgram": formAcquisitionProgram,
        "cgFirstName": data.body.yourFirstName === undefined ? "" : data.body.yourFirstName,
        "cgLastName": data.body.yourLastName === undefined ? "" : data.body.yourLastName,
        "cgAgeConsent": data.body.yourFirstName === undefined ? "" : "Yes",
        "userType": userType,
        "dayOneProgramEnrollmentSource": ComenzarMiFreeStyle ? ComenzarMiFreeStyle : dayOneProgramEnrollmentSource,
        "productInterested": productInterested,
        "dayOneProgramStatus": "Enrolled",
        "dayOneProgramConsent": "Opt-In",
        "leadSource": "Abbott/FreeStyle Website",
        "accountOrigin": "EC3 Website"
      },
      "registrationType":"accountcreate"
  }

    let lookupData = {
        "userInfo": {
            "email": formattedData.userInfo.email,
            "firstName": formattedData.userInfo.firstName,
            "lastName": formattedData.userInfo.lastName,
            "dob": formattedData.userInfo.dob,
            "eCardType":"eFSO"
        }
    }

  if(captchaValue==="") {
      data.headers["x-secret-header"] = reCaptchaKey;
  } else {
      lookupData.userInfo.captchaValue = captchaValue;
      let enterpriseRecaptcha = document.querySelector('input[name="enterpriseRecaptcha"]')?.value
      if (enterpriseRecaptcha === "true") {
          lookupData.userInfo.captchaType = "ENT";
          lookupData.userInfo.captchaAction = "submit";
      }
  }

  data.body = lookupData;

  return data;
}

function onSuccessUserLookup(data) {
    $("#myselfForm .o-form-container__error-msg").hide();
    $("#someOneForm .o-form-container__error-msg").hide();
    userProductInterested = data.response.accountInfo.ProductInterested;
    formattedData = {
        "userInfo" : {
                "email": formattedData.userInfo.email,
                "firstName": formattedData.userInfo.firstName,
                "lastName": formattedData.userInfo.lastName,
                "gender": formattedData.userInfo.gender,
                "zipCode": formattedData.userInfo.zipCode,
                "dob": formattedData.userInfo.dob,
                "optInVersion": formattedData.userInfo.optInVersion,
                "marketingOptIn": formattedData.userInfo.marketingOptIn,
                "acquisitionProgram": formattedData.userInfo.acquisitionProgram,
                "cgFirstName": formattedData.userInfo.cgFirstName,
                "cgLastName": formattedData.userInfo.cgLastName,
                "cgAgeConsent": formattedData.userInfo.cgAgeConsent,
                "userType": formattedData.userInfo.userType,
                "dayOneProgramEnrollmentSource": formattedData.userInfo.dayOneProgramEnrollmentSource,
                "productInterested": formattedData.userInfo.productInterested,
                "dayOneProgramStatus": formattedData.userInfo.dayOneProgramStatus,
                "dayOneProgramConsent": formattedData.userInfo.dayOneProgramConsent
        },
        "registrationType":formattedData.registrationType
    }
    

    $('#create_account').trigger('click');
}

function onErrorUserLookup(data) {
    userProductInterested = undefined; //reset value
    if(data?.response?.i18nMessageKey === "LOOKUP-USER-1001") {
        $("#myselfForm .o-form-container__error-msg").hide();
        $("#someOneForm .o-form-container__error-msg").hide();
        $('#create_account').trigger('click');
    } else {
        $("#myselfForm .o-form-container__error-msg").show();
        $("#someOneForm .o-form-container__error-msg").show();
    }
}

// Function for signup form request processing
function signupRequestProcess(data) {
  let captchaValue = data.body["g-recaptcha-response"];
  if(captchaValue==="") {
      data.headers["x-secret-header"] = reCaptchaKey;
  } else {
      formattedData.userInfo.captchaValue = captchaValue;
      let enterpriseRecaptcha = document.querySelector('input[name="enterpriseRecaptcha"]')?.value
      if (enterpriseRecaptcha === "true") {
          formattedData.userInfo.captchaType = "ENT";
          formattedData.userInfo.captchaAction = "submit";
      }
  }

  data.body = formattedData;

  return data;
}

function onSuccessUserSignup(data) {
    $("#myselfForm .o-form-container__error-msg").hide();
    $("#someOneForm .o-form-container__error-msg").hide();

    let el;
    if (data.response.accountInfo.ProductInterested === userProductInterested) {
        $("#signup_message").show();
        $("#thankyou_message").hide();
        $("#thankyou_message_fs14").hide();
        $("#thankyou_message_fs3").hide();
        $("#thankyou_message_fs3_plus_system").hide();
        el = document.getElementById("signup_message");
    } else if (data.response.accountInfo.ProductInterested.indexOf("14")>-1) {
        $("#thankyou_message_fs14").show();
        $("#thankyou_message").hide();
        $("#signup_message").hide();
         $("#thankyou_message_fs3").hide();
         $("#thankyou_message_fs3_plus_system").hide();
        el = document.getElementById("thankyou_message_fs14");
    } else if (data.response.accountInfo.ProductInterested.indexOf("3")>-1) {
      const isThreePlusSystem = data.response.accountInfo.ProductInterested.indexOf("3 Plus system")>-1;
      el =  fsl3product(isThreePlusSystem);
    } else {
        $("#thankyou_message").show();
        $("#thankyou_message_fs14").hide();
        $("#signup_message").hide();
        $("#thankyou_message_fs3").hide();
        $("#thankyou_message_fs3_plus_system").hide();
        el = document.getElementById("thankyou_message");
    }

    el.scrollIntoView();
    window.scrollBy(0, -100);
    $("#getstarted").hide();
}
function fsl3product(isThreePlusSystem) {
    $( isThreePlusSystem ? "#thankyou_message_fs3_plus_system" : "#thankyou_message_fs3").show();
    $("#thankyou_message").hide();
    $("#signup_message").hide();
    $("#thankyou_message_fs14").hide();
    const elm = document.getElementById(isThreePlusSystem ? "thankyou_message_fs3_plus_system" : "thankyou_message_fs3");
    return elm;
}
function onErrorUserSignup(data) {
    $("#myselfForm .o-form-container__error-msg").show();
    $("#someOneForm .o-form-container__error-msg").show();
}

function onBeforeCallUserSignup(data) {
    showBtnSpinner("submit_myself");
    showBtnSpinner("submit_someone");
}

function onCompleteUserSignup(data) {
    hideBtnSpinner("submit_myself");
    hideBtnSpinner("submit_someone");
}

function showBtnSpinner(id) {
    let btnSubmit = document.getElementById(id);
    let btnSpinner = btnSubmit.closest('.a-button');
    btnSpinner.classList.add('a-button--spinner');
    btnSubmit.disabled = true;
}

function hideBtnSpinner(id) {
    let btnSubmit = document.getElementById(id);
    let btnSpinner = btnSubmit.closest('.a-button');
    btnSpinner.classList.remove('a-button--spinner');
    btnSubmit.disabled = false;
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  let results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) {
    return ''
  } else {
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
}

const getFormAcquisitionProgram = (utm_source) => {
    let acquisitionProgramName;
    if (utm_source === "DME") {
        acquisitionProgramName = "DME Program";
    } else {
        acquisitionProgramName = "GSP Program";
    }
    return acquisitionProgramName;
}

const getDayoneEnrollmentSource = (utm_source) => {
    let enrollmentSourcename;
    if (utm_source === "DME") {
        enrollmentSourcename = "Website-DME";
    } else {
        if (!!utm_source) {
            enrollmentSourcename = "Website-PhysicalSample-" + utm_source;
        } else {
            enrollmentSourcename = "Website-PhysicalSample";
        }
    }
    return enrollmentSourcename;
}

const getProductInterested = (productType) => {
    let ptInterested;
    if(productType && productType.length>0 ){
        if(typeof productType == 'string'){
            ptInterested =  productType;
        } else {
            if(productType[0]){
              ptInterested = productType[0].consentName;
            }
        }
    }
    return ptInterested;
}