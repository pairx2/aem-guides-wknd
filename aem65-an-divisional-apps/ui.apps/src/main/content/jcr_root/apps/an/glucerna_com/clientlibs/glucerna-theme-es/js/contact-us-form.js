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
        "requestType": "glucerna_contactus_es",
        "EmailAddress": formData.body.email,
        "ConfirmEmailAddress": formData.body.confirmEmail,
        "FirstName": formData.body.firstName,
        "LastName": formData.body.lastName,
        "PhoneNumber": formData.body.number,
        "Address1": formData.body.address1,
        "Address2": formData.body.address2,
        "City": formData.body.city,
        "State": state,
        "ZipCode": formData.body.zipCode,
        "Subject": subject,
        "Others": formData.body.other,
        "Comments": formData.body.questionComment,
        "g-recaptcha-response": formData.body["g-recaptcha-response"],
        "captchaType": "ENT",
        "captchaAction": "submit"
    }
    return formData
}

$(window).on("load", function() {
    $('.o-form-container__main-form [name="confirmEmail"]').on('keyup input change blur', function (e) {
		e.preventDefault();
		setTimeout(() => {
			$(this).closest('.form-group').removeClass('validation-error');
		}, 50);
		if ($(this).val().length > 0) {
			if ($(this).val() != $(this).closest('.fields').prev('.fields').find('[name="email"]').val())  {
				setTimeout(() => {
					$(this).closest('.form-group').addClass('validation-error');
					$('.o-form-container .btn').attr('disabled', true);
				}, 50);
			}
			else {
				setTimeout(() => {
					$(this).closest('.form-group').removeClass('validation-error');
				}, 50);
			}
		}
	});
	$('.o-form-container__main-form [name="email"]').on('keyup input change blur', function (e) {
		e.preventDefault();
		setTimeout(() => {
			$(this).closest('.fields').next('.fields').find('.form-group').removeClass('validation-error');
		}, 50);
		if ($(this).val().length > 0) {
			if ($(this).val() != $(this).closest('.fields').next('.fields').find('[name="confirmEmail"]').val()) {
				setTimeout(() => {
					if ($(this).closest('.fields').next('.fields').find('[name="confirmEmail"]').val().length > 1) {
						$(this).closest('.fields').next('.fields').find('.form-group').addClass('validation-error');
						$('.o-form-container .btn').attr('disabled', true);

					}
				}, 50);
			}
			else {
				setTimeout(() => {
					$(this).closest('.fields').next('.fields').find('.form-group').removeClass('validation-error');
				}, 150);
			}
		}
	});
	$('.o-form-container__main-form [name="email"],.o-form-container__main-form [name="confirmEmail"]').on('keydown', function (e) {
		if(e.keyCode == 32) {
			e.preventDefault();
			return false;
		}
	});
});