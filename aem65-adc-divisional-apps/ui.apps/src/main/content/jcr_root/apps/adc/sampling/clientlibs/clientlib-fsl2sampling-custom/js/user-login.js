/**
 * User Login and Varify
**/
$(document).ready(function () {

    /** set activationKey cookie **/
    var activationKey = getUrlParameter('activationKey');
    if(activationKey && activationKey !== "") {
        setCookie('activationKey', activationKey, '');
    }

    /** fsl2 User Login Varify **/
	var fsl2UserLoginVerify = $('#fsl2UserLoginVerify') //check if page has id element

	if (fsl2UserLoginVerify.length > 0 && activationKey !== "" && wcmmodeOff) {

	    $('#fsl2UserLoginRegistration').hide(); // hide registartion button
	    $('#page-spinner').css('display', 'block');
	    setTimeout(function () {
	        $('#fsl2UserLoginVerify').find('button.btn[type="submit"]').trigger('click');
	    }, 500);

	}

});

//function to process address and return the parameters
function processUserData(userData) {

	var accountInfo = {
		"accessCode" : userData.accessCode,
		"productSKU": userData.accessCodeProductSKU,
		"userType": userData.userType
	};

	setCookie('consentTraining', userData.consentTraining, '');

	var addrArray = userData.arrayOfAddress;
	var defaultAddr = addrArray[0];

	accountInfo.addressId = defaultAddr && defaultAddr['addressId'] ? defaultAddr['addressId'] : '';

	var userAccInfo = JSON.stringify(accountInfo);
	setCookie('userAccInfo', userAccInfo, '');

	var addrTitle = defaultAddr && defaultAddr.addressTitle ? defaultAddr.addressTitle : '';
	var addrFN = defaultAddr && defaultAddr.addressFirstName ? defaultAddr.addressFirstName : '';
	var addrLN = defaultAddr && defaultAddr.addressLastName ? defaultAddr.addressLastName : '';
	var addrLine1 = defaultAddr && defaultAddr.addressLine1 ? defaultAddr.addressLine1 : '';
	var addrZip = defaultAddr && defaultAddr.addressZipCode ? defaultAddr.addressZipCode : '';
	var addrCity = defaultAddr && defaultAddr.addressCity ? defaultAddr.addressCity : '';

	var fullName = window.btoa(addrTitle + " " + addrFN + " " + addrLN);
	var address1 = window.btoa(addrLine1 + ",");
	var address2 = window.btoa(addrZip + " " + addrCity);

	var finalUserDetails = "fullName=" + fullName + "&address1=" + address1 + "&address2=" + address2;
	
	return finalUserDetails;
}