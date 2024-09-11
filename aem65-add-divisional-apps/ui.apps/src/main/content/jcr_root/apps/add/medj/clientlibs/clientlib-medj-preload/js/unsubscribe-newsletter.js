// Unsubscribe newsletter
var loggedInProfileData = null;
var logOutEmailRespData = null;
function unsubNewsletterLoggedInPref() {
    if(loggedInProfileData.response.userInfo.articleSubscribed == 'true' || loggedInProfileData.response.userInfo.eventSubscribed == 'true' || loggedInProfileData.response.userInfo.promoInfoSubscribed == 'true') {
        document.querySelector('#unsub-newsletter-loggedin-form-wrap').style.display = 'block';
        var unsubNewsletterLoggedInForm = document.querySelector('#unsub-newsletter-loggedin-form-wrap form');
        var unsubNewsletterArticlesCheckbox = unsubNewsletterLoggedInForm.querySelector('input[value="articles"]');
        var unsubNewsletterSemEveCheckbox = unsubNewsletterLoggedInForm.querySelector('input[value="eventsOrSeminar"]');
        var unsubNewsletterPromoInfoCheckbox = unsubNewsletterLoggedInForm.querySelector('input[value="promotionalInformation"]');
        
        if(loggedInProfileData.response.userInfo.articleSubscribed == 'true') {
            unsubNewsletterArticlesCheckbox.checked = true;
        }
        else {
            unsubNewsletterArticlesCheckbox.closest('.a-checkbox').style.display = 'none';
            unsubNewsletterArticlesCheckbox.checked = false;
        }

        if(loggedInProfileData.response.userInfo.eventSubscribed == 'true') {
            unsubNewsletterSemEveCheckbox.checked = true;
        }
        else {
            unsubNewsletterSemEveCheckbox.closest('.a-checkbox').style.display = 'none';
            unsubNewsletterSemEveCheckbox.checked = false;
        }

        if(loggedInProfileData.response.userInfo.promoInfoSubscribed == 'true') {
            unsubNewsletterPromoInfoCheckbox.checked = true;
        }
        else {
            unsubNewsletterPromoInfoCheckbox.closest('.a-checkbox').style.display = 'none';
            unsubNewsletterPromoInfoCheckbox.checked = false;
        }
    }
    else {
        document.querySelector('#unsub-newsletter-not-sub-response-wrap').style.display = 'block';
    }    
}
function unsubNewsletterLogOutPref() {
    if(logOutEmailRespData.response.userInfo.articleSubscribed == 'true' || logOutEmailRespData.response.userInfo.eventSubscribed == 'true' || logOutEmailRespData.response.userInfo.promoInfoSubscribed == 'true') {
        document.querySelector('#unsub-newsletter-logout-form-wrap').style.display = 'block';
        var unsubNewsletterLogOutForm = document.querySelector('#unsub-newsletter-logout-form form');
        var unsubNewsletterArticlesCheckbox = unsubNewsletterLogOutForm.querySelector('input[value="articles"]');
        var unsubNewsletterSemEveCheckbox = unsubNewsletterLogOutForm.querySelector('input[value="eventsOrSeminar"]');
        var unsubNewsletterPromoInfoCheckbox = unsubNewsletterLogOutForm.querySelector('input[value="promotionalInformation"]');

        if(logOutEmailRespData.response.userInfo.articleSubscribed == 'true') {
            unsubNewsletterArticlesCheckbox.checked = true;
        }
        else {
            unsubNewsletterArticlesCheckbox.closest('.a-checkbox').style.display = 'none';
            unsubNewsletterArticlesCheckbox.checked = false;
        }

        if(logOutEmailRespData.response.userInfo.eventSubscribed == 'true') {
            unsubNewsletterSemEveCheckbox.checked = true;
        }
        else {
            unsubNewsletterSemEveCheckbox.closest('.a-checkbox').style.display = 'none';
            unsubNewsletterSemEveCheckbox.checked = false;
        }

        if(logOutEmailRespData.response.userInfo.promoInfoSubscribed == 'true') {
            unsubNewsletterPromoInfoCheckbox.checked = true;
        }
        else {
            unsubNewsletterPromoInfoCheckbox.closest('.a-checkbox').style.display = 'none';
            unsubNewsletterPromoInfoCheckbox.checked = false;
        }
    }
    else {
        document.querySelector('#unsub-newsletter-not-sub-response-wrap').style.display = 'block';
    }    
}
function unsubNewsletterLogInProfile() {
    var retrieveProfileUrl = document.querySelector('#unsub-newsletter-login-profile-form form').getAttribute('action');
    var headerPreferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    var jwtTokenValue = sessionStorage.getItem('jwtToken');

    var xhr = new XMLHttpRequest;

    xhr.open('GET', retrieveProfileUrl, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-country-code', headerCountryCode);
    xhr.setRequestHeader('x-application-id', headerApplicationId);
    xhr.setRequestHeader('x-preferred-language', headerPreferredLanguage);
    xhr.setRequestHeader('x-id-token', jwtTokenValue);

    xhr.send();

    document.querySelector('#unsub-newseletter-loader-message-wrap').style.display = 'block';

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var responseData = JSON.parse(xhr.responseText);
            if (responseData.errorCode == 0) {
                document.querySelector('#unsub-newseletter-loader-message-wrap').style.display = 'none';
                loggedInProfileData = responseData;
                unsubNewsletterLoggedInPref();              
            }
            else {
                document.querySelector('#unsub-newseletter-loader-message-wrap').style.display = 'none';
                showApiError('#my-profile-api-error', responseData);
            }
        }
    }
}
function unsubNewsletterCustomization() {
    var unsubNewsletterSuccResp = document.querySelector('#unsub-newsletter-success-response-wrap');
    unsubNewsletterSuccResp.style.display = 'none';
    var unsubNewsletterNotSubResp = document.querySelector('#unsub-newsletter-not-sub-response-wrap');
    unsubNewsletterNotSubResp.style.display = 'none';
    var unsubNewsletterLoggedInForm = document.querySelector('#unsub-newsletter-loggedin-form-wrap');
    unsubNewsletterLoggedInForm.style.display = 'none';
    var unsubNewsletterLogOutForm = document.querySelector('#unsub-newsletter-logout-form-wrap');
    unsubNewsletterLogOutForm.style.display = 'none';

    if(UserLoginValidCheck()) {
        unsubNewsletterLogInProfile();     
        var unsubNewsletterEmailForm = document.querySelector('#unsub-newsletter-email-form-wrap');
        unsubNewsletterEmailForm.style.display = 'none';
    }
    else {
        document.querySelector('#unsub-newseletter-loader-message-wrap').style.display = 'none';
        document.querySelector('#unsub-newsletter-loggedin-form-wrap').style.display = 'none';
    }
}
// Platform form container LOGGED IN newseletter preferences json update form data change
function updateRequestLoggedInNewsletterPref(formData) {
    formData.headers = {
        'Content-Type' : formData.headers["Content-Type"],
        'x-country-code' : formData.headers["x-country-code"],
        'x-application-id' : formData.headers["x-application-id"],
        'x-preferred-language' : formData.headers["x-preferred-language"],
        'x-id-token' : sessionStorage.getItem('jwtToken')
    }
    formData.body = {
        userInfo: {
          userName: loggedInProfileData.response.userInfo.email,
          email: loggedInProfileData.response.userInfo.email,
          firstName: loggedInProfileData.response.userInfo.firstName,
          lastName: loggedInProfileData.response.userInfo.lastName,
          medicalInstitution: loggedInProfileData.response.userInfo.medicalInstitution,
          speciality: loggedInProfileData.response.userInfo.speciality,
          designation: loggedInProfileData.response.userInfo.designation,
          workPhone: loggedInProfileData.response.userInfo.workPhone,
          occupation: loggedInProfileData.response.userInfo.occupation
        },
        subscriptions: [
          {
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
   return formData;
}
// Platform form container LOGGED IN newseletter preferences success function
function onSuccessLoggedInNewsletterPref(response) {
    if(response.errorCode === 0) {
        document.querySelector('#unsub-newsletter-loggedin-form-wrap').style.display = 'none';
        document.querySelector('#unsub-newsletter-success-response-wrap').style.display = 'block';
    }
}
// Platform form container LOGGED IN newseletter preferences error function
function onErrorLoggedInNewsletterPref(response) {
    showApiError('#edit-profile-api-error', response);
}

// Platform E-Mail form container LOGGED OUT newsleter preferences success function
function onSuccessLogOutEmail(response) {
    if(response.errorCode === 0) {
        document.querySelector('#unsub-newsletter-email-form-wrap').style.display = 'none';
        logOutEmailRespData = response;
        unsubNewsletterLogOutPref();
    }
}
// Platform E-Mail form container LOGGED OUT newsleter preferences error function
function onErrorLogOutEmail(response) {
    showApiError('#unsub-newsletter-email-form-api-error', response);
}

// Platform form container LOGGED OUT newseletter preferences json update form data change
function updateRequestLogOutNewsletterPref(formData) {
    formData.body = {
        email: logOutEmailRespData.response.userInfo.email,
        shanonId : logOutEmailRespData.response.userInfo.shanonId,
        subscriptions: [
          {
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
   return formData;
}

// Platform form container LOGGED OUT newseletter preferences success function
function onSuccessLogOutNewsletterPref(response) {
    if(response.errorCode === 0) {
        document.querySelector('#unsub-newsletter-logout-form-wrap').style.display = 'none';
        document.querySelector('#unsub-newsletter-success-response-wrap').style.display = 'block';
    }
}
// Platform form container LOGGED OUT newseletter preferences error function
function onErrorLogOutNewsletterPref(response) {
    showApiError('#unsub-newsletter-pref-logout-api-error', response);
}

window.addEventListener('load', (event) => {
    if(typeof typeof Granite === 'undefined' ||  typeof Granite.author === 'undefined'){
        var unsubNewsletterContainer = document.querySelector('#unsub-newsletter-cont-wrap');
        if(unsubNewsletterContainer) {
            unsubNewsletterCustomization();
        }
    }
});