
function UpdateRegisterRequest(formData) {
	let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
	formData.headers = {
        'x-preferred-language': 'en',
		'x-country-code': 'US',
        'x-application-id': headerApplicationId
	}
    let customerRole;
    let customerCategory = $('.conditional__case:visible [name="customerCategory"] .selected').attr('data-optionvalue');
    if(formData.body.customerType == 'repair-center' || formData.body.customerType == 'REPAIR_CENTER'){
        customerRole = $('.hide-role:visible [name="customerRole"] .selected').attr('data-optionvalue');
    }
    else{
        customerRole = $('.conditional__case:visible:not(.hide-role) [name="customerRole"] .selected').attr('data-optionvalue');
    }
    if(formData.body.customerType == 'abbottEmployees' || formData.body.customerType == 'ABBOTT_EMPLOYEES'){
        customerCategory = '';
        customerRole = '';
    }

    let istatProduct = $('[name="istatProduct"]').val().toString();
    let topics = $('[name="topics"]').val().toString();
    let captchaType = '';
    let captchaAction = '';
    if ($("[name='enterpriseRecaptcha']").val()=='true'){
        captchaType = "ent";
        captchaAction = "submit";
    }
    formData.body = {
        "userInfo": {
         "firstName": formData.body.firstName,
         "lastName": formData.body.lastName,
         "email": formData.body.email,
         "password": formData.body.password,
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
            "language": formData.body.language,
            "reCaptcha" : formData.body["g-recaptcha-response"],
            "captchaType" : captchaType,
            "captchaAction" : captchaAction
            }
         }
    }
    return formData
}

function onFailureUserRegistration(data){
    setTimeout(() => {
        $('.custom-spinner').addClass('d-none');
    }, 100);
    $("#register-form .o-form-container__error-msg").text(data.response?.statusReason);
}