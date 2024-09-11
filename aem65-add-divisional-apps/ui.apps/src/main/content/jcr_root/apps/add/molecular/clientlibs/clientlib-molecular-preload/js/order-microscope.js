function UpdateorderDataRequest(formData) {
    $(".loader-parent").show();


    var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;    
    var country = $('ul[name="country"] li.selected span:last-child').html();
    var microscope_manufacturer = $('ul[name="microscopeManufacturer"] li.selected span:last-child').html();   
    var type_microscope = $('ul[name="typeOrModelOfMicroscope"] li.selected span:last-child').html();   
    var approximate_age = $('ul[name="approximateAgeofTheMicroscope"] li.selected span:last-child').html();   
    var maxnumber_of_filter = $('ul[name="maxNumberofFilter"] li.selected span:last-child').html();  
    var numberoffilterSlider = $('ul[name="numberOfFiltersCurrentlySlider"] li.selected span:last-child').html();   
    var filters_addedby = $('ul[name="filtersAddedBy"] li.selected span:last-child').html();   
    var filter_wheel_diameter = $('ul[name="filterWheelDiameter"] li.selected span:last-child').html();   
    var filter_wheel_manufacturer = $('ul[name="filterWheelManufacturer"] li.selected span:last-child').html();  
    var postalCode = document.querySelector('input[name="zipcode"]').value;

  formData.headers = {
        'x-preferred-language': "en_US",
        'x-country-code': headerCountryCode,
        'x-application-id': headerApplicationId,
       'Content-Type': 'text/plain'
   }
  var bandpassPushValue = [];
  	var bandpassValue = {};
    $(".addfilters").each(function(index) {
        	var elementId = $(this).attr("id");
            bandpassValue.bandpass = $("#"+ elementId +'.addfilters').find('ul[name="bandpass"] li.selected span:last-child').html();
            bandpassValue.fluorophore = $("#"+ elementId +'.addfilters').find('ul[name="fluorophores"] li.selected span:last-child').html();
            bandpassValue.mounting = $("#"+ elementId +'.addfilters').find('ul[name="mounting"] li.selected span:last-child').html(); 
            bandpassValue.quantity = $("#"+ elementId + '.addfilters').find('input[name="quantity"]').val();
            bandpassPushValue.push({
                ...bandpassValue
            });
        });
    formData.body = {
        "customerName": formData.body.instituteCustomerName,
        "customerNumber": formData.body.customerNumber,
        "contactName": formData.body.contactName,
        "address1": formData.body.address1,
        "address2": formData.body.address2,
        "city": formData.body.city,
        "state": formData.body.state,
        "zipCode": postalCode,
        "country": country,
        "purchaseOrderNumber": formData.body.purchaseOrderNumber,
        "phoneNumber": formData.body.phoneNumber,
        "faxNumber": formData.body.faxNumber,
        "emailAddress": formData.body.emailAddress,
        "sameShippingAddress": "No",
        "microscopeManufacturer": microscope_manufacturer,
        "microscopeTypeOrModel": type_microscope,
        "microscopeAge": approximate_age,
        "microscopeFilter":"2",
        "filterMaxNumberFilters": maxnumber_of_filter,
        "filterCurrentNumberFilters": numberoffilterSlider,
        "filtersAddedBy": filters_addedby,
        "filterImagingSystemRetailer": formData.body.theImagingSystem,
        "filterWheelDiameter": filter_wheel_diameter,
        "filterWheelNumberSlots": formData.body.numberOfFilters,
        "filterWheelNumberEmptySlots": formData.body.numberOfEmptySlots,
        "filterWheelManufacturer": filter_wheel_manufacturer,
        "bandPassInfo": bandpassPushValue,
         "comments": "Need health promises",
        "requestType": "amdmolecular_emailorderform",
        "g-recaptcha-response" : formData.body["g-recaptcha-response"]
    }
return formData

}

function onSuccessOrderDataRequest(data){
    if (data.errorCode == 0) {
        $(".loader-parent").show();
        $("#thankyou-msg").show();
        $("#Order-microscope-form").hide();
    }
}
function onCompleteOrderDataRequest(data){
    $(".loader-parent").hide();
}

// Request Info API Integration
function updateRequestInfoData(formData){
    $('.loader-parent')[0].style.display='block';
    var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    var orderNumber = document.querySelector('#request-form-modal h6 span').innerText;
    var productName = document.querySelector('#request-form-modal h5:nth-child(2)').innerText;
    var probeName = $("#table-OrderInfo").find(".order-product-name");
    if(probeName.length >= 1){
        productName = document.querySelector('#request-form-modal h5').innerText;
    }
    var country = document.querySelector('ul[name="country"] li.selected span').innerText;

    formData.headers = {
        'x-country-code': headerCountryCode,
        'x-application-id': headerApplicationId,
        'Content-Type': 'text/plain'
   }
    formData.body = {
        "firstname":formData.body.firstName,
        "lastname":formData.body.lastName,
        "email":formData.body.email,
        "phonenumber":formData.body.phoneNumber,
        "productname": productName,
        "ordernumber":orderNumber,
        "organization": formData.body.organization,
        "country": country,
        "city": formData.body.city,
        "zip": formData.body.zipCode,
        "requestType":"amdmolecular_requestinfo",
		"g-recaptcha-response" : formData.body["g-recaptcha-response"]	
    }
}
function successRequestInfoData(){
    //redirecting to thank you page.
    if(window.location.pathname.indexOf('/us/')>-1)
    {
        var href = '/us/en/about-us/contact/request-info-thankyou.html';
    }
    else{
        var href = '/int/en/about-us/contact/request-info-thankyou.html'; 
    }
        window.location.href= window.location.origin + href;
    $('.loader-parent')[0].style.display='none';
}