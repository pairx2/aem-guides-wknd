/**
 * FREESTYLE - freestyle-common-preload
 **/
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
    "tncAgree": body.tncAgree || true,
    "requestType": body.requestType,
    "newsletter": body.newsletter || false,
    "node": body.node
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
    "newsletter": body.newsletter == true,
    "node": body.node,
    "product_usage": body.product_usage,
    "requestType": body.requestType,
    "salutation": body.salutation || " ",
    "tncAgree": body.tncAgree == true,
    "mobile": body.mobile || " ",
    "consent_product": body.consent_product == true,
    "consent_promotional" : body.consent_promotional == true,
    "consent_terms_privacy" : body.consent_terms_privacy == true
  }

  data.headers["x-country-code"] = headers["x-country-code"];
  data.body = requiredBodyStructure;

  return data;
}

function updateRequestMyFreestyleNewsletterSubscription(data) {
  const consents = [];

  consents.push({
    consentName: 'newsletter',
    consentValue: true,
  });

  data.body['action'] = 'newsletter';
  data.body['consents'] = consents;
  data.body['userInfo'] = {
    email: data.body['email'],
  };

  delete data.body['requestType'];
  delete data.body['node'];
  delete data.body['newsletter'];
  delete data.body['email'];

  return data;
};
