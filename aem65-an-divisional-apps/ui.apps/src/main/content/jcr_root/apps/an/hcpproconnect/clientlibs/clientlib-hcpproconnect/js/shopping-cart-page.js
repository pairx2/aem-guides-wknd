function shoppingDetail(){
    if(localStorage.hasOwnProperty('userInfo')) {
        let patientRetrivalTimeout = $("#sampleTiming").attr("value") ? $("#sampleTiming").attr("value") : "2000";
        let json = localStorage.getItem('userInfo');
        let userInfo = JSON.parse(json);
        let sfdcid = userInfo.sfdcId;
        $("#email").val(userInfo.email);
        const apiLookUserURL = "api/public/lookup/user";
        let headers = new Headers();
        headers.append("x-application-id", $("input[name=x-application-id]").val());
        headers.append("x-country-code", $("input[name=x-country-code]").val());
        headers.append("x-preferred-language", $("input[name=x-preferred-language]").val());
        headers.append("Content-Type", 'application/json');
        headers.append("x-secret-header", $("#secretHeader").val());
        setTimeout(function(){
        let lookUserPayload = JSON.stringify({
            "captchaValue": localStorage.getItem("captchaValue"),
            "userInfo": {
                "sfdcId": sfdcid
            }
        });

        //call look user api to get profile details
        apiPOSTCall(headers,apiLookUserURL,lookUserPayload)
        .then(response => response.text())
        .then(function (result) {
            let data = JSON.parse(result);
            if(data.errorCode == 0) {
                localStorage.setItem("lookupUser", JSON.stringify(data.response));
               let addtlProp = data.response.userInfo.additionalProperties;
               $("#secondaryEmail").val(addtlProp.personalEmail? addtlProp.personalEmail : "");
            }
        });
        },patientRetrivalTimeout);
    }
}
function tabsActive(){
    let idx = $(this).closest("#checkout-page-steps").find('.cmp-tabs__tab').index(this);

    $('#checkout-page-steps-desc').find('.text').removeClass('active');
    $('#checkout-page-steps-desc').find('.text').eq(idx).addClass('active');

    if(idx === 1 || idx === 2){
        $('.connector').eq(idx-1).addClass('active');
    }
    else{
        $('.connector').removeClass('active');
    }
}
$(document).ready(function(){
    $("#section-shopping-cart-footer-container").parent().hide();
    if(isCountryCodeUK()) {
        shoppingDetail();
        $('#checkout-page-steps').find('.cmp-tabs__tab:not(:last-child)').each(function() {
            $(this).after($(`<div class="connector"></div>`));
        });

        $('#checkout-page-steps-desc').find('.text:not(:last-child)').each(function() {
            $(this).after($(`<div class="connector"></div>`));
        });

        $('#checkout-page-steps-desc').insertAfter('#checkout-page-steps .cmp-tabs__tablist');
        $('#checkout-page-steps-desc').find('.text:first').addClass('active');

        $("#checkout-page-steps").find('.cmp-tabs__tab').click(function(e) {
           tabsActive();
        });

        $('#shopping-cart-proceed').click(function() {
            if(isUserLoggedIn()) {
                $("#section-shopping-cart-footer-container").parent().show();
                $('.cmp-tabs__tab').eq(1).get(0).click();
                confirmStep(0);
                scrollToTop("#checkout-page-steps");
            }
        });

        $('#shopping-cart-return').click(function() {
            $("#section-shopping-cart-footer-container").parent().hide();
            $('.cmp-tabs__tab').eq(0).get(0).click();
            $('.cmp-tabs__tab').eq(0).find('.a-tabs__nav-text').html("1");
            scrollToTop('#checkout-page-steps');
        });

        setTimeout(function () {
            $('#shopping-cart-page-spinner').hide();
            $('#shopping-cart-steps-container').show();
        }, 1000);
    }
});

function confirmStep(idx) {
    $('.cmp-tabs__tab').eq(idx).addClass('cmp-tabs__tab--active active');
    $('.cmp-tabs__tab').eq(idx).find('.a-tabs__nav-text').html(`<span class="abt-icon abt-icon-check"></span>`);
    $('#checkout-page-steps-desc').find('.text').eq(idx).addClass('active');
}

function scrollToTop(id) {
    $('body,html').animate({
        scrollTop: $(id).offset().top
    }, 800);
}