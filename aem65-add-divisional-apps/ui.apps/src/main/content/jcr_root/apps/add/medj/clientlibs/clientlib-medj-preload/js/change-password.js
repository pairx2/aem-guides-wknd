// Platform form container json form data change
function updateRequestChangePassword(formData) {
    if(formData) {
        formData.headers = {
            'Content-Type' : formData.headers["Content-Type"],
            'x-country-code' : formData.headers["x-country-code"],
            'x-application-id' : formData.headers["x-application-id"],
            'x-preferred-language' : formData.headers["x-preferred-language"],
            'x-id-token' : sessionStorage.getItem('jwtToken')
        }
    }
    return formData;
}
// Change password success function
function onSuccessChangePassword(response) {
    if(response.errorCode === 0) {
        sessionStorage.setItem('profileUpdateAlert', 'PasswordChanged');
        var currentPath = location.pathname;
        var currentPathOnly = currentPath.substring(0, currentPath.lastIndexOf("/"));
        location.pathname = currentPathOnly + '.html';
    }
}
// Change password error function
function onErrorChangePassword(response) {
    showApiError('#change-password-api-error', response);
}
function changePasswordPageCustomization() {
    var changePasswordForm = document.querySelector('#changePasswordForm');
    var loginAccessInfo = document.querySelector('#change-password-login-access-info').closest('.container');
    if(UserLoginValidCheck()) {
        loginAccessInfo.style.display = 'none';
    }
    else {
        changePasswordForm.style.display = 'none';
    }
}

window.addEventListener('load', (event) => {
    if(typeof typeof Granite === 'undefined' ||  typeof Granite.author === 'undefined') {
        var changePasswordForm = document.querySelector('#changePasswordForm');
        if(changePasswordForm) {
            changePasswordPageCustomization();
        }
    }
});