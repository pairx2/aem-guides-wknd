function updateContactRequest(formData) {
var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;formData.headers = {
'x-country-code': headerCountryCode,
'x-application-id': headerApplicationId,
'x-preferred-language': headerLanguage,
'Content-Type': 'application/json'
}

formData.body = {
requestType: "contact-us",
comment: formData.body.comment,
firstName: formData.body.firstName,
lastName: formData.body.lastName,
email: formData.body.email,
institution: formData.body.institution,
country:formData.body.country
}
}

function onSucessContact(){
    $('#contact-us-info').css('display','none');
    $('#contact-us-form').css('display','none');
    $('#contact-us-thanks-container').css('display','block');
}

