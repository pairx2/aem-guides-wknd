//coupon response from session
let couponResponse = JSON.parse(sessionStorage.getItem('coupon_redeem_res'));
//retailer type selected by user
let selectedRetailerType = JSON.parse(sessionStorage.getItem('selected_retailer_type'));
let amazonRedirectURL = $('#amazonRedirectURL').val();
let amazonRetailerType = $('#amazonRetailerType').val();
let amazonRedirectURL24Pack = $('#amazonRedirectURL24Pack').val();
let amazon24PackEnabled = $('#amazon24PackEnabled').val();

$(document).ready(function () {
    //check if coupon response is present in session and offers page is active
    if (couponResponse && ($('#section-offer-landing-content').length > 0)) {
        let res = couponResponse.response;
        let redeemedDate = res.assignedOfferRedeemedDate;
        showRetailerInBottom(couponResponse);
        // show the coupon redeem section
        $('#section-offer-landing-content').closest('.container').css({ display: "block" });

        // check to show expired coupon status
        if (res.i18nMessageKey === 'UP-1013') {
            $('#status-expired-offer-container').closest('.container').css({ display: "block" });
        }
        // check to show no offer coupon status
        else if (res.i18nMessageKey === 'UP-1008') {
            $('#status-no-offer-container').closest('.container').css({ display: "block" });
        }
        // check to show valid coupon status
        else if ((couponResponse.errorCode === 0) && (redeemedDate === null)) {
            showAlreadyAssignedMessage(res);
            let expDate = res.assignedOfferExpiryDate.split('T')[0].split('-');
            let offerValue = (res.assignedOfferRetailer === amazonRetailerType) ? ((res.assignedOfferValue*100)+'%') : ('$'+res.assignedOfferValue);
            $('#redeem-offer-container').closest('.container').css({ display: "block" });
            $('#offer-end-date')[0].innerText = expDate[1] + '/' + expDate[2] + '/' + expDate[0];
            $('#dollar-amount')[0].innerText = offerValue;
            assignRedeemCTALink(res);
        }
        // check to show already redeemed coupon status
        else if ((couponResponse.errorCode === 0) && (new Date(redeemedDate.split('T')[0]) < new Date())) {
            $('#status-already-redeemed-container').closest('.container').css({ display: "block" });
        }
        // Show the error coupon status 
        else {
            $('#status-server-issue-container').closest('.container').css({ display: "block" });
        }
    } else {
        // show error message on page if user drectly try to access offer page or for any other error scenario
        $('#offer-page-no-longer-available').closest('.text').css({ display: "block" });
    }
});

//Show if retailer is already assigned
function showAlreadyAssignedMessage(res) {
    if(res.requestOfferRetailer !== res.assignedOfferRetailer) {
        $('#already-assigned').css({ display: "block" });
        $('#offer-landing-content').closest('.container').css({ height: '877px' });
    } else {
        $('#save-amount').css({ display: "block" });
        $('#save-amount-info').css({ display: "block" });
    }
}

// function to assign link on redeem CTA
function assignRedeemCTALink(res) {
    if (res.assignedOfferRetailer === amazonRetailerType) {
        // assign link to redeem CTA for Amazon retailer
        if(amazon24PackEnabled) {
            $('#redeem-cta').attr('href', amazonRedirectURL24Pack);
        } else {
            $('#redeem-cta').attr('href', amazonRedirectURL + res.assignedOfferCode);
        }
        //show the coupon code if retailer is amazon
        $('#offer_detail_text').closest('.text').css({ display: 'flex' });
        $('#amazon-coupon-code').closest('.text').css({ display: 'block' });
        $('#amazon-coupon-code h3')[0].innerText = res.assignedOfferCode;
    } else {
        // assign link to redeem CTA for TPG retailer
        $('#redeem-cta').attr('href', '//' + res.assignedOfferCode);
    }
}

// function to show retailer section in bottom of coupon
function showRetailerInBottom(couponResponse) {
    let res1 = couponResponse.response;
    if ((couponResponse.errorCode === 0) && (res1.assignedOfferRedeemedDate === null)) {
        if (res1.assignedOfferRetailer === amazonRetailerType) {
            $('#amazon-retailer-container').closest('.container').css({ display: "block" });
        } else {
            $('#multiple-retails-container').closest('.container').css({ display: "block" });
        }
    } else if (selectedRetailerType === amazonRetailerType) {
        $('#amazon-retailer-container').closest('.container').css({ display: "block" });
    } else {
        $('#multiple-retails-container').closest('.container').css({ display: "block" });
    }
}