
/**
 * Abbott GTM Data-Layer Utility
 * 
 * - Home featured slider
 *      - On Load - DONE
 *      - On click - DONE
 *      - Add to cart - DONE
 * 
 * - search modal
 *      - On Load - DONE
 *      - On click - DONE
 *      - Add to cart - DONE
 * - search page
 *      - On Load - DONE
 *      - On click - DONE
 *      - Add to cart - DONE
 * 
 * - PDP
 *      - On Load - DONE
 *      - Add to cart  - DONE
 * - cart remove - DONE   
 */

(function (ABBOTT) {
    ABBOTT.gtm = (function () {

        var pusher = {
            /**
             * @method
             * @desc used for product listing anywhere (Home, Search Modal, Search Page)
             * @param {Object} config configurations
             * @return {object} GTM data object
             */
            impressions: function (config) {
                var data = {
                    'ecommerce': {
                        'currencyCode': 'USD',
                        'impressions': config.products
                    }
                };

                if(config.eventName) {
                    data.event = config.eventName;
                }
                
                return data;
            },

            /**
             * @method
             * @desc used for product detail page impression
             * @param {Object} config configurations
             * @return {object} GTM data object
             */
            pdp: function (config) {
                return {
                    'ecommerce': {
                        'detail': {
                            'products': config.products
                        }
                    }
                };
            },

            /**
             * @method
             * @desc used for product link click event anywhere
             * @param {Object} config configurations
             * @return {object} GTM data object
             */
            productClick: function (config) {
                return {
                    'event': 'productClick',
                    'ecommerce': {
                        'click': {
                            'actionField': { 'list': config.list },
                            'products': config.products
                        }
                    }
                };
            },

            /**
             * @method
             * @desc used for product adding to cart from anywhere
             * @param {Object} config configurations
             * @return {object} GTM data object
             */
            cartAdd: function (config) {
                return {
                    'event': 'addToCart',
                    'ecommerce': {
                        'currencyCode': 'USD',
                        'add': {
                            'products': config.products
                        }
                    }
                };
            },

            /**
             * @method
             * @desc used for product removing to cart from cart slider
             * @param {Object} config configurations
             * @return {object} GTM data object
             */
            cartRemove: function (config) {
                return {
                    'event': 'removeFromCart',
                    'ecommerce': {
                        'remove': {
                            'products': config.products
                        }
                    }
                };
            }
        };

        var builder = {
            /**
             * @function
             * @desc pushes track to GTM datalayer when product is added to cart
             * @param {Array} product products list
             */
            listing: function (products, listName, eventName) {
                push({
                    type: 'impressions',
                    eventName: eventName,
                    products: products.map(function(item, index) {
                        return {
                            'name': item.name,
                            'id': item.sku,
                            'price': ABBOTT.utils.getProductPrice(item),
                            'brand': item.brand,
                            'category': '',
                            'variant': getVariants(item),
                            'list': listName,
                            'position': index + 1
                        };
                    })
                });
            },

            /**
             * @function
             * @desc pushes track to GTM datalayer when PDP link is clicked
             * @param {Object} product product information
             * @param {Number} index index of the product in list
             */
            clickURL: function (product, index, listName) {
                push({
                    type: 'productClick',
                    list: listName,
                    products: [{
                        'name': product.name || product.image.label,
                        'id': product.sku,
                        'price': ABBOTT.utils.getProductPrice(product),
                        'brand': product.brand,
                        'category': '',
                        'variant': getVariants(product),
                        'position': index + 1
                    }]
                });
            },

            /**
             * @function
             * @desc pushes track to GTM datalayer when product is added to cart
             * @param {Object} product product information
             */
            addToCart: function (product) {
                push({
                    type: 'cartAdd',
                    products: [{
                        'name': product.name,
                        'id': product.sku,
                        'price': ABBOTT.utils.getProductPrice(product),
                        'brand': product.brand,
                        'category': '',
                        'variant': getVariants(product),
                        'quantity': 1
                    }]
                });
            },

            /**
             * @function
             * @desc pushes track to GTM datalayer when product is removed from cart
             * @param {Object} product product information
             */
            removeFromCart: function (item) {
                push({
                    type: 'cartRemove',
                    products: [{
                        'name': item.product.image.label,
                        'id': item.product.sku,
                        'price': item.product.price.toString(),
                        'brand': item.product.brand,
                        'category': '',
                        'variant': getVariants(item.product),
                        'quantity': item.quantity
                    }]
                });
            }
        };

        /**
         * @function
         * @desc formats product variants and stringify these
         * @param {Object} categories Product Object
         * @return {String} variants in string format separated with ' | '
         */
        function getVariants(product) {
            var variants = [];

            // Push Case/Size
            if(product.case_of_product && product.case_of_product !== 'null') {
                variants.push(product.case_of_product);
            }

            // Push Flavor
            if(product.product_flavor && product.product_flavor !== 'null') {
                variants.push(product.product_flavor);
            }

            // Push Form
            if(product.product_form && product.product_form !== 'null') {
                variants.push(product.product_form);
            }

            //
            if(variants.length) {
                return variants.join(' | ');
            }
            else {
                return 'NA';
            }
        }

        /**
         * @function
         * @desc pushes data to GTM based on event
         * @param {Object} config config options type and products
         */
        function push(config) {
            var data;

            // check if config is correct
            if (!config.products || !config.type || !pusher[config.type]) {
                throw 'GTM event configuration error!';
            }

            data = pusher[config.type](config);

            if (data && typeof dataLayer === 'object') {
                dataLayer.push(data);
            }
        }

        // Exposed assets
        return {
            push: push, // use this method when customization required from response recieved
            buildAndPush: builder // use methods under this when data can be used as is from response
        }

    })();
})(window.ABBOTT || (window.ABBOTT = {}));
