let prePopSfdcId = "";
let prePopOrgName = "";

$(document).ready(function() {
    if($("#dynamometerForm").length > 0) {
        $('#dynaFormPassword').parent().closest('.fields.text').hide();
        $('#dynaFormPassword').val("");
        initDropdownWithSearch('dynaFormJobTitle');
        initMultiCheckbox('dynaFormSpecialty');
        readOnlyPassword(true);
        //address functionality:
        initAddressDropdown();

        if (isUserLoggedIn()) {
            $('#dynaFormTerms-options').hide();
            $('#dynaFormRegisterChkbox-options').hide();
            $('#dynaFormRegConsent').hide();
            $('#dynaFormTerms-options > .a-checkbox > .a-checkbox__label > .a-checkbox__input').prop("checked", true);

            prePopulateDynoForm();
        }

        $('#dynaFormRegisterChkbox-options > .a-checkbox > .a-checkbox__label > .a-checkbox__input').click(function(){
            if($(this).is(":checked")) {
                $('#dynaFormPassword').parent().closest('.fields.text').show();
                readOnlyPassword(false);
            } else {
                $('#dynaFormPassword').parent().closest('.fields.text').hide();
                readOnlyPassword(true);
            }
        });

        $('#dynaFormPhone').on('keyup', function() {
            let value = $(this).val();
            setTimeout(function() {}, 0);
            $(this).val($(this).attr("value") + value.substring(3));
        });
    }
});

function readOnlyPassword(value) {
    let field = $("#dynaFormPassword");

    field.val("");
    field.closest('.form-group').removeClass("validation-require");

    if(value) {
        $('#dynaFormSubmit').attr('disabled', true);
        field.attr('disabled', 'disabled');
        field.parent().siblings('label').find('.a-input-field--required').text("");
        field.parents('.a-input-field').attr('data-required', 'false');
    } else {
        field.removeAttr('disabled');
        field.parent().siblings('label').find('.a-input-field--required').text("*");
        field.parents('.a-input-field').attr('data-required', 'true');
    }
}

function updateRequestDynamometer(data) {

    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    let countryCode = data.headers['x-country-code'];
    let country = regionNames.of(countryCode);
    let phoneValue = data.body.phone;
    let phone = phoneValue ? phoneValue.substring(3) : "";
    let orgNameText = data.body.orgNameText;
    let orgName = data.body.orgName ? data.body.orgName : prePopOrgName;
    let sfdcId = prePopSfdcId ? prePopSfdcId : "";
    let formDetails = {
        "title": data.body.title,
        "firstName": data.body.firstName,
        "lastName": data.body.lastName,
        "hcpId": sfdcId,
        "phone": phone,
        "email": data.body.email,
        "postCode": data.body.postcode,
        "orgName": orgName,
        "orgNameText": orgNameText,
        "billingCity": $('#registrationCity').val(),
        "billingState": $('#registrationState').val(),
        "billingStreet": $('#registrationStreet').val(),
        "role": data.body.role,
        "areaOfSpeciality": getMultiCheckboxValue("dynaFormSpecialty", "; "),
        "country": country,
        "screening": data.body.screening,
        "dynoT&C": data.body.dynoTerms,
        "requestType": "dynamometer",
        "password": data.body.password ? data.body.password : "",
    }

    formDetails['captchaValue'] = data.body['g-recaptcha-response'];

    if($("#secretHeaderApplicationId").length > 0) {
        data.headers['x-application-id'] = $("#secretHeaderApplicationId").attr("data-key-name");
    }

    data.body = formDetails;
    return data;
}

function onBeforeDynamometer() {
    showLoading();
}

function onSuccessDynamometer(data) {
    if(data.errorCode == 0) {
        hideApiError();
        hideLoading();
    } else {
        onErrorDynamometer(data);
    }

    let checkboxSpans = $("#dynaFormSpecialty-options").find('.a-checkbox label .a-checkbox__custom');
    checkboxSpans.each(function() {
        $(this).parent().removeClass('disabled-checkbox');

        if($(this).attr('aria-checked') !== 'true') {
            $(this).removeClass('disabled-dropdown');
        }
    });
}

function onErrorDynamometer(error) {
    showApiError(error?.response);
    hideLoading();
}

function prePopulateDynoForm() {
    showLoading();
    let userInfoDetails = localStorage.getItem('userInfo')
    if (userInfoDetails !== null && userInfoDetails !=='undefined') {
        let jsonArray = JSON.parse(userInfoDetails);
        prePopSfdcId = jsonArray.sfdcId;
    }
    let appId = $("input[name=x-application-id]").val();
    let countryCode = $("input[name=x-country-code]").val();
    let language = $("input[name=x-preferred-language]").val();
    let idToken = getCookie('jwtToken');

    let headers = new Headers();
    headers.append("x-application-id", appId);
    headers.append("x-country-code", countryCode);
    headers.append("x-preferred-language", language);
    headers.append("x-id-token", idToken);

    getProfileInfo(headers)
        .then(response => response.text())
        .then(function (result) {
            let data = JSON.parse(result);
            let userInfo = data?.response?.userInfo;

           if (userInfo) {
                populateDynoFormFields(userInfo);
            }

            hideLoading();
        });
}

function populateDynoFormFields(userInfo) {
    let titleId = "dropdown_label_dynaFormTitle";
    let jobId = "dropdown_label_dynaFormJobTitle";
    let addtlProp = userInfo.additionalProperties;

    dropdownPopulator(titleId, userInfo.title);
    dropdownPopulator(jobId, addtlProp.role);
    prePopOrgName = addtlProp.orgName.Id;

    if(addtlProp.areaOfSpecialty) {
        let results = addtlProp.areaOfSpecialty.split(';');

        for (const element of results) {
            $("[id='"+element.trim()+"']").siblings('.a-checkbox__custom').trigger("click");
        }

        let checkboxSpans = $("#dynaFormSpecialty-options").find('.a-checkbox label .a-checkbox__custom');
        checkboxSpans.each(function() {
            $(this).parent().addClass('disabled-checkbox');

            if($(this).attr('aria-checked') !== 'true') {
                $(this).addClass('disabled-dropdown');
            }
        });
    }

    $('#dynaFormFirstName').val(userInfo.firstName);
    $('#dynaFormLastName').val(userInfo.lastName);
    $('#dynaFormEmail').val(userInfo.email);
    $('#dynaFormPhone').val(addtlProp.phone);
    $('#regPostcodeUk').val(addtlProp.Postcode);
    $("#registrationCity").val(addtlProp.billingCity);
    $("#registrationState").val(addtlProp.billingState);
    $("#registrationStreet").val(addtlProp.billingStreet);
    $("#regOrgNameTextUk").attr('value', addtlProp.orgName.Name);
    $("#dropdown_label_regOrgNameUk").text(addtlProp.orgName.Name);
    $("#dropdown_label_regOrgNameUk").removeClass("a-dropdown__placeholder").addClass("a-dropdown-selected");
}