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
    let fulladdressline1 = $("#street_number").val();
    let addressLine1 = fulladdressline1.split(",")[0];

    formData.body = {    
        "requestType": "zoneperfect-contact-us",
        "email": formData.body.email,
        "confirmEmail": formData.body.confirmEmail,
        "firstName": formData.body.firstName,
        "lastName": formData.body.lastName,
        "number": formData.body.number,
        "address1": addressLine1,
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

function onContactUsSuccess() {
	$('#contact-us-form-thankyou').css('display', 'block');
	$('#contact-us-form').closest('.formcontainer').css('display', 'none');
	$('html, body').animate({ scrollTop: $('#contact-us-form-thankyou').offset().top - 40}, 500);
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

$(document).ready(function() {
    $('#contact-us-form input').on('blur', function() {
        setTimeout( function() {
            $('#contact-us-form button[type="submit"]').removeAttr('disabled');
        }, 100);
    });
    $('#contact-us-form .a-dropdown__field ul li').on('click', function() {
        setTimeout( function() {
            $('#contact-us-form button[type="submit"]').removeAttr('disabled');
        }, 100);
    });
    $('#contact-us-form button[type="submit"]').on('click', function() {
        $('#contact-us-form .a-dropdown[data-required="true"]').each(function() {
            if(!$(this).find('.selected').length > 0) {
                $(this).addClass('validation-require');
            }
        });
        $('#contact-us-form .a-checkbox__input[data-required="true"]').each(function() {
            if (!$(this).is(':checked')) {
                $(this).closest('.checkbox').addClass('validation-require');
            }
        });
    });
    $('#street_number').on('keyup', function(event) {
        let key = event.keyCode || event.charCode;
        if( key == 8 || key == 46 ) {
            $('#locality').closest('.fields').show();
            $('#zip').show();
            $('#locality, #postal_code').val('');
            if($('#state-options .a-dropdown-selected').length > 0) {
                $('#state-options .a-dropdown-selected').text('Select a State');
            }
            $('#state-options ul li').removeClass('selected').removeAttr('aria-selected');
        }
    });
});