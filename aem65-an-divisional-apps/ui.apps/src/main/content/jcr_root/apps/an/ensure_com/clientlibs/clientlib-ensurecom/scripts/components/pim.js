$(document).ready(function () {
    let checkForm = setInterval(function() {
        if ( $('#pim-form') && $('#pim-form').length) {
            clearInterval(checkForm);
            let productsForm = $('#pim-form');
            productsForm.parents('.formcontainer').hide();
            productsForm.find('.o-form-container__element .o-form-container__buttons .btn[type="submit"]')[0].click();
        } 
    }, 100); 
});