let form_data;
function updateValidationrequest(data) {
    document.querySelector('.error-msg-wrapper').style.display = "none";
    form_data = data.body;
    saveFormData(form_data);
    delete data.body['first_Name'];
    delete data.body['last_Name'];
    delete data.body['email'];
    delete data.body['phone_number'];
    delete data.body['date_of_birth'];
    delete data.body['uses_insulin'];
    delete data.body['news_letter'];
    delete data.body['blood_test_glucose'];
    delete data.body['meter_brand_id'];
    delete data.body['insurance_type_id'];
    delete data.body['singleDate'];
    delete data.body['requestType'];
    delete data.body['g-recaptcha-response'];
    return data;
}

function onSuccessValidationrequest(data) {
    if (data.errorCode == 0) {
        if (data.response && data.response.responseCode && data.response.responseCode === 'invalidaddress') {
            if(sessionStorage.getItem("validaddress") != null){
                sessionStorage.removeItem("validaddress");
            }
            getErrorMessage();
        } else {
            if (data.response && data.response.responseCode && data.response.responseCode === 'validaddress') {
                $('.o-form-container__success-msg').hide();
                sessionStorage.setItem("validaddress", 'true');
            }
        }
    }
    return data;
}

function onErrorValidationrequest(data) {
    return data;
}

function saveFormData(userdata) {
    sessionStorage.setItem("first_name", userdata['first_Name']);
    sessionStorage.setItem("last_name", userdata['last_Name']);
    sessionStorage.setItem("email", userdata['email']);
    sessionStorage.setItem("phone_number", userdata['phone_number']);
    sessionStorage.setItem("uses_insulin", JSON.stringify(userdata['uses_insulin']));
    let element = JSON.parse(sessionStorage.getItem("uses_insulin"));
    let insulinValue = radioValue(element);
    function radioValue(insulin_data) {
        let newArr1 = [];   //return the input with radio option checked 
        newArr1 = $.grep(insulin_data, function (n, i) {
            return n.consentValue;
        });
        return newArr1[0].consentName;
    }
    sessionStorage.removeItem("uses_insulin");
    sessionStorage.setItem("uses_insulin", insulinValue);
    
    sessionStorage.setItem("news_letter", userdata['news_letter']);
    sessionStorage.setItem("blood_test_glucose", userdata['blood_test_glucose']);
    sessionStorage.setItem("meter_brand_id", userdata['meter_brand_id']);
    sessionStorage.setItem("insurance_type_id", userdata['insurance_type_id']);
    sessionStorage.setItem("singleDate", userdata['singleDate']);
    sessionStorage.setItem("address1", userdata['address1']);
    sessionStorage.setItem("address2", userdata['address2']);
    sessionStorage.setItem("city", userdata['city']);
    sessionStorage.setItem("state", userdata['state']);
    sessionStorage.setItem("zipCode", userdata['zipCode']);
    sessionStorage.setItem("meter_brand_name", $.trim($('#dropdown_label_meter_brand_id').text()));
    sessionStorage.setItem("insurance_type_name", $.trim($('#dropdown_label_insurance_type_id').text()));
}

function getFormDataOnCompletion() {
    $('#first_name').focus().val(sessionStorage.getItem("first_name"));
    $('#last_name').focus().val(sessionStorage.getItem("last_name"));
    $('#email').focus().val(sessionStorage.getItem("email"));
    $('#phone_number').focus().val(sessionStorage.getItem("phone_number"));
    $('#address1').focus().val(sessionStorage.getItem("address1"));
    if (sessionStorage.getItem('address2') == 'undefined') {
        sessionStorage.removeItem('adddress2');
        $('#address2').focus().val('');
    } else {
        $('#address2').focus().val(sessionStorage.getItem("address2"));
    }
    $('#city_list').focus().val(sessionStorage.getItem("city"));
    $('#state_select-options').find('.a-dropdown__menu li[data-optionvalue=' + sessionStorage.getItem('state') + ']').addClass('selected');
    let state_name = $('#state_select-options').find('.a-dropdown__menu li.selected .a-dropdown__option-text').html();
    $('#state_select-options').find('.a-dropdown-selected').html(state_name);
    $('#zipCode').focus().val(sessionStorage.getItem("zipCode"));
    $('#blood_test_glucose-options').find('.a-dropdown__menu li[data-optionvalue=' + sessionStorage.getItem('blood_test_glucose') + ']').addClass('selected');
    let blood_test_glucose_name = $('#blood_test_glucose-options').find('.a-dropdown__menu li.selected .a-dropdown__option-text').html();
    $('#blood_test_glucose-options').find('.a-dropdown-selected').html(blood_test_glucose_name);
    $('#meter_brand_id-options').find('.a-dropdown__menu li[data-optionvalue=' + sessionStorage.getItem('meter_brand_id') + ']').addClass('selected');
    let meter_brand_id_name = $('#meter_brand_id-options').find('.a-dropdown__menu li.selected .a-dropdown__option-text').html();
    $('#meter_brand_id-options').find('.a-dropdown-selected').html(meter_brand_id_name);
    $('#insurance_type_id-options').find('.a-dropdown__menu li[data-optionvalue=' + sessionStorage.getItem('insurance_type_id') + ']').addClass('selected');
    let insurance_type_id_name = $('#insurance_type_id-options').find('.a-dropdown__menu li.selected .a-dropdown__option-text').html();
    $('#insurance_type_id-options').find('.a-dropdown-selected').html(insurance_type_id_name);
    $('input:radio[name="uses_insulin"][value="' + sessionStorage.getItem("uses_insulin") + '"]').prop('checked', true);
    $('#singleDate').focus().val(sessionStorage.getItem("singleDate"));
    $('#singleDate').blur();
    $(window).scrollTop(0);
    if (sessionStorage.getItem("validaddress") && sessionStorage.getItem("validaddress") == "true") {
        $('#manage_subscription').trigger("click");
    }

}
