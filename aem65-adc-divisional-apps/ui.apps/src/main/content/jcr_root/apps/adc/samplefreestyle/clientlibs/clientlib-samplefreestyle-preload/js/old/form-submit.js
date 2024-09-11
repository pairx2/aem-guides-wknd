/** Sample Freestyle Form Functions **/

function updateRequestSampleFreestyle(data) {
  let body = data.body;
  let number_of_questions_asked = getAllQuestions().length;
  let number_of_correct_answers = countCorrectAnswers();

  let requiredBodyStructure = {
    "email": body.mail,
    "mobile": body.mobile,
    "mobilePhoneCompatible": true,
    "consentPromotional": body.consent_promotional,
    "requestType": body.requestType,
    "recaptcha": body["g-recaptcha-response"] || data["g-recaptcha-response"],
    "numberofQuestionsAsked": number_of_questions_asked,
    "numberofCorrectAnswers": number_of_correct_answers,
    "newsletter": body.newsletter || false
  }

  if (typeof body.mobile_phone_compatible !== 'undefined') {
    requiredBodyStructure.mobilePhoneCompatible = parseMobilePhoneCompatible(body.mobile_phone_compatible[0]);
  }

	for (const [formKey, formValue] of Object.entries(body)) {
	    if (formKey !== 'mail' && formKey !== 'mobile' && formKey !== 'mobilePhoneCompatible' &&
	        formKey !== 'consent_promotional' && formKey !== 'requestType' && formKey !== 'g-recaptcha-response' &&
	        formKey !== 'newsletter' && formKey !== 'mobile_phone_compatible') {
	        requiredBodyStructure[formKey] = formValue;
	    }
	}
	
	let exceptionList = $('#exceptionList').val();
	if (exceptionList !== undefined && exceptionList !== 'undefined' && exceptionList !== 'null' && exceptionList !== null) {
	    let exceptionListArray = exceptionList.split(",");
	    for (let i in exceptionListArray) {
	        delete requiredBodyStructure[exceptionListArray[i]];
	    }
	}

  data.body = requiredBodyStructure;

  return data;
}

function updateRequestFreestyleSample(data) {
  let number_of_questions_asked = getAllQuestions().length;
  let number_of_correct_answers = countCorrectAnswers();

  data.body.numberofQuestionsAsked = number_of_questions_asked;
  data.body.numberofCorrectAnswers = number_of_correct_answers;
  data.body.recaptcha = data.body["g-recaptcha-response"] || data["g-recaptcha-response"];

  let isMobilePhoneCompatible = radioValue(data.body['mobilePhoneCompatible']);
  data.body.mobilePhoneCompatible = isMobilePhoneCompatible === 'true';

  $('[id*=freestyle_sample] .hidden input[type="hidden"]:not([name="exceptionList"])').each(function(){
    if($(this).data('request') == 'body') {
      data.body[$(this).attr('name')] = $(this).val();
    } else if($(this).data('request') == 'header') {
      data.headers[$(this).attr('name')] = $(this).val();
    }
  });

  let isNewsletter = (data.body.newsletter === 'true');
  data.body.newsletter = isNewsletter;

	let exceptionList = $('#exceptionList').val();
	if (exceptionList !== undefined && exceptionList !== 'undefined' && exceptionList !== 'null' && exceptionList !== null) {
	    let exceptionListArray = exceptionList.split(",");
	    for (let i in exceptionListArray) {
	        delete data.body[exceptionListArray[i]];
	    }
	}

  delete data.body["g-recaptcha-response"];
  delete data["g-recaptcha-response"];
  delete data.body['node'];

  return data;
}

function onErrorSampleFreestyle() {
  toggleFormCompleteMsgs(false);
}

function onSuccessSampleFreestyle(data) {
  setItemSessionStorage('eSampling', 'already-subscribed', true);
  showLastStep(true);
}

function onBeforeCallSampleFreestyle(data) {}

function onCompleteSampleFreestyle(data) {}

