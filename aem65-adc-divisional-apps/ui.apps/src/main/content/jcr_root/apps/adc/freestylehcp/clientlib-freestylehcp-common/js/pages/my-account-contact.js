/**
* My Account page - Contact Details
**/

$(document).ready(function () {
    let myAccountPage = $(document).find('#myaccount-details');
    if (myAccountPage.length > 0 && isOnPublish()) {
        let userInfoSection = myAccountPage.find('#myfreestyle-myUserInfo-update');
        let mailingSection = myAccountPage.find('#myfreestyle-emailPassword-update');


        // **************************
        // My Info Section
        // **************************

        if (userInfoSection.length > 0) {
            initializeUserInfo(userInfoSection); // Assign initial values to the MyInfo Section

            userInfoSection.on('click', '#userMyInfo-edit', function () { // On click of Edit link in read-only mode
                userInfoWriteMode(userInfoSection);
            });

            userInfoSection.on('click', '#userMyInfo-cancel', function () { // On click on Cancel Changes button in edit mode
                initializeUserInfo(userInfoSection);
            });
        }


        // **************************
        // Email & Password Section
        // **************************

        if (mailingSection.length > 0) {
            initializeUserInfo(mailingSection); // Assign initial values to the Email & Password Section

            mailingSection.on('click', '#emailPassword-edit', function () { // On click of Edit link in read-only mode
                userInfoWriteMode(mailingSection);
            });

            mailingSection.on('click', '#emailPassword-cancel', function () { // On click on Cancel Changes button in edit mode
                initializeUserInfo(mailingSection);
            });
        }


        // **************************
        // Marketing Consent Section
        // **************************

        let marketingConsectSectionEle = myAccountPage.find('#marketingConsent-section');
        let marketingConsentFormEle, marketingConsentEditLinkEle;

        if (marketingConsectSectionEle.length > 0) {
            marketingConsentFormEle = marketingConsectSectionEle.find('#myfreestyle-marketingConsent-form');
            marketingConsentEditLinkEle = marketingConsentFormEle.find('#marketingConsent-edit');
            marketingConsectSectionEle.find('#myfreestyle-forgetme-form').parent().addClass('hidden-forgetme-form');

            // Function to disable the checkboxes and to provide on load values to checkboxes
            initializeUserConsentCheckList(marketingConsectSectionEle);

            // Event listener for "Edit" link
            marketingConsentEditLinkEle.length &&
                marketingConsentEditLinkEle.on('click', function () {
                    consentCheckListWriteMode(marketingConsectSectionEle);
                });

            // Event listener for "CANCEL CHANGES" button
            marketingConsectSectionEle.on('click', '#marketingConsent-cancel', function () {
                initializeUserConsentCheckList(marketingConsectSectionEle);
            });

            // function for select all checkbox
            selectAllCheckbox(marketingConsectSectionEle);

            setTimeout(function () { // Dealyed a second so that forget me modal renders on the DOM
                $('#marketingConsent-forget-modal button[name="forget-me-yes"]').on('click', function () {
                    $('#marketingConsent-forget-modal').hide(); // Hide the popup
                    $('#marketingConsent-forget-modal .generic-modal--close').trigger('click'); // Close the popup
                    $('#myfreestyle-forgetme-form button[name="forget-me-submit"]').removeAttr('disabled').trigger('click'); // API call
                })
            }, 1000);
        }
    }
});

// ******************************************
// My Info & Email Password Section Functions
// ******************************************

/**
 * @function
 * Summary: Function that assigns initial user values to the form fields.
 * Parameters: jQuery Object {Object}
 *             readMode - {Boolean} - 1 or 0
 */
function initializeUserInfo(formSection, readMode = 1) {
    let userData = usObj && decryptData(usObj, pk, 'object');
    formSection.find('form input:not([type="hidden"])').each(function () {
        let nameAttr = $(this).attr('name');
        let inputName = nameAttr && nameAttr.includes('userInfo') ? nameAttr.split('.')[1] : nameAttr;
        if (userData) {
            if (inputName === 'title' && userData.title && $(this).attr('value').toLowerCase() === userData.title.toLowerCase()) {
                $(this).prop('checked', true);
            } else if (inputName === 'fullName' && userData.title && userData.firstName && userData.lastName) {
                $(this).val(userData.title + ' ' + userData.firstName + ' ' + userData.lastName);
            }
            else if (inputName === 'dateOfBirth') {
                $(this).parents('.input-group.a-input-grp.right-icon').addClass('selected');
            }
            else if (userData[inputName] !== undefined) {
                    $(this).val(userData[inputName]);
                }
            else if (inputName === 'password' && $(this).attr('readOnly') !== undefined); 
                else {
                    $(this).val('');
                }
                            
        }
        if ($(this).attr('readOnly') !== undefined && $(this).hasClass('readonly-field') === false) {
            $(this).addClass('form-control-plaintext readonly-field');
        }
    });
    readMode && userInfoReadMode(formSection); // To show the form in read mode
}

/**
 * @function
 * Summary: Function to make form fields read only.
 * Parameters: jQuery Object {Object}
 */
function userInfoReadMode(formSection) {
    let saluteEle = formSection.find('#salute-options');
    let section = saluteEle.length ? 'userMyInfo' : 'emailPassword';
    if (saluteEle.length) {
        saluteEle.hide();
    }
    formSection.find('.a-input-field input:not([type="hidden"]):not([type="radio"]):not([class*="hidden-"]):not([name="email"])').each(function () {
        if ($(this).attr('readOnly') !== undefined) {
            $(this).parents('.a-input-field').show();
        } else {
            $(this).parents('.a-input-field').hide();
        }
    });
    formSection.find(`#${section}-required`).hide();
    formSection.find(`#${section}-edit`).show();
    formSection.find('.button.a-button').hide();
    formSection.find('.o-form-container__success-msg').text('');
}

/**
 * @function
 * Summary: Function to make form fields editable.
 * Parameters: jQuery Object {Object}
 */
function userInfoWriteMode(formSection) {
    let userData = usObj && decryptData(usObj, pk, 'object');
    let saluteEle = formSection.find('#salute-options');
    let section = saluteEle.length ? 'userMyInfo' : 'emailPassword';
    if (saluteEle.length) {
        saluteEle.show();
    }
    formSection.find('.a-input-field input:not([type="hidden"]):not([type="radio"]):not([class*="hidden-"]):not([name="email"])').each(function () {
        if ($(this).attr('readOnly') !== undefined) {
            $(this).parents('.a-input-field').hide();
        } else {
            $(this).parents('.a-input-field').show();
            if (userData && $(this).attr('name') === 'userInfo.dateOfBirth') {
                $(this).parents('.input-group.a-input-grp.right-icon').next('.a-date-picker__input-hidden').find('input').val(userData['dateOfBirth']);
            }
        }
    });
    formSection.find(`#${section}-required`).show();
    formSection.find(`#${section}-edit`).hide();
    formSection.find('.button.a-button').show();
}

// **************************
// Marketing Consent Functions
// **************************

/**
 * @function
 * Summary: Function to destructure the consent array object and update/reset the values
 * Parameters: - Form element -> Form selector Object
 *               readMode - {Boolean} - 1 or 0
 */
function initializeUserConsentCheckList(marketingConsectSectionEle, readMode = 1) {
    let userConsents = usCon && decryptData(usCon, pk, 'object');
    let formEle = marketingConsectSectionEle.find('#myfreestyle-marketingConsent-form');
    if (userConsents && userConsents.length) {
        for (const consent of userConsents) {
            let checkEle = formEle.find(`input[value=${consent.consentName}]`);
            if (consent.consentValue) {
                checkEle.prop('checked', true).parents('.a-checkbox');
            } else {
                checkEle.prop('checked', false).parents('.a-checkbox');
            }
        }

        //Function to check all consents status
        const formConsents = formEle.find('.a-checkbox__input:not([name="consentsAll"]):not([name="tncAgree"])');
        const formConsentsAll = formEle.find('.a-checkbox__input[name="consentsAll"]');
        if (checkRegiConsents(formConsents)) {
            formConsentsAll.prop("checked", true);
        } else {
            formConsentsAll.prop("checked", false);
        }

    } else {
        formEle.find(`input`).prop('checked', false).parents('.a-checkbox');
    }
    readMode && consentCheckListReadMode(marketingConsectSectionEle);
}

/**
 * @function
 * Summary: Function to make consent form read only.
 * Parameters: Marketing consent container ID - Object
 */
function consentCheckListReadMode(marketingConsectSectionEle) {
    marketingConsectSectionEle.find('#marketingConsent-edit').show();
    marketingConsectSectionEle.find('.o-form-container__buttons button').hide();
    marketingConsectSectionEle.find('#marketingConsent-forget').hide();
    marketingConsectSectionEle.find('#myfreestyle-marketingConsent-form .a-checkbox input:checked')
        .prop('disabled', true)
        .parents('.a-checkbox')
        .addClass('a-checkbox--checked-disabled');
    marketingConsectSectionEle.find('#myfreestyle-marketingConsent-form .a-checkbox input:not(:checked)')
        .prop('disabled', true)
        .parents('.a-checkbox')
        .addClass('a-checkbox--disabled');
    marketingConsectSectionEle.find('#myfreestyle-marketingConsent-form .o-form-container__success-msg').text('');
}

/**
 * @function
 * Summary: Function to make consent form editable.
 * Parameters: Marketing consent container ID - Object
 */
function consentCheckListWriteMode(marketingConsectSectionEle) {
    marketingConsectSectionEle.find('#marketingConsent-edit').hide();
    marketingConsectSectionEle.find('.o-form-container__buttons button').show();
    marketingConsectSectionEle.find('#marketingConsent-forget').show();
    marketingConsectSectionEle.find('#myfreestyle-marketingConsent-form .a-checkbox input:checked')
        .prop('disabled', false)
        .parents('.a-checkbox')
        .removeClass('a-checkbox--checked-disabled');
    marketingConsectSectionEle.find('#myfreestyle-marketingConsent-form .a-checkbox input:not(:checked)')
        .prop('disabled', false)
        .parents('.a-checkbox')
        .removeClass('a-checkbox--disabled');
}
