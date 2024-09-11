let reCaptchaKey;

function updateRequest(data) {

  reCaptchaKey = $('[name="reCaptchaAPIKey"]').val();
  let captchaValue = data.body["g-recaptcha-response"];

  let formAcquisitionProgram = $('[name="acquisitionProgram"]').val();
  if(formAcquisitionProgram == null || formAcquisitionProgram == undefined || formAcquisitionProgram.length == 0){
    formAcquisitionProgram = "Request Info Form Data" ;
}

let source = $('[name="source"]').val();
if(source == null || source == undefined || source.length == 0){
  source = "Health Care provider site" ;
}

  const date = new Date();
  const today =  ("00" + (date.getMonth() + 1)).slice(-2)
          + "/" + ("00" + date.getDate()).slice(-2)
          + "/" + date.getFullYear() + " "
          + ("00" + date.getHours()).slice(-2) + ":"
          + ("00" + date.getMinutes()).slice(-2)
          + ":" + ("00" + date.getSeconds()).slice(-2);

  let formattedData = {
      "firstName": data.body.firstName,
      "lastName": data.body.lastName,
      "email": data.body.email,
      "zipCode": data.body.zipCode,
      "addressLine1": data.body.addressLine1,
      "addressLine2": data.body.addressLine2,
      "city": data.body.city,
      "state": data.body.state,
      "role": data.body.role,
      "npi": data?.body?.NPI ? data?.body?.NPI : '',
      "phone": data.body.phoneNumber,
      "member": getOptionValue(data.body.govAgency, "Yes"),
      "agency": data.body.govAgencyType,
      "information_about_FSL2": getOptionValue(data.body.prodInfo, "moreinfo_fsl2"),
      "information_about_FSL_14_days": getOptionValue(data.body.prodInfo, "moreinfo_fsl"),
      "information_about_FSL_Pro": getOptionValue(data.body.prodInfo, "moreinfo_fslpro"),
      "information_about_BGM": getOptionValue(data.body.prodInfo, "moreinfo_bgm"),
      "contacted_by_salesrep": getOptionValue(data.body.prodInfo, "is_interested_to_contact_by_sales"),
      "utm_campaign": getParameterByName("utm_campaign"),
      "utm_content": getParameterByName("utm_content"),
      "utm_source": getParameterByName("utm_source"),
      "utm_medium": getParameterByName("utm_medium"),
      "optInDate": today,
      "source": source,
      "optIn": "Opt-In",
      "acquisitionProgram": formAcquisitionProgram,
      "acquisitionDate": today,
      "cgmRecommendation": data.body.cgmRecommendation,
      "subscribe":"true"
  };

  // so that it don't break any existing form adding new fields only if it got author
  const mapConsentName = data?.body?.prodInfo?.map(item => item?.consentName);
  if(mapConsentName?.length > 0 && mapConsentName?.includes('moreinfo_fsl3')) formattedData = {...formattedData, information_about_FSL3: getOptionValue(data.body.prodInfo, 'moreinfo_fsl3')}
  formattedData = updateRequestConsents(formattedData,data);

  if (captchaValue === "") {
    data.headers["x-secret-header"] = reCaptchaKey;
 } else {
    formattedData["g-recaptcha-response"] = captchaValue;
    let enterpriseRecaptcha = document.querySelector('input[name="enterpriseRecaptcha"]')?.value
    if (enterpriseRecaptcha === "true") {
      formattedData["captchaType"] = "ENT";
      formattedData["captchaAction"] = "submit";
    }
 }

  data.body = formattedData;
  return data;
}

function updateRequestConsents(formattedData,data) {
 if(!data.body.prodInfo){  
          delete (formattedData["information_about_FSL2"]);
          delete (formattedData["information_about_FSL_14_days"]);
          delete (formattedData["information_about_FSL_Pro"]);
          delete (formattedData["information_about_BGM"]);
          delete (formattedData["contacted_by_salesrep"]);
 }
 if(!data.body.govAgency){
  delete (formattedData["member"]);
 }
 return formattedData;
}


function updateRequestUnSubscribe(data) {
  reCaptchaKey = $('[name="reCaptchaAPIKey"]').val();
  let captchaValue = data.body["g-recaptcha-response"];
  let formattedData = {
        "email": data.body.email,
        "subscribe":"false"
  }
  if (captchaValue === "") {
    data.headers["x-secret-header"] = reCaptchaKey;
 } else {
    formattedData["g-recaptcha-response"] = captchaValue;
    let enterpriseRecaptcha = document.querySelector('input[name="enterpriseRecaptcha"]')?.value
    if (enterpriseRecaptcha === "true") {
      formattedData["captchaType"] = "ENT";
      formattedData["captchaAction"] = "submit";
    }
 }
  data.body = formattedData;
  return data;
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


function getOptionValue(data, name) {
  let optionValue = false;
  if(data != null){
  let value = data.filter(x=>x.consentName===name);
  if(value && value.length>0) {
    optionValue = value[0].consentValue;
  }
}
  return optionValue;
}


