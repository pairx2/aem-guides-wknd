function updateContactRequest(data) {
  let body = data.body;
  let headers = data.headers;
  const isTncAgree = body.tncAgree === true;
  const isNewsletter = body.newsletter === true;
  let requiredBodyStructure = {
    "email": body.mail || body.email,
    "salutation": body.salutation || " ",
    "firstname": body.firstname,
    "name": body.name,
    "inquiry": body.inquiry,
    "message": body.message,
    "tncAgree": isTncAgree,
    "requestType": body.requestType,
    "newsletter": isNewsletter,
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
  const isNewsletter = body.newsletter === true;
  const isTncAgree =  body.tncAgree === true;
  const isConsent_product = body.consent_product === true;
  const isConsent_promotional = body.consent_promotional === true;
  const isConsent_terms_privacy = body.consent_terms_privacy === true;
  let requiredBodyStructure = {
    "consent_educational": body.consent_educational || true,
    "email": body.mail || body.email,
    "firstname": body.firstname,
    "recaptcha": body["g-recaptcha-response"] || data["g-recaptcha-response"] || " ",
    "name": body.name,
    "newsletter": isNewsletter,
    "node": body.node,
    "product_usage": body.product_usage,
    "requestType": body.requestType,
    "salutation": body.salutation || " ",
    "tncAgree": isTncAgree,
    "mobile": body.mobile || " ",
    "consent_product": isConsent_product,
    "consent_promotional" : isConsent_promotional,
    "consent_terms_privacy" : isConsent_terms_privacy
  }

  data.headers["x-country-code"] = headers["x-country-code"];
  data.body = requiredBodyStructure;

  return data;
}
