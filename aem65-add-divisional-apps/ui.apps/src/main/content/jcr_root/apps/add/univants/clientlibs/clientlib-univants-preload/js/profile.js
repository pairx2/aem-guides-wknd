
function UpdateProfileDataRequest(formData) {
	$(".loader").show();
    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    var headerCountryCode  = document.querySelector('input[name="x-country-code"]').value;
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    var jwtToken = getCookie('id.token');
    formData.headers = {
        'x-country-code': headerCountryCode,
        'x-application-id': headerApplicationId,
        'x-preferred-language': headerLanguage,
        'x-id-token': jwtToken,
        'Content-Type': 'application/json'
    }
    formData.body = {
        userInfo: {
            firstName: formData.body.firstName,
            lastName: formData.body.lastName,
            institutionName: formData.body.institutionName
        }            
    }
}
function onSuccessprofileupdate(data){
    if (data.errorCode == 0) {
        let userName = data.response.userInfo.firstName;
        let lastName = data.response.userInfo.lastName;
        let institutionName = data.response.userInfo.additionalProperties.institutionName;
        localStorage.setItem('userName', userName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('institutionName', institutionName);
        $('#save-changes').show();
		$(".loader").hide();
    }
}  

function onSuccessEmailupdate(data){
    if (data.errorCode == 0) {        
        $('#submit-change-email').show();
		$(".loader").hide();
    }
} 

function onErrorChangeEmail(response) {
    $(".o-form-container__error-msg").hide();
    showApiError('#change-email-api-error', response);   
}

function ChangeEmailRequest(formData) {
	$(".loader").show();
 var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    var headerCountryCode  = document.querySelector('input[name="x-country-code"]').value;
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    var jwtToken = getCookie('id.token');
    formData.headers = {
        'x-country-code': headerCountryCode,
        'x-application-id': headerApplicationId,
        'x-preferred-language': headerLanguage,
        'x-id-token': jwtToken,
        'Content-Type': 'application/json'
    }
    formData.body = {
        userInfo: {
            email: formData.body.email,
            password: formData.body.currentPassword
        }

    }
}
 
function onCompleteprofileupdate(data){
   if(localStorage.getItem('userName') != null ){
     $('#edit-profile-form input[name="firstName"]').val(localStorage.getItem('userName'));
    }    

    if(localStorage.getItem('lastName') != null ){
     $('#edit-profile-form input[name="lastName"]').val(localStorage.getItem('lastName'));
   }    

    if(localStorage.getItem('institutionName') != null ){
      $('#edit-profile-form input[name="institutionName"]').val(localStorage.getItem('institutionName'));
    }    

}
function updateContactRequest(formData) {
var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
var jwtToken = getCookie('id.token');
formData.headers = {
'x-country-code': headerCountryCode,
'x-application-id': headerApplicationId,
'x-preferred-language': headerLanguage,
'x-id-token': jwtToken,
'Content-Type': 'application/json'
}
formData.body = {
requestType: "contact-award-administration",
message: formData.body.message
}
}

function onSucessContactAward(){
    $('.modal-backdrop').hide();
    $('#contact-award-modal').hide();
    $('#thankyou-popup').show();
    $('#thankyou-popup').css('display','block');
    $('#contact-award-popup button').addClass('closeBtn');
    }
