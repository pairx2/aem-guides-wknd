(function(ABBOTT) {
    ABBOTT.login = (function() {
      jQuery(function() {
        var $loginModal = jQuery('#login-modal');
        var $form = $loginModal.find('form');
        var $loginLink = jQuery('#login-popup-trigger');
        var $logoutLink = jQuery('#logout-link');
        var $accountLink = jQuery('#account-link');
        var $similacHeaderMobile = jQuery('.similac-header--mobile');
        var $similacRegisterMobile = jQuery('#ss-register-mobile');
        var $abbottMenuContainer = jQuery('#abbott-main-nav');
        var windowWidth = 0;
  
        /**
         * @function
         * @dec Opens up Login Popup
         * @param {event_object} e Event Object
         */
        function openPopup(e) {
          e.preventDefault();
          e.stopPropagation();
          $loginModal.toggleClass('d-none');
          jQuery(this).toggleClass('active');
        }

        /**
         * @function
         * @desc Closes popup on click of anywhere outside of the popup
         * @param {event_object} e
         */
        function closePopOnOutsideClick(e) {
          var container = jQuery("#login-modal");
              // if the target of the click isn't the container nor a descendant of the container
              if (!container.is(e.target) && container.has(e.target).length === 0 && !container.hasClass('d-none'))
              {
                  $loginModal.addClass('d-none');
                  $loginLink.removeClass('active');
              }
        }

        /**
         * @function
         * @desc Validate login form on submit
         * @param {event_object} e
         */
        function initLogin(e) {
          if(!ABBOTT.validate.form($form)){
            e.preventDefault();
            return;
          }
        }

        /**
         * @function
         * @desc sets UI for logged-in users
         */
        function setLoginStateUI() {
          // If not logged in, do nothing
          if(!ABBOTT.utils.isUserLoggedIn()) {
            return;
          }

          // Generic changes
          // Hide items
          $loginLink.addClass('d-none');
          jQuery('#header-register-link')
            .addClass('d-none')
            .removeClass('d-md-inline-block');

          // Specifc to Abbottstore and Similacstore
          if( !ABBOTT.utils.isGlucerna) {
            $logoutLink.removeClass('d-none');
          }

          // AbbottStore specific changes
          if(ABBOTT.utils.isAbbottStore) {
            $accountLink.removeClass('d-none');
            jQuery('#header-user-name')
              .removeClass('d-none')
              .find('span.name')
              .text(ABBOTT.utils.getSessionInfo().fname + '!');
            $abbottMenuContainer
              .find('.is-logged-in').removeClass('d-none')
              .siblings('.is-anonymous').remove();
          }

          // Specific to Similac and Glucernastore
          if(!ABBOTT.utils.isAbbottStore) {
            const accountUrl = ABBOTT.config.getEndpointUrl('BASE') + '/customer/account';
            var iconClass = (ABBOTT.utils.isSimilac) ? 'ai-user' : 'ai-user-alt';
            var userIcon = '<i class="' + iconClass + '"></i><span class="name">' + ABBOTT.utils.getSessionInfo().fname + '!</span>';
            var userLink = jQuery('<a></a>', {href: accountUrl, html: userIcon});

            jQuery('#header-user-name')
                .removeClass('d-none')
                .find('span.name')
                .replaceWith(userLink);
          }

          // Similac Store Specific changes
          if(ABBOTT.utils.isSimilac) {
            $similacRegisterMobile.addClass('d-none');
            $similacHeaderMobile.addClass('user-logged');
            jQuery('#ss-login-mobile').css('width', '100%');
            jQuery('#ss-login-desktop').css('width', '100%');
          }
        }

        /**
         * @function
         * @desc SimilacStore - remove one of 2 login component to avoid HTML ID clash
         */
        function positionSimilacLoginComponent() {

          // Return for other stores
          if (!ABBOTT.utils.isSimilac) {
            return;
          }

          var $loginDesktop, $loginMobile, $loginComponent;

          if(windowWidth !== jQuery(this).width()) {
            $loginDesktop = jQuery('#ss-login-desktop');
            $loginMobile = jQuery('#ss-login-mobile');
            $loginComponent = $loginDesktop.find('.login');

            // Check if login-component not found in desktop div, get this from mobile div
            if (!$loginComponent.length) {
              $loginComponent = $loginMobile.find('.login');
            }

            //
            if (matchMedia('(max-width: 767px)').matches) {
              $loginComponent.appendTo($loginMobile);
            } else {
              $loginComponent.appendTo($loginDesktop);
            }
          }

          windowWidth = jQuery(this).width();
        }

        /**
         * @function
         * @desc Fetch Session Key on App Load and setCookie for anonymous users
         */
        function createMagentoSession() {
          // do nothing ig user is logged in as it required for login only
          if(ABBOTT.utils.isUserLoggedIn()) {
          var form_key_value = jQuery.cookie("form_key");
              if (jQuery('#login-form-key').is(':empty')){
                jQuery("#login-form-key").val(form_key_value);
              }
            return;
          }

          // Hit Magento base to get the  document HTML
          jQuery.ajax({
              url : ABBOTT.config.getEndpointUrl('BASE') + '/customer/account/login',
              xhrFields: {
                  withCredentials: true
              }
              }).done(function(res) {
            // need to loop it as multiple form_key fields are present in magento page
            // 1st is set by AEM in headers, 2nd one is set by Magento (which we need)

            jQuery(res).find('[name=form_key]').each(function () {
              var formKey = jQuery(this).val();
              var cookieConfig = {
                path: '/',
                domain: ABBOTT.utils.storeDomain,
                secure: true,
                expires: 1 / 12 // set it for 1 hour
              };

              if (formKey) {
                jQuery("#login-form-key").val(formKey);
                jQuery.cookie.json = false;
                if(!location.href.match(/secure/gi)) {
                  jQuery.cookie('form_key', formKey, cookieConfig);
                }
                return false;
              }else{
                console.log("Inside else login formKey condition");
              }
            });
          });
        }

        // Get magento session form key
        createMagentoSession();

        // triggering this function is important for initial setup in mobile
        positionSimilacLoginComponent();

        // Logged in user interface changes
        setLoginStateUI();

        // Bind Events
        $form.on('submit', initLogin);
        //login popup for similac & glucernastore
        if(!ABBOTT.utils.isAbbottStore){
            $loginLink.click(openPopup);

        jQuery(document).click(closePopOnOutsideClick);}
        jQuery(window).on('resize', positionSimilacLoginComponent);

        // Handle Orientation Change Event
        window.addEventListener("orientationchange", positionSimilacLoginComponent, false);

      });
    })();
  })(window.ABBOTT || (window.ABBOTT = {}));

 /**
 * @function
 * @desc Login Google Captcha On Load Handler to init it.
 *       Note: This needs to be in window scope to make it work
 */
$(document).ready(function(){
// google recaptcha code
  grecaptcha.enterprise.ready(function() {
        var loginRecaptchaSiteKey = jQuery("#login-recaptcha-key").data('value');
        // do request for recaptcha token
            grecaptcha.enterprise.execute(loginRecaptchaSiteKey, {action: 'submit'})
                      .then(function(loginRecaptchaToken) {
                // add token value to form
				if (loginRecaptchaToken != null && loginRecaptchaToken.length > 0) {
					verifyRecaptcha(loginRecaptchaToken);
                 }else {
					jQuery('#loginRecaptchaHelp').removeClass('d-none');
                	$('.login-modal__btn'). prop('disabled', true);
                 }
            });
    });

  function verifyRecaptcha(loginRecaptchaToken){
    jQuery.ajax({
        type: "POST",
        async: false,
        url: jQuery("#aem-base-url").val()+"/bin/verify/loginRecaptcha",
        data: {
            //This will tell the form if user is captcha varified.
            'loginRecaptchaToken': loginRecaptchaToken,
        },
        success: function(data) {
            console.log("login captcha status: "+ data.status);
            if (data.status == "success") {
                console.log("login captcha verified");
                document.getElementById('is_aem_login_user_key').value = data.captcha_secret;
            }

            if (data.status == "failure") {
                // Toggle captcha error
                jQuery('#loginRecaptchaHelp').removeClass('d-none');
                $('.login-modal__btn'). prop('disabled', true);

            }
        }
    });
}

});