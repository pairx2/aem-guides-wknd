let searchAddressKey;
let searchAddressUrl;
let searchAddressOrigin;
let searchAddressCountries;
$(document).ready(function () {
    if($("#sampleProductForm").length > 0) {
        searchAddressKey = $("#searchAddressKey").val() ? $("#searchAddressKey").val() : 'DZ57-KZ63-HA95-GG99';
        searchAddressOrigin = $("#searchAddressOrigin").val() ? $("#searchAddressOrigin").val() : 'GBR';
        searchAddressCountries = $("#searchAddressCountries").val() ? $("#searchAddressCountries").val() : 'GBR';
        searchAddressUrl = 'https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.00/json3ex.ws?';
        $('#patientDetail-address1').addClass('autocomplete-items');
        let autoCompleteDropdown = '<div id="myInputautocomplete-list" class="autocomplete-items"></div>';
        $("#patientDetail-address1").after(autoCompleteDropdown);
        $("#myInputautocomplete-list").hide();
        $("#patientDetail-address1").keyup(function(e){
                 e.preventDefault();
                 let textInput = $(this).val();
                 if(textInput && textInput.trim().length > 0 ) {
                     searchAddress(textInput,"");
                  } else {
                      $('#myInputautocomplete-list').empty();
                      $("#myInputautocomplete-list").hide();
                     clearPatientAddressFields();
                  }
             });
    }

});

/**
**  Search Address and Populate to dropdown
**/
function searchAddress(text,container) {
    $('#myInputautocomplete-list').empty();
    let uri = searchAddressUrl.concat("Key=").concat(searchAddressKey)
        .concat('&').concat("Text=").concat(text).concat('&Container=')
        .concat(container).concat('&Origin=').concat(searchAddressOrigin).concat('&Countries=')
        .concat(searchAddressCountries)
        .concat('&Datasets=&Limit=10&Filter=&Language=en&$block=true&$cache=true&SOURCE=PCA-SCRIPT');
    fetch(uri)
    .then(response => {
    if (!response.ok) {
     throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
        $('#myInputautocomplete-list').empty();
        $("#myInputautocomplete-list").show();
    data.Items.forEach((element) => {

        if(element.Type.toUpperCase() == 'ADDRESS') {
            let dataValue = '<div class="address-data-item"' +
                'data-value-description="' + element.Description +
                '"data-value-address1="' + element.Text +'"><p>' + element.Text+ ', <span class=preDescription>' + element.Description + '</span></p></div>';
            $("#myInputautocomplete-list").append(dataValue);
        } else if(element.Type.toUpperCase() == 'POSTCODE' || element.Type.toUpperCase() == 'STREET' ||
            element.Type.toUpperCase() == 'LOCALITY') {
             let dataValuePostCode = '<div class="address-data-item-postcode"' +
                'data-value-id="' + element.Id + '" data-value-postcode="'+ element.Text +'"><p>' + element.Description +
                '</p><span class="see-more-address-arrow"></span></div>';
            $("#myInputautocomplete-list").append(dataValuePostCode);
        }


    } );

     $('.address-data-item').bind('click', function(e) {
                $('#myInputautocomplete-list').empty();
                $("#myInputautocomplete-list").hide();
                $(".form-group.a-form-grp:has(#patientDetail-address1)").removeClass('validation-require');
                let addressLine1 = "";
                let addressLine2 = "";
                let addressLine3 = "";
                let indexCount = 0;
                let index = 0;
                let addressText = $(this).attr("data-value-address1");
                if(addressText.match(/,/gi)) {
                     let index = addressText.indexOf(",");
                    addressLine1 = addressText.substring(0,index);
                    addressLine2 = addressText.substring(index+1);
                } else {
                    addressLine1 = addressText;
                }

                //parse town and postcode and line 3
                let town = "";
                let description = $(this).attr("data-value-description");
                index = description.lastIndexOf(",");
                let postCode = description.substring(index+1);

                indexCount = description.match(/,/gi).length;
                if(indexCount > 1) {
                    index = description.lastIndexOf(",");
                    description = description.substring(0,index);
                    index = description.lastIndexOf(",");
                    town = description.substring(index+1);
                    if(addressLine2 !== '') {
                        addressLine3 = addressLine3.concat(", ");
                    }
                    addressLine3 = addressLine3.concat(description.substring(0, index));
                } else {
                    index = description.indexOf(",");
                    town = description.substring(0,index);
                }
                let combinedAddress = addressLine2.concat(addressLine3);
                $("#patientDetail-address1").val(addressLine1.trim());
                $("#patientDetail-county").val(town.trim());
                $("#patientDetail-postalCode").val(postCode.trim());
                $("#patientDetail-address2").val(combinedAddress.trim());

            });
             $('.address-data-item-postcode').bind('click', function(e) {
                $('#myInputautocomplete-list').empty();
                let id = $(this).attr("data-value-id");
                let postCode = $(this).attr("data-value-postcode");
                searchAddress(postCode,id);
            });


    });

}

/**
**  Clear Fields
**/
function clearPatientAddressFields(){
    $("#patientDetail-county").val("");
    $("#patientDetail-postalCode").val("");
    $("#patientDetail-address2").val("");
}


function sampleUKDetails(data) {
    const orderRecordTypeId = $("#order-record-type-id").val();
    data.headers['x-id-token'] = getCookie('jwtToken');
    let country = "United Kingdom";
    if(localStorage.hasOwnProperty('userInfo') && localStorage.hasOwnProperty('lookupUser')
        && localStorage.hasOwnProperty("addedToCart")  ) {
        let userInfoStr = localStorage.getItem('userInfo');
        let userDetailStr = localStorage.getItem('lookupUser');
        let cartList = localStorage.getItem("addedToCart");
        let jsonArray = JSON.parse(cartList);
        let cartItems = jsonArray.cartItems;
        let userInfo = JSON.parse(userInfoStr);
        let userDetails = JSON.parse(userDetailStr);
        let addtlProp = userDetails.userInfo.additionalProperties;
        let cartValues = [];
        cartItems.forEach(function(obj) {
            if(obj.sampleValue != 0) {
                cartValues.push(obj);
            }
        });

        let hcp = {
            "hcpId": userInfo.sfdcId,
            "hcpUserName": userInfo.email,
            "email": userInfo.email,
            "personalEmail": addtlProp.personalEmail ? addtlProp.personalEmail : "",
            "firstName": userInfo.firstName,
            "lastName": userInfo.lastName,
            "workplace": addtlProp.orgName.Name,
            "hcpAddress1": addtlProp.billingStreet,
            "hcpAddress2": addtlProp.billingStreet,
            "hcpLine3": addtlProp.billingStreet,
            "hcpCounty": addtlProp.billingCity,
            "hcpState": addtlProp.billingState,
            "hcpZipCode": addtlProp.Postcode,
            "hcpPostcode": addtlProp.Postcode,
            "hcpProfession": addtlProp.role,
            "phone": addtlProp.phone,
            "methodofContact": data.body.methodContact ? data.body.methodContact : "",
            "isReceivedMail": true,
            "orgName": addtlProp.orgName.Id,
            "country": country,
            "orderRecordTypeId": orderRecordTypeId
        }
        removeUnusedPaylod(cartItems);
        function addressCharcheck(addresscontent){
            let charLimit=35;
            if(addresscontent.length > charLimit) {
                addresscontent = addresscontent.substring(0, charLimit);
            }
            return addresscontent;
        }
         
        let patient = {
                        "patientFirstName" : data.body.patientFirstName,
                        "patientLastName" : data.body.patientLastName,
                        "address1" : addressCharcheck(data.body.address1),
                        "address2" : data.body.address2 ? addressCharcheck(data.body.address2) : "",
                        "town" : data.body.county,
                        "postCode" : data.body.postalCode
                };
        let orderPayload =
            {
              "patient" : patient,
              "hcp": hcp,
              "cartItems" : cartValues
            }
             data.body = orderPayload;
             return data;
        }
}

function preSampleUK() {
    showLoading();
}

function  sampleUKSuccess(data) {
    if(data.errorCode == 0) {
        hideLoading();
	    $('.cmp-tabs__tab').eq(2).get(0).click();
        confirmStep(0);
        confirmStep(1);
        scrollToTop("#checkout-page-steps");
        localStorage.removeItem('addedToCart');
        let currentDate = new Date();
        let yyyy = currentDate.getFullYear().toString();
        let dd  = currentDate.getDate().toString();
        let mm = (currentDate.getMonth()+1).toString();
        mm = mm < 10 ? "0"+ mm : mm;
        dd = dd < 10 ? "0"+ dd : dd;
        let updatedText =$("#order-confirm-text section p:first").html().replace('{currentDate}',
                dd + "/" + mm + "/" + yyyy);
       $("#order-confirm-text section p:first").html(updatedText);
    } else {
        sampleUKError(data);
    }
    hideLoading();
}

function sampleUKError(error) {
    showApiError(error?.response);
    hideLoading();
}

/**
** Remove unused cart payload
**/
function removeUnusedPaylod(cartItems) {
    cartItems.forEach(function(obj) {
       delete obj.header;
       delete obj.displayImage;
       delete obj.maxQty;
       delete obj.totalUnits;
    });
}