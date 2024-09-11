function hideFieldsCanadaWarranty(){
	let placeofPurchaseObj = $("#canada-warranty-registration ul[name='placeOfPurchase']>li.selected");
	if((placeofPurchaseObj.length == 0) || (placeofPurchaseObj.attr("data-optionvalue") != "2")){
	  $("#canada-warranty-registration input[name='retailStoreOfPurchase']").parent().parent().parent().parent().hide();
	}

	if($("#canada-warranty-registration ul[name='purchase_year']>li.selected").length == 0){
	  $("#canada-warranty-registration ul[name='purchase_month']").parent().addClass("disabled");
	}
}


// Function for provider signup form request processing
function providerSignupRequestProcess(data) {

  let consentArray = [];

  consentArray = formatCheckboxValue(data.body.consents);

  let formattedData = {
   "registrationType": "subscribe",
	 "firstName": data.body.firstName,
   "lastName": data.body.lastName,
   "emailID": data.body.emailID,
	 "designation": data.body.designation,
	 "source":"",
	 "brand":data.body.brand,
	 "version":"",
	 "postalCode": data.body.postalCode,
   "language": data.body.language,
   "consents": consentArray,
	 "captchaValue":  data.body["g-recaptcha-response"]
  }

  data.body = formattedData;

  return data;
}

// Function for signup form request processing
function signupRequestProcess(data) {

  let consentArray = [];

  consentArray = formatCheckboxValue(data.body.consents);

  let formattedData = {
    "registrationType": "newsletter",
    "subRegistrationType": "signUp",
    "emailID": data.body.emailID,
    "language": data.body.language,
    "firstName": data.body.firstName,
    "lastName": data.body.lastName,
    "province": data.body.province,
    "consents": consentArray,
	"captchaValue":  data.body["g-recaptcha-response"]
  }

  data.body = formattedData;

  return data;
}

// Function for warranty form request processing
function warrantyRequestProcess(data) {
  let language = $("input[name='x-preferred-language']").val().toLowerCase();
  let title = formatRadioValue(data.body.title);
  let gender = formatRadioValue(data.body.gender);
  let retailStoreOfPurchase = "", extension ="";
  if(data.body.retailStoreOfPurchase != null){
	 retailStoreOfPurchase = formatRadioValue(data.body.retailStoreOfPurchase);
  }
  if(data.body.extension != null){
	extension = data.body.extension;
  }
  let consentArray = [];

  consentArray = formatCheckboxValue(data.body.consents);


  let formattedData = {
    "registrationType": "productRegistration",
    "subRegistrationType": "warranty",
    "address_1": data.body.address_1,
    "address_2": data.body.address_2,
    "userCategory": data.body.userCategory,
    "city": data.body.city,
    "country": data.body.country,
    "emailID": data.body.emailID,
    "firstName": data.body.firstName,
    "gender": gender,
    "manage": data.body.manage,
    "lastName": data.body.lastName,
    "language": language,
    "phone": data.body.phone,
    "freestyle_libresystem": data.body.placeOfPurchase,
	"retailStoreOfPurchase": retailStoreOfPurchase,
    "title": title,
    "utmCampaign": "utmCampaign",
    "utmContent": "utmCampaign",
    "utmMedium": "utmMedium",
    "utmSource": "utmSource",
    "utmTerm": "utmTerm",
    "postal_code": data.body.postal_code,
    "previous_meter": data.body.previous_meter,
    "serial_number": data.body.serial_number,
    "province": data.body.province,
    "age": (new Date).getFullYear() - data.body.birthYear,
    "product": data.body.product,
    "extension": extension,
    "purchase_year": data.body.purchase_year,
    "purchase_month": data.body.purchase_month,
    "birthYear": data.body.birthYear,
    "consents": consentArray,
	"captchaValue":  data.body["g-recaptcha-response"]
  }

  data.body = formattedData;
  return data;
}

function formatCheckboxValue(element) {

  let resultArray = [];
  let consentJSON = {};

  $.each(element, function(i, item) {
    consentJSON[item.consentName] = item.consentValue;
  });

  resultArray[0] = consentJSON;
  return resultArray;

}


function formatRadioValue(element) {

  let resultArr = [];

  //return the input with radio option checked
  resultArr = $.grep(element, function(n, i) {
    return n.consentValue;
  });

  if (resultArr.length > 0)
    return resultArr[0].consentName;
  else
    return "";
}
