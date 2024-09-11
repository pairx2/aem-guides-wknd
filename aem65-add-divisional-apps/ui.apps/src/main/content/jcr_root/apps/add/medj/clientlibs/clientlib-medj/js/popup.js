// Login form customization
function LoginFormCustomization() {
    var UserLoginPopupModal = document.querySelector('.modal #UserLoginFormContainer').closest('.modal');
    UserLoginPopupModal.classList.add('custom-login-form-modal');
    $("#loginSignUpTrigger").parent().parent(".m-popup").addClass("loginPopupTrigger");
}

// Login form validation
var headerPreferredLanguage;
var headerCountryCode;
var headerApplicationId;
function UserLoginForm() {
    UserLoginForm = document.querySelector('.modal #UserLoginFormContainer form');
    var submitBtn = document.querySelector('.modal #UserLoginFormContainer #loginFormSubmit');
    var email = UserLoginForm.querySelector('input[type="email"]');
    var emailParent = email.closest('.form-group');
    var emailRegexError = emailParent.querySelector('.a-input-field--text-error');
    var customEmailRegexError = UserLoginForm.querySelector('#custom-email-regex-error p').innerText;
    var password = UserLoginForm.querySelector('input[type="password"]');
    var passwordParent = password.closest('.form-group');
    headerPreferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
    headerApplicationId = document.querySelector('input[name="x-application-id"]').value;

    var formValid = false;
    var emailFilled = false;
    var passwordFilled = false; 
    var emailRegexValid = false;

    // Pushing custom Regex error message inside Platform Regex error elemnt
    emailRegexError.innerText = customEmailRegexError;

    submitBtn.closest('.button').classList.add('a-button', 'a-button--primary', 'mb-2');
    //submitBtn.disabled = true;

    email.addEventListener('keyup', function(e) {
        // Required validation
        if(!email.value) {
            emailParent.classList.add('validation-require');
            emailParent.classList.remove('validation-regex');
            emailFilled = false;
            //enableLoginSubmitBtn();
        }
        else {
            emailParent.classList.remove('validation-require');
            emailFilled = true;
            //enableLoginSubmitBtn();
        }
        // Email Regex validation
        if(email.value) {
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            var emailValid = emailPattern.test(email.value);
            if(!emailValid) {
                emailParent.classList.add('validation-regex');
                emailParent.classList.remove('validation-require');
                emailRegexValid = false;
                //enableLoginSubmitBtn();
            }
            else {
                emailParent.classList.remove('validation-regex');
                emailRegexValid = true;
                //enableLoginSubmitBtn();
            }
        }
        if(e.keyCode == 13) {
            submitBtn.click();
        }
    });

    password.addEventListener('keyup', function(e) {
        if(!password.value) {
            passwordParent.classList.add('validation-require');
            passwordFilled = false;
            //enableLoginSubmitBtn();
        }
        else {
            passwordParent.classList.remove('validation-require');
            passwordFilled = true;
            //enableLoginSubmitBtn();
        }
        if(e.keyCode == 13) {
            submitBtn.click();
        }
    });

    function enableLoginSubmitBtn() {
        if(emailFilled && passwordFilled && emailRegexValid) {
            formValid = true;
            //submitBtn.disabled = false;
        }
        else {
            formValid = false;
            //submitBtn.disabled = true;

            //new validation code
            if(!emailFilled) {
                emailParent.classList.remove('validation-regex');
                emailParent.classList.add('validation-require');
            }else if(!emailRegexValid){
                emailParent.classList.add('validation-regex');
                emailParent.classList.remove('validation-require');
            }else if(!passwordFilled){
                passwordParent.classList.add('validation-require');
            }else{
                emailParent.classList.remove('validation-regex');
                emailParent.classList.remove('validation-require');
                passwordParent.classList.remove('validation-require');
            }

        }
    }
    
    function userLoginFormCall(UserLoginFormBodyData, authorUrl) {
        var xhr = new XMLHttpRequest;
        var url = UserLoginForm.getAttribute('action');

        xhr.open('POST', url, true);
            
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('x-country-code', headerCountryCode);
        xhr.setRequestHeader('x-application-id', headerApplicationId);
        xhr.setRequestHeader('x-preferred-language', headerPreferredLanguage);        

        xhr.send(JSON.stringify(UserLoginFormBodyData));

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                if(responseData.errorCode == 0) {
                    var jwtToken = responseData.response.jwtToken.id_token;
                    sessionStorage.setItem('jwtToken', jwtToken);
                    sessionStorage.setItem('LoggedInTime', new Date());
                    var IdLinkageHashedKey = responseData.response.accountInfo.idLinkageAttributes.hashedKey;
                    sessionStorage.setItem('IdLinkageHashedKey', IdLinkageHashedKey);
                    if(isSubdomain()) {
                        var IdLinkageVisitorData_attribute74 = responseData.response.accountInfo.idLinkageAttributes['VisitorData.attribute74'];
                        sessionStorage.setItem('IdLinkageVisitorData_attribute74', IdLinkageVisitorData_attribute74);
                    }
                    else {
                        var IdLinkageVisitorData_attribute140 = responseData.response.accountInfo.idLinkageAttributes['VisitorData.attribute140'];
                        sessionStorage.setItem('IdLinkageVisitorData_attribute140', IdLinkageVisitorData_attribute140);
                    }                    
                    loginLogOutCloudFrontSetCookie(true);                                               
                }
                else {
                    //submitBtn.disabled = false;
                    showApiError('.custom-login-form-modal #login-api-error', responseData);
                }                    
            }
        }
    }

    submitBtn.addEventListener('click', function() {
        //submitBtn.disabled = true;
        enableLoginSubmitBtn();

        if(formValid) {            
            var dataSiteKey = document.querySelector('.modal #UserLoginFormContainer').getAttribute('data-site-key');
            var loginAuthorUrl = location.pathname.includes('/content/');
            var UserLoginFormData = null;
            if(loginAuthorUrl) {
                UserLoginFormData = {
                    loginID : email.value,
                    password : password.value
                }
                userLoginFormCall(UserLoginFormData, loginAuthorUrl);
            }
            else {
                grecaptcha.execute(dataSiteKey).then(function(token) {
                    UserLoginFormData = {
                        loginID : email.value,
                        password : password.value,
                        "g-recaptcha-response" : token
                    }
                    userLoginFormCall(UserLoginFormData, loginAuthorUrl);
                });                
            }                                
        }
        
    })
}

// Login valid check
function UserLoginValidCheck() {
    var jwtTokenStatus = sessionStorage.getItem('jwtToken');
    if(jwtTokenStatus) {
        var jwtTokenStoredTime = new Date(sessionStorage.getItem('LoggedInTime'));
        var currentDate = new Date();
        var sessionDiff = (currentDate.getTime() - jwtTokenStoredTime.getTime()) / 1000;
        // Setting session tiemout
        var sessionTimeOut = 82800;  //seconds
        if(sessionDiff <= sessionTimeOut) {
            console.log('Valid Session time : ' + sessionDiff);
            return true;
        }
        else {
            console.log('Invalid Session time : ' + sessionDiff);
            return false;
        }
    }
    else {
        return false;
    }
}

// Cloudfront set cookie
function loginLogOutCloudFrontSetCookie(cookieSessionType) {
    var cookieRequest = new XMLHttpRequest;
	var cookieRequestUrl;

    if(location.pathname.includes('/content/')) {
        var loginServiceUrl = new URL(document.querySelector('.modal #UserLoginFormContainer form').getAttribute('action'));
        cookieRequestUrl = loginServiceUrl.origin + '/api/private/profile/session?enable=' + cookieSessionType;
    }
    else {
        cookieRequestUrl = '/api/private/profile/session?enable=' + cookieSessionType;
    }
    
    var jwtToken = sessionStorage.getItem('jwtToken');

    cookieRequest.open('GET', cookieRequestUrl, true);

    cookieRequest.setRequestHeader('Content-Type', 'application/json');
    cookieRequest.setRequestHeader('x-country-code', headerCountryCode);
    cookieRequest.setRequestHeader('x-application-id', headerApplicationId);
    cookieRequest.setRequestHeader('x-preferred-language', headerPreferredLanguage);
    cookieRequest.setRequestHeader('x-id-token', jwtToken);

    cookieRequest.send();

    cookieRequest.onreadystatechange = function() {
        if(cookieRequest.readyState === 4 && cookieRequest.status === 200) {
            console.log('CDN Cookie call success');                                               
            
            if(cookieSessionType) {
                if(EventsShanonLoginRedirection) {
                    var EventsShanonLoginRedirection = null;
                    EventsShanonRedirectionForm();
                }
                else {
                    location.reload();
                    // $('#loginSignUpTrigger-modal .generic-modal--close').click();
                    headerAuthenticationCheck();
                }
            }
            
            else {
                sessionStorage.removeItem('jwtToken');
                sessionStorage.removeItem('IdLinkageHashedKey');
                (isSubdomain()) ? sessionStorage.removeItem('IdLinkageVisitorData_attribute74') : sessionStorage.removeItem('IdLinkageVisitorData_attribute140');
                
                var currentUrl = location.pathname.split('/');
                
                if(currentUrl.indexOf('content') > -1) {
                    var secureIndex = currentUrl.indexOf('secure');
                    var homeIndex = currentUrl.indexOf('home');
                    var redirectPath;
                    if(secureIndex > -1) {
                        redirectPath = currentUrl.slice(0, secureIndex);
                    }
                    else if(homeIndex > -1) {
                        redirectPath = currentUrl.slice(0, homeIndex);
                    }
                    if(redirectPath) {
                        redirectPath.push('home.html');
                        redirectPath = redirectPath.join('/');
                        location.pathname = redirectPath;
                    }
                    else {
                        location.reload();
                    }                 
                }
                else {
                    (location.pathname == 'home.html' || location.pathname == '/home.html') ? location.reload() : location.pathname = 'home.html';
                }
            }               
        }
    }
}

// Logout functionality
function UserLogout() {
    var logOutXhr = new XMLHttpRequest;
    var loginServiceUrl = new URL(document.querySelector('.modal #UserLoginFormContainer form').getAttribute('action'));
    var logOutServiceUrl = loginServiceUrl.origin + '/api/private/profile/logout';

    logOutXhr.open('POST', logOutServiceUrl, true);

    logOutXhr.setRequestHeader('Content-Type', 'application/json');
    logOutXhr.setRequestHeader('x-country-code', document.querySelector('input[name="x-country-code"]').value);
    logOutXhr.setRequestHeader('x-application-id', document.querySelector('input[name="x-application-id"]').value);
    logOutXhr.setRequestHeader('x-preferred-language', document.querySelector('input[name="x-preferred-language"]').value);
    logOutXhr.setRequestHeader('x-id-token', sessionStorage.getItem('jwtToken'));

    logOutXhr.send();

    logOutXhr.onreadystatechange = function() {
        if(logOutXhr.readyState === 4 && logOutXhr.status === 200) {
            var logOutresponseData = JSON.parse(logOutXhr.responseText);
            if(logOutresponseData.errorCode == 0) {
                console.log('ESL : ' + logOutresponseData.response);
                loginLogOutCloudFrontSetCookie(false);
            }
            else {
                console.log('ESL : ' + logOutresponseData.response);
            }
        }
    }            
}

window.onload = () => {
    // Setting timeout based function because Incognito mode renders window.onload before completely DOM load
    setTimeout(function() {
        var UserLoginFormWrap = document.querySelector('.modal #UserLoginFormContainer');
        if(UserLoginFormWrap) {
            LoginFormCustomization();
            UserLoginForm();
        }
    }, 1000);
};