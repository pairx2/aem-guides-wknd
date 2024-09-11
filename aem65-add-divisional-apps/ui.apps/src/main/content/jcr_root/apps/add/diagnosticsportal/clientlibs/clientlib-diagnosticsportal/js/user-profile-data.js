var searchUserurl = new URL($('#session-api-url').val());
var searchUserurlOrigin = searchUserurl.origin;
function populateUserdata() {    
	
      const token = getCookie('id.token');  
  	  $('.loader-parent').show(); 	

    $.ajax({		
		url: searchUserurlOrigin + '/api/private/profile/profile-info',        
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,            
            "x-id-token" : token
        },        
        success: function (data) {             
            if (data.errorCode == 0) {
                $('.loader-parent').hide(); 
                $('#firstName').val(data.response.userInfo.firstName);
                $('#lastName').val(data.response.userInfo.lastName);	
                $('#profile-access-email').val(data.response.userInfo.email);
                $('#phoneNumber').val(data.response.userInfo.additionalProperties.phoneNumber);

                var retriveRole = data.response.userInfo.additionalProperties.businessRole;
                var roleText;

                $('ul[name="role"] li').each(function(){              
                    var roleOption = $(this).attr('data-optionvalue');              
                    if(roleOption == retriveRole.toUpperCase()) {
                        $(this).addClass('selected');
                        roleText = $(this).find('span').text();                  
                    }
                });
                $('#role-options').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected').text(roleText);

                var retriveLang = data.response.userInfo.additionalProperties.languagePreference;
                var langText;

                $('ul[name="languagePreference"] li').each(function(){              
                    var langOption = $(this).attr('data-optionvalue');              
                    if(langOption == retriveLang) {
                        $(this).addClass('selected');
                        langText = $(this).find('span').text();                  
                    }
                });
                $('#languagePreference-options').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected').text(langText);
            }

        },
        error: function(error) {}
    });
    //console.log(data);

}
$(document).ready(function () {
    $('ul[name="role"]').parent().closest('fieldset').addClass("roleOptions");
    if ($("#profile-access-main").length > 0) {
        populateUserdata();
    }
    $(document).on('click', '#showUserProfile', function (e) {        
        populateUserdata();
    });
});
