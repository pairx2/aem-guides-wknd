/**
 * Order Confirmation
**/
$(document).ready(function() {
    
    //order confirmation code start
    let fsl3orderConfirmPage = $('#fsl3OrderConfirmation');

    if (fsl3orderConfirmPage.length > 0 && wcmmodeOff) {
        //check cookies order-confirm
        checkCookie('order-confirm');
        
        //check consent value present or not in cookie
        let orderConsentFlag = getCookie('consentTraining') == "true" ? true : false;
        //check full address is available
        let orderFullName = window.atob(getUrlParameter('fullName'));
        let orderAddress1 = window.atob(getUrlParameter('address1'));
        let orderAddress2 = window.atob(getUrlParameter('address2'));
        let orderAddressFlag;
        if (!orderFullName.trim() && orderAddress1.trim() == "," && !orderAddress2.trim()) {
            orderAddressFlag = false;
            $('[id^="OC-TXT"]').hide();
            $('#OC-ADD-ERROR').css('display','block');
        } else {
            orderAddressFlag = true;
            $('#OC-ADD-ERROR').hide();
            if (orderFullName.includes(" ")) {
                orderFullName = orderFullName.slice(orderFullName.indexOf(" ") + 1, orderFullName.length);
            }
        $('#OC-TXT-USER-NAME').html('<p>' + orderFullName + '</p>');
        $('#OC-TXT-ADDLINE-1').html('<p>' + orderAddress1 + '</p>');
        $('#OC-TXT-ADDLINE-2').html('<p>' + orderAddress2 + '</p>');
        $('[id^="OC-TXT"]').css('display', 'block');
      }

      checkOrderButtonStatus(orderConsentFlag, orderAddressFlag);

      // show/hide V2/V3 button in the popup
      handleUserType();

    }

            // Show/Hide DataProcessing Consent checkbox-content
            let dataProcessingConsent = getCookie("dataProcessingConsent") == "true" ? true : false ;
            if(dataProcessingConsent){
                $("#OC-ConsentTraining-options").removeClass("d-block").addClass("d-none")
                $('#dataProcessingConsentText').removeClass("d-block").addClass("d-none")
                $('input[name=consentDataProcessing]').prop('checked',true)
            }
            else{
                $('#OC-ConsentTraining-options').removeClass("d-none").addClass("d-block")
                $('#dataProcessingConsentText').removeClass("d-none").addClass("d-block")
            }

        });

function handleUserType() {
  let userAccInfo = getCookiesObj('userAccInfo');
  let orderUserType = (userAccInfo && userAccInfo !== "") ? userAccInfo.userType : '';
  if (orderUserType && orderUserType !== "") {
    orderUserType = orderUserType.toUpperCase();
    $('#OC-ShippingAddr-Popup .button').hide();
    $('#USER-TYPE-' + orderUserType).css('display', 'block').closest('.button').css('display', 'block');
  } else {
    $('#USER-TYPE-V3').css('display', 'block').closest('.button').css('display', 'block');
  }
}       

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
        $('#orderConfirmForm button[type="submit"]').prop('disabled', 'true');
    }
    
}