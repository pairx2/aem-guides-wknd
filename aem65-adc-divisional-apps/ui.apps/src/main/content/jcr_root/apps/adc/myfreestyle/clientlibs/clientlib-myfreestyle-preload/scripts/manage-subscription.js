function updateFormData(data) {
    delete data.body['node'];
    delete data.body['requestType'];
    data.body.subscriptionType = $('[name="subscriptionType"]').val();
    data.body.data = {};
    data.body.data.first_name = sessionStorage.getItem("first_name");
    data.body.data.last_name = sessionStorage.getItem("last_name");
    data.body.data.address1 = sessionStorage.getItem("address1");
    data.body.data.address2 = sessionStorage.getItem("address2");
    data.body.data.email = sessionStorage.getItem("email");
    let number = sessionStorage.getItem("phone_number");
    let formatted_number = "+" + number.replace(/-/g, "");
    data.body.data.phone_number = formatted_number;
    data.body.data.city = sessionStorage.getItem("city");
    data.body.data.state = sessionStorage.getItem("state");
    data.body.data.zipCode = sessionStorage.getItem("zipCode");
    data.body.data.blood_test_glucose = sessionStorage.getItem('blood_test_glucose');
    data.body.data.meter_brand_id = sessionStorage.getItem("meter_brand_id");
    data.body.data.insurance_type_id = sessionStorage.getItem("insurance_type_id");
    data.body.data.uses_insulin = sessionStorage.getItem("uses_insulin");
    let dob = sessionStorage.getItem("singleDate");
    let new_date = dob.split("/");
    let formatted_date = new_date[2] + "-" + new_date[0] + "-" + new_date[1];
    data.body.data.date_of_birth = formatted_date;
    let news_letter_value = sessionStorage.getItem("news_letter");
    let consent;
    if (news_letter_value == "true") {
        consent = "1";
    } else {
        consent = "0";
    }
    data.body.data.news_letter = consent;
    data.body.data.meter_brand_name = sessionStorage.getItem("meter_brand_name");
    data.body.data.insurance_type_name = sessionStorage.getItem("insurance_type_name");
    return data;
}


function onSuccessFormSubmission(data) {
    if (data.errorCode == 0) {
            if (data.response && data.response.exist) {
                showExistingPopup();
            } else {
                sessionStorage.removeItem("address1");
                sessionStorage.removeItem("address2");
                sessionStorage.removeItem("email");
                sessionStorage.removeItem("phone_number");
                sessionStorage.removeItem("state");
                sessionStorage.removeItem("city");
                sessionStorage.removeItem("zipCode");
                sessionStorage.removeItem("blood_test_glucose");
                sessionStorage.removeItem("meter_brand_id");
                sessionStorage.removeItem("insurance_type_id");
                sessionStorage.removeItem("uses_insulin");
                sessionStorage.removeItem("singleDate");
                sessionStorage.removeItem("news_letter");
                sessionStorage.removeItem("meter_brand_name");
                sessionStorage.removeItem("insurance_type_name");
                sessionStorage.removeItem("validaddress");
                sessionStorage.setItem("binNumber", data.response.promiseCard.bin_number);
                sessionStorage.setItem("groupNumber", data.response.promiseCard.group_number);
                sessionStorage.setItem("memberNumber", data.response.promiseCard.member_number);
                let getOrigin = window.location.origin.split('//')[1].split('.')[0];
               if(getOrigin.includes('author')){
                window.location.href =  window.location.origin+"/content/adc/myfreestyle/countries/us-en/thank-you.html";
               }else{
				window.location.href =  window.location.origin+"/thank-you.html";
               }

            }
        }

}

function showExistingPopup() {
    setTimeout(function () {
        $('[data-toggle="modal"]').trigger('click');
    }, 1000);
}

function onFailureSubscriptionSubmission(){
 let errorMessage = $('#subscription_form').find('input[name=failureMessage]').val();
 $('#error_msg').find("P").html(errorMessage);
 getErrorMessage();
}
