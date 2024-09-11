(function(ABBOTT) {
    ABBOTT.contactForm = (function() {
        // Captcha value to be modified from outside, must be in an Object
        var captcha = {
            isVerified: false

        };


        jQuery(function() {
            var $form = jQuery('#contact-form');

            /**
             * @function
             * @desc even handler for form submit
             * @param {*} e 
             */
            function submitContactForm(e) {
                e.preventDefault();
                var currentPage = jQuery('#currentPage').val();
                var msgSource = jQuery('#msgSource').val();
                var frhForm = jQuery('#frhForm').val();
                var storeName = jQuery('#storeName').val();
                var email = jQuery('#email').val();
                var veryfyEmail = jQuery('#veryfy-email').val();
                var firstName = jQuery('#first-name').val();
                var lastName = jQuery('#last-name').val();
                var streetAddress = jQuery('#streetAddress').val();
                var addressLineTwo = jQuery('#addressLine2').val();
                var city = jQuery('#city').val();
                var state = jQuery('#state').val();
                var country = jQuery('#country').val();
                var zipCode = jQuery('#zipCode').val();
                var phone = jQuery('#phone').val();
                var subject = jQuery('#subject').val();
                var orderRef = jQuery('#orderRef').val();
                var query = jQuery('#query').val();
                if (ABBOTT.validate.form($form) && jQuery('#g-recaptcha-response').val() != "") {
                    jQuery.ajax({
                        type: "POST",
                        async: false,
                        url: "/bin/verifyRecaptcha",
                        data: {
                            //This will tell the form if user is captcha varified.
                            'currentPage': currentPage,
                            'g-recaptcha-response': jQuery('#g-recaptcha-response').val(),
                            'msgSource': msgSource,
                            'frhForm': frhForm,
                            'storeName': storeName,
                            'email': email,
                            'veryfyEmail': veryfyEmail,
                            'firstName': firstName,
                            'lastName': lastName,
                            'streetAddress': streetAddress,
                            'addressLineTwo': addressLineTwo,
                            'city': city,
                            'state': state,
                            'country': country,
                            'zipCode': zipCode,
                            'phone': phone,
                            'subject': subject,
                            'orderRef': orderRef,
                            'query': query,

                        },
                        success: function(data) {
                            console.log(data);
                            if (data.url != null && data.url.length > 0) {
                                console.log(data.url);
                                console.log("submit");
                                window.location.href = data.url;
                            }

                            if (data.status == "failure") {
                                console.log("not submit");
                                // Toggle captcha error
                                jQuery('#captchaHelp').toggleClass('d-none', captcha.isVerified);
                                return false;
                            }
                        }
                    });
                } else {
                    jQuery('#g-recaptcha-response').val() == "" ? jQuery('#captchaHelp').toggleClass('d-none', false)  : jQuery('#captchaHelp').toggleClass('d-none', true);

                    if (!ABBOTT.validate.form($form) || !captcha.isVerified) {
                        e.preventDefault();
                        $form.find(".is-invalid:first").focus();

                    }
                }
                // If not valid, return;

            }

            // Event Binding on form
            $form.on("submit", submitContactForm);
        });

        // Exposed assets
        return {
            captcha: captcha
        }
    })();
})(window.ABBOTT || (window.ABBOTT = {}));

/**
 * @function
 * @desc Google Captcha On Load Handler to init it.
 *       Note: This needs to be in window scope to make it work
 */
function onGoogleCaptchaLoad() {
    grecaptcha.render('captcha', {
        'sitekey': ABBOTT.config.getKey('googleCaptcha'),
        'callback': function verifyCallback() {
            ABBOTT.contactForm.captcha.isVerified = true;
			if(jQuery('#g-recaptcha-response').val() != "" && !jQuery('#captchaHelp').hasClass('d-none')){
            jQuery('#captchaHelp').toggleClass('d-none', true)
            }
        },
        'theme': 'light'
    });
}