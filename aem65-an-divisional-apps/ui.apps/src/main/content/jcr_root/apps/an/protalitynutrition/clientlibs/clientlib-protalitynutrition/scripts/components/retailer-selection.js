let retailerHeaders = {
    "x-application-id": 'protalitynutrition',
    "x-country-code": 'US',
    "x-preferred-language": 'en',
    "Content-Type": "application/json",
};
let couponApiUrl = $("#couponApiUrl").val();
let offersPage = $("#offersPageUrl").val();
let idForRetailer = new URLSearchParams(window.location.search).get('id');

$(document).ready(function () {
    if(idForRetailer) {
        $('#retailer_section_page').closest('.container').css({ display: "block" });

        $(".select-retailer-link").click(function (e) {
            let retailerType = e.currentTarget.getAttribute('data-retailer-type');
            let offerType = e.currentTarget.getAttribute('data-offer-type');
            $('#retailer-already-present').closest('.text').css({ display: "none" });
            $('#page-spinner').show();
            sessionStorage.setItem('selected_retailer_type', JSON.stringify(retailerType));

            let data = {
                "encodedLink": idForRetailer,
                "action": "redeemCoupon",
                "retailerType": retailerType,
                "offerType": offerType
            }
            $.ajax({
                "url": couponApiUrl,
                "method": "POST",
                "headers": retailerHeaders,
                "data": JSON.stringify(data),
            }).then(function (res) {
                handleCouponResponse(res);
            }).fail(function (res) {
                handleCouponResponse(res);
            });
        });
    } else {
        $('#retailer-page-no-longer-available').closest('.text').css({ display: "block" });
    }
});

function handleCouponResponse(res) {
    $('#page-spinner').hide();
    sessionStorage.setItem('coupon_redeem_res', JSON.stringify(res));
    window.location = offersPage;
}