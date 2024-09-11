(function (ABBOTT) {
    ABBOTT.utils = (function () {
        var $body = jQuery('body');

        // jQuery Utils
        jQuery(function () {
            var $window = jQuery(window);

            jQuery.fn.isChildOf = function (element) {
                return jQuery(element).has(this).length > 0;
            }

            /**
             * @event handling - Window resize
             * @desc when developerTools is opened, show message to developers
             */
            function showDeveloperMessage() {
                var storeName = ABBOTT.utils.storeName;
                var devMessage = 'This is a browser feature intended for developers. If someone told you to copy-paste something here to enable some {{storeName}} feature or "hack" someone\'s account, it is a scam and will give them access to your {{storeName}} account.';
                
                storeName = storeName[0].toUpperCase() + storeName.slice(1);
                devMessage = devMessage.replace(/{{storeName}}/gi, storeName);

                if ((window.outerHeight - window.innerHeight) > 100) {
                    //console.clear();
                    console.log('%cStop!', 'color: red; font: bold 5em Arial');
                    console.log('%c' + devMessage, 'font: 1.5em Arial');

                    $window.off('resize.dev');
                }
            }

            $window.on('resize.dev', showDeveloperMessage);
        });

        
        

        /**
         * @function
         * @desc detects if device is mobile or handheld
         * @return {boolean} device is handheld
         */
        function isMobile() {
            return !!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i);
        }

        /**
         * @function
         * @desc detects if current store is AbbottStore.com
         * @return {boolean} current store is AbbottStore
         */
        function isAbbottStore() {
            return $body.hasClass('as-variation') || location.origin.indexOf('abbottstore.com') !== -1;
        }

        /**
         * @function
         * @desc detects if current store is GlucernaStore.com
         * @return {boolean} current store is GlucernaStore
         */
        function isGlucerna() {
            return $body.hasClass('gs-variation') || location.origin.indexOf('glucernastore.com') !== -1;
        }

        /**
         * @function
         * @desc detects if current store is SimilacStore.com
         * @return {boolean} current store is SimilacStore
         */
        function isSimilac() {
            return $body.hasClass('ss-variation') || location.origin.indexOf('similacstore.com') !== -1;
        }

        /**
         * @function
         * @desc identifies store name
         * @return {String} store name
         */
        function getStoreName() {
            var storeName = '';

            if (isAbbottStore()) {
                storeName = 'abbott';
            } else if (isGlucerna()) {
                storeName = 'glucerna';
            } else if (isSimilac()) {
                storeName = 'similac';
            }

            return storeName;
        }

        /**
         * @function
         * @desc finds if user is logged-in
         * @return {Boolean} user logged-in state
         */
        function isUserLoggedIn() {
            return !!getSessionToken();
        }

        /**
         * @function
         * @desc removes all line-breaks and convert multiple whitespaces to one from the GrahQL query string
         * @param {String} query graphQL query input
         * @return {String} formated graphQL query
         */
        function formatGraphQLQuery(query) {
            query = query.replace(/\n/g, '');
            query = query.replace(/  +/g, ' ');

            //
            return query;
        }

        /**
         * @function
         * @desc finds out what is the domain name for current store to set the cookie base
         * @return {String} current store's domain name
         */
        function getStoreDomain() {
            var domainMap = {
                abbott: 'abbottstore.com',
                glucerna: 'glucernastore.com',
                similac: 'similacstore.com'
            };

            return domainMap[getStoreName()];
        }

        /**
         * @function
         * @desc Calculates product price based on pricing rules
         * @param {Object} product product details object
         * @return {String} price with 2 precisions
         */
        function getProductPrice(product) {
            var customerGroup = getCustomerGroup(true);
            var price;
            if (customerGroup) {
                // Look for matching customer group in the tier price list
                product.tier_prices.map(function (priceGroup) {
                    if (priceGroup.customer_group_id === customerGroup && priceGroup.qty == 1) {
                        price = priceGroup.value;
                    }
                });
            }

            // If price or customerGroup not found yet, apply other price rules 
            price = price || product.special_price || product.price;

            return price.toFixed(2);
        }

        /**
         * @function
         * @desc finds out customer group from cookies
         * @param {Boolean} decoded if returned value has to be decoded
         * @return {String} customer group ID
         */
        function getCustomerGroup(decoded) {
            var sessionInfo = getSessionInfo();
            var customerGroup = '';

            if (sessionInfo && sessionInfo.cgroup) {
                customerGroup = sessionInfo.cgroup;

                if (decoded && isNaN(customerGroup)) {
                    customerGroup = atob(customerGroup);
                }
            }

            return customerGroup;
        }

        /**
         * @function
         * @desc finds session token from cookie
         * @return {String} session token or empty string
         */
        function getSessionToken() {
            var sessionInfo = getSessionInfo();
            var token = '';

            if (sessionInfo && sessionInfo.token) {
                token = sessionInfo.token;
            }

            return token;
        }

        /**
         * @function
         * @desc delays function call when fired consistently on key events
         * @param {Function} callback function to be executed after the delay
         * @param {Number} ms delay time for the function execution
         * @return {Function} delayed function execution wrapper
         */
        function delayEventTrack(callback, ms) {
            var timer = 0;
            return function () {
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    callback.apply(context, args);
                }, ms || 0);
            };
        }

        /**
         * @function
         * @desc finds out session user info from cookie
         * @return {Object} User session info
         */
        function getSessionInfo() {
            var sessionInfo = jQuery.cookie('abt_usr');

            if(typeof sessionInfo === 'string') {
                sessionInfo = JSON.parse(sessionInfo);
            }

            return sessionInfo;
        }

        /**
         * @function
         * @desc finds cart key from cookie
         * @return {String} session cart key or empty string
         */
        function getCartKey(name) {
            name = name || 'abt_cartKey';
            jQuery.cookie.json = false;

            return jQuery.cookie(name);
        }

        /**
         * @function
         * @desc sets similac button text based on UserLoggedIn status
         */
        function setSimilacButtonText() {
            var $loggedinText = jQuery('.subscribe-loggedin, .glucerna-header__marketing-banner-loggedin');
            var $loggedoutText = jQuery('.subscribe-loggedout, .glucerna-header__marketing-banner-loggedout');
            var $placeholderText = jQuery('.placeholder__glucerna-header__marketing-banner');
            var cookieVal = jQuery.cookie('abt_te');
    
            if (ABBOTT.utils.isUserLoggedIn() && cookieVal && cookieVal !== '0') {
              $placeholderText.remove();
              $loggedinText.removeClass('d-none');
              $loggedoutText.remove();
            } else {
              $placeholderText.remove();
              $loggedinText.remove();
              $loggedoutText.removeClass('d-none');
            }
        }

        /**
         * @function
         * @desc checks if cookie is enabled in browser
         * @return {Boolean} value if cookie is enabled in browser
         */
        function isCookieEnabled() {
            jQuery.cookie.json = false;
            jQuery.cookie('check', 1, {secure: true});

            if (jQuery.cookie('check')) {
                jQuery.removeCookie('check');
                return true;
            } else {
                return false;
            }
        }

        /**
         * @function
         * @desc Changes the Button to Adding state and back.
         * @return {Object} Button Element
         */
        function changeCartButtonState($btn) {
            var initalLabel = $btn.text();
        
            // change state to adding
            $btn.attr('disabled', 'disabled').text('ADDING...');
            // change state to inital after 2 seconds.
            var checkIfSliderOpen = setInterval(function() {
                if (jQuery('.abbott-minicart.active').length > 0) {
                    $btn.removeAttr('disabled').text(initalLabel);
                    clearInterval(checkIfSliderOpen);
                }
            },100);
        
        }

        /**
         * @function
         * @desc Finds Cart Limit for the user from cookie
         * @returns {object} Limit Details for the user.
         */
        function getLimit() {
            var limitCookieDetails = jQuery.cookie('abt_sgp');
            var limit;
            var limitMessage;

            if(typeof limitCookieDetails === 'string') {
                limitCookieDetails = JSON.parse(limitCookieDetails);
            }
            if(limitCookieDetails) {
            limit = limitCookieDetails.limit - limitCookieDetails.ordertotal;
            limitMessage = limitCookieDetails.message;
            }

            return {'limit' : limit,'message' : limitMessage};
        }

        /**
        * @function
        * @desc calculates lowest price in group, special and regular prices
        * @param {Number} groupPrice
        * @param {Number} specialPrice
        * @param {Number} regularPrice
        * @return {String} lowest price with 2 precision
        */
        function findLowestPrice(groupPrice, specialPrice, regularPrice) {
            var prices = [groupPrice, specialPrice, regularPrice];
            prices = prices.filter(function(p){
                return p !== null;
            });

            return Math.min.apply(null, prices).toFixed(2);
        }

        /**
         * @function
         * @desc event handler for Product Links. Pushesh GTM Data
         */
        function gtmNavigationHandler(sku,gtmData) {
            var data = gtmData.find(function(item) {
                return item.id === sku;
            });
            if(!data) {
                return;
            }
            delete data.list;
            ABBOTT.gtm.push({
                type: 'productClick',
                list: 'Featured Products',
                products: [data]
            });
        }

        /**
         * @function
         * @desc event handler for Add to Cart. Pushesh GTM Data
         */
        function gtmCartAddHandler(sku,gtmData) {
            var data = gtmData.find(function(item) {
                return item.id === sku;
            });
            if(!data) {
                return;
            }
            delete data.list;
            delete data.position;
            data.quantity = 1;
            ABBOTT.gtm.push({
                type: 'cartAdd',
                products: [data]
            });
        }

        /**
         * @function
         * @desc push information GTM DataLayer
         * @param {Array} productItems list of products
         */
        function pushGTM(productItems,gtmData) {
            var data = {
                type: 'impressions',
                products: productItems.map(function(item) {
                    var variants = [];

                    // Add variants
                    if (item.cases && item.cases !== 'null') {
                        variants.push(item.cases);
                    }

                    if (item.flavors && item.flavors !== 'null') {
                        variants.push(item.flavors);
                    }

                    if (item.forms && item.forms !== 'null') {
                        variants.push(item.forms);
                    }

                    var gtm = {
                        'name': item.product_name,
                        'id': item.product_sku,
                        'price': ABBOTT.utils.findLowestPrice(item.group_price, item.special_price, item.price),
                        'brand': item.product_brand,
                        'category': '',
                        'variant': (variants.length) ? variants.join(' | ') : 'NA',
                        'list': 'Featured Products'
                    };

                    // Push data to gtmStore for future use on click of URL and button
                    gtmData.push(gtm);

                    return gtm;
                })
            };

            ABBOTT.gtm.push(data);
        }


        // JS Utils
        return {
            isMobile: isMobile(),
            isAbbottStore: isAbbottStore(),
            isGlucerna: isGlucerna(),
            isSimilac: isSimilac(),
            storeName: getStoreName(),
            storeDomain: getStoreDomain(),
            isCookieEnabled: isCookieEnabled(),
            delayEventTrack: delayEventTrack,
            formatGraphQLQuery: formatGraphQLQuery,
            isUserLoggedIn: isUserLoggedIn,
            getCustomerGroup: getCustomerGroup,
            getSessionInfo: getSessionInfo,
            getSessionToken: getSessionToken,
            getCartKey: getCartKey,
            getProductPrice: getProductPrice,
            setSimilacButtonText: setSimilacButtonText,
            changeCartButtonState: changeCartButtonState,
            getLimit: getLimit(),
            findLowestPrice: findLowestPrice,
            gtmNavigationHandler: gtmNavigationHandler,
            gtmCartAddHandler: gtmCartAddHandler,
            pushGTM: pushGTM
        }

    })();

})(window.ABBOTT || (window.ABBOTT = {}));
