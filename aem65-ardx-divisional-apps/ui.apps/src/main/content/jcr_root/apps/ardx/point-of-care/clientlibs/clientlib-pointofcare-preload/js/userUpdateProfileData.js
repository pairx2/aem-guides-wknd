
function UpdateUpdateProfileRequest(formData) {
	let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    const token = getCookie('id_token')?getCookie('id_token'):sessionStorage.getItem('jwtToken');  
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
    let istatProduct = $('[name="istatProduct"]')?.val()?.toString();
    let topics = $('[name="topics"]')?.val()?.toString();
	formData.headers = {
        'x-preferred-language': 'en',
		'x-country-code': 'US',
        'x-application-id': headerApplicationId,
        "x-id-token" : token
	}
    let currOptInStatus = $('[name="contactOptIn"]').attr('data-optin');
    if(currOptInStatus != formData.body.contactOptIn){
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
                "customerRole": customerRole,
                "customerCategory": customerCategory,
                "istatProduct": istatProduct,
                "serialNumber": formData.body.serialNumber,
                "topics": topics,
                "language": formData.body.language,
                "contactOpt": formData.body.contactOptIn
                }
             }
        }
    }
    else{
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

function onProfileError(responseData) {
    if(responseData.errorCode != 0) {
        $("#edit-account .o-form-container__error-msg")?.text(responseData.response?.statusReason);
        $("#complete-profile-form .o-form-container__error-msg")?.text(responseData.response?.statusReason);
    }
}