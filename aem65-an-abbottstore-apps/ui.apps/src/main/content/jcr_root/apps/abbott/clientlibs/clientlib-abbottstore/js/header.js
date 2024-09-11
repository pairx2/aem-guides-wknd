(function (ABBOTT) {
  ABBOTT.common = (function () {
    // JS Utils
    jQuery(document).ready(function () {
      var $window = jQuery(window);
      var $menuContainer = jQuery('#abbott-main-nav');
      var $miniCartBtn = jQuery('#abbott-mini-cart-trigger');
      var $miniCart = jQuery('#mini-cart__comp');
      var $abbottStoreHeader = jQuery('.header');
      var $footerContainer = $('.footer-mobile-view');




      /**
       * @function
       * @desc Toggle Mobile Menu on Hamburger icon
       * @param {event_object} hamburger click event object
       */
      function showMobileMenu(e) {
        e.preventDefault();

        jQuery('body').addClass('has-active-menu');
      }

      /**
       * @function
       * @desc Hides mobile menu when clicked outside (mobile overylay)
       * @param {event_object} overlay click event object
       */
      function hideMobileMenu(e) {
        jQuery('body').removeClass('has-active-menu');
      }

      /**
       * @function
       * @desc Switches mobile menu tabs (Menu/Account)
       * @param {event_object} current-tab click event object
       */
      function switchMobileTab(e) {
        var $elm = jQuery(this);
        var index = $elm.index();

        $elm.addClass('active').siblings().removeClass('active');
        $menuContainer
          .find('.abbott-mobile-menu-tab__content').eq(index).addClass('active')
          .siblings('.abbott-mobile-menu-tab__content').removeClass('active')
          .end()
          .find('.abbott-nav__item').removeClass('active-mobile');
      }

      /**
       * @function
       * @desc toggles mobile menu items (Shop by Brand/ Shop by Need) submenu items
       * @param {event_object} current-menu item click event object
       */
      function toggleMobileSubmenu(e) {
        var $menuItem = jQuery(this).parent();

        // Toggle current submenu & Collapse other submenus
        $menuItem
          .toggleClass('active-mobile')
          .siblings().removeClass('active-mobile');
      }


      function toggleFooterMenu(e) {
        var _element = jQuery($(this));

        _element.next().toggleClass('footerItemShow');
        _element.parent().parent().next().find('ul').toggleClass('footerItemShow');

        if (_element.next().hasClass("footerItemShow")) {
          _element.find('em').removeClass('ai-caret-down').addClass('ai-caret-top');
        } else {
          _element.find('em').removeClass('ai-caret-top').addClass('ai-caret-down');
        }
      }



      function toggleMiniCart(e) {
        e.preventDefault();
        e.stopPropagation();
        jQuery('#mini-cart__comp').toggleClass('active');
      }

      /**
       * @function
       * @desc initlizes header component. based on user logged-in state, updates topbar links
       */
      function init() {

        // Set menu width in mobile
        if (matchMedia('(max-width: 500px)').matches) {
          jQuery('#abbott-main-nav').width($window.width() - 54);
        }

        /**
         * @function
         * @description Close Minicart when clicked outside and Close Button
         * @param {event_object} e 
         */
        function closeMinicart(e) {
          var $target = jQuery(e.target);

          if (!$target.is('#mini-cart__comp') && !$target.isChildOf('#mini-cart__comp')) {
            $miniCart.removeClass('active');
          }
        }


        // Event Binding
        jQuery('#abbott-hamburger').on('click', showMobileMenu);
        jQuery('#close-icon').on('click', hideMobileMenu);
        $miniCartBtn.on('click', toggleMiniCart);
        $miniCart.on('click', '#abbott-minicart-close', toggleMiniCart);
        jQuery(document).click(closeMinicart);

        $footerContainer.on('click', '.list-comp__title', toggleFooterMenu);

        $menuContainer
          .on('click', '.abbott-mobile-menu-tab__item', switchMobileTab)
          .on('click', '.abbott-nav__text', toggleMobileSubmenu);
      }

      init();
      /**
       * @function
       * @desc event handler for header to be fixed when document is scrolled
       */
      function _onScroll() {
        var $element = $abbottStoreHeader.find(".is-sticky")
        $element.eq(0).toggleClass("fixed-top", $window.scrollTop() > 40);
      }
      $window.on("scroll", _onScroll);
    });
    return {};
  })();
})(window.ABBOTT || (window.ABBOTT = {}));