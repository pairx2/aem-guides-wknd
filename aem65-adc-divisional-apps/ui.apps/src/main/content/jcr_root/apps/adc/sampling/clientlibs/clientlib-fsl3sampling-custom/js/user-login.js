/**
 * User Login and Varify
**/
$(document).ready(function () {

    /** set activationKey cookie **/
    let activationKey = getUrlParameter('activationKey');
    if(activationKey && activationKey !== "") {
        setCookie('activationKey', activationKey, '');
    }

    /** fsl3 User Login Varify **/
	let fsl3UserLoginVarify = $('#fsl3UserLoginVarify') //check if page has id element

	if (fsl3UserLoginVarify.length > 0 && activationKey !== "" && wcmmodeOff) {

	    $('#fsl3UserLoginRegistration').hide(); // hide registartion button
	    $('#page-spinner').css('display', 'block');
	    setTimeout(function () {
	        $('#fsl3UserLoginVarify').find('button.btn[type="submit"]').trigger('click');
	    }, 500);

	}

});

//funtion to process address and retrun the parameters
function processUserData(userData) {

	let accountInfo = {
		"accessCode" : userData.accessCode,
		"productSKU": userData.accessCodeProductSKU,
		"userType": userData.userType
	};

	setCookie('consentTraining', userData.consentTraining, '');
	setCookie('dataProcessingConsent', userData.consentDataProcessing, '');
	let addrArray = userData.arrayOfAddress;
	let defaultAddr = addrArray[0];

	accountInfo.addressId = defaultAddr && defaultAddr['addressId'] ? defaultAddr['addressId'] : '';

	let userAccInfo = JSON.stringify(accountInfo);
	setCookie('userAccInfo', userAccInfo, '');

	let addrTitle = defaultAddr && defaultAddr.addressTitle ? defaultAddr.addressTitle : '';
	let addrFN = defaultAddr && defaultAddr.addressFirstName ? defaultAddr.addressFirstName : '';
	let addrLN = defaultAddr && defaultAddr.addressLastName ? defaultAddr.addressLastName : '';
	let addrLine1 = defaultAddr && defaultAddr.addressLine1 ? defaultAddr.addressLine1 : '';
	let addrZip = defaultAddr && defaultAddr.addressZipCode ? defaultAddr.addressZipCode : '';
	let addrCity = defaultAddr && defaultAddr.addressCity ? defaultAddr.addressCity : '';

	let fullName = window.btoa(addrTitle + " " + addrFN + " " + addrLN);
	let address1 = window.btoa(addrLine1 + ",");
	let address2 = window.btoa(addrZip + " " + addrCity);

	let finalUserDetails = "fullName=" + fullName + "&address1=" + address1 + "&address2=" + address2;
	
	return finalUserDetails;
}