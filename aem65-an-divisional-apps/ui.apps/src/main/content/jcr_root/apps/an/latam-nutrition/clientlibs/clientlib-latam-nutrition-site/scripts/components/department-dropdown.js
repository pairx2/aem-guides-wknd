$(window).on('load',function () {
    if ( $('#dept-city') && $('#dept-city').length) {
        let deptForm = $('#dept-city');
        deptForm.parents('.formcontainer').hide();
        deptForm.find('.o-form-container__element .o-form-container__buttons .btn[type="submit"]')[0].click();
    }
});