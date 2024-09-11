/**
 * FORM CONTAINER
 */

/* Code for Newsletter subscription Form - Starts here */

let userEmail = '';
let consentTypes = [];

/**
 * @function
 * Summary: Function to capture the User Email ID before ESL call
 * Parameters: data -> payload
 */

function updateRequestNewsletterSubscription(data) {
    toggleLoadingSpinner();
    userEmail = data.body['email'];
    data.body['captchaValue'] = data.body['g-recaptcha-response'];
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    return data;
}

/**
 * @function
 * Summary: Function to store user Email ID in session storage
 * Parameters: data -> payload
 */

function onSuccessNewsletterSubscription(data) {
    if (data.errorCode == 0) {
        // let consentTypes;
        let redirectRequired = true;
        setItemSessionStorage('email', userEmail);
        if (data.response.i18nMessageKey == 'SUB001') {
            // consentTypes = [{ "consentValue": true, "consentName": "EdgeNewsletter" }, { "consentValue": true, "consentName": "ItAllAddsUpNewsletter" }];
            redirectRequired = false;
            triggerManageSubscriptionForm();
        } else if (data.response.subscriptions && data.response.subscriptions.length) {
            var check_concentName = $('input[name="check-consent"]').val();
            data.response.subscriptions.forEach(function (item) {
                if (
                item.consentName == check_concentName &&
                item.consentValue == false
                ) {
                redirectRequired = false;
                triggerManageSubscriptionForm();
                }
            });
            consentTypes = data.response.subscriptions;
        }
        setItemSessionStorage('consentTypes', JSON.stringify(consentTypes));
        if (redirectRequired) {
            let redirectURL = $('.formcontainer input[name="redirect-url"]').attr('value');
            redirectURL != undefined && redirectURL.length && (window.location = redirectURL);
        }
    } else {
        onErrorNewsletterSubscription();
    }
}

/**
 * @function
 * Summary: Function to trigger manage subscription form
 */

function triggerManageSubscriptionForm() {
    let manageSubscriptionForm = $('#triggerFormForNewUser'); // ID to be used inside the hidden form container
    if (manageSubscriptionForm.length) {
        let formSubmitButton = manageSubscriptionForm.find('.o-form-container__buttons button[type="submit"]');
        formSubmitButton.removeAttr('disabled');
        formSubmitButton[0].click();
    }
}

/**
 * @function
 * Summary: Function to remove user Email ID in session storage
 * Parameters: data -> payload
 */

function onErrorNewsletterSubscription(error) {
    removeItemSessionStorage('email');
    removeItemSessionStorage('consentTypes');
    userEmail = '';
    consentTypes = [];
    toggleLoadingSpinner();
}

/* Code for Newsletter subscription Form - Ends here */


/* Code for EU DPO Form - Starts here */

/**
 * @function
 * Summary: Function to lowercase email and verify email IDs
 * Parameters: data -> payload
 */

function updateRequestEUDPO(data) {
    if (data.body['emailAddress']) data.body['emailAddress'] = data.body['emailAddress'].toLowerCase();
    if (data.body['verifyEmail']) data.body['verifyEmail'] = data.body['verifyEmail'].toLowerCase();
    if (data.body.hasOwnProperty('uploaded-file') && data.body['uploaded-file'].length) {
        data.body['Identitydocumentation'] = btoa(data.body['uploaded-file']);
        data.body['identityDocumentName'] = $(document).find('.m-file-uploader .m-file-uploader__filedetails .m-file-uploader__name').text();
        delete data.body['uploaded-file'];
    } else {
        data.body['Identitydocumentation'] = "";
        data.body['identityDocumentName'] = "";
        if (data.body.hasOwnProperty('uploaded-file')) delete data.body['uploaded-file'];
    }
    return data;
}

/* Code for EU DPO Form - Ends here */

/* Code for Sign up Form - Starts here */

/**
 * @function
 * Summary: Function to redirect page to abbott hom page on API success
 * Parameters: data -> payload
 */

function onsuccessSignup(data) {
    if (data.errorCode == 0) {
        window.location.assign("https://www.abbott.com");
    }
}

/* Code for Sign up Form - Ends here */

/**
 * @function
 * Summary: Function to clear user session storage values
 */

function clearUserSessionValues() {
    removeItemSessionStorage('email');
    removeItemSessionStorage('consentTypes');
}

/**
 * @function
 * Summary: Function to parse consentTypes to object array and find individual consents
 * data: payload
 */

function parseConsentTypesData(data) {
    if ($($(document).find('.a-spinner')[0]).css('display') == 'none') {
        toggleLoadingSpinner();
    }
    if (data.body['email'] != undefined && data.body['email'].length == 0 && getItemSessionStorage('email').length > 0) {
        data.body['email'] = getItemSessionStorage('email');
    }

    if (data.body['consentTypes'] && data.body['consentTypes'].length && typeof (data.body['consentTypes']) == 'string') {
        data.body['consentTypes'] = JSON.parse(data.body['consentTypes']);
    }

    if (data.body.hasOwnProperty('EdgeNewsletter')) {
        updateConsentTypes(data.body['consentTypes'], 'EdgeNewsletter', data.body['EdgeNewsletter']);
        delete data.body['EdgeNewsletter'];
    }

    if (data.body.hasOwnProperty('InnovationTechnology')) {
        updateConsentTypes(data.body['consentTypes'], 'InnovationTechnology', data.body['InnovationTechnology']);
        delete data.body['InnovationTechnology'];
    }

    if (data.body.hasOwnProperty('HealthWellness')) {
        updateConsentTypes(data.body['consentTypes'], 'InnovationTechnology', data.body['InnovationTechnology']);
        data.body['consentTypes'].push({ consentName: 'HealthWellness', consentValue: data.body['HealthWellness'] });
        delete data.body['HealthWellness'];
    }

    if (data.body.hasOwnProperty('HealthyHeart')) {
        updateConsentTypes(data.body['consentTypes'], 'HealthyHeart', data.body['HealthyHeart']);
        delete data.body['HealthyHeart'];
    }

    if (data.body.hasOwnProperty('DiabetesCare')) {
        updateConsentTypes(data.body['consentTypes'], 'DiabetesCare', data.body['DiabetesCare']);
        delete data.body['DiabetesCare'];
    }

    if (data.body.hasOwnProperty('ChronicPain')) {
        updateConsentTypes(data.body['consentTypes'], 'ChronicPain', data.body['ChronicPain']);
        delete data.body['ChronicPain'];
    }

    if (data.body.hasOwnProperty('ItAllAddsUpNewsletter')) {
        updateConsentTypes(data.body['consentTypes'], 'ItAllAddsUpNewsletter', data.body['ItAllAddsUpNewsletter']);
        delete data.body['ItAllAddsUpNewsletter'];
    }
    consentTypes = data.body['consentTypes'];
    return data;
}

/**
 * @function
 * Summary: Function to append individual consents to main consentTypes object
 * data: payload
 */
function updateConsentTypes(consentSet, newConsentName, newConsentValue) {
    let consentIndex = consentSet.findIndex(consent => consent.consentName == newConsentName);
    if (consentIndex == -1) {
        consentSet.push({ consentName: newConsentName, consentValue: newConsentValue })
    } else {
        consentSet[consentIndex].consentValue = newConsentValue;
    }
}

/**
 * @function
 * Summary: Function to remove form and replace success html for women in stem form
 * data: response
 */
function onSuccessStemBlueprint(data) {
    let formContainer = $('.modal .formcontainer');
    formContainer.find('.o-form-container__success-msg').addClass('d-none');
    let successHTML = formContainer.find('input[name="successMessage"]').attr('value');
    let modalBody = formContainer.parents('.modal-body');
    let modalFooter = formContainer.parents('.modal').find('.modal-footer');
    if (data.errorCode == 0) {
        modalBody.css('padding-top', '10px');
        modalFooter.addClass('d-none');
        formContainer.addClass('d-none');
        formContainer.parent().append('<div class="form__success-msg">' + successHTML + '</div>');
    }

    // Click event to track if modal is closed and repopulate the form
    formContainer.parents('.modal').off('click').on('click', function () {
        setTimeout(function () {
            if (!($(this).hasClass('show'))) {
                modalBody.removeAttr('style');
                modalFooter.removeClass('d-none');
                formContainer.removeClass('d-none');
                modalBody.find('.form__success-msg').remove();
            }
        }.bind(this), 500);
    });
}

/**
 * @function
 * Summary: Function to change payload before ESL call
 * Parameters: data -> payload
 */

function updateLikeThisCount(data) {
    const pageURL = window.location.pathname;
    data.body['pageURL'] = pageURL;
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];
    return data;
}

/**
 * @function
 * Summary: Function to store like count in session storage
 * Parameters: data -> payload
 */

function onSuccessLikeThis(data) {
    if (data.errorCode == 0) {
        const { response: { count = 0 } } = data;
        const pagePath = window.location.pathname;
        const $likeButton = $('.a-button-corp--likebutton');
        const $counterDiv = $likeButton.next('.like-count');
        const $countEl = $counterDiv.find('.count-number');
        $countEl.text(count);
        $counterDiv.addClass('visible');
        if (typeof (Storage) !== "undefined") {
            sessionStorage.setItem(pagePath, "true");
            sessionStorage.setItem(pagePath + ":likeCount", count);
        }
    }
}
/* Code to hide the like this form when dom is loading */
document.addEventListener("readystatechange", function () {
    if ((document.readyState == 'interactive') && document.querySelector('#like-this-form') != null) {
        document.querySelectorAll('#like-this-form').forEach(function (node) {
            (node.style.display != 'none') && (node.style.display = 'none');
        });
    }
    if ((document.readyState == 'complete') && document.querySelector('#like-this-form') != null) {
        document.querySelectorAll('#like-this-form').forEach(function (node) {
            (node.style.display == 'none') && (node.style.display = '');
        });
    }
});