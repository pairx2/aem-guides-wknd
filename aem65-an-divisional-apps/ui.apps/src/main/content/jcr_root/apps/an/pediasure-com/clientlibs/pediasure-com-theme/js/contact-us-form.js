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
        "requestType": "pediasure-contact-us",
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

$(window).on("load", function() {
    if($('#contactus-form').length > 0) {
        $('#contactus-form .o-form-container__main-form [name="confirmEmail"]').on('keyup input change blur', function (e) {
            e.preventDefault();
            setTimeout(() => {
                $(this).closest('.form-group').removeClass('validation-error');
            }, 50);
            if ($(this).val().length > 0) {
                if ($(this).val() != $(this).closest('.form-container').find('[name="email"]').val())  {
                    setTimeout(() => {
                        $(this).closest('.form-group').addClass('validation-error');
                        $('.o-form-container button[type="submit"]').attr('disabled', true);
                    }, 50);
                }
                else {
                    setTimeout(() => {
                        $(this).closest('.form-group').removeClass('validation-error');
                    }, 50);
                }
            }
        });   
        $('#contactus-form .o-form-container__main-form [name="email"], #contactus-form .o-form-container__main-form [name="confirmEmail"]').on('keydown', function (e) {
            if(e.keyCode == 32) {
                e.preventDefault();
                return false;
            }
        });
	}

    $('#contactus-form button[type="reset"]').on('click', function() {
        $('#contactus-form .form-group').removeClass('validation-require validation-regex validation-error');
        $('#contactus-form .checkbox, #contactus-form .a-dropdown').removeClass('validation-require ');
    });
});

$(document).ready(function () {
    if($('#contactus-form').length > 0) {        
        $('#contactus-form .o-form-container__main-form [name="email"]').on('keyup input change blur', function (e) {
            e.preventDefault();
            setTimeout(() => {
                $('[name="confirmEmail"]').closest('.fields').find('.form-group').removeClass('validation-error');
            }, 50);
            if ($(this).val().length > 0) {
                if ($(this).val() != $(this).closest('.form-container').find('[name="confirmEmail"]').val()) {
                    setTimeout(() => {
                        if ($(this).closest('.form-container').find('[name="confirmEmail"]').val().length > 1) {
                            $('[name="confirmEmail"]').closest('.fields').find('.form-group').addClass('validation-error');
                            $('.o-form-container button[type="submit"]').attr('disabled', true);
                        }
                    }, 50);
                }
                else {
                    setTimeout(() => {
                        $('[name="confirmEmail"]').closest('.fields').find('.form-group').removeClass('validation-error');
                    }, 150);
                }
            }
        });
    }
});