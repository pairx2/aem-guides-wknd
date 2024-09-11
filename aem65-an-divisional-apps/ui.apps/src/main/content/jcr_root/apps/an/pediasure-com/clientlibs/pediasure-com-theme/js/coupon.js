
function UpdateCouponRequest(formData) {
	let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
	let countryCode = document.querySelector('input[name="x-country-code"]').value;
	let preferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    formData.headers = {
        'x-preferred-language': preferredLanguage,
		'x-country-code': countryCode,
        'x-application-id': headerApplicationId
	}
    let couponCode = getUrlParameter('id');
    formData.body = {
        "encodedLink": couponCode,
        "action": "redeemCoupon"
    }
    return formData
}

function onErrorCouponrequest(data) {
    if (data.errorCode > 0) {
        if (data.response) {       
            let errorKey = data.response.i18nMessageKey;     
            if (errorKey === 'UP-1008' || errorKey === 'ES-0003') {
                $('#offer-text').addClass('no-offer');
                $('#offer-text p').text($('input[name="oops-title"]').val());
                $('#offer-text p').append('<span> ' + $('input[name="oops-text"]').val() + '</span>')
            }
            else if (errorKey === 'UP-1013') {
                $('#offer-text p').text($('input[name="offer-expired"]').val());
            }
            else if (errorKey === '500') {
                $('#offer-text p').text($('input[name="server-issue"]').val());
            }
            else if (errorKey === 'ES-0001') {
                $('#coupon-page').hide();
                $('#wrong-coupon').show();
            }
            else {
                $('#offer-text p').text(data.response.statusReason);
            }
        }
    }
}

function onSuccessCouponrequest(data) {
    if (data.errorCode == 0) {
        if (data.response.assignedOfferRedeemedDate === null) {
            let fullDate = data.response.assignedOfferExpiryDate;
            const offerExpiryDate = fullDate.split("T");
            let dateArray = offerExpiryDate[0].split('-');
            $('#offer-text p').text('SAVE $' + data.response.assignedOfferValue);
            $('#offer-text').append('<span>on any PediaSure® product!</span>');
            $('#offer-text').append('<div class="a-button a-button--primary"><a class="btn" href="https://' + data.response.assignedOfferCode +'" target="_blank">REDEEM OFFER</a></div>');
            $('#offer-text').append('<p class="offer-end-date">Offer ends ' + dateArray[1] + '/' +  dateArray[2] + '/' +  dateArray[0] + '*</p>');
            $('.offer-disc').css('display', 'block');
        } else {
            $('#offer-text p').text($('input[name="offer-redeemed"]').val());
        }
    }
}