(function(ABBOTT) {
  ABBOTT.header = (function() {
    jQuery(function() {
      var $scrollTop = jQuery('#scroll-top');

      /**
       * @function
       * @description Toggle class active on Scroll.
       */
      function toggleActive() {
        if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
          $scrollTop.addClass('active');
        } else {
          $scrollTop.removeClass('active');
        }
      }

      /**
       * @function
       * @description Scroll To the Top on Click
       */
      function scrollToTop() {
        jQuery("html, body").animate({ scrollTop: '0' }, '1000');
      }

      /**
       * @function
       * @desc show message set by magento in cookie
       */
      function showMagentoMessage() {
        jQuery.cookie.json = true;
        var data = jQuery.cookie('abt_msg');
        var $message =  jQuery('#app-message');
        var icons = {
          success: 'ai-check-alt',
          error: 'ai-warning'
        };

        if(!data) {
          return;
        }

        $message
          .addClass(data.type)
          .html("<i class=" + icons[data.type] + "></i> " + data.message);
        jQuery.removeCookie('abt_msg', {path: '/', domain: ABBOTT.utils.storeDomain});
      }

      // Remove NOSCRIPT tag message in browser if cookie is enabled
      if(ABBOTT.utils.isCookieEnabled) {
        jQuery('#cookie-disabled-message').remove();
      }

      // Bind Events
      $scrollTop.on('click', scrollToTop);
      jQuery(window).on('scroll', toggleActive);

      // Below code will run only in AEM pages
      if(jQuery(document.body).is('.as-variation, .gs-variation, .ss-variation')) {
        
        // Set last page reference in cookie (for magento to redirect after login/register)
        jQuery.cookie.json = false;
        jQuery.cookie('redirectUrl', location.href, {path: '/', domain: ABBOTT.utils.storeDomain, secure: true});
        
        // Show App level magento messages
        showMagentoMessage();
      }
    });
  })();
})(window.ABBOTT || (window.ABBOTT = {}));
