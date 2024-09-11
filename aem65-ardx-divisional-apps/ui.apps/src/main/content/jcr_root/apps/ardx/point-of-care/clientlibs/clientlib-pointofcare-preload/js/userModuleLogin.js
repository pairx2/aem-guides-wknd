let userGroup = [];
let userData;
const setNonePropToElement =(qSelector) => {
    if(document.querySelector(qSelector)){
        document.querySelectorAll(qSelector).forEach((ele)=>{
            ele.parentElement.parentElement.style.display = 'none';
        })
    }
}
setTimeout(() => {
    setNonePropToElement('#my-account');
    setNonePropToElement('#customer-home');
    setNonePropToElement('#employees-home');
    setNonePropToElement('#partner-home');
    setNonePropToElement('.link #logout');
    setNonePropToElement('#complete-profile');
    setNonePropToElement('#dashboard-page');
    setNonePropToElement('#user-name');
    setNonePropToElement('#repair-manual-home');
    setNonePropToElement('#distribution-home');
    if(document.querySelector('#my-profile')){
        document.querySelectorAll('#my-profile').forEach(function(ele){
            ele.closest('.linkstack')?.classList.add('myProfileLinks');
            ele.closest('.linkstack').style.display = 'none';
        });
    }
    window.onmousedown = function(e) {
        let el = e.target;
        if (el.tagName.toLowerCase() == 'option' && el.parentNode.hasAttribute('multiple')) {
            e.preventDefault();
            e.stopImmediatePropagation();
            let originalScrollTop = el.parentNode.scrollTop;
            if (el.hasAttribute('selected')) {
                el.removeAttribute('selected');
                setTimeout(function() {
                    el.classList.remove('selected');
                }, 251);
            } else {
                el.setAttribute('selected', '');
                 setTimeout(function() {
                    el.classList.add('selected');
                }, 500);
            }
            setTimeout(function() {
                el.parentNode.scrollTop = originalScrollTop;
            }, 1);
            
        }
    }
}, 500);
function UpdateLoginRequest(formData) {
    setTimeout(() => {
        $('.custom-spinner').removeClass('d-none');
    }, 100);
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
	sessionStorage.setItem('currUser',formData.body.email);
    formData.headers = {
        'x-preferred-language': 'en',
        'x-country-code': 'US',
        'x-application-id': headerApplicationId
    }
    if ($("[name='enterpriseRecaptcha']").val()=='true'){
        formData.body = {
            loginID: formData.body.email,
            password: formData.body.password,
            "reCaptcha": formData.body["g-recaptcha-response"],
            "captchaType" : "ent",
            "captchaAction" : "submit"
        }
    }else{
        formData.body = {
            loginID: formData.body.email,
            password: formData.body.password,
            "reCaptcha": formData.body["g-recaptcha-response"]
        }
    }
    return formData
}

function onSuccessUserLogin(data) {
    if (data.errorCode == 0) {
        $(".o-form-container__success-msg").hide();
        let jwtToken = data.response.jwtToken.id_token;
        let customerType = data.response.accountInfo.userInfo.segmentation;
        let customerCategory = data.response.accountInfo.userInfo.subSegmentation;
        let customerRole = data.response.accountInfo.userInfo.tertiarySegmentation;
        let firstName = data.response.accountInfo.userInfo.firstName;
        sessionStorage.setItem('customerType', customerType);
        sessionStorage.setItem('customerCategory', customerCategory);
        sessionStorage.setItem('customerRole', customerRole);
        sessionStorage.setItem('userFirstName', firstName);
        sessionStorage.setItem('jwtToken', jwtToken);
        sessionStorage.setItem('LoggedInTime', new Date());
        userData = data;
        setCookie('id_token', jwtToken, '');
        setCookie('userFirstName', firstName, '');
        enableSession();
    }
}

function onFailureUserLogin(responseData){
    let changePasswordUrl = $('#change-password-link').attr('href');
    setTimeout(() => {
        $('.custom-spinner').addClass('d-none');
    }, 100);
    if(responseData.response?.statusReason){
        if(responseData.response.statusReason.indexOf('New Password Required') >= 0 || responseData.response.i18nMessageKey == 'AUTH-1010'){
            $("#login-form .o-form-container__error-msg").text('');
            window.location.href = changePasswordUrl;
        }
        else if(responseData.response.statusReason.indexOf('Your account is locked') >= 0 || responseData.response.statusReason.indexOf('Your account is deactivated') >= 0){
            $("#login-form .o-form-container__error-msg").text(responseData.response.statusReason);
        }
        else if($("#login-form .o-form-container__error-msg").text().length == 0){
            $("#login-form .o-form-container__error-msg").text('Incorrect e-mail address or password');
        }
    }
}
function UpdateChangePasswordRequest(formData) {
    setTimeout(() => {
        $('.custom-spinner').removeClass('d-none');
    }, 100);
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    let email = sessionStorage.getItem('currUser');
    formData.headers = {
        'x-preferred-language': 'en',
        'x-country-code': 'US',
        'x-application-id': headerApplicationId
    }
    if ($("[name='enterpriseRecaptcha']").val()=='true'){
        formData.body = {
            loginID: email,
            password: formData.body.password,
            "newPassword": formData.body.newPassword,
            "reCaptcha": formData.body["g-recaptcha-response"],
            "captchaType" : "ent",
            "captchaAction" : "submit"
        }
    }else{
        formData.body = {
            loginID: email,
            password: formData.body.password,
            "newPassword": formData.body.newPassword,
            "reCaptcha": formData.body["g-recaptcha-response"]
        }
    }
    return formData;
}

//function to setCookie
function setCookie(cname, cvalue, exdays) {
    let expires = "";
    if (exdays !== '') {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        expires = "expires=" + d.toUTCString();
    }
    document.cookie = cname + "=" + cvalue + ";" + expires + ";";
}

//function to getCookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (const element of ca) {
        let c = element;
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

//function to deleteCookie
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function enableSession() {
    callSession(true);
}

const REQUEST_HEADERS = {
    'Content-Type': 'application/json'
};

function getRequestHeader(key) {
    if (key) {
        return REQUEST_HEADERS[key] || '';
    }
    return REQUEST_HEADERS;
}

function callSession(enable) {
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    let sessionApiUrl = window.location.origin + '/api/private/profile/session';
	 const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': getRequestHeader('Content-Type'),
            'x-id-token': getCookie('id_token'),
            'x-application-id': headerApplicationId,
            'x-country-code': 'US',
            'x-preferred-language': 'en'
        },
        mode: 'cors',
        cache: 'no-cache'
    };
    fetch(sessionApiUrl + "?enable=" + enable, requestOptions)
        .then(function(response) {
            if (response.status == 200) {
                callCreateUserLogin(enable);
            }
            return response;
		})
        .catch(function() {
            
        });
}

function callCreateUserLogin(enable) {
    let customerType = sessionStorage.getItem('customerType');
    let customerCategory = sessionStorage.getItem('customerCategory');
    let customerRole = sessionStorage.getItem('customerRole');
    if (enable === true) {
        UserDataCallFunction(userData, customerType, customerCategory, customerRole); 
    }
}
function UserDataCallFunction(userData, customerType, customerCategory, customerRole){
    if (userData) {
        let firstName = userData.response.accountInfo.userInfo?.firstName;
        let lastName = userData.response.accountInfo.userInfo?.lastName;
        let jobTitle = userData.response.accountInfo.userInfo?.jobTitle;
        let employer = userData.response.accountInfo.userInfo?.employer;
        let address = userData.response.accountInfo.userInfo?.address;
        let city = userData.response.accountInfo.userInfo?.city;
        let state = userData.response.accountInfo.userInfo?.state;
        let zipCode = userData.response.accountInfo.userInfo?.zipCode;
        let phoneNumber = userData.response.accountInfo.userInfo?.phoneNumber;
        let istatProduct = userData.response.accountInfo.userInfo?.istatProduct;
        let serialNumber = userData.response.accountInfo.userInfo?.serialNumber;
        let topics = userData.response.accountInfo.userInfo?.topics;
        let country = userData.response.accountInfo.userInfo?.country;
        let userCustomerType = userData.response.accountInfo.userInfo?.segmentation;
        let language = userData.response.accountInfo.userInfo?.language;

        if ((firstName == undefined || firstName == '') || (lastName == undefined || lastName == '') || (jobTitle == undefined || jobTitle == '') || (employer == undefined || employer == '') || (address == undefined || address == '') || (city == undefined || city == '') || (state == undefined || state == '') || (zipCode == undefined || zipCode == '') || (phoneNumber == undefined || phoneNumber == '') || ((userCustomerType == 'hospitalPublic' || userCustomerType == 'hospitalPrivate' || userCustomerType == 'nonHospital' || userCustomerType == 'HOSPITAL_PUBLIC' || userCustomerType == 'HOSPITAL_PRIVATE' || userCustomerType == 'NON_HOSPITAL') && (istatProduct == undefined || istatProduct == '')) || ((userCustomerType == 'hospitalPublic' || userCustomerType == 'hospitalPrivate' || customerType == 'nonHospital' || userCustomerType == 'HOSPITAL_PUBLIC' || userCustomerType == 'HOSPITAL_PRIVATE' || userCustomerType == 'NON_HOSPITAL') && (serialNumber == undefined || serialNumber == '')) || ((userCustomerType == 'hospitalPublic' || userCustomerType == 'hospitalPrivate' || userCustomerType == 'nonHospital' || userCustomerType == 'HOSPITAL_PUBLIC' || userCustomerType == 'HOSPITAL_PRIVATE' || userCustomerType == 'NON_HOSPITAL') && (topics == undefined || topics == '')) || (country == undefined || country == '') || (userCustomerType == undefined || userCustomerType == 'null' || userCustomerType == '') || ((userCustomerType == 'hospitalPublic' || userCustomerType == 'hospitalPrivate' || userCustomerType == 'nonHospital' || userCustomerType == 'HOSPITAL_PUBLIC' || userCustomerType == 'HOSPITAL_PRIVATE' || userCustomerType == 'NON_HOSPITAL') && (language == undefined || language == ''))) {
            callcompeleteProfile();
        }
        else {
            userLoginCustomer(customerType, customerCategory, customerRole);
            setTimeout(() => {
                $('.custom-spinner').addClass('d-none');
            }, 100);
            let currOrigin = window.location.origin;
            let docReferrer = sessionStorage.getItem('documentReferrer');
            callDocreferrer(docReferrer, currOrigin);
        }
    }
}
function callcompeleteProfile() {
    if (completeProfileURL) {
        window.location.href = completeProfileURL;
    }
}

function callDocreferrer(docReferrer, currOrigin) {
    if ((docReferrer)?.indexOf('/secure/') >= 0 && (docReferrer)?.indexOf(currOrigin) >= 0) {
        window.location.href = docReferrer;
    } else {
        callDistributorFunction(userGroup);
    }
}

function callDistributorFunction(userGroup) {
    if (userGroup.includes('APOC_ROLE_INTERNATIONAL_DISTRIBUTOR') && userGroup.includes('APOC_ROLE_REPAIR_DOCS_AND_SOFTWARE') && userGroup.includes('APOC_ROLE_APOC_CUSTOMER')) {
        window.location.href = employeeURL;
    }
    else if (userGroup.includes('APOC_ROLE_INTERNATIONAL_DISTRIBUTOR') && !userGroup.includes('APOC_ROLE_REPAIR_DOCS_AND_SOFTWARE') && !userGroup.includes('APOC_ROLE_APOC_CUSTOMER')) {
        window.location.href = partnerURL;
    }
    else if (userGroup.includes('APOC_ROLE_REPAIR_DOCS_AND_SOFTWARE') && !userGroup.includes('APOC_ROLE_INTERNATIONAL_DISTRIBUTOR') && !userGroup.includes('APOC_ROLE_APOC_CUSTOMER')) {
        window.location.href = repairManualURL;
    }
    else if (userGroup.includes('APOC_ROLE_APOC_CUSTOMER') && !userGroup.includes('APOC_ROLE_INTERNATIONAL_DISTRIBUTOR') && !userGroup.includes('APOC_ROLE_REPAIR_DOCS_AND_SOFTWARE')) {
        window.location.href = customerURL;
    }
    else if (userGroup.includes('APOC_ROLE_APOC_CUSTOMER') && userGroup.includes('APOC_ROLE_INTERNATIONAL_DISTRIBUTOR') && !userGroup.includes('APOC_ROLE_REPAIR_DOCS_AND_SOFTWARE')) {
        window.location.href = customerURL;
    }
}

function userLoginCustomer(customerType, customerCategory, customerRole) {
    if ((customerType == 'abbottEmployees' || customerType == 'ABBOTT_EMPLOYEES')) {
        userGroup = [];
        userGroup.push('APOC_ROLE_INTERNATIONAL_DISTRIBUTOR');
        userGroup.push('APOC_ROLE_REPAIR_DOCS_AND_SOFTWARE');
        userGroup.push('APOC_ROLE_APOC_CUSTOMER');
    }
    if ((customerType == 'distributionPartner' || customerType == 'DISTRIBUTION_PARTNER') && (customerCategory == 'outsideUs' || customerCategory == 'OUTSIDE_US') && (customerRole == 'non-repair-center' || customerRole == 'NON_REPAIR_CENTER')) {
        userGroup = [];
        userGroup.push('APOC_ROLE_INTERNATIONAL_DISTRIBUTOR');
        userGroup.push('APOC_ROLE_APOC_CUSTOMER');
    }

    if ((customerType == 'distributionPartner' || customerType == 'DISTRIBUTION_PARTNER') && (customerCategory == 'us' || customerCategory == 'US') && (customerRole == 'alaska-scientific' || customerRole == 'ALASKA_SCIENTIFIC') || (customerRole == 'cardinal' || customerRole == 'CARDINAL') || (customerRole == 'concordance' || customerRole == 'CONCORDANCE') || (customerRole == 'dove-medical-supply' || customerRole == 'DOVE_MEDICAL_SUPPLY') || (customerRole == 'fisher' || customerRole == 'FISHER') || (customerRole == 'henry-schein' || customerRole == 'HENRY_SCHEIN') || (customerRole == 'marathon-medical' || customerRole == 'MARATHON_MEDICAL') || (customerRole == 'mckesson' || customerRole == 'MCKESSON') || (customerRole == 'medline' || customerRole == 'MEDLINE_INDUSTRIES') || (customerRole == 'narmd' || customerRole == 'NARMD') || (customerRole == 'other' || customerRole == 'OTHER')) {
        userGroup = [];
        userGroup.push('APOC_ROLE_APOC_CUSTOMER');
    }
    RepairCenterAndHospital(customerType, customerCategory, customerRole);
    if (userGroup) {
        setCookie('userGroup', userGroup.toString(), '');
    }
}

function RepairCenterAndHospital(customerType, customerCategory, customerRole) {
    if ((customerType == 'repairCenter' || customerType == 'REPAIR_CENTER') && (customerCategory == 'outsideUsRepairCenter' || customerCategory == 'OUTSIDE_US_RC') && (customerRole == 'repair-center' || customerRole == 'REPAIR_CENTER' || customerRole == '' || customerRole == undefined)) {
        userGroup = [];
        userGroup.push('APOC_ROLE_REPAIR_DOCS_AND_SOFTWARE');
    }
    if ((customerType == 'repairCenter' || customerType == 'REPAIR_CENTER') && (customerCategory == 'usRepairCenter' || customerCategory == 'US_RC') && (customerRole == 'repair-center' || customerRole == 'REPAIR_CENTER' || customerRole == '' || customerRole == undefined)) {
        userGroup = [];
        userGroup.push('APOC_ROLE_REPAIR_DOCS_AND_SOFTWARE');
    }
    callHospitalFunction(customerType);
}

function callHospitalFunction(customerType) {
    if ((customerType == 'hospitalPublic' || customerType == 'HOSPITAL_PUBLIC') || (customerType == 'hospitalPrivate' || customerType == 'HOSPITAL_PRIVATE')) {
        userGroup = [];
        userGroup.push('APOC_ROLE_APOC_CUSTOMER');
    }
    if ((customerType == 'nonHospital' || customerType == 'NON_HOSPITAL')) {
        userGroup = [];
        userGroup.push('APOC_ROLE_APOC_CUSTOMER');
    }
}