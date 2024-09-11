/**
 * User Registartion
 **/
$(document).ready(function() {


    initUserRegistration();

});

function initUserRegistration() {
    //User Registration
    let fsl3UserRegistration = $('#fsl3UserRegistration');
    const submitBtn = document.getElementById("userRegistrationStep4Btn");
    const observerstep4 = new MutationObserver(handleMutations);

    if (document.getElementById("userRegistrationStep4Btn") != null) {
        observerstep4.observe(submitBtn, { attributes: true });
    }

    if (fsl3UserRegistration.length > 0 && wcmmodeOff) {

        checkCookie('user-registration'); //check cookies user-registration

        //Initial make nonrequired to dropdown
        $('#healthInsuranceDrp-options').find('.a-dropdown').attr('data-required', 'false');
        //sort dropdown
        sortDropdown('#healthInsuranceDrp-options');

        //initial class added for mobile and phone field german flag icon
        $('#userRegistrationMobile').parents('.a-input-field').find('.icon em').addClass('userRegistrationMobileIcon');
        $('#userRegistrationPhone').parents('.a-input-field').find('.icon em').addClass('userRegistrationPhoneIcon');

        //ExperienceFragment position change from before button to after button
        let step1Btn = $('#userRegistrationStep1Btn').parents('.o-wizard__btn');
        $("#userRegistrationStep1 .experiencefragment").insertAfter(step1Btn);

        //get dob and apply mask
        dateInputMask(document.querySelectorAll('[name="dateOfBirth"]')[0], '.', 'dd.mm.yyyy');

    }

    //Health insurance no dropdown hide and show condition
    $("input[name='sickfundType']").on('change', function () {
        let insuranceTypeVal = $(this).val();

        let healthInsPlaceholder = $('#healthInsuranceDrp-options .a-dropdown__placeholder').text();

        if (insuranceTypeVal == 'Public') {
            $('#healthInsuranceDrp-options').show();
            $('#healthInsuranceDivider').show();
            $('#healthInsuranceDrp-options').find('.a-dropdown').attr('data-required', 'true');
        } else {
            $('#healthInsuranceDrp-options').hide();
            $('#healthInsuranceDivider').hide();
            $('#healthInsuranceDrp-options .a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text(healthInsPlaceholder);
            $('#healthInsuranceDrp-options .a-dropdown__menu li').removeClass('selected');
            $('#healthInsuranceDrp-options').find('.a-dropdown').attr('data-required', 'false');
        }
    });
    validDOBInput();
    handleSuccessPage();
    configureDataPrivacyConsent();
    validateEmailAndUpdateStyle();
    getRecaptchaToken();
}


function validDOBInput() {
    //DOB Validation
    let dobInput = $('[name="dateOfBirth"]');
    dobInput.attr('maxlength', '10');

    dobInput.on('keyup blur', function (e) {

        let dobVal = $(this).val();

        //validate date
        let isvalidDate = isValidDate(dobVal, '.', 'dd.mm.yyyy', 'past');

        setTimeout(function () {
            let dateFormGroup = dobInput.closest('.form-group.a-form-grp');
            if (isvalidDate) {
                dateFormGroup.removeClass('validation-regex validation-require validation-error');
            } else if (!dateFormGroup.hasClass('validation-regex') && !dateFormGroup.hasClass('validation-require')) {
                dateFormGroup.removeClass('validation-regex validation-require').addClass('validation-error');

                let btnSubmit = dobInput.closest('form').siblings('.o-form-container__buttons').find('button[type="submit"]');
                btnSubmit.prop('disabled', true);
            }
            dobInput.trigger('change');

        }, 200);

    });
}

function handleMutations(mutationsList) {
    const submitBtn = document.getElementById("userRegistrationStep4Btn");
    for (const mutation of mutationsList) {
        if (mutation.type === "attributes" && mutation.attributeName === 'disabled') {
            if (!submitBtn.disabled && $('input[name=email]').closest('div.form-group.a-form-grp ').find('.a-input-field--email-validation-require').length > 0) {
                $('#userRegistrationStep4Btn').prop('disabled', true);
            }
        }
    }

}

function handleSuccessPage() {
    //User Registration Success page code start here
    let fsl3userRegSuccessPage = $('#userRegSuccessPage');

    if (fsl3userRegSuccessPage.length > 0 && wcmmodeOff) {

        //retriving value from query param
        let username = window.atob(getUrlParameter('username'));
        let salutation = window.atob(getUrlParameter('salutation'));
        let useremail = window.atob(getUrlParameter('email'));

        //showcasing value on page
        if (salutation !== "" && username !== "") {
            $('#userRegSuccessPage span.regUserName').text(salutation + " " + username);
        } else if (username !== "") {
            $('#userRegSuccessPage span.regUserName').text(username);
        }

        if (useremail !== "") {
            $('#userRegSuccessPage span.regUserEmail').text(useremail);
        }

    }
}
function configureDataPrivacyConsent() {
    // Mutual marking check for DataPrivacy consent and T&C
    let displaynone = $("#hideConsentDataPrivacy-options")
    displaynone.addClass("d-none")
    $('input[name=consentTermsAndConditions]').change(function () {
        if (this.checked) {
            $('input[name=consentDataPrivacy]').prop('checked', true)
        }
        else {
            $('input[name=consentDataPrivacy]').prop('checked', false)
        }
    });

    $('input[name=mobileNumber]').change(function () {
        let refMobileNumber = $("#userRegistrationMobile").val();
        refMobileNumber = formatInputNumber(refMobileNumber);
        $('#userRegistrationMobile').val(refMobileNumber.trim());
    });

    $('input[name=phonenumber]').change(function () {
        let refPhoneNumber = $("#userRegistrationPhone").val();
        refPhoneNumber = formatInputNumber(refPhoneNumber);
        $('#userRegistrationPhone').val(refPhoneNumber);
    });
}
function formatInputNumber(refInputNumber) {
    if (refInputNumber) {
        if (refInputNumber.startsWith("+49")) {
            refInputNumber = refInputNumber.replace("+49", "0");
        }
        if (refInputNumber.startsWith("+")) {
            refInputNumber = refInputNumber.replace("+", "");
        }
        if (refInputNumber.startsWith("49")) {
            refInputNumber = refInputNumber.replace("49", "0");
        }
        if (refInputNumber.startsWith("00")) {
            refInputNumber = refInputNumber.replace("00", "0");
        }
        if (refInputNumber.startsWith("049")) {
            refInputNumber = refInputNumber.replace("049", "0");
        }
        if (!refInputNumber.startsWith("0") && !refInputNumber.startsWith("+")) {
            refInputNumber = "0" + refInputNumber;
        }
    }
    return refInputNumber.trim();
}

function validateEmailAndUpdateStyle() {
    let emailVal = $('input[name=email]').val();
    const emailregs = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!emailVal || !emailregs?.test(emailVal)) {
        $('.a-input-field--email-validation-require').remove();
        $(this).closest('div.form-group.a-form-grp ').removeClass('custom-email-validation-error');

    }
}
function getRecaptchaToken() {
    $('input[name=email]').on('keyup', validateEmailAndUpdateStyle)
    $('input[name=email]').blur(async function () {
        let emailVal = $(this).val();
        let gSiteKey = $('#fsl3UserRegistration').attr('data-site-key');
        let token_value;

        async function afterTokenProcess(token) {
            token_value = token;
                    let requestBody = {
                        "requestType": "validateEmail",
                        "email": emailVal,
                        "reCaptcha": token_value || " "
                    }
                    let requestHeader = {};
                    let apiOrigin = $('[data-esl-endpoint]').attr('data-esl-endpoint');
                    let apiUrl = apiOrigin + '/api/public/email-validation';
                    let headers = document.querySelectorAll('[type="hidden"][data-header="true"]');
                    headers.forEach(function (header) {
                        requestHeader[header.name] = header.value;
                    });
                    requestHeader = {
                        ...requestHeader, 'Content-Type': 'application/json'
                    }
            
                    const emailregs = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/
                    if (emailVal && emailregs?.test(emailVal)) {
                        $('#userRegistrationStep4Btn').prop('disabled', true);
                        await fetch(apiUrl, {
                            method: "post",
                            headers: requestHeader,
                            body: JSON.stringify(requestBody),
                        }).then((res) => { return res.json() }).then((response) => {
                            const resultRes = response;
                            if (resultRes.response.isValid === "false") {
                                handleEmailValidationError();

                            } else {
                                handleEmailValidationSuccess();
                            }
                        }).catch(error => {
                            handleEmailValidationError();

                        });
            } else {
                handleEmailValidationSuccess();

            }

        }

      
        function whileTokenGeneratingError() {
            $('input[name=email]').closest('div.form-group.a-form-grp ').addClass('custom-email-validation-error');
            
                    if ($('input[name=email]').closest('div.form-group.a-form-grp ').find('.a-input-field--email-validation-require').length === 0) {
                        $('<span class="form-text a-input-field--email-validation-require"><em class="abt-icon abt-icon-exclamation"></em>' + $('#email_error_messege')[0].innerHTML + '</span>').insertAfter($(this).parent());
                    }
                    $('#userRegistrationStep4Btn').prop('disabled', true);
        }

        if ($('body').attr('data-enable-enterprise-recaptcha') === 'true') {
            await grecaptcha.enterprise.ready(function () {
                grecaptcha.enterprise.execute(gSiteKey, {
                    action: 'input_blur'
                }).then(async function (token) {
                    afterTokenProcess(token);        
                }).catch(function (error) {
                    whileTokenGeneratingError();
                });
            });        
        } else {
            await grecaptcha.ready(function () {
                grecaptcha.execute(gSiteKey, {
                    action: 'input_blur'
                }).then(async function (token) {
                    afterTokenProcess(token);
                }).catch(function (error) {
                    whileTokenGeneratingError();
                });
            });
        }
    });
}

function handleEmailValidationError() {

    $('input[name=email]').closest('div.form-group.a-form-grp ').addClass('custom-email-validation-error');

    if ($('input[name=email]').closest('div.form-group.a-form-grp ').find('.a-input-field--email-validation-require').length === 0) {
        $('<span class="form-text a-input-field--email-validation-require"><em class="abt-icon abt-icon-exclamation"></em>' + $('#email_error_messege')[0].innerHTML + '</span>').insertAfter($('input[name=email]').parent());
    }
    $('#userRegistrationStep4Btn').prop('disabled', true);
}
function handleEmailValidationSuccess() {
    $('.a-input-field--email-validation-require').remove();
    $('input[name=email]').closest('div.form-group.a-form-grp ').removeClass('custom-email-validation-error');
    $('#userRegistrationStep4Btn').prop('disabled', false);
}