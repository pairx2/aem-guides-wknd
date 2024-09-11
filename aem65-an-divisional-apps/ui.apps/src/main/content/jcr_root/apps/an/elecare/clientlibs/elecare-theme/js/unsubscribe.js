function updateUnsubscribe(formData){
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    let countryCode = document.querySelector('input[name="x-country-code"]').value;
    let preferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    formData.headers = {
        'x-preferred-language': preferredLanguage,
        'x-country-code': countryCode,
        'x-application-id': headerApplicationId,
        'content-type': 'application/json'
    }
    formData.body = { 
        "emailAddress": formData.body.email,
        "g-recaptcha-response": formData.body["g-recaptcha-response"],
        "captchaType": "NON_ENT"
    }
    return formData;
}
function onUnSubscribeError(responseData){
    if(responseData.errorCode != 0) {
        if(responseData.response.i18nMessageKey == "REG-USER-1006"){
            $("#unsubscribe-form .o-form-container__error-msg").text($('[name="notValidEmail"]').val());
        }else{
            $("#unsubscribe-form .o-form-container__error-msg").text(responseData.response?.statusReason);  
        }
    }
}
$(window).on("load", function() {  
    $('#unsubscribe-form .o-form-container__main-form [name="confirmEmail"]').on('keyup input change blur', function (e) {
        e.preventDefault();
        setTimeout(() => {
            $(this).closest('.form-group').removeClass('validation-error');
        }, 50);
        if ($(this).val().length > 0) {
            if ($(this).val() != $(this).closest('.fields').prev('.fields').find('[name="email"]').val())  {
                setTimeout(() => {
                    $(this).closest('.form-group').addClass('validation-error');
                    $('#unsubscribe-form .btn').attr('disabled', true);
                }, 50);
            }
            else {
                setTimeout(() => {
                    if(!$(this).closest('.fields').prev('.fields').find('.form-group').hasClass('validation-error') && !$(this).closest('.fields').prev('.fields').find('.form-group').hasClass('validation-regex')){
                        $('#unsubscribe-form .btn').removeAttr('disabled'); 
                    }
                }, 50);
            }
        }
    });        
    $('#unsubscribe-form .o-form-container__main-form [name="email"], #unsubscribe-form .o-form-container__main-form [name="confirmEmail"]').on('keydown', function (e) {
        if(e.keyCode == 32) {
            e.preventDefault();
            return false;
        }
    });
});

$(document).ready(function() {
    $('#unsubscribe-form .o-form-container__main-form [name="email"]').on('keyup input change blur', function (e) {
        e.preventDefault();
        setTimeout(() => {
            $(this).closest('.fields').next('.fields').find('.form-group').removeClass('validation-error');
        }, 50);
        if ($(this).val().length > 0) {
            if ($(this).val() != $(this).closest('.fields').next('.fields').find('[name="confirmEmail"]').val()) {
                setTimeout(() => {
                    if ($(this).closest('.fields').next('.fields').find('[name="confirmEmail"]').val().length > 1) {
                        $(this).closest('.fields').next('.fields').find('.form-group').addClass('validation-error');
                        $('#unsubscribe-form .btn').attr('disabled', true);
    
                    }
                }, 50);
            }
            else {
                setTimeout(() => {
                    if(!$(this).closest('.fields').find('.form-group').hasClass('validation-error') && !$(this).closest('.fields').find('.form-group').hasClass('validation-regex')) {
                        $('#unsubscribe-form .btn').removeAttr('disabled'); 
                    } 
                    else {
                        $('#unsubscribe-form .btn').attr('disabled', true);
                    }
                }, 150);
            }
        }
    });
});