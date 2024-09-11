(function (ABBOTT) {
    ABBOTT.featuredSlider = (function () {

        jQuery(document).ready(function() {

            var $featured_prod = jQuery('.featured-product');
            var products = [];
            var gtmData = [];
            var productSkus = [];
            var dataSku;

            // execute further only if component is available
            if(!$featured_prod.length) {
                return;
            }
            
            $featured_prod.find('.featured-prod-sku').each(function() {
                var sku = jQuery(this).val();

                if(sku) {
                    productSkus.push(sku);
                }
            });

            /**
             * @function
             * @desc Fetch fetured product details
             */
            function getFeaturedProductInfo() {
                var skus = productSkus.toString();
                var custGroup = btoa(ABBOTT.utils.getCustomerGroup(true));
                var query = '{ inventory(sku: "' + skus + '" custGrp: "' + custGroup + '"){ products { qty item_id product_sku product_id is_in_stock backorders price group_price special_price product_name product_brand categories forms flavors cases customizable_options { option_id option_values { option_type_id } } } } }';

                // Make ajax call
                ABBOTT.http.makeAjaxCall({
                    url: ABBOTT.config.getEndpointUrl('GRAPH_QL'),
                    headers: {
                        "Authorization" : "Bearer " + ABBOTT.utils.getSessionToken()
                    },
                    data: {
                        query: query
                    },
                    success : function(res) {
                        if(!res.data.inventory) {
                            return;
                        }
                        
                        products = res.data.inventory.products;

                        // Set fetched data to featured product carousel
                        setFeaturedProductInfo();

                        // push to GTM
                        ABBOTT.utils.pushGTM(products,gtmData);
                    }
                })
            }

            /**
             * @function
             * @desc Set Products Information into featured product carousel
             */
            function setFeaturedProductInfo() {
                products.forEach(function(item) {
                    var isBackorder = item.backorders === 2 && item.qty <= 0;
                    var isOutOfStock = !item.is_in_stock;
                    var price = item.price;
                    var specialPrice = item.special_price;
                    var featuredProduct = jQuery('.featured-prod-sku[value="'+ item.product_sku +'"]');
                    var regularPrice = featuredProduct.siblings('.featured-product__regular-price');
                    var listPrice = featuredProduct.siblings('.featured-product__list-price');
                    var cartButton = featuredProduct.closest('.featured-product__info').find('.featured-product__btn-cart');
                    var pdpLink = featuredProduct.closest('.item').find('figure a').attr('href');

                    if(item.customizable_options) {
                        cartButton.replaceWith('<a class="btn btn-primary btn-block rounded-0 featured-product__btn-cart" href="' + pdpLink + '">ADD TO CART</a>');
                    } else if(isBackorder) { 
                        cartButton.text('BACKORDER');
                    }
                    else if (isOutOfStock) { 
                        featuredProduct.closest('.featured-product__info').addClass('obsolete');
                        cartButton.text('OUT OF STOCK').attr('disabled', 'disabled');
                    } else {
                        featuredProduct.closest('.featured-product__info');
                        cartButton.text('ADD TO CART');
                    }

                    listPrice.text('$' + ABBOTT.utils.findLowestPrice(item.group_price, specialPrice, price));

                    if((item.group_price && item.group_price != price) || (specialPrice && specialPrice !== price)) {
                        regularPrice.html('<em>(<small>Regular Price</small> <s>$' + price.toFixed(2) + '</s>)</em>');
                    }
                })
            }



           
         

            // Add event Listener to elements
            $featured_prod
                .on('click.cartadd', '.featured-product__btn-cart', function(e) {
                    var data = {
                        sku: jQuery(e.target).siblings('.featured-prod-sku').val(),
                        qty: 1
                    };
                    dataSku = data.sku;
                    ABBOTT.utils.changeCartButtonState(jQuery(e.target));
                    jQuery('#abbott-cart-action').attr('data-product', JSON.stringify(data));
                })
                .on('click.gtm', '.featured-product__btn-cart:enabled', function(e) {   ABBOTT.utils.gtmCartAddHandler(dataSku,gtmData); })
                .on('click.gtm', 'a[href]', function(e) {   ABBOTT.utils.gtmNavigationHandler(dataSku,gtmData); });

            if(ABBOTT.utils.isAbbottStore) {
                //Get Products Info
                getFeaturedProductInfo();
            }
        });

    })();

})(window.ABBOTT || (window.ABBOTT = {}));