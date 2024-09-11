(function (ABBOTT) {
    ABBOTT.featuredSlider = (function () {

        jQuery(document).ready(function() {

            var $slider = jQuery('.featured-products-v3 .mob-view__v3__carousel');
            var products = [];
            var gtmData = [];
            var productSkus = [];
            var dataSku;

            // execute further only if component is available
            if(!$slider.length) {
                return;
            }
            
            $slider.find('.featured-product-sku').each(function() {
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
                var query = '{ inventory(sku: "' + skus + '" custGrp: "' + custGroup + '"){ products { qty item_id product_sku product_id is_in_stock backorders order_on_call price group_price special_price product_name product_brand categories forms flavors cases customizable_options { option_id option_values { option_type_id } } } } }';

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
                    var isBackorder = item.backorders === 2 && item.qty <= 0 && item.is_in_stock;
                    var buttonText = isBackorder ? "BACK ORDER" : "ADD TO CART"
                    var isOutOfStock = !item.is_in_stock;
                    var price = item.price;
                    var specialPrice = item.special_price;
                    var featuredProduct = jQuery('.featured-product-sku[value="'+ item.product_sku +'"]');
                    var regularPrice = featuredProduct.siblings('.featured-products-v3__regular-price');
                    var listPrice = featuredProduct.siblings('.featured-products-v3__list-price');
                    var cartButton = featuredProduct.closest('.featured-products-v3__info').find('.featured-products-v3__btn-cart');
                    var pdpLink = featuredProduct.closest('.item').find('figure a').attr('href');

                    if (isOutOfStock) {
                        featuredProduct.closest('.featured-products-v3__info').addClass('obsolete');
                        cartButton.text('OUT OF STOCK').attr('disabled', 'disabled');
                    } else if(item.order_on_call) {
                        cartButton.replaceWith('<a class="btn btn-primary btn-block rounded-0 featured-products-v3__btn-cart" href="' + pdpLink + '">CALL TO ORDER</a>');
                    } else if(item.customizable_options) {
                        cartButton.replaceWith('<a class="btn btn-primary btn-block rounded-0 featured-products-v3__btn-cart" href="' + pdpLink + '">'+ buttonText + '</a>');
                    } else if(isBackorder) { 
                        cartButton.text('BACK ORDER');
                    } else {
                        featuredProduct.closest('.featured-products-v3__info');
                        cartButton.text('ADD TO CART');
                    }

                    listPrice.text('$' + ABBOTT.utils.findLowestPrice(item.group_price, specialPrice, price));

                    if((item.group_price && item.group_price != price) || (specialPrice && specialPrice !== price)) {
                        regularPrice.html('<em>(<small>Regular Price</small> <s>$' + price.toFixed(2) + '</s>)</em>');
                    }
                })
            }
            // Configure Owl Carousel
			jQuery.each($slider, function(i,element) {
            jQuery(element).owlCarousel({
                loop: (jQuery(element).find('.item').length > 4),
                autoplay: true,
                nav: true,
                navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
                autoplayTimeout: $slider.data('interval') * 1000 || 5000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 2
                    },
                    766: {
                        items: 3
                    },
                    1020: {
                        items: 4
                    },
                    1200: {
                        items: 4
                    }
                }
            });
			var activeLength = jQuery(element).find('.item').length;
            var windowSize = jQuery(window).width();
			if(activeLength <= 4 && windowSize >768 ) {
				jQuery(element).parent().find(".featured-products-v3__title").css("margin","0 0 1rem");
            } else if(activeLength <3 && windowSize <768) {
				jQuery(element).parent().find(".featured-products-v3__title").css("margin","0 0 1rem");
			} else{
                jQuery(element).parent().find(".featured-products-v3__title").css("margin","0 3.125rem 1rem");
            }
            // Add event Listener to elements
            jQuery(element)
                .on('click.cartadd', '.featured-products-v3__btn-cart', function(e) {
                    var data = {
                        sku: jQuery(e.target).siblings('.featured-product-sku').val(),
                        qty: 1
                    };
                    dataSku = data.sku;
                    ABBOTT.utils.changeCartButtonState(jQuery(e.target));
                    jQuery('#abbott-cart-action').attr('data-product', JSON.stringify(data));
                    //Trigger BK Tag Event For Abbottstore
                    if(ABBOTT.utils.isAbbottStore) {
                        bk_addPageCtx('add_to_cart', true);
                        bk_addPageCtx('product', jQuery(e.target).siblings('.featured-product-sku').val());
                        window.bk_async();
                    }
                })
                .on('click.gtm', '.featured-products-v3__btn-cart:enabled', function(e) {   ABBOTT.utils.gtmCartAddHandler(dataSku,gtmData); })
                .on('click.gtm', 'a[href]', function(e) {   ABBOTT.utils.gtmNavigationHandler(dataSku,gtmData); });
			});
            applyCarouselDesign();
            $slider.on('translated.owl.carousel', function(event) {
                applyCarouselDesign();
            });

            function applyCarouselDesign(){
                var total = $('.featured-products-v3 .featured-products-v3__carousel .owl-stage .owl-item.active').length;

                $('.featured-products-v3 .featured-products-v3__carousel .owl-stage .owl-item.active').each(function(index){

                    if (index === total - 1) {
                        $(this).find(".item").css('border','none');
                    }else {
                        $(this).find(".item").css('border-right','1px solid #C7C7C7');
                    }

                });
            }

            if(ABBOTT.utils.isAbbottStore) {
                //Get Products Info
                getFeaturedProductInfo();
            }
        });

    })();

})(window.ABBOTT || (window.ABBOTT = {}));