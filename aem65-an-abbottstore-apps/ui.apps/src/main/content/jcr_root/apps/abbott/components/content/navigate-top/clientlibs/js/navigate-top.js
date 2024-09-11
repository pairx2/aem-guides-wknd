(function(ABBOTT) {
    ABBOTT.navigateTop = (function() {});

      jQuery(document).ready( function() {
        jQuery(function() {
            var $scrollTop = jQuery('#scroll-top');
            var scrollVal = 30;
            
            /**
             * @function
             * @description Toggle class active on Scroll.
             */
            function toggleActive() {
              if (document.body.scrollTop > scrollVal || document.documentElement.scrollTop > scrollVal) {
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
              jQuery('html, body').animate({ scrollTop: '0' }, 1000 );
            }
      
            // Bind Events
            jQuery(window).on('scroll', toggleActive);
            $scrollTop.on('click', scrollToTop);
          });
      });
  })(window.ABBOTT || (window.ABBOTT = {}));
  