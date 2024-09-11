function UpdateRegisterDataRequest(formData) {


    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    if(headerLanguage.indexOf('_') > -1){
		headerLanguage = headerLanguage.split("_")[0];
    }
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;


    formData.headers = {
		'x-country-code': headerCountryCode,
		'x-application-id': headerApplicationId,
		'x-preferred-language': headerLanguage
	}

    formData.body = {
        userDetail: {
            userType: formData.body.userType,
            firstName: formData.body.firstName,
            lastName: formData.body.lastName,
            email: formData.body.email,
            confirmEmail: formData.body.confirmEmail,
			preferredLanguage: headerLanguage,
            password: formData.body.password,
            confirmPassword: formData.body.confirmPassword,
            speciality: formData.body.speciality,
            professionalCertificate: formData.body.professionalCertificate
        },
        consentTypes: formData.body.consentTypes


    }
    return formData
}
$(document).ready(function() {  
    if( $('.o-form-container__main-form [name="confirmEmail"]').length > 0){
        $('.o-form-container__main-form [name="confirmEmail"]').on('focus keyup input change',function(){
            $(this).closest('.form-group').removeClass('validation-error');
            setTimeout(()=>{
			$(this).closest('.form-group').removeClass('validation-error');
            },5);
        });
		$('.o-form-container__main-form input, .o-form-container__main-form textarea').on('keyup blur',function(){
            setTimeout(()=>{
                if($(this).closest('.validation-error').find('.a-input-field--text-error').length > 0){
                    if($(this).closest('.validation-error').find('.a-input-field--text-error').text().length == 0){
						$(this).closest('.validation-error').find('.a-input-field--text-error').closest('.validation-error').removeClass('validation-error')                    
                    }
            	}
            },5);
        });
		$('.o-form-container__main-form [name="confirmEmail"]').on('blur',function(e){
           e.preventDefault();
            $(this).closest('.form-group').removeClass('validation-error');
           if($(this).val().length > 3){
                   console.log($(this).val().length , $(this).closest('.fields').prev('.fields').find('[name="email"]').val().length)
                   if($(this).val() != $(this).closest('.fields').prev('.fields').find('[name="email"]').val()){
					setTimeout(()=>{
                       $(this).closest('.form-group').addClass('validation-error');
                       },50);
                   }
                   else{
                       setTimeout(()=>{
                          $(this).closest('.form-group').removeClass('validation-error');
                   },50);
               }
           }
        });
		$('.o-form-container__main-form [name="email"]').on('blur',function(e){
           e.preventDefault();
            $(this).closest('.fields').next('.fields').find('.form-group').removeClass('validation-error');
           if($(this).val().length > 3){
               console.log($(this).val().length , $(this).closest('.fields').next('.fields').find('[name="confirmEmail"]').val().length)
               if($(this).val() != $(this).closest('.fields').next('.fields').find('[name="confirmEmail"]').val()){
                   setTimeout(()=>{
                       if($(this).closest('.fields').next('.fields').find('[name="confirmEmail"]').val().length > 3){
                       	 $(this).closest('.fields').next('.fields').find('.form-group').addClass('validation-error');
                   	   }
               		},50);
               }
                else{
                    setTimeout(()=>{
                        $(this).closest('.fields').next('.fields').find('.form-group').removeClass('validation-error');
                	},50);
            	}
           }
        });
    }
});


