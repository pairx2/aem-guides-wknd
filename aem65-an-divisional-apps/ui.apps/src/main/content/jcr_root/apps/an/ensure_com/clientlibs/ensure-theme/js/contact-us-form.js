function UpdateContactUsRequest(formData){
	let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
	let countryCode = document.querySelector('input[name="x-country-code"]').value;
	let preferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
	formData.headers = {
        'x-preferred-language': preferredLanguage,
		'x-country-code': countryCode,
        'x-application-id': headerApplicationId,
        'content-type': 'application/json'
	}
    let subject = $('[name="subject"]').find('.selected')?.attr('data-optionvalue');
    let state = $('[name="state"]').find('.selected')?.attr('data-optionvalue');
    
    formData.body = {    
        "requestType": "ensure-contact-us",
        "email": formData.body.email,
        "confirmEmail": formData.body.confirmEmail,
        "firstName": formData.body.firstName,
        "lastName": formData.body.lastName,
        "number": formData.body.number,
        "address1": formData.body.address1,
        "address2": formData.body.address2,
        "city": formData.body.city,
        "state": state,
        "zipCode": formData.body.zipCode,
        "subject": subject,
        "other": formData.body.other,
        "questionComment": formData.body.questionComment,
        "g-recaptcha-response": formData.body["g-recaptcha-response"],
        "captchaType": "ENT",
        "captchaAction": "submit"
    }
    return formData
}