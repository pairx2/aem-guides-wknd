let mfsFormattedData;
let reCaptchaKeyMfs;
let mfsProductInterested;
let caregiverAgeConsent;
let programConsent;
let previousMeter;
let insuranceType;
let smsOptIn;
let phone;
let diabetestype;
let isExrFormVersion;
let telehealth;
let insurancesubType;
let isRedeemed;
let isExpired;
let prevProductInterested;
let apiregister;
let utm_source;
let medicare ;
let productIntrestedOptionOne;
let productIntrestedOptionTwo;
function mfsLookupRequestProcess(mfsdata) {
   return buildmfsLookupRequestData(mfsdata);
}

function buildmfsLookupRequestData(mfsdata) {
   showBtnSpinner("mfs_submit_placeholder");

   utm_source = getParameterByName("utm_source");
   reCaptchaKeyMfs = $('[name="reCaptchaAPIKey"]').val();
   let captchaValue = mfsdata.body["g-recaptcha-response"];
   apiregister =  $('[name="apiregister"]').val();
   medicare = $('[name="medicare"]').val();
   let customerType = "Patient";
   let type = patientType();
   let firstName, lastName, email, gender, DOB;
   if (type === 'minor') {
      firstName = $('[name="fname"]').val();
      lastName = $('[name="lname"]').val();
      email = $('[name="email"]').val();
      phone = $('[name="patient_phone"]').val();
      diabetestype = getdropdownValue("typeofdiabetes");
      gender = getdropdownValue("gender");
      let date_of_birth = $('[name="dob"]').val();
      let date_format = $('[name="dob"]').attr('placeholder');
      DOB = formatDateofBirth(date_of_birth, date_format);
   } else if (type === 'Patient') {
      firstName = $('[name="minor_fname"]').val();
      lastName = $('[name="minor_lname"]').val();
      email = $('[name="caregiver_email_id"]').val();
      phone = $('[name="caregiver_phone"]').val();
      diabetestype =getdropdownValue("someonediabetestype");
      gender = getdropdownValue("minor_gender");
      let date_of_birth = $('[name="minor_dob"]').val();
      let date_format = $('[name="minor_dob"]').attr('placeholder');
      DOB = formatDateofBirth(date_of_birth, date_format);
      let validAge = validateAge(DOB, 18);
      if (!validAge) {
         customerType = "Minor";
      }
   }
   if (phone) {
      phone = phone.replace(/-/g, "");
   }

   let primaryZipPostalCode = $('[name="zip"]').val();

   previousMeter = getdropdownValue("PreviousMeter");
   insuranceType = getdropdownValue("insuranceType");
   insuranceType= insuranceType.split(',');
   insurancesubType = " ";
   const kaiserSubTypeDisable = getkaiserSubTypeDisable();
   getinsuraneSubType(kaiserSubTypeDisable);
   insurancesubType = insurancesubType.toString();
   programConsent = getProgramConsent();
   caregiverAgeConsent =  getcaregiverAgeConsent();
   mfsProductInterested = $('[name="deviceType"]').val();
   let caregiverFirstName = $("#caregiver_fname").val().trim();
   let caregiverLastName = $("#caregiver_lname").val().trim();
   let acquisitionProgram = $('[name="acquisitionProgram"]').val();
   let Day1ProgramEnrollmentSource = $('[name="Day1ProgramEnrollmentSource"]').val();
   let productSelected = $("input:radio[name=productinterested]:checked").val();
   productIntrestedOptionOne = $('input[name="productinterested"]').eq(0).val();
   productIntrestedOptionTwo = $('input[name="productinterested"]').eq(1).val();
   smsOptIn = $('[name="smsOptIn"]').val();
   isExrFormVersion = getERXVersion();
   telehealth = getItemLocalStorage('telehealth');

   if (!!productSelected) {
      mfsProductInterested = productSelected;
   }else{
      productIntrestedOptionTwo = mfsProductInterested;
   }
   let urlCampaign = window.location.href;
   let campaign;
   if (urlCampaign?.includes("?")) {
      campaign = campaningId();
      sessionStorage.campaignParameters = campaign;
   }

   Day1ProgramEnrollmentSource = gettelehealthDay1ProgramEnrollmentSource(Day1ProgramEnrollmentSource) || Day1ProgramEnrollmentSource;

   if (!(utm_source == null || utm_source == undefined || utm_source.length == 0)) {
      Day1ProgramEnrollmentSource = Day1ProgramEnrollmentSource + "-" + utm_source;
   }

   let optInVersion = getOptinVersion();

   mfsFormattedData =
   {
      "programDetail": {
         "productInterested": mfsProductInterested
      },
      "userInfo": {
         "firstName": firstName,
         "lastName": lastName,
         "dateOfBirth": DOB,
         "gender": gender,
         "email": email,
         "addressInfo": {
            "zipCode": primaryZipPostalCode
         },
         "phoneNumber": phone

      },
      "userType": customerType,
      "customerType": customerType,
      "caregiverFirstName": caregiverFirstName,
      "caregiverLastName": caregiverLastName,
      "acquisitionProgram": acquisitionProgram,
      "previousMeter": previousMeter,
      "freeStyleDay1Program": "",
      "day1ProgramEnrollmentSource": Day1ProgramEnrollmentSource,
      "insurancesubType": insurancesubType,
      "insuranceType": insuranceType.toString(),
      "marketingOptIn": "Opt-In",
      "optInVersion": optInVersion,
      "consents": [
         {
            "consentName": "program",
            "consentValue": programConsent
         },
         {
            "consentName": "caregiverAgeConsent",
            "consentValue": caregiverAgeConsent
         }
      ]
   }

   let lookupMfsData = {
      "requestType": "hennessy",
      "programDetail": {
         "productInterested": mfsProductInterested
      },
      "userInfo": {
         "firstName": mfsFormattedData.userInfo.firstName,
         "lastName": mfsFormattedData.userInfo.lastName,
         "dateOfBirth": mfsFormattedData.userInfo.dateOfBirth,
         "gender": mfsFormattedData.userInfo.gender,
         "email": mfsFormattedData.userInfo.email,
         "phoneNumber": mfsFormattedData.userInfo.phoneNumber
      },
      "customerType": mfsFormattedData.customerType,
      "caregiverFirstName": mfsFormattedData.caregiverFirstName,
      "caregiverLastName": mfsFormattedData.caregiverLastName,
      "acquisitionProgram": mfsFormattedData.acquisitionProgram,
      "consents": [
         {
            "consentName": "program",
            "consentValue": programConsent
         },
         {
            "consentName": "caregiverAgeConsent",
            "consentValue": caregiverAgeConsent
         }
      ]
   }

   if (captchaValue === "") {
      mfsdata.headers["x-secret-header"] = reCaptchaKeyMfs;
   } else {
      lookupMfsData.userInfo.captchaValue = captchaValue;
      let enterpriseRecaptcha = document.querySelector('input[name="enterpriseRecaptcha"]')?.value
      if(enterpriseRecaptcha === "true") {
        lookupMfsData.userInfo.captchaType = "ENT";
        lookupMfsData.userInfo.captchaAction = "submit";
      }
   }
   mfsdata.body = lookupMfsData;

   return mfsdata;
}

const patientType = () => $("input:radio[name=for_whom]:checked").val() == null || $("input:radio[name=for_whom]:checked").val() == undefined ? "minor" : $("input:radio[name=for_whom]:checked").val();

async function onSuccessMfsUserLookup(mfsdata) {
   $("#myfreestyle_form .o-form-container__error-msg").hide();
   $("#myfreestyle_form .o-form-container__success-msg").hide();
   const getMultiFieldsValue = {};
   const multiFields = document.querySelectorAll(`[data-select="multi"]`);
   multiFields?.forEach(elm => {
         const fieldsName = elm.getAttribute('name');
         const getSelectedValues = $(`[name="${fieldsName}"]`)?.val()?.join(';') ?? '';
         getMultiFieldsValue[fieldsName] = getSelectedValues;
   });
   if (mfsdata.status) {
      mfsFormattedData = {
         "registrationType": "Program",
         "subRegistrationType": "hennessy",
         "userInfo": {
            "firstName": mfsFormattedData.userInfo.firstName,
            "lastName": mfsFormattedData.userInfo.lastName,
            "dateOfBirth": mfsFormattedData.userInfo.dateOfBirth,
            "gender": mfsFormattedData.userInfo.gender,
            "userType": mfsFormattedData.userType,
            "customerType": mfsFormattedData.userType,
            "addressInfo": {
               "zipCode": mfsFormattedData.userInfo.addressInfo.zipCode
            },
            "phoneNumber": mfsFormattedData.userInfo.phoneNumber,
            "email": mfsFormattedData.userInfo.email
         },
         "programDetail": {
            "productInterested": mfsProductInterested
         },
         "additionalProfileProperties": {
            "caregiverFirstName": mfsFormattedData.caregiverFirstName,
            "caregiverLastName": mfsFormattedData.caregiverLastName,
            "acquisitionProgram": mfsFormattedData.acquisitionProgram,
            "freeStyleDay1Program": mfsFormattedData.freeStyleDay1Program,
            "day1ProgramEnrollmentSource": mfsFormattedData.day1ProgramEnrollmentSource,
            "insurancesubType": mfsFormattedData.insurancesubType,
            "insuranceType": mfsFormattedData.insuranceType,
            "marketingOptIn": mfsFormattedData.marketingOptIn,
            "optInVersion": mfsFormattedData.optInVersion,
            "previousMeter": mfsFormattedData.previousMeter,
            "diabetesConfidence": ""
         },
         "consents": mfsFormattedData.consents
      }
      updateExsistingUserValue(mfsdata,getMultiFieldsValue);
   } else {
      mfsFormattedData = {
         "registrationType": "Program",
         "subRegistrationType": "hennessy",
         "programDetail": {
            "productInterested": mfsProductInterested
         },
         "userInfo": {
            "firstName": mfsFormattedData.userInfo.firstName,
            "lastName": mfsFormattedData.userInfo.lastName,
            "dateOfBirth": mfsFormattedData.userInfo.dateOfBirth,
            "gender": mfsFormattedData.userInfo.gender,
            "email": mfsFormattedData.userInfo.email,
            "addressInfo": {
               "zipCode": mfsFormattedData.userInfo.addressInfo.zipCode
            },
            "phoneNumber": mfsFormattedData.userInfo.phoneNumber,
            "userType": mfsFormattedData.userType,
            "customerType": mfsFormattedData.userType
         },
         "caregiverFirstName": mfsFormattedData.caregiverFirstName,
         "caregiverLastName": mfsFormattedData.caregiverLastName,
         "acquisitionProgram": mfsFormattedData.acquisitionProgram,
         "freeStyleDay1Program": mfsFormattedData.freeStyleDay1Program,
         "day1ProgramEnrollmentSource": mfsFormattedData.day1ProgramEnrollmentSource,
         "insurancesubType": mfsFormattedData.insurancesubType,
         "insuranceType": mfsFormattedData.insuranceType,
         "marketingOptIn": mfsFormattedData.marketingOptIn,
         "optInVersion": mfsFormattedData.optInVersion,
         "previousMeter": mfsFormattedData.previousMeter,
         "consents": mfsFormattedData.consents
      }

   }
   if (!!isExrFormVersion) {
      mfsFormattedData['additionalProfileProperties'].eRxVersion = isExrFormVersion;
      addTelehealthChoice();
   }

   if (mfsdata.status) {
      let dedupeStatus = getResponseAttributeStatus(mfsdata.response.dedupeStatus);
      let programStatus = getResponseAttributeStatus(mfsdata.response.programStatus);
      isRedeemed = getResponseAttributeStatus(mfsdata.response.isRedeemed);
      isExpired =getResponseAttributeStatus(mfsdata.response.isExpired);
      if (dedupeStatus && programStatus == "Enrolled") {
         callEnrolledStatus(isRedeemed,isExpired,mfsFormattedData);
      } else {
         callUnEnrolledStatus(mfsFormattedData);
      }
   } else {
      callUnEnrolledStatus(mfsFormattedData);
   }
}

const callUnEnrolledStatus= (mfsFormattedData) => {
   if(!!apiregister){
      callRegister(mfsFormattedData);
   }else{
   $('#create_account').trigger('click');
   }
}

const callEnrolledStatus = (isRedeemed,isExpired,mfsFormattedData) => {
   let ThankYouPage = $('[name="thankyou-page-I"]').val();
   if (isRedeemed || isExpired) {
      callUnEnrolledStatus(mfsFormattedData);
   } else {
      window.location.href = ThankYouPage;
   }
}

function onErrorMfsUserLookup(mfsdata) {
   if (!mfsdata?.status) {
      $("#myfreestyle_form .o-form-container__success-msg").hide();
      $("#formErrorPopup").show().addClass('show');
      $('#create_account').trigger('click');
      onCompleteMfsUserSignup(mfsdata);
   }

}

function callRegister(mfsData) {
   let siteKey = $("body").attr("data-site-key");
   let applicationid =  document.querySelector('input[name="x-application-id"]').value ;
   let countrycode =   document.querySelector('input[name="x-country-code"]').value
   let  prefferedlang = document.querySelector('input[name="x-preferred-language"]').value
  let enterpriseRecaptcha = document.querySelector('input[name="enterpriseRecaptcha"]')?.value;
   prefferedlang = prefferedlang.substring(0, 2);
   let jsonHeader =  {
     "cache-control": "no-cache",
     "Content-Type": "application/json",
     "x-application-id": applicationid,
     "x-country-code": countrycode,
     "x-preferred-language": prefferedlang,
 }
      resetRecaptcha();
  if(enterpriseRecaptcha === 'true') {
   callEnterpriseRecaptcha(siteKey,jsonHeader,mfsData);
  } else {
   callRecaptcha(siteKey,jsonHeader,mfsData);
  }
}

const callRecaptcha = (siteKey,jsonHeader,mfsData) => {
   grecaptcha.ready(function () {
      grecaptcha.execute(siteKey, {
        action: 'homepage'
      }).then(function (token) {
        if (token === "") {
          jsonHeader["x-secret-header"] = reCaptchaKeyMfs;
        } else {
          mfsData.userInfo.captchaValue = token;
        }
        let options = {
          method: 'POST',
          mode: 'cors',
          headers: jsonHeader,
          body: JSON.stringify(mfsData),
        };
        fetch(apiregister, options)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Something went wrong');
            }
          })
          .then((responseJson) => {
            onSuccessMfsUserSignup(responseJson);
          })
          .catch((error) => {
            onErrorMfsUserSignup(error);
          });

      });
    });
}

const callEnterpriseRecaptcha = (siteKey,jsonHeader,mfsData) => {
   grecaptcha.enterprise.ready(function () {
      grecaptcha.enterprise.execute(siteKey, {
        action: 'homepage'
      }).then(function (token) {
        if(token==="") {
          jsonHeader["x-secret-header"] = reCaptchaKeyMfs;
        } else {
          mfsData.userInfo.captchaValue = token ;
          mfsData.userInfo.captchaType = "ENT";
          mfsData.userInfo.captchaAction = "submit";
        }
        let options = {
          method: 'POST',
          mode: 'cors',
          headers: jsonHeader,
          body: JSON.stringify(mfsData),
        };
        fetch(apiregister, options)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Something went wrong');
            }
          })
          .then((responseJson) => {
            onSuccessMfsUserSignup(responseJson);
          })
          .catch((error) => {
            onErrorMfsUserSignup(error);
          });

      });
    });
}


const getResponseAttributeStatus = (responseattr) => responseattr== undefined ? '' : responseattr;

function signupMfsRequestProcess(mfsdata) {
   $("#myfreestyle_form .o-form-container__error-msg").hide();
   $("#myfreestyle_form .o-form-container__success-msg").hide();
   let captchaValue = mfsdata.body["g-recaptcha-response"];
   if (captchaValue === "") {
      mfsdata.headers["x-secret-header"] = reCaptchaKeyMfs;
   } else {
      mfsFormattedData.userInfo.captchaValue = captchaValue;
      let enterpriseRecaptcha = document.querySelector('input[name="enterpriseRecaptcha"]')?.value
      if(enterpriseRecaptcha === "true") {
       mfsFormattedData.userInfo.captchaType = "ENT";
       mfsFormattedData.userInfo.captchaAction = "submit";
      }
   }

   mfsdata.body = mfsFormattedData;

   return mfsdata;
}

function onSuccessMfsUserSignup(mfsdata) {
   $("#myfreestyle_form  .o-form-container__error-msg").hide();
   $("#myfreestyle_form  .o-form-container__success-msg").hide();
   $("#submit_form .o-form-container__error-msg").hide();
   $("#submit_form .o-form-container__success-msg").hide();

   if (!mfsdata?.status) {
      return false;
   }
   let day1ProgramEnrollmentSource = mfsdata.response.accountInfo.day1ProgramEnrollmentSource;
   let pageType = mfsdata.response.pageType;
   if (day1ProgramEnrollmentSource == "Website-PhysicalSample") {
      if (pageType == "D" && insuranceType == "Government") {
         pageType = "C";
      }
   }
   pageType = ifTelehealthYesNon(pageType) || pageType;
   pageType = pageTypeC(pageType) || pageType ;

   pageType =pageTypeLMRedeemed(pageType) || pageType ;

   pageType = pageTypeWW(pageType) || pageType ;

   pageType = pageTypeMedicare() ||  pageType ;

   const elagibaleVocuer = mfsdata?.response?.accountInfo?.voucherDetails?.bin ?? false;

   if (elagibaleVocuer) {
      setVoucherDetails(mfsdata);
   }
   let firstName =  checkResponse(mfsdata.response.accountInfo.userInfo.firstName);

   let salesforceAccountId = checkResponse(mfsdata.response.accountInfo.salesforceAccountId);
   sessionStorage.salesforceAccountId = salesforceAccountId;
   sessionStorage.firstName = firstName;

   let ThankYouPage = $('[name="thankyou-page-' + pageType + '"]').val();

   ThankYouPage = navigateToStudayMd(elagibaleVocuer,salesforceAccountId,pageType) || ThankYouPage;

   setCookie('signUpSuccess', 1, '');
   sessionStorage.mfsJson = JSON.stringify(mfsFormattedData);
   window.location.href = ThankYouPage;

}

const checkResponse = (responseattr) => responseattr == null || responseattr == undefined ? "" : responseattr;

const pageTypeLMRedeemed = (pageType) => {
   let updatedPageTYpe =  '';

   if(pageType == "L" || pageType == "M"){
      if ( isRedeemed !== undefined && isRedeemed !== '' && isRedeemed && mfsProductInterested == prevProductInterested) {
         updatedPageTYpe  = "I" ;
      }
   }
   return updatedPageTYpe;
   
}

const pageTypeWW = (pageType) => {
   let updatedPageTYpe =  '';

   if (pageType == "L" || pageType == "M" ) {
      const hidden_utm_URL_source = $('[name="hidden_utm_URL_source"]')?.val();
      if (utm_source?.toLowerCase() == hidden_utm_URL_source) {
         updatedPageTYpe = pageType + "W" ;
      }
   }
   return updatedPageTYpe;
   
}



const pageTypeMedicare = () => {
   let updatedPageTYpe =  '';

   if (!!medicare && insurancesubType == "Medicare") {
      if (mfsProductInterested == productIntrestedOptionTwo) {
         updatedPageTYpe = "C1"
      }

      if (mfsProductInterested == productIntrestedOptionOne) {
         updatedPageTYpe = "C2"
      }
   }
   return updatedPageTYpe;
   
}


const pageTypeC = (pageType) => {
   let updatedPageTYpe =  '';
   if (pageType == "C") {
   if (insuranceType == "Government") {
      if (previousMeter != productIntrestedOptionTwo && mfsProductInterested == productIntrestedOptionTwo) {
         updatedPageTYpe = "C1"
      }
      if (previousMeter != productIntrestedOptionOne && mfsProductInterested == productIntrestedOptionOne) {
         updatedPageTYpe = "C2"
      }
   }
}
   return updatedPageTYpe;
   
}

const setVoucherDetails = (mfsdata) => {
   let eCardType = mfsdata.response.accountInfo.voucherDetails.eCardType == null || mfsdata.response.accountInfo.voucherDetails.eCardType == undefined ? "" : mfsdata.response.accountInfo.voucherDetails.eCardType;
   let binNumber = mfsdata.response.accountInfo.voucherDetails.bin == null || mfsdata.response.accountInfo.voucherDetails.bin == undefined ? "" : mfsdata.response.accountInfo.voucherDetails.bin;
   let groupId = mfsdata.response.accountInfo.voucherDetails.groupId == null || mfsdata.response.accountInfo.voucherDetails.groupId == undefined ? "" : mfsdata.response.accountInfo.voucherDetails.groupId;
   let issueDate = mfsdata.response.accountInfo.voucherDetails.issueDate == null || mfsdata.response.accountInfo.voucherDetails.issueDate == undefined ? "" : mfsdata.response.accountInfo.voucherDetails.issueDate;
   let expirationDate = mfsdata.response.accountInfo.voucherDetails.expirationDate == null || mfsdata.response.accountInfo.voucherDetails.expirationDate == undefined ? "" : mfsdata.response.accountInfo.voucherDetails.expirationDate;
   let memberId = mfsdata.response.accountInfo.voucherDetails.memberId == null || mfsdata.response.accountInfo.voucherDetails.memberId == undefined ? "" : mfsdata.response.accountInfo.voucherDetails.memberId;
   if (expirationDate !== null) {
      expirationDate = expirationDate.replaceAll("-", "/");
      let months = [
         "Jan", "Feb", "Mar", "Apr", "May",
         "Jun", "Jul", "Aug", "Sept", "Oct",
         "Nov", "Dec"
      ];
      let formattedDate = formatDateofBirth(expirationDate, "YYYY/MM/DD");
      let dateArr = formattedDate.split("-");
      expirationDate = dateArr[2] + "-" + months[parseInt(dateArr[1]) - 1] + "-" + dateArr[0];
   }

   sessionStorage.eCardType = eCardType;
   sessionStorage.binNumber = binNumber;
   sessionStorage.groupId = groupId;
   sessionStorage.issueDate = issueDate;
   sessionStorage.expirationDate = expirationDate;
   sessionStorage.memberId = memberId;
}

const campaningId = () => {
   let urlCampaign = window.location.href;
   let campaign;
   if (urlCampaign.includes("?")) {
      campaign = urlCampaign.split("?")[1];
   }
   return campaign ?? 'false';
}

const checkSteadyMDstatus = () => {
   let checkstatus =  getItemLocalStorage('SteadyMD');
      return checkstatus ? true : false;
}


const checkCampaningstatus = () => {
   let checkstatus = campaningId();
   return checkstatus== 'false'? false : true;
}


function onErrorMfsUserSignup(mfsdata) {
   $("#myfreestyle_form  .o-form-container__error-msg").hide();
   $("#myfreestyle_form  .o-form-container__success-msg").hide();
   $("#submit_form .o-form-container__success-msg").hide();
   $("#formErrorPopup").show().addClass('show');
   onCompleteMfsUserSignup(mfsdata);
}

function onBeforeCallMfsUserSignup(mfsdata) {
   showBtnSpinner("mfs_submit_placeholder");
}

function onCompleteMfsUserSignup(mfsdata) {
   hideBtnSpinner("mfs_submit_placeholder");
}

function getParameterByName(name, url) {
   if (!url) url = window.location.href;
   name = name.replace(/[\[\]]/g, '\\$&');
   let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
   let results = regex.exec(url);
   if (!results) return '';
   if (!results[2]) {
      return '';
   } else {
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
   }
}


function setCookie(cname, cvalue, exdays) {
   let expires = "";
   if (exdays !== '') {
      let d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      expires = "expires=" + d.toUTCString();
   }
   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;Secure;";
}


const resetRecaptcha = (weightId) => {
  let enterpriseRecaptcha = document.querySelector('input[name="enterpriseRecaptcha"]')?.value;
  try {
    if (enterpriseRecaptcha === "true") {
      grecaptcha.enterprise.reset(weightId ? weightId : 100000);
    } else {
      grecaptcha.reset(weightId ? weightId : 100000);
    }
  } catch (error) {
    throw new Error(error);

  }
}

const updateExsistingUserValue = (mfsdata,getMultiFieldsValue) => {
for (const [key, value] of Object.entries(mfsdata.response)) {
   addExsistingUserValue(key,value,mfsdata);
}
const  type = patientType() == 'Patient' ? true : false;
const isdiabetesManagementData = 'diabetesManagement' in getMultiFieldsValue;
if (diabetestype) {
mfsFormattedData.additionalProfileProperties["diabetesType"] = diabetestype;
}
if (isdiabetesManagementData) {
mfsFormattedData.additionalProfileProperties["diabetesManagement"] = !!type ? getMultiFieldsValue["someonediabetesManagement"] : getMultiFieldsValue["diabetesManagement"];
}
}

const ifTelehealthYesNon = (pageType) => {
   let updatedPageTYpeIfYES = '';
   if (!!isExrFormVersion && isExrFormVersion == '2') {
      updatedPageTYpeIfYES = isERXpageType(pageType);
} 
 return updatedPageTYpeIfYES ;  
}

const isERXpageType = (pageType) => {
   let updatedPageTYpeIfYES = '';
   if (pageType == "C") { 
      if (insurancesubType == "Medicare") {
         updatedPageTYpeIfYES =  medicareType();
         }
      if (insurancesubType == "Tricare") {
         updatedPageTYpeIfYES = ifTelehealthYes();
      }

}

if ((pageType == "A" || pageType == "D")){
updatedPageTYpeIfYES = ifTelehealthYes();
if (insurancesubType == "Medicare") {
   updatedPageTYpeIfYES =  medicareType();
}
}

if ((pageType == "K" || pageType == "I")) {
updatedPageTYpeIfYES = pageTypeKorI();
}

if (pageType == "L" || pageType == "M" ) {
updatedPageTYpeIfYES = ifTelehealth();
}
return updatedPageTYpeIfYES ;  
}

const addTelehealthChoice= () => {
if (isExrFormVersion == '2') {
   mfsFormattedData['additionalProfileProperties'].telehealthChoice = telehealth;
}
}

const navigateToStudayMd= (elagibaleVocuer,salesforceAccountId,pageType) => {
   let updatedThankYouPage = '';
   if (elagibaleVocuer && pageType == "L1" && isExrFormVersion == '2') {
      updatedThankYouPage =  navigateToLStudayMd(elagibaleVocuer,salesforceAccountId,pageType) ;
   }else if ( isExrFormVersion == '2' && (pageType == "A1" || pageType == "A2" ||pageType == "C12" || pageType == "C21"|| pageType == "L2")) {
      updatedThankYouPage =  navigateToOtherStudayMd(elagibaleVocuer,salesforceAccountId,pageType) ;   }
   return updatedThankYouPage ;
   }

   const navigateToLStudayMd= (elagibaleVocuer,salesforceAccountId,pageType) => {
      let updatedThankYouPage = '';
      const isstudayMdChecked = checkSteadyMDstatus();
      const campaign = campaningId();
         const StudayMdERX = $('[name="StudayMd"]').val();
         if ( salesforceAccountId && isstudayMdChecked) {
            const StudayUtmURL = `${StudayMdERX}${salesforceAccountId ? '?ID=' + salesforceAccountId : '' }${campaign ? '&' + campaign : ''}`;
            updatedThankYouPage = StudayUtmURL;
         } else if (  !isstudayMdChecked && salesforceAccountId){
            const StudayUtmURL = `${StudayMdERX}${checkCampaningstatus() ? '?' + campaign : ''}`;
            updatedThankYouPage = StudayUtmURL;
         }
         updatedThankYouPage = updatedThankYouPage && updatedThankYouPage.includes('#telehealthForm') ? updatedThankYouPage.replace('#telehealthForm', '') : updatedThankYouPage;
   
         if (updatedThankYouPage && updatedThankYouPage?.includes(StudayMdERX)){
            window?.dataLayer?.push({'event':'Form submission ERX','telehealth':true});
         }
      return updatedThankYouPage ;
      }

      const navigateToOtherStudayMd= (elagibaleVocuer,salesforceAccountId,pageType) => {
         let updatedThankYouPage = '';
         const campaign = campaningId();
            if(!!campaign) {
               let campaignsearch = window.location.search;
               updatedThankYouPage =  updatedThankYouPage+campaignsearch;
         }
         return updatedThankYouPage ;
         }
   

   const gettelehealthDay1ProgramEnrollmentSource= (Day1ProgramEnrollmentSource) => {
      let telehealthDay1ProgramEnrollmentSource ;
      if (!!isExrFormVersion && isExrFormVersion == '2') {
   
         if (!!telehealth && telehealth == "Yes") {
            telehealthDay1ProgramEnrollmentSource = Day1ProgramEnrollmentSource + "-" + "TH";
         } else {
            telehealthDay1ProgramEnrollmentSource = Day1ProgramEnrollmentSource + "-" + "NTH";
         }
      }
      return telehealthDay1ProgramEnrollmentSource ;
      }

   const getinsuraneSubType= (kaiserSubTypeDisable) => {
      if (insuranceType == "Medicare" || insuranceType == "Tricare" || insuranceType == "VA") {
         insurancesubType = insuranceType;
         insuranceType = "Government";
      } else if (insuranceType == "Medicaid" || insuranceType == "Other Government" || insuranceType == "Indian Health Services") {
         insurancesubType = insuranceType;
         insuranceType = "Government_other";
      } else if (insuranceType == "Commercial") {
         insuranceType = "Commercial/Employer-Provided/Private";
      } else if (insuranceType == "Kaiser" && !kaiserSubTypeDisable) {
         insurancesubType = insuranceType;
      } else if (insuranceType == "No Insurance/Cash Pay") {
         insurancesubType = "No Insurance/Cash Pay";
         insuranceType = "No Insurance/Cash Pay"
      }
   }

   const getdropdownValue = (dropdownName) =>  $('[name='+dropdownName+'] .selected').attr("data-optionvalue") == undefined ? "" : $('[name='+dropdownName+'] .selected').attr("data-optionvalue").trim();
   const getcaregiverAgeConsent = () =>   $("input:radio[name=areYou18]:checked").val() == null || $("input:radio[name=areYou18]:checked").val() == undefined ? "false" : "true";
   const getProgramConsent = () => $('[name="agree"]').is(':checked') ? "true" : "false";
   const getOptinVersion = () => (!phone || phone.length == 0) ? "Email Only": "Email and Call";
   const getkaiserSubTypeDisable= () => $('[name="kaiserSubTypeDisable"]').val() == 'true' ? true : false;
   const getERXVersion = () => $('[name="ERXVersion"]').val() ?? false;

   const addExsistingUserValue = (key,value,mfsdata) => {
      if (key == "programStatus") {
         mfsFormattedData.additionalProfileProperties[key] = "Enrolled";
      } else if (key != "prevProductInterested") {
         mfsFormattedData.additionalProfileProperties[key] = value;
      }
      if (!!isExrFormVersion) {
         getReissueFlag(mfsdata);
      }
      if (smsOptIn) {
         getSmsOptIn(key,mfsdata);
      }

   }
   const getReissueFlag = (mfsdata) => {
      prevProductInterested = mfsdata.response.prevProductInterested == undefined ? '' : mfsdata.response.prevProductInterested;
      let redeemed = mfsdata.response.isRedeemed;
      let reissued = "false";
      if ((!redeemed) || ( redeemed && mfsProductInterested != prevProductInterested)) {
         reissued = "true";
      }
      if (redeemed !== undefined) {
         mfsFormattedData.additionalProfileProperties["reissued"] = reissued;
      }
   }
   const getSmsOptIn = (key,mfsdata) => {
      if (key == "loginIdentity") {
         if (mfsdata?.response?.loginIdentity) {
            if (phone) {
               mfsFormattedData.additionalProfileProperties["sMSOptIn"] = smsOptIn;
            }
         } else {
            if (phone) {
               mfsFormattedData.additionalProfileProperties["sMSOptIn"] = smsOptIn;
            } else {
               mfsFormattedData.additionalProfileProperties["sMSOptIn"] = "Opt-Out";
            }
         }
      }
   }

   const pageTypeAorD = () => {
      let updatedPageTYpe =  '';
      updatedPageTYpe = ifTelehealthYes();
    
      if (insurancesubType == "Medicare") {
         updatedPageTYpe = medicareType();
      }
      return updatedPageTYpe;
      
   }
   const ifTelehealthYes = () => {
      let updatedPageTYpeIfYES = '';
      if (!!telehealth && telehealth == "Yes") {
         updatedPageTYpeIfYES = "A1"
      } else {
         updatedPageTYpeIfYES = "A2"
   
      }
      return updatedPageTYpeIfYES;
   }
   const medicareType = () => {
      let updatedPageTYpeIfYES = '';
      if (!!telehealth && telehealth == "Yes") {
         updatedPageTYpeIfYES = "C12";
     } else {
       updatedPageTYpeIfYES = "C21";
   
     }
      return updatedPageTYpeIfYES;
   }
   const ifTelehealth = () => {
      let updatedPageTYpeIfYES = '';
      if (!!telehealth && telehealth == "Yes") {
         updatedPageTYpeIfYES = "L1"
   
      } else {
         updatedPageTYpeIfYES = "L2"
   
      }
      return updatedPageTYpeIfYES;
   }

   const pageTypeKorI = () => {
      let updatedPageTYpe =  '';
      if (isRedeemed){
         if ((prevProductInterested == mfsProductInterested)) {
            updatedPageTYpe = ifTelehealthYes();
         } else  {
            updatedPageTYpe = ifTelehealth();
         }
   
      } else {
         updatedPageTYpe = ifTelehealth();
      }
      return updatedPageTYpe;
      
   }