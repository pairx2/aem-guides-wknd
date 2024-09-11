$(document).ready(function () {


    $(document).on('change keyup', '.a-container--contact-us .a-input-control', function (e) {
        let isEmpty = true;
        $(".a-container--contact-us .a-input-control").each(function () {
            let value = this.value;
            let isErrorCameText = $(".a-container--contact-us").find(".form-group").hasClass("validation-error");

            if (((value) && (value.trim() != '')) && (!isErrorCameText)) {
                isEmpty = false;
            } else {
                isEmpty = true;
                return false;
            }
        })

        if (isEmpty) {
            $(".a-container--contact-us .a-button--contact-us-hide .btn").addClass("emsure-contactus-disablebtn").parent().removeClass("o-color-bg-yellow o-color-white"); //.css({"pointer-events":"none", "background-color":"gray"})
        } else {
            $(".a-container--contact-us .a-button--contact-us-hide .btn").removeClass("emsure-contactus-disablebtn").parent().addClass("o-color-bg-yellow o-color-white"); //.css({"pointer-events":"auto", "background-color":"yellow"})
        }
    })
    $(".a-container--contact-us .a-button--contact-us-hide .btn").addClass("emsure-contactus-disablebtn").parent().removeClass("o-color-bg-yellow o-color-white"); //.css({"pointer-events":"none", "background-color":"gray"})

    $('.a-button--service').on('click', function () {
        $('.embeddedServiceIcon').trigger('click');
    });

})