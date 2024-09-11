/**
 * User Registartion Page for HCP FR
 **/

$("#myfreestyle-signup :input:not([type=hidden])").on('input',function(){
     $('#apierror_400').hide()
})

 // Input placeholder,text,label logic for radio button change
 let radioValChange = $('#myfreestyle-signup .a-radio__input[name="Registration"]');
 let inputError = $('#myfreestyle-signup #validationcode').closest('div.fields.text').find('span.form-text.a-input-field--text-require');
 let inputChange = $('#myfreestyle-signup #validationcode');
 let inputPlcHldr=inputChange.attr('placeholder');
 let inputErrorVal = inputError.text()?.trim() || '';
 let isValidationCodeCorrect,errApiflag,zipCodeMatch = false;
 let territoryIsSelected = 0;
 let selectedValidationType = 'RPPS_NUMBER';

 $('#btn-hcp-signup').prop('disabled', true);
 $("#zipcode").attr('maxlength',5);
 $('#validationcode').attr('maxlength',11);

let checkRadioVal = $(radioValChange).prevAll('span:first').text();
const regErr = $('#reg_err_api').text()?.trim() || '';
const regPlaceHldr = $('#reg_plchldr').text()?.trim() || '';
const apiErrRpps = $('#reg_api_rpps').text()?.trim() || '';
const apiErrInv = $('#reg_api_invi').text()?.trim() || '';

 // Handling on Radio Value change
radioValChange.on('change', function() {
    $('#validationcode').val(''); // Clearing the text field
    isValidationCodeCorrect = false;
    const valRadio = $(this).val();
    checkRadioVal = $(this).prevAll('span:first').text();

    selectedValidationType = (valRadio === "rpps number") ? 'RPPS_NUMBER' : 'INVITATION_CODE';
    $('#btn-hcp-signup').prop('disabled', true);
    errorCheck(selectedValidationType, checkRadioVal);
});

//Code API Response Handling
$('#validationcode').on('input', async function(e) {
    const insertedValidationKey = $("#validationcode").val() || '';
    const lookUpApi = $('#vald-api').val();
    const apiEndPnt = lookUpApi;

    if (insertedValidationKey.length === 11) {
        $('#page-spinner').css('display', 'block');

        try {
            const response = await fetch(apiEndPnt, {
                method: 'POST',
                body: JSON.stringify({
                    validationType: selectedValidationType,
                    validationData: insertedValidationKey
                }),
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "x-application-id": $('[name="x-application-id"]').val(),
                    "x-country-code": $('[name="x-country-code"]').val(),
                    "x-preferred-language": $('[name="x-preferred-language"]').val(),
                }
            });

            const data = await response.json();

            if (data.response.body === "SUCCESS") {
                isValidationCodeCorrect = true;
                errApiflag = false;
                $('#page-spinner').css('display', 'none');
                if (isValidationCodeCorrect && territoryIsSelected === 2 && zipCodeMatch) {
                    $('#btn-hcp-signup').prop('disabled', false);
                }
            } else {
                isValidationCodeCorrect = false;
                errApiflag = true;
                inputError.text(selectedValidationType === 'RPPS_NUMBER' ? apiErrRpps : apiErrInv);
                $('#page-spinner').css('display', 'none');
                errorDisplay();
            }
        } catch (error) {
            console.error("Error fetching API:", error);
            // Handle error appropriately (e.g., show an error message)
        }
    } else {
        $('#btn-hcp-signup').prop('disabled', true);
    }
});

//SingupForm input Validation
$('#myfreestyle-signup .o-wizard__content').eq(0).on('input', function(e) {
    const zipCode = $('#zipcode').val();
    const validationCode = $('#validationcode').val();
    const registrationType = $('#registrationtype-options :checked').val()?.trim().toLowerCase();

    const isRppsNumberValid = registrationType === 'rpps number' && validationCode.length === 11 && !Number.isInteger(validationCode);
    const isInvitationCodeValid = registrationType === 'invitation code' && validationCode.length === 11 && /^[a-zA-Z0-9]{11,}$/.test(validationCode);

    const zipCodeMatch = /\d{5,}$/.test(zipCode);
    const territoryIsSelected = $('.a-dropdown-selected').length;

    if (!isRppsNumberValid && !isInvitationCodeValid) {
        errorCheck(selectedValidationType, checkRadioVal);
        errorDisplay();
        $('#btn-hcp-signup').prop('disabled', true);
    } else {
        successDisplay();
        if (isValidationCodeCorrect && territoryIsSelected === 2 && zipCodeMatch) {
            $('#btn-hcp-signup').prop('disabled', false);
        } else {
            if (errApiflag) {
                errorDisplay();
            }
            $('#btn-hcp-signup').prop('disabled', true);
        }
    }
});

/**
 * Event handler for keyup on the validation code input field.
 */
function validateInput(event) {
    if (event.target.value.length !== 11 || event.keyCode === 86) {
        isValidationCodeCorrect = false;
    }
    errApiflag = false;
}

// Event attached with Input Validate Method
$('#validationcode').keyup(validateInput);

// Error check Method
function errorCheck(val, cheRadioVal) {
    const label = `${cheRadioVal}*`;
    const inputChangeLabel = inputChange.closest('div.fields.text').find('label');
    
    if (val === 'INVITATION_CODE') {
        inputChangeLabel.text(label);
        inputChange.attr('placeholder', regPlaceHldr);
        inputError.text(regErr);
    } else {
        inputChangeLabel.text(label);
        inputChange.attr('placeholder', inputPlcHldr);
        inputError.text(inputErrorVal);
    }
}

// Handling Error Display
function errorDisplay() {
    const validationCodeField = $('#myfreestyle-signup #validationcode').closest('div.fields.text');
    const validationCodeRequireText = validationCodeField.find('span.form-text.a-input-field--text-require');
    const validationCodeErrorText = validationCodeField.find('span.form-text.a-input-field--text-error');
    const validationCodeInput = $('#validationcode');
    const inputChange = validationCodeInput.closest('div.fields.text').find('label');

    // Set styles for validation code require and error texts
    validationCodeRequireText.css({
        "display": "inline-block",
        "color": "#e4002b"
    });
    validationCodeErrorText.css({
        "display": "inline-block",
        "color": "#e4002b"
    });

    // Update label text color
    inputChange.text(`${checkRadioVal}*`).css({
        "color": "#e4002b"
    });

    // Set border style for validation code input
    validationCodeInput.closest('div.fields.text').find('.a-input-control').css({
        'border': '1px solid #e4002b'
    });

    // Adjust font size for abt-icon
    validationCodeInput.closest('div.fields.text').find('.abt-icon').eq(0).css({
        "font-size": "0.75rem"
    });
}

// Handling Success Message Display
function successDisplay() {
    const validationCodeField = $('#myfreestyle-signup #validationcode').closest('div.fields.text');
    const validationCodeRequireText = validationCodeField.find('span.form-text.a-input-field--text-require');
    const validationCodeErrorText = validationCodeField.find('span.form-text.a-input-field--text-error');
    const validationCodeInput = $('#validationcode');
    const inputChange = validationCodeInput.closest('div.fields.text').find('label');

    // Hide the validation code require and error texts
    validationCodeRequireText.css({
        "display": "none",
        "color": "black",
        "opacity": "1"
    });
    validationCodeErrorText.css({
        "display": "none",
        "color": "black",
        "opacity": "1"
    });

    // Set border style for validation code input
    validationCodeInput.css({"border": "1px solid #63666a"});

    // Update label text
    inputChange.text(`${checkRadioVal}*`).css({
        "color": "black",
        "opacity": "1"
    });
}

