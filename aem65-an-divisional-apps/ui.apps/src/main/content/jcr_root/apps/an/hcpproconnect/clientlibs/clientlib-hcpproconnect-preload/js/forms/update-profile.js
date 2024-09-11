/** Initial Registration -- starts**/
let updateProfilePayload ;
function updateProfileRequest(data) {
	let phone = data.body.phone;
	let phoneWithoutPostCode ;
    if(data.body.phone != null && data.body.phone != 'undefined')
        phoneWithoutPostCode = phone.substring(3);
	let userRegDetails;
        userRegDetails = {
            "userInfo": {
                "phone": phoneWithoutPostCode,
                "title": data.body.title,
				"email":data.body.email,
				"verified":data.body.verified,
				"firstName": data.body.firstName,
                "lastName": data.body.lastname,								 
                "Postcode": data.body.Postcode,
                "orgName": data.body.orgName,  
                "billingStreet" : data.body.billingStreet,
                "billingCity": data.body.billingCity,
                "billingState" : data.body.billingState,                
        		"areaOfInterest": data.body.areaOfInterest,
            }
        }

        if(data.headers['x-country-code'] == "IN")
        {
			userRegDetails.userInfo['licenseID'] = data.body.licenseID;
        }

    	if(data.headers['x-country-code'] == "TH")
        {
			userRegDetails.userInfo['licenseID'] = data.body.licenseID;
            userRegDetails.userInfo['preferredLanguage'] = data.body.preferredLanguage;
        }

        if(data.headers['x-country-code'] == "UK")
        {
            delete userRegDetails.userInfo.email;
            userRegDetails.userInfo['phone'] = data.body.phone;
            let addtlProp = jsonArray.userInfo.additionalProperties;
			userRegDetails.userInfo['role'] = data.body.role;
			userRegDetails.userInfo['email'] = jsonArray.userInfo.email;
			if(jsonArray.userInfo.email !== data.body.email) {
			    userRegDetails.userInfo['stagingEmail'] = data.body.email;
			}
			if(addtlProp.personalEmail !== data.body.personalEmail) {
                userRegDetails.userInfo['stagingPersonalEmail'] = data.body.personalEmail;
            }
			if(addtlProp.phone == data.body.phone) {
			    delete userRegDetails.userInfo.phone;
			}
            //arearofinterest-uk
            userRegDetails.userInfo['areaOfInterest']= getMultiCheckboxValue("profileareaOfInterest", "; ");
        }

    data.headers["x-id-token"] = getCookie("jwtToken");
    data.body = userRegDetails;
	updateProfilePayload = {
            "userInfo": {
                "phone": $("#phone").val(),
                "title": $("#profiletitle-options .a-dropdown-selected").text().trim(),
                "firstName": $("#firstName").val(),
                "lastName": $("#lastName").val(),
                "email":$("#email").val(),
				"conemail": $("#conemail").val(),
				"secondaryEmail" : $("#secondaryEmail").val() ? $("#secondaryEmail").val() : "",
                "licenseID" : $("#licenseID").val(),
                "Postcode": $("#profilepostalcode").val(),
                "orgName": data.body.userInfo.orgName, 
                "billingStreet" : $("#billingStreet").val(),
                "billingCity": $("#billingCity").val(),
                "billingState" :$("#billingState").val(),                
        		"areaOfInterest":$("#profileareaOfInterest-options .a-dropdown-selected").text().trim(),
                "role" :$("#profilerole-options .a-dropdown-selected").text().trim()
            }
        }
        if(data.headers['x-country-code'] == "UK")
        {
            updateProfilePayload.userInfo['areaOfInterest']= getMultiCheckboxValue("profileareaOfInterest", "; ");
        }
    return data;
}

function onBeforeProfileRequest() {
    showLoading();
}

function onSuccessProfileRequest(data) {

    if(data.errorCode == 0) {
        hideApiError();
		console.log(data);
        hideLoading();

    } else {
        onErrorConsentRequest(data);
    }

    onSuccessProfileScrollUp();
}

function onSuccessProfileScrollUp() {
    $("html, body").scrollTop(0);
}

function onErrorProfileRequest(error) {

    showApiError(error?.response);

    hideLoading();
	onSuccessProfileScrollUp();
}

function onCompleteUpdateRequest()
{
        $("#firstName").val(updateProfilePayload.userInfo.firstName);
        $("#lastName").val(updateProfilePayload.userInfo.lastName );
        $("#phone").val(updateProfilePayload.userInfo.phone);
        $("#email").val(updateProfilePayload.userInfo.email);
		$("#conemail").val(updateProfilePayload.userInfo.conemail);
		$("#secondaryEmail").val(updateProfilePayload.userInfo.secondaryEmail);
        $("#conSecondEmail").val(updateProfilePayload.userInfo.secondaryEmail);
        $("#licenseID").val(updateProfilePayload.userInfo.licenseID);
        $("#billingStreet").val(updateProfilePayload.userInfo.billingStreet);
        $("#billingCity").val(updateProfilePayload.userInfo.billingCity);
        $("#billingState").val(updateProfilePayload.userInfo.billingState);
        $("#profilepostalcode").val(updateProfilePayload.userInfo.Postcode);
        $('#profileInstitutionName-options').find('.a-dropdown__menu').children().remove();

        getAddressOnProfileDashborad(updateProfilePayload.userInfo.Postcode, updateProfilePayload.userInfo.orgName);   
        getRoleProfileDashboard(updateProfilePayload.userInfo.role);
        getAreaOfIntProfileDashboard(updateProfilePayload.userInfo.areaOfInterest);
        getTitleProfileDashboard(updateProfilePayload.userInfo.title);

 }