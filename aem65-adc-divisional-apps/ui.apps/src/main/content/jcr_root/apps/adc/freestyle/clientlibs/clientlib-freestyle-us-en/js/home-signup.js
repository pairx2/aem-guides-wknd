$(function () {
    const elem = window.location?.hash !== '' ? $("#" + window.location.hash.replace("#", "")) : '';
    let alertHeight = 0;
    $('#extfsllookup .a-date-picker--single .a-input-control').on('keyup', function(e){
        if(e.currentTarget.value.length === 10) {
            const currentThis = $(this);
            const dateString = currentThis.val();
            const dateFormat = currentThis.closest(".a-date-picker--single").attr('data-date-format');
            validateDatePicker(e,false, dateString, dateFormat, 18);
        }
    });

    if($('.m-alert--wrapper').length > 0) {
        alertHeight = $('.m-alert--wrapper').height();
    }
    if(elem.length > 0) {
         $([document.documentElement, document.body]).animate({
        scrollTop: elem.offset().top - ($('.o-header__sticky-section').height() + alertHeight)
    }, 1000);
    }

});
