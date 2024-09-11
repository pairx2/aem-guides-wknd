
function onSuccesscreateCopyApplication(response){
	if(response.errorCode === 0) {
        localStorage.setItem('storeContinueAppVal', response.response.id);
		localStorage.setItem('applicationHashContent', response.response._hashedContent);
    }
     $('#application-cycle-popup1').hide();
     $('#application-cycle-popup').hide();
     $('#start-from-copy-thankyou-popup').show();
    }

function createCopyApplication(formData) {
  var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
  var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
  var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
  var jwtToken = getCookie('id.token'); 
  var applicationStatusID = $('#applicationStatus-options input[type="radio"].selected').val();
  localStorage.setItem('storeContinueAppVal', applicationStatusID);  
  formData.headers = {
    'x-country-code': headerCountryCode,
    'x-application-id': headerApplicationId,
    'x-preferred-language': headerLanguage,
    'x-id-token': jwtToken,
    'Content-Type': 'application/json',
    "x-application-access-key": "user1#Applicant"
  }
  formData.body = {    
    type: "AwardApplication",
    id: applicationStatusID,
    action: "copy"
  }
  return formData
}


function onSuccessreplaceCopyApplication(){
   $('#application-cycle-popup1').hide();
   $('#application-cycle-popup').hide();
   $('#get-a-headstart-thankyou-popup').show();
    }


function replaceCopyApplication(formData) {
  var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
  var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
  var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
  var jwtToken = getCookie('id.token'); 
  var applicationStatusID = $('#applicationStatus-options input[type="radio"].selected').val();
  var applicationIdreplace = localStorage.getItem('storeContinueAppVal');
  formData.headers = {
    'x-country-code': headerCountryCode,
    'x-application-id': headerApplicationId,
    'x-preferred-language': headerLanguage,
    'x-id-token': jwtToken,
    'Content-Type': 'application/json',
    "x-application-access-key": "user1#Applicant"
  }
  formData.body = {    
    type: "AwardApplication",
    fromId : applicationStatusID,
    toId: applicationIdreplace,
    action: "replace"
  }
  return formData
}