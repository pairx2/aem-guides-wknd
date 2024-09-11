/*Below function to change JSON structure as per Service API*/
function UpdateProfileDataRequest(formData) {
    if (UserLoginValidCheck()) {
        var updateprofileLoginToken = sessionStorage.getItem('jwtToken');
    }
    var headerLanguage = $("input[name='x-preferred-language']").val();
    var headerCountryCode = $("input[name='x-country-code']").val();
    var headerApplicationId = $("input[name='x-application-id']").val();
    formData.headers = {

        'x-country-code': headerCountryCode,
        'x-application-id': headerApplicationId,
        'x-preferred-language': headerLanguage,
        'x-id-token': updateprofileLoginToken,
        'Content-Type': 'application/json'

    }
    formData.body = {
        userInfo: {
            userName: $("#email").val(),
            email: $("#email").val(),
            firstName: formData.body.firstName,
            lastName: formData.body.lastName,
            medicalInstitution: formData.body.medicalInstitution,
            speciality: formData.body.speciality,
            designation: (formData.body.designation) ? formData.body.designation : '',
            workPhone: (formData.body.workPhone) ? formData.body.workPhone : '',
            occupation: $("#occupation-options .a-dropdown__menu li.selected").attr('data-optionvalue')
        },
        subscriptions: [{
                id: formData.body.subscriptions[0].consentName,
                isSubscribed: formData.body.subscriptions[0].consentValue
            },
            {
                id: formData.body.subscriptions[1].consentName,
                isSubscribed: formData.body.subscriptions[1].consentValue
            },
            {
                id: formData.body.subscriptions[2].consentName,
                isSubscribed: formData.body.subscriptions[2].consentValue
            }
        ]
    }
    console.log(formData);
    return formData
}

/*Update profile success function*/
function onSuccessProfileUpdate(response) {
    if (response.errorCode === 0) {
        var currentPath = location.pathname;
        var currentPathOnly = currentPath.substring(0, currentPath.lastIndexOf("/"));
		$(".o-form-container__success-msg").hide();
        if (UserLoginValidCheck()) {
            sessionStorage.setItem('profileUpdateAlert', 'ProfileUpdated');            
            location.pathname = currentPathOnly + '.html';
        } else {
            localStorage.setItem('triggerLoginPopup', 'true');
            location.pathname = currentPathOnly + '/home.html';
        }
    }
}
/*Update profile error function*/
function onErrorProfileUpdate(response) {
	$(".o-form-container__error-msg").hide();
    if (UserLoginValidCheck()) {
        showApiError('#edit-profile-api-error', response);
    } else {
        $(".loginPopupBtn.m-popup").click();
    }
}