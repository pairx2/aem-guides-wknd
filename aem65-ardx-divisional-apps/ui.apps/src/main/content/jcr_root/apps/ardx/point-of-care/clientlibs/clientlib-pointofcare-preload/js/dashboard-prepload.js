function UpdateAddUserRequest(formData){
	let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    let token = getCookie('id_token')?getCookie('id_token'):sessionStorage.getItem('jwtToken');
	formData.headers = {
        'x-preferred-language': 'en',
		'x-country-code': 'US',
        'x-application-id': headerApplicationId,
        'x-id-token' : token
	}
    let customerCategory = $('[name="customerCategory"] .selected:not(:first-child)').attr('data-optionvalue');
    let customerRole = $('[name="customerRole"] .selected:not(:first-child)').attr('data-optionvalue');
    let istatProduct = $('[name="istatProduct"]').val().toString();
    let topics = $('[name="topics"]').val().toString();
    function genPassword() {
        let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 7;
        let password = "";
        
     for (let i = 0; i <= passwordLength; i++) {
       let randomNumber = Math.floor(Math.random() * chars.length);
       password += chars.substring(randomNumber, randomNumber +1);
      }
      let specials = '!@#$%^&*()';
      for (let j = 1; j <= 2; j++) {
         let randomNo = Math.floor(Math.random() * specials.length);
         password += specials.substring(randomNo, randomNo +1);
        }
        return password;
     }
     let generatedPassword = genPassword();
    formData.body = {
        "action": "ADD",
        "profileInfo":{
            "userInfo": {
            "firstName": formData.body.firstName,
            "lastName": formData.body.lastName,
            "email": formData.body.email,
            "password": generatedPassword,
            "additionalProperties": {
                "jobTitle": formData.body.jobTitle,
                "department": formData.body.department,
                "employer": formData.body.employer,
                "address": formData.body.address,
                "address2": formData.body.address2,
                "city": formData.body.city,
                "state": formData.body.state,
                "country": formData.body.country,
                "zipCode": formData.body.zipCode,
                "phoneNumber": formData.body.phoneNumber,
                "customerType": formData.body.customerType,
                "contactOpt": formData.body.contactOptIn,
                "customerRole": customerRole,
                "customerCategory": customerCategory,
                "istatProduct": istatProduct,
                "serialNumber": formData.body.serialNumber,
                "topics": topics,
                "language": formData.body.language
                }
            }
        }
    }
    return formData
}

function onDashboardError(responseData) {
    if(responseData.errorCode != 0) {
        $("#add-user-form .o-form-container__error-msg")?.text(responseData.response?.statusReason);
        $("#view-user-form .o-form-container__error-msg")?.text(responseData.response?.statusReason);
    }
}

function onRejectUpdateRequest(formData){
    let emailArray = [];
    if (window.location.href.indexOf('/'+adminFolderName+'/approve-users.html') < 0) {
        emailArray.push(localStorage.getItem('RejectEmail'))
    }else{
        emailArray = $('#approve-users-datatable').attr('data-list').split(',');
    }
    let action = 'REJECTED';
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    let token = getCookie('id_token')?getCookie('id_token'):sessionStorage.getItem('jwtToken');
    let fullReason = (document.querySelector('[data-optionvalue='+formData.body.rejectreason+']').textContent).trim();
	formData.headers = {
        'x-preferred-language': 'en',
		'x-country-code': 'US',
        'x-application-id': headerApplicationId,
        'x-id-token' : token
	}
    formData.body = {
        "emails": emailArray,
        "action": action,
        "requestType": formData.body.rejectreason,
        "reason": fullReason
    }
    return formData;
}

function onRejectSuccess(){
    $('.generic-modal--close').click();
    let currListEmails =  $('#approve-users-datatable').attr('data-list').split(',');
	$('#approve-users-datatable').attr('data-list','');
	
    setTimeout(function(){
        listAllPendingUers('0');
        let emailArray = [];
        if (window.location.href.indexOf('/'+adminFolderName+'/approve-users.html') < 0) {
            emailArray.push(localStorage.getItem('RejectEmail'))
        }else{
            emailArray = currListEmails;
        }
        if(emailArray.length > 1){
            alert(`Selected ${emailArray.length} users have been rejected successfully`)
        }
        if(emailArray.length == 1){
            alert(`The User have been rejected successfully`)
            if (window.location.href.indexOf('/'+adminFolderName+'/approve-users.html') < 0) {
                window.location.href = approveUsersURL;
            }
        }
    },500);
}

function onRejectError(responseData) {
    if(responseData.errorCode != 0) {
        $("#reject-reason-form .o-form-container__error-msg").text(responseData.response?.statusReason);
    }
}

function onResetPasswordAdmin(formData){
    setTimeout(() => {
        $('.custom-spinner').removeClass('d-none');
    }, 100);
    let emailArray = [];
    if($('[name="email"]').val().length > 0){
        emailArray.push($('[name="email"]').val())
    }
    let action = 'PASSWORD_UPDATED';
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    let token = getCookie('id_token')?getCookie('id_token'):sessionStorage.getItem('jwtToken');
    formData.headers = {
        'x-preferred-language': 'en',
		'x-country-code': 'US',
        'x-application-id': headerApplicationId,
        'x-id-token' : token
	}
    formData.body = {
        "emails": emailArray,
        "action": action,
        "password": formData.body.changePassword
    }
    localStorage.setItem('resetPassKey',$('[name="changePassword"]').val())
    return formData;
}
function onResetPasswordSuccess(){
    setTimeout(() => {
        $('.custom-spinner').addClass('d-none');
    }, 100);
    let passKey = localStorage.getItem('resetPassKey')
    $('#reset-password-col .o-form-container__success-msg').text(passKey).addClass('copy-content');
    if($('.copyPass').length == 0){
        $('#reset-password-col .o-form-container__success-msg').after('<div class="a-button a-button--primary justify-content-start"><button class="btn" onclick="copyPass()" >Copy Password</button><span class="copyPass"></span></div>')
    }
}
function onResetPasswordFailure(responseData) {
    setTimeout(() => {
        $('.custom-spinner').addClass('d-none');
    }, 100);
    if(responseData.errorCode != 0) {
        $("#reset-password-col .o-form-container__error-msg").text(responseData.response?.statusReason);
    }
}

function copyPass(){
  // Get the text field
  let copyText = $('#reset-password-col .o-form-container__success-msg.copy-content').text();
   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText);
    $('.copyPass').text(' Copied');
    $('.copyPass').fadeIn();
    setTimeout(function(){
        $('.copyPass').fadeOut();
    },3000);    
}