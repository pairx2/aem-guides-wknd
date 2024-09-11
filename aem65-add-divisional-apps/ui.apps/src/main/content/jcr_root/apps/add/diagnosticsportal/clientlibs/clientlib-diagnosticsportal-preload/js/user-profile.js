function UpdateProfileDataRequest(formData) {
	$(".loader-parent").show();
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    var businessRole = document.querySelector('ul[name="role"] li.selected ').getAttribute('data-optionvalue');
    var languagePreference = document.querySelector('ul[name="languagePreference"] li.selected ').getAttribute('data-optionvalue');
    const token = getCookie('id.token');


	formData.headers = {
        'x-preferred-language': 'en_US',
		'x-country-code': headerCountryCode,
        'x-application-id': headerApplicationId,
        "x-id-token" : token,
        'Content-Type': 'application/json'
	}
    formData.body = {
    "userInfo": {
        "firstName": formData.body.firstName,
        "lastName":formData.body.lastName,
        "email": formData.body.email,
        "phoneNumber": formData.body.phoneNumber,
        "password": formData.body.password,
        "additionalProperties": {
            "businessRole": businessRole,
            "languagePreference": languagePreference,                  
        }
    }

    }
}
function onSuccessprofileupdate(data){
    if (data.errorCode == 0) {
		$(".o-form-container__success-msg").hide();
        let firstName = data.response.userInfo.firstName;
        let lastName = data.response.userInfo.lastName;
        let email = data.response.userInfo.email;
        let phoneNumber = data.response.userInfo.additionalProperties.phoneNumber;
        let businessRole = data.response.userInfo.additionalProperties.businessRole;
        let languagePreference = data.response.userInfo.additionalProperties.languagePreference;

        sessionStorage.setItem('firstName', firstName);
        sessionStorage.setItem('lastName', lastName);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('phoneNumber', phoneNumber);
        sessionStorage.setItem('businessRole', businessRole);
        sessionStorage.setItem('languagePreference', languagePreference);
        $('#save-changes').show();
		$(".loader-parent").hide();

    }
}
function onCompleteprofileupdate(data){
    if(sessionStorage.getItem('firstName') != null ){
        $('#profile-access-main input[name="firstName"]').val(sessionStorage.getItem('firstName'));
    }    

    if(sessionStorage.getItem('lastName') != null ){
        $('#profile-access-main input[name="lastName"]').val(sessionStorage.getItem('lastName'));
    }    

    if(sessionStorage.getItem('email') != null ){
        $('#profile-access-main input[name="email"]').val(sessionStorage.getItem('email'));
    } 

    if(sessionStorage.getItem('phoneNumber') != null ){
        $('#profile-access-main input[name="phoneNumber"]').val(sessionStorage.getItem('phoneNumber'));
    } 

    if(sessionStorage.getItem('businessRole') != null ){
        var retriveRole = sessionStorage.getItem('businessRole');
        var roleText;
        $('ul[name="role"] li').each(function(){              
            var roleOption = $(this).attr('data-optionvalue');              
            if(roleOption == retriveRole.toUpperCase()) {
                $(this).addClass('selected');
                roleText = $(this).find('span').text();                  
            }
        });
        $('#profile-access-main #role-options').find('.a-dropdown-selected').text(roleText);
    }  
    if(sessionStorage.getItem('languagePreference') != null ){
        var retriveLang = sessionStorage.getItem('languagePreference')
        var langText;

        $('ul[name="languagePreference"] li').each(function(){              
            var langOption = $(this).attr('data-optionvalue');              
            if(langOption == retriveLang) {
                $(this).addClass('selected');
                langText = $(this).find('span').text();                  
            }
        });
        $('#profile-access-main  #languagePreference-options').find('.a-dropdown-selected').text(langText);
            
    }  
                
}
