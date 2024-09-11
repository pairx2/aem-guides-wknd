/**
 * Contact Form
 **/

$(document).ready(function () {
    $('#state-options .a-input-field--text-require').prepend('<em class="abt-icon abt-icon-exclamation"></em>');
	$('#sel-sub-options .a-input-field--text-require').prepend('<em class="abt-icon abt-icon-exclamation"></em>');
    
    let contactForm = $("#an-form-contactus");
    let contactBanner = $("#an-contactus-banner");

    if (contactForm.length > 0) {
        $('.o-form-container__main-form .a-input-label').addClass('sr-only');

        $("#zipcode").mask('00000');


        $("#phonenumber").mask('(999)999-9999');


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
    //to enable submit button to display error messages
    setTimeout(() => { $('#form-container_submit').attr('disabled', false); }, 100);

    // to reset dropdowns on click of reset button
    let subjectPlaceholderText = $('#sel-sub-options').find('.a-dropdown__placeholder').text().trim();
    let statePlaceholderText = $('#state-options').find('.a-dropdown__placeholder').text().trim();
    $('#form-container_reset').on('click', () => {
        setTimeout(() => {
            $('#sel-sub-options').find('.a-dropdown-selected').text(subjectPlaceholderText);
            $('#sel-sub-options').find('.a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder');

            $('#state-options').find('.a-dropdown-selected').text(statePlaceholderText);
            $('#state-options').find('.a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder');
        }, 0);

    //to enable submit button to display error messages
    setTimeout(() => { $('#form-container_submit').attr('disabled', false); }, 100);
    });
});
