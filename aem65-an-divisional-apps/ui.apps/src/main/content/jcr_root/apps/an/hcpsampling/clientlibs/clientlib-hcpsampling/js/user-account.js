function setMyAccountData(data) {
    for (const key in data) {
        let input = null;
        if (typeof data[key] !== "object") {
            input = $(`input[name='${key}']`);
            if (input != null && input.length) {
                input.val(data[key]);
            }
        } else {
            // nested object within userInfo
            const additionalProperties = data[key];
            findAddPropUserinfo(data,additionalProperties);            
        }
    }
}
function findAddPropUserinfo(data,additionalProperties){
    for (const k in additionalProperties) {
        let input = $(`input[name='${k}']`);
        if (input != null && input.length) {
            input.val(additionalProperties[k]);
            checkUserInfo(k,input,data,additionalProperties);
            
        } else {
            checkuserStateInfo(k,additionalProperties);
        }
    }
}

function checkUserInfo(k,input,data,additionalProperties){
    if(k === "lastName" || k === "firstName"){
        input.val(data[k]);
        //Update input field on account update
        updateProfileFields(k);
    }
    if (k === "npiNumber" && additionalProperties[k].length) {
        input.prop("readonly", true);
    }
}
function checkuserStateInfo(k,additionalProperties){
    if (k === "city" || k === "state") {
        if ($("input[name='cityState']").length && !$("input[name='cityState']").val()) {
            const cityState = `${additionalProperties["city"]}, ${additionalProperties["state"]}`;
            $("input[name='cityState']").val(cityState);
        }
    }
}
//Function to update the profile field
function updateProfileFields(fieldName){
    if(localStorage.getItem('fName') && localStorage.getItem('lName')){
        if(fieldName === "firstName"){
            $(`input[name='${fieldName}']`).val(localStorage.getItem('fName'));
        } 
        if(fieldName === "lastName"){
            $(`input[name='${fieldName}']`).val(localStorage.getItem('lName'));
        }
    }
}

$(document).ready(function () {
    // check to see if user is logged in, if so pre-fill My Account form fields
    if ($("#myAccountForm").length) {
        if (isUserLoggedIn()) {
            setMyAccountData(getLocalStorage("userInfo"));
        }
    }

    // Update Profile on Success Pages that could impact the profile
    let getProfileForm = $("#formGetProfile");

    if (getProfileForm.length) {
        showLoading();
        setTimeout(updateProfile, 100);
    }

    function updateProfile() {
        const idToken = getSessionStorage('jwtToken');
        const action = getProfileForm.find("form").attr("action");
        let headers = {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": idToken
        };

        let response = $.ajax({
            "url": action,
            "method": "GET",
            "headers": headers,
            "async": false
        });           

        if (response.responseJSON?.response?.userInfo) {
            setLocalStorage("userInfo", response.responseJSON.response.userInfo);
            //session sharing data fix to display update name in header 
            localStorage.setItem('fName', response.responseJSON.response.userInfo.firstName);
            localStorage.setItem('lName', response.responseJSON.response.userInfo.lastName);

        }

        hideLoading();
    }
});


