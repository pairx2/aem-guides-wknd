$(document).ready(function () {
    let checkForm = setInterval(function() {
        if ( $('#pim-form') && $('#pim-form').length) {
            clearInterval(checkForm);
            let productsForm = $('#pim-form');
            productsForm.parents('.formcontainer').hide();
            productsForm.find('.o-form-container__element .o-form-container__buttons .btn[type="submit"]')[0].click();
        }  
        
        if ( $('#coupon-form') && $('#coupon-form').length) {
            clearInterval(checkForm);
            let couponCode = getUrlParameter('id');
            if(couponCode) {
                let productsForm = $('#coupon-form');
                productsForm.parents('.formcontainer').hide();
                $('#coupon-page').css('display', 'block');
                $('#wrong-coupon').hide();
                productsForm.find('.o-form-container__element .o-form-container__buttons .btn[type="submit"]')[0].click();
            } 
            else {
                $('#wrong-coupon').show();
            }
        }
    }, 100);
});