function updateContactRequest(formData) {
    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;formData.headers = {
    
    'x-country-code': headerCountryCode,
    'x-application-id': headerApplicationId,
    'x-preferred-language': headerLanguage,
    'Content-Type': 'application/json'
    }
    var requestType = formData.body.emailAddress == 'KANA' ? 'kana' : 'transfusion_contact_us';

    formData.body = {
        requestType: requestType,
        inquiryType: formData.body.inquiryType,
        comment: formData.body.comment,
        firstName: formData.body.firstName,
        lastName: formData.body.lastName,
        email: formData.body.email,
        confirmEmail: formData.body.confirmEmail,
        phone: formData.body.phone,
        address1: formData.body.address1,
        address2: formData.body.address2,
        city: formData.body.city,
        zip: formData.body.zip,
        state: formData.body.state,
        businessLocation: formData.body.businessLocation,
        emailAddress: formData.body.emailAddress
    }
    if(formData.body.requestType == 'kana'){
        delete formData.body['emailAddress'];
    }
    }
    
    function onSucessContact(){
        $('#contact-us-info-container').css('display','none');
        $('#contact-us-form').css('display','none');
        $('#contact-us-thanks-container').css('display','block');
    }
    