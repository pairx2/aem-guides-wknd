function UpdateContactRequest(formData) {
    $(".loader-parent").show();
    var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    var areaOfInterest = $('ul[name="areaOfInterest"] li.selected span:nth-child(1)').html();    
    var country = $('ul[name="country"] li.selected span:nth-child(1)').html();   
    var state = $('ul[name="state"] li.selected span:nth-child(1)').html();
    var postalCode = document.querySelector('input[name="zip/postalCode"]').value;

  formData.headers = {
        'x-preferred-language': "en_US",
        'x-country-code': headerCountryCode,
        'x-application-id': headerApplicationId,
       'Content-Type': 'text/plain'
   }
    formData.body = {
        "firstname": formData.body.firstName,
        "lastname":formData.body.lastName,
        "email": formData.body.email,
        "phonenumber": "+"+formData.body.phone,
        "areaofinterest": areaOfInterest,
        "organization": formData.body.organization,
        "country": country,
        "state": state,
        "city": formData.body.city,
        "zip": postalCode,
        "requestType":"amdmolecular_contactus",
		"g-recaptcha-response" : formData.body["g-recaptcha-response"]	
    }
return formData

}

function onSuccessContactRequest(data){
    if (data.errorCode == 0) {
        $(".loader-parent").show();
        console.log(data.status)
    }
}
function onCompleteContactRequest(data){
    $(".loader-parent").hide();
}