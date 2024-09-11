/**
 * Order Confirmation
**/
$(document).ready(function() {


	//function to refresh updated address
	$(document).on("click","#refreshAddress",function(e) {
	  e.preventDefault();
	  let refreshCheckoutURL = window.origin + window.location.pathname + "?refreshAddress=true"
	  window.location.href = refreshCheckoutURL ;
	});

	let refreshAddressSettings ;
	function refreshAddressFn() {
		
		let dataAction = $('.o-wizard__container').attr('data-action');
		if(!dataAction){
			dataAction = $('.o-form-container__main-form').attr('action');
		}
		let addresApiURL = dataAction.substr(0,dataAction.search('/api/')) ;
		addresApiURL = addresApiURL + "/api/private/profile/profile-info" ;
		refreshAddressSettings = {
			"url": addresApiURL,
			"method": "GET",
			"headers": {
				"x-application-id": 'fsl2sampling',
				"x-country-code": 'DE',
				"x-id-token" : getCookie('jwtToken')
			}
		};
		updateAddressAjax().then(function(response) {
			if (response.errorCode==0) {
				let defaultAddr = response.response.address[0];
					if(defaultAddr){
						let addrLine1 =  defaultAddr.addressLine1 ? defaultAddr.addressLine1 : '';
						let addrZip =  defaultAddr.addressZipCode ? defaultAddr.addressZipCode : '';
						let addrCity =  defaultAddr.addressCity ? defaultAddr.addressCity : '';

						let addrTitle = defaultAddr.addressTitle ? defaultAddr.addressTitle : '';
						let addrFN = defaultAddr.addressFirstName ? defaultAddr.addressFirstName : '';
						let addrLN = defaultAddr.addressLastName ? defaultAddr.addressLastName : '';

					let	orderFullName = addrTitle + " " + addrFN + " " + addrLN ;
					let	orderAddress1 = addrLine1 + "," ;
					let	orderAddress2 = addrZip + " " + addrCity;
						let userCookie = getCookie('userAccInfo');
						let userCookieUpdated = JSON.parse(userCookie);
						userCookieUpdated.addressId = defaultAddr.addressId ;
						setCookie('userAccInfo', JSON.stringify(userCookieUpdated), '');
						updateAddressFields(orderFullName, orderAddress1, orderAddress2) ;
					}else{
					}
			}
		});
	}

	function updateAddressAjax() {
		return $.ajax(refreshAddressSettings);
	}


    if(getCookiesObj('userAccInfo')!=""){
        let accountInfo = getCookiesObj('userAccInfo');
        if (accountInfo.productSKU.length === 1) {
          $('#fsl2OrderConfirmation_Sensor').css('display', 'block');
            setCookie('productSel', 'SensorOnly');
        } else if (accountInfo.productSKU.length === 2) {
            $('#fsl2OrderConfirmation_Reader').css('display', 'block');
            setCookie('productSel', 'SensorReader');
        }

        if (getCookie('productSel') && wcmmodeOff) {
            //check cookies order-confirm
            checkCookie('order-confirm');

			//check full address is available
            let orderFullName = window.atob(getUrlParameter('fullName'));
            let orderAddress1 = window.atob(getUrlParameter('address1'));
            let orderAddress2 = window.atob(getUrlParameter('address2'));

			// check if its from the refresh address button
			let regex = new RegExp('[\\?&]refreshAddress=([^&#]*)');
			let results = regex.exec(location.search);
			let defaultAddr ;
			if(results !== null){
				refreshAddressFn();
			}else{
				updateAddressFields(orderFullName, orderAddress1, orderAddress2) ;
			}

            // show/hide V2/V3 button in the popup
            let userAccInfo = getCookiesObj('userAccInfo');
            let orderUserType = (userAccInfo && userAccInfo !== "") ? userAccInfo.userType : '';
            if (orderUserType && orderUserType !== "") {
                orderUserType = orderUserType.toUpperCase();
                $('#OC-ShippingAddr-Popup .button').hide();
                $('#USER-TYPE-' + orderUserType).css('display', 'block').closest('.button').css('display', 'block');
            } else {
                $('#USER-TYPE-V3').css('display', 'block').closest('.button').css('display', 'block');
            }
			// to enable the refreshAddress button
			$('#refreshAddress').css('display', 'block').closest('.button').css('display', 'block');
        }
    }
});

// show/hide consent and enable/disable form button as per consent and address availibility
function checkOrderButtonStatus(orderConsentFlag, orderAddressFlag) {

    //show/hide concent checkbox
    if (orderConsentFlag) {
        $("input[name='consentTraining']").attr('data-required', 'false');
        $('#OC-ConsentTraining-options').hide();
    } else {
        $('#OC-ConsentTraining-options').find("input[name='consentTraining']").attr('data-required', 'true');
        $('#OC-ConsentTraining-options').css('display','block');
    }

    if (orderConsentFlag && orderAddressFlag) {
        $('#orderConfirmForm button[type="submit"]').removeAttr('disabled');
    } else {
        $('#orderConfirmForm button[type="submit"]').attr('disabled', 'true');
    }

}

function updateAddressFields(orderFullName, orderAddress1, orderAddress2) {
			//check consent value present or not in cookie
            let orderConsentFlag = getCookie('consentTraining') == "true" ? true : false;
			let orderAddressFlag;
            if (!orderFullName.trim() && orderAddress1.trim() == "," && !orderAddress2.trim()) {
                orderAddressFlag = false;
                $('[id^="OC-TXT"]').hide();
                if (getCookie('productSel') == 'SensorReader') {
                    $('#OC-ADD-ERROR').css('display', 'block');
                } else if (getCookie('productSel') == 'SensorOnly') {
                    $('#OC-ADD-ERROR-S').css('display', 'block');
                }
            } else {
                orderAddressFlag = true;
				if (getCookie('productSel') == 'SensorReader') {
                    $('#OC-ADD-ERROR').hide();
                    $('#OC-TXT-USER-NAME').html('<p>' + orderFullName + '</p>');
                    $('#OC-TXT-ADDLINE-1').html('<p>' + orderAddress1 + '</p>');
                    $('#OC-TXT-ADDLINE-2').html('<p>' + orderAddress2 + '</p>');
                    $('[id^="OC-TXT"]').css('display', 'block');
                } else if (getCookie('productSel') == 'SensorOnly') {
                    $('#OC-ADD-ERROR-S').hide();
                    $('#OC-TXT-USER-NAME-S').html('<p>' + orderFullName + '</p>');
                    $('#OC-TXT-ADDLINE-1-S').html('<p>' + orderAddress1 + '</p>');
                    $('#OC-TXT-ADDLINE-2-S').html('<p>' + orderAddress2 + '</p>');
                    $('[id^="OC-TXT"]').css('display', 'block');
                }

            }
            checkOrderButtonStatus(orderConsentFlag, orderAddressFlag);

}
