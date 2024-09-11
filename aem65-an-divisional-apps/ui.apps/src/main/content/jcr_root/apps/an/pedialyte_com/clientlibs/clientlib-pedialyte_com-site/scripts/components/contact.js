/**
 * Contact Form
 **/

 $(function () {
    let contactForm = $(".a-container-pedialyte-contact-us");
    if (contactForm.length > 0) {
        $("#phonenumber").mask('(999) 999-9999');
        /*email and verify email validation*/
        $("#personalemail").on('keyup', function () {
            if ($(this).val() != $("#varpersonalemail").val() && $("#varpersonalemail").val() != '') {
                setTimeout(function () {
                    $("#varpersonalemail").css('border','1px solid red');
                }, 500);
            } else if ($(this).val() == $("#varpersonalemail").val()) {
                $("#varpersonalemail").css('border','1px solid white');
            }
        })

        /*verify email validation*/
        $("#varpersonalemail").on('blur', function () {
            if ($(this).val() != $("#personalemail").val()) {
                setTimeout(function () {
                    $("#varpersonalemail").css('border','1px solid red');
                }, 500);
            } else if ($(this).val() == $("#personalemail").val()) {
                $("#varpersonalemail").css('border','1px solid white');
            }
        })
    }

    // to reset dropdowns on click of reset button
    let subjectPlaceholderText;
    let statePlaceholderText;
    setTimeout(() => {
        subjectPlaceholderText = $('.contactus-subject .a-dropdown-selected').text().trim();
        statePlaceholderText = $('.contactus-state .a-dropdown-selected').text().trim();
    },100);
    $('.a-container-pedialyte-contact-us button[type="reset"]').on('click', () => {
        setTimeout(() => {
            $('.contactus-subject').find('.a-dropdown-selected').text(subjectPlaceholderText);
            $('.contactus-state').find('.a-dropdown-selected').text(statePlaceholderText);
        }, 0);
    });
});
