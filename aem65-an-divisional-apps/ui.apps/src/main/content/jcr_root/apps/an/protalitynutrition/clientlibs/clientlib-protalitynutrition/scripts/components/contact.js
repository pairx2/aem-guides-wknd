/** Contact -- starts**/

//defining variables
let subjectOptions = $('#contactSubject-options');
let stateOptions = $('#contactState-options');
let exclamationIcon = '<em class="abt-icon abt-icon-exclamation"></em>';
let subjectPlaceholderText = subjectOptions.find('.a-dropdown__placeholder').text().trim();
let statePlaceholderText = stateOptions.find('.a-dropdown__placeholder').text().trim();

//document ready function for contact us 
$(document).ready(function () {

    //adding additional classes for styling purpose
    $("#form-columns").children().first().addClass('form-column-row');
    $(".form-column-row").children(":nth-child(1)").addClass("formColumns");
    $(".form-column-row").children(":nth-child(2)").addClass("formColumns");

    //binding reset button functionality
    $('.contact-us-form').find('#contactReset').on('click', resetContactUsForm);

    //prepending the exclamation icon for dropdowns error scenario
    stateOptions.find('span.a-input-field--text-require').prepend(exclamationIcon);
    subjectOptions.find('span.a-input-field--text-require').prepend(exclamationIcon);

    //Verify email address logic
    if ($('[name="verifyEmailAddress"]').length && $('[name="emailAddress"]').length) {
        $('[name="verifyEmailAddress"], [name="emailAddress"]').on('keyup change input', function () {
            let verifyEmailHTML = $(this).parents('#contactForm').find('[name="verifyEmailAddress"]');
            let verifyEmailVal = verifyEmailHTML.val().toLowerCase();
            let referenceEmailVal = $(this).parents('#contactForm').find('[name="emailAddress"]').val().toLowerCase();

            // Settimeout to let the platform code run first
            setTimeout(function () {
                if (verifyEmailVal && verifyEmailVal.length && referenceEmailVal && referenceEmailVal.length) {
                    if (referenceEmailVal !== verifyEmailVal) {
                        let emailField = verifyEmailHTML.parents('div[data-component="input-field"]');
                        !(emailField.hasClass('validation-require') || emailField.hasClass('validation-error')) && verifyEmailHTML.parents('div[data-component="input-field"]').addClass('validation-regex');
                    } else {
                        verifyEmailHTML.parents('div[data-component="input-field"]').removeClass('validation-regex');
                    }
                }
            }, 200);
        });
    }
});

//function to reset the contact us form
function resetContactUsForm() {
    $('[type="text"]').val('');
    $('[type="tel"]').val('');
    $('[name="questionsOrComments"]').val('');

    document.getElementById("contactSubmit").disabled = true;

    //timeout function to reset the dropdown values to default value
    setTimeout(() => {
        subjectOptions.find('.a-dropdown-selected').text(subjectPlaceholderText);
        subjectOptions.find('.a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder');

        stateOptions.find('.a-dropdown-selected').text(statePlaceholderText);
        stateOptions.find('.a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder');
    }, 0);
}

//Modifying request body to remove unwanted attributes and add recaptchaType
function updateRequestContact(data) {
    delete data.body['node'];
    delete data.body['country'];
    delete data.body['enterpriseRecaptcha'];
    data.body['captchaType'] = 'ENT';
    return data;
}
/** Contact -- ends**/