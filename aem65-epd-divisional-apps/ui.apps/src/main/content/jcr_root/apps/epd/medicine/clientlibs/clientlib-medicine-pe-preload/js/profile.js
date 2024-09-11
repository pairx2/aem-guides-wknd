(function(){
   setTimeout(function(){
        var myProfileMenu = $('#myprofile_item .linkstack').addClass('myprofile-linkstack').parent().html();
		if(window.innerWidth > 767){
        $('.o-header__logo-right').prepend(myProfileMenu);
        }
       else{
		$('.megamenu').append(myProfileMenu);
       }
        
        $('.myprofile-linkstack').hide();
		$('.myprofile-linkstack').find('[target="_blank"]:first').attr('href','javascript:void(0);');
		$('.myprofile-linkstack').find('[target="_blank"]').removeAttr("target");
        $('#myprofile_item .linkstack').closest('.container').remove();
    },100)
})();
$(document).ready(function() {    

setTimeout(function(){
	var currenturlSso = window.location.href;
    if(currenturlSso.includes("profile.html"))
	{
    OnSuccessProfileInfo();
    $('#enable_password_field').find('input').attr('disabled', true);
	}
  },200);
   $('.o-form-container__main-form input, .o-form-container__main-form textarea').on('change input', function(){
		$('.o-form-container__element div[class*="msg"]').text('');
    });




});
function UpdateProfileRequest(formData){

    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;

    if(getCookie("id.token")?.length>0)
	{
     formData.headers = {
        'x-id-token':  getCookie('id.token'),
		'x-country-code': headerCountryCode,
		'x-application-id': headerApplicationId,
		'x-preferred-language': headerLanguage
	}
    formData.body = {
       "category": "profileInfo",
			"profileInfo": {
				firstName: formData.body.firstName,
        		lastName: formData.body.lastName

			}

    }

    return formData
   }
}
function UpdatePasswordRequest(formData) {

    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;

    if(getCookie("id.token")?.length>0)
	{
     formData.headers = {
        'x-id-token':  getCookie('id.token'),
		'x-country-code': headerCountryCode,
		'x-application-id': headerApplicationId,
		'x-preferred-language': headerLanguage
	}
    formData.body = {

			password: formData.body.password,
        	newPassword: formData.body.newPassword,
        	confirmPassword: formData.body.confirmPassword
			}

    return formData
   }
}
       function OnSuccessProfileInfo() {

        var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;

    if(getCookie("id.token")?.length>0)
	{
		var origin = window.location.origin;
        var replaceString = origin.split('.')[1];
        origin = origin.replace(replaceString,'services');
        if(origin.indexOf('www.')>-1){
			origin = origin.replace('www.','');
        }

        $.ajax({			
			url: origin + '/api/private/profile/profile-info',
			type: "GET",
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",

			"headers": {
            'x-id-token':  getCookie('id.token'),
			'x-application-id': headerApplicationId,
            'x-country-code': headerCountryCode,
            'x-preferred-language': headerLanguage,

			},
            success: function(data) {

            var response = data.response            
            for (let x in response.profile) {                

                $('[name='+x+']').val(response.profile[x])            
            }            
                $('#enable_password_field a').on('click',function(){                
                    $(this).closest('.form-container').find('[disabled]').removeAttr('disabled')            
                })
			},
			error: function(error) {

            }
		});
	}

    }

function OnCompleteRequest() {
    $('#enable_password_field').find('input').attr('disabled', true);
	$('.a-input-password-strength').attr('class','').addClass('a-input-password-strength');
    }
function OnErrorRequest(data){
    var response = data.response.statusReason;
	$('.o-form-container__error-msg').text(response);
}
function OnErrorRequestChangePassword(data){
    var response = data.response.statusReason;
	$('#enable_password_field .o-form-container__error-msg').text(response);
}