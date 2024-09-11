/**
 * Contact Form
 **/

 function validatePhoneNumber(){
    document.getElementById('phonenumber').addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        let endNumVal = x[3] ? '-' + x[3] : '';
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ')' + x[2] + endNumVal;
    });
}

function validateEmail(){
    /*email and verify email validation*/
    $("#personalemail").on('keyup', function () {
        if ($(this).val() != $("#varpersonalemail").val() && $("#varpersonalemail").val() != '') {
            setTimeout(function () {
                $("#varpersonalemail").parent().parent().addClass('validation-error');
            }, 500);
        } else if ($(this).val() == $("#varpersonalemail").val()) {
            $("#varpersonalemail").parent().parent().removeClass('validation-error');
        }
    })

    /*verify email validation*/
    $("#varpersonalemail").on('blur', function () {
        if ($(this).val() != $("#personalemail").val()) {
            setTimeout(function () {
                $("#varpersonalemail").parent().parent().addClass('validation-error');
            }, 500);
        }
    })
}

 $(document).ready(function () {
    let contactForm = $("#an-form-contactus");
    let contactBanner = $("#an-contactus-banner");

    if (contactForm.length > 0) {
        $('.o-form-container__main-form .a-input-label').addClass('sr-only');
        document.getElementById('zipcode').addEventListener('input', function (e) {
            if (e.target.value.length > 5 ) {
                e.target.value = e.target.value.substr(0, 5);
            }
        });
        validatePhoneNumber();
     validateEmail();
        
    }

    if (contactBanner.length > 0) {
        $('.m-hero:has(#an-contactus-banner)').addClass('Dup-m-hero');
    }
    //to close the dropdowns on window scroll in contact us form
    $(window).on('scroll', function (e) {
        let conatctusform = $(document).find('#an-form-contactus')
        if (conatctusform.length > 0) {
            if (conatctusform.find('.a-dropdown__field').hasClass("active")) {
                conatctusform.find('.a-dropdown__field').removeClass('active');
            }
        }
    });

    //to clear error and required field messages on reset of form
    $('body').on('click', '#form-container_reset', function () {
        let conatctusform = $(document).find('#an-form-contactus')
        if (conatctusform.length > 0) {
            $(".form-container .form-group").removeClass("validation-error");
            $(".form-container .form-group").removeClass("validation-require");
        }
    });
});