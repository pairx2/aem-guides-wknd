// Base Preload
function updateContactRequest(data) {
  let body = data.body;
  let headers = data.headers;

  let requiredBodyStructure = {
    "email": body.mail || body.email,
    "salutation": body.salutation || " ",
    "firstname": body.firstname,
    "name": body.name,
    "inquiry": body.inquiry,
    "message": body.message,
    "tncAgree": body.tncAgree,
    "requestType": body.requestType,
    "newsletter": body.newsletter,
    "node" : body.node,
    "recaptcha": body["g-recaptcha-response"] || data["g-recaptcha-response"] || " "
  }

  data.headers["x-country-code"] = headers["x-country-code"];
  data.body = requiredBodyStructure;

  return data;
}

function updateNewsletterRequest(data) {
  let body = data.body;
  let headers = data.headers;

  let requiredBodyStructure = {
    "consent_educational": body.consent_educational || true,
    "email": body.mail || body.email,
    "firstname": body.firstname,
    "recaptcha": body["g-recaptcha-response"] || data["g-recaptcha-response"] || " ",
    "name": body.name,
    "newsletter": body.newsletter,
    "node": body.node,
    "product_usage": body.product_usage,
    "requestType": body.requestType,
    "salutation": body.salutation || " ",
    "tncAgree": body.tncAgree,
    "mobile": body.mobile || " ",
    "consent_product": body.consent_product,
    "consent_promotional" : body.consent_promotional,
    "consent_terms_privacy" : body.consent_terms_privacy
  }

  data.headers["x-country-code"] = headers["x-country-code"];
  data.body = requiredBodyStructure;

  return data;
}

//

function updateSignupBrazil(data) {
  let body = data.body;
  let headers = data.headers;
  let ACCOUNT_SOURCE = $('[name="accountsource"]').val();
  let LEAD_SOURCE =$('[name="leadsource"]').val();

  let requiredBodyStructure = {
    "userInfo": {
      "email": body.email,
      "firstName": body.firstName,
      "lastName": body.lastName,
      "emailOptIn": true,
      "personOptOut": false,
      "hasOptedOut": false,
      "countryCode": headers["x-country-code"],
      "leadSource": LEAD_SOURCE,
      "accountSource": ACCOUNT_SOURCE,
      "diabetesType": $('#dropdown_label_diabetesType').parent().find('li.selected').attr('data-optionvalue'),
      "celular": body.celular,
      "sou": body.sou === undefined ? body.sou : radioValue(body.sou),
      "tratamento": body.tratamento,
      "comomonitoraaglicose": body.comomonitoraaglicose,
      "privacypolicycheck": body.privacypolicycheck === undefined ? body.privacypolicycheck : "Yes",
      "fslemailoptIn": body.fslemailoptIn,
      "adcemailoptIn": body.adcemailoptIn,
      "adcemailoptIn1": body.adcemailoptIn1
    },
    "registrationType": "subscribe"
  }
  data.headers["x-country-code"] = headers["x-country-code"];
  data.body = requiredBodyStructure;
  return data;
}


function updateUnsubscribeBrazil(data) {
  let body = data.body;
  let headers = data.headers;
  const LEAD_SOURCE = "WebSignUpForm-Brazil";

  let requiredBodyStructure = {
    "userInfo": {
      "email": body.email,
      "personOptOut": true,
      "hasOptedOut": true,
      "emailOptIn": true,
      "leadSource": LEAD_SOURCE,
      "accountSource": LEAD_SOURCE,
      "countryCode": headers["x-country-code"],
    },
    "registrationType": "unsubscribe"
  }
  data.headers["x-country-code"] = headers["x-country-code"];
  data.body = requiredBodyStructure;
  return data;
}

