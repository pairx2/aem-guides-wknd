(function(SIMILAC) {
    SIMILAC.header = (function() {
        jQuery(document).ready(function() {
            var $similacCart = jQuery('.similac-header__cart');
            var $similacCartMob = jQuery('.similac-header--mobile__cart');

            function toggleCartPopup(e) {
                e.stopPropagation();
                $similacCart.find('.cart-popup__wrapper').toggleClass('active');
                $similacCartMob.find('.cart-popup__wrapper').toggleClass('active');
            }
          
            /**
             * @function
             * @description Close Minicart when clicked outside and Close Button
             * @param {event_object} e 
             */
            function closeMinicart(e) {
                var $target = jQuery(e.target);

                if (!$target.is('.cart-popup__wrapper') && !$target.isChildOf('.cart-popup__wrapper')) {
                    $similacCart.find('.cart-popup__wrapper').removeClass('active');
                    $similacCartMob.find('.cart-popup__wrapper').removeClass('active');
                }
            }

            

            // Event Binding
            $similacCart.on('click', '.cart-popup-trigger, .cart-popup-close', toggleCartPopup);
            $similacCartMob.on('click', '.cart-popup-trigger, .cart-popup-close', toggleCartPopup);
            jQuery(document).click(closeMinicart);
        });
    })();
})(window.SIMILAC || (window.SIMILAC = {}));
  