let userInfo = JSON.parse(localStorage.getItem("userInfo"));
let date=new Date();

function updateRequestRequestSample(data) {
    console.log(data);

    delete data.body['g-recaptcha-response'];
    delete data.body['requestType'];
    delete data.body['node'];

    let jwtToken = getCookie('jwtToken');

    data.headers['x-id-token'] = jwtToken;

let sampleDetails = {
     "id": userInfo.additionalProperties.sfdcId,
     "sampleQuantity": $("#sampleQuantity-options").find(".a-dropdown__menu .selected").attr("data-optionValue"),
     "productId": $("#productDropdown-options").find(".a-dropdown__menu .selected").attr("data-optionValue"),
	 "orderDate":date.toISOString(),
 	 "accountId": $("#registrationInstitutionName-options").find(".a-dropdown__menu .selected").attr("data-optionValue")
   };

 data.body = sampleDetails;

    return data;
}

function onBeforeRequestSample() {
    showLoading();
}

function onSuccessRequestSample(data) {
    if (data.errorCode == 0) {
        hideApiError();
        hideLoading();
    } else {
        onErrorRequestSample(data);
    }
}

function onErrorRequestSample(error) {
    showApiError(error?.response);
    hideLoading();
}
