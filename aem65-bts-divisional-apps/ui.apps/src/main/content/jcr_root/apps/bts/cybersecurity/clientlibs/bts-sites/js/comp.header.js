/**
 * @module
 * @desc App Header Module
 */

(function(){

    document.addEventListener('DOMContentLoaded', function() {
        // selctor for hamburger icon and header menu
        const $hamburger = document.querySelector('.postlogin-header .hamburger-button');
        const $headerMenu = document.querySelector('.postlogin-header .header-menu');
        // selctor for header shadow
        const $mobileOverlay = document.querySelector('.header-shadow');
        
        //header links
        const $headerNavLinks = $('.o-header .o-header__sticky-section .header-menu .a-link__text, .header .o-header-v2-global__section .megamenu .navbar .a-link .a-link__text');

        //Notification link
        const $notificationLink = $(document).find('.header #notifications-counter');

        /**
         * @method
         * @desc toggle mobile menu by adding class on header 
         */
        function toggleMenu() {
            $headerMenu.classList.toggle("show-mobile-menu");
            $hamburger.classList.toggle("close-hamburger");
            $mobileOverlay.classList.toggle('show');
        }

        /**
         * @function
         * @desc sets user name in header
         */
        function setUserName() {
            const userName = ABT.Utils.getUser('name');

            // do nothing for not logged-in user
            if(!userName) {
                return;
            }

            //get user name selector
            const $name = document.querySelector('.header .o-header-v2-global__section--utility-bottom .m-link-stack__link .a-link__text');
            const $icon = $name ? $name.querySelector('em') : '';
            
            if($name) {
                $name.innerHTML = '';
                $name.appendChild($icon);
                $name.appendChild(document.createTextNode(userName));
            }
        }
        
        /**
         * @method
         * @desc add active class to header links based on page url 
         */
        function activateHeaderLinks() {
          const path = location.pathname.toLowerCase();

          $headerNavLinks.each(function(_, navLink) {
            let navLinkAttr = $(navLink).attr('href');
            if (navLinkAttr && navLinkAttr.search(path) > -1 && path !== '/') {
              $(navLink).addClass('is-active');
            }
          });
        }

        /**
         * @method
         * @desc API call to fetch notifications count when sessionstorage value is already present
         */
        function fetchNotificationCount() {
          const counterSessionValue = sessionStorage.getItem('notifications-count');

          // If session value is already present, display that instead of making API call to fech the count
          if (counterSessionValue && window.location.href.indexOf('notifications') == -1) {
            ABT.Utils.displayNotificationCounter(counterSessionValue, $notificationLink.parent());
            return;
          }

          ABT.Http({
            url: ABT.Config.endpoints.USER_NOTIFICATIONS,
            method: 'POST',
            headers: {
              'x-id-token': ABT.Utils.getUser('token')
            },
            params: {
              action: "getUnreadNotificationCount"
            }
          }).then(function(data) {
            if (data.errorCode == 0 && data.response && data.response.unreadNotificationCount) {
              sessionStorage.setItem('notifications-count', data.response.unreadNotificationCount);
              ABT.Utils.displayNotificationCounter(data.response.unreadNotificationCount, $notificationLink.parent());
            }
          });
        }
            
        /**
         * @method
         * @desc initiate js and attach eventlisteners to selector 
         */
        function init() {
            $hamburger && $hamburger.addEventListener('click', toggleMenu);
            activateHeaderLinks();

            // dont execute below lines for pre-login pages
            if(!ABT.Utils.getUser()) {
                return;
            }

            setUserName();
            $notificationLink.length && fetchNotificationCount();
        }

        init();
    });
})();
