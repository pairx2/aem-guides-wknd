(function(ABBOTT) {
    ABBOTT.productList = (function() {})();
  
    jQuery(document).ready(function () {
      var $productListCard = jQuery('.product-list-card');
      var $productDescription = jQuery('.product-detail .product-description');
      
      /**
       * @function
       * @description Initailise the Product Card with respective classes on Initial load.
       */
      function init() {
        getProductListInfo();
        alignProductCards();
      }

      /**
       * @function
       * @description Add respective classes in different views.
       */
      function alignProductCards() {
        var productCount = $productListCard.length;

        if (productCount) {
          var i = ((productCount % 3) === 0) ? productCount - 3 : (Math.floor(productCount / 3) * 3);
          for (i ; i < productCount; i++) {
            $productListCard.eq(i).addClass('card-border');
          }
        }

        setEllipse();
      }

      /**
       * @function
       * @desc set Ellipse if description overflows more than 4 line.
       */
      function setEllipse() {
        var productCount = $productListCard.length;

        for (var i = 0 ; i < productCount ; i++) {
          if ($productDescription.eq(i).height() <= 100) {
            $productDescription.eq(i).find('.show-description').addClass('d-none');
            $productDescription.eq(i).find('.hide-description').addClass('d-none');
          }
          else {
            $productDescription.eq(i).find('.show-description').removeClass('d-none');
            $productDescription.eq(i).find('.hide-description').removeClass('d-none');
          }
        }
      }

        /**
       * @function
       * @desc Makes Ajax call to gets product list Information
       */
      function getProductListInfo() {
        // GraphQL query
        var query = '{ products(filter:{category_id:{eq: "206"}}){ total_count items {id stockdata{qty backorder status} sku price custom_discount cans_x cans_y cans{cans_x_price cans_x_number cans_x_price_discount cans_y_price cans_y_number cans_y_price_discount} subscription_details{option_label option_id} brand categories { name } name brand product_flavor case_of_product product_form }}}';
        
        // Make ajax call
        ABBOTT.http.makeAjaxCall({
          url: ABBOTT.config.getEndpointUrl('GRAPH_QL'),
          headers: {
            store: 'similac'
          },
          data: {
            query: query
          }
        })
        .done(function(res) {
          if(res.errors) {
            return;
          }

          if(res.data.products.items) {
            jQuery.each(res.data.products.items, updateProductListInfo);
            pushSimilacGTM(res.data.products.items);
          }
        });
      }

      /**
       * @function
       * @desc iterator function for product item data to update price information on UI
       * @param {Object} productData 
       */
      function updateProductListInfo(index, productData) {

        var $product = jQuery('#sku-' + productData.sku);
        var isBackorder = productData.stockdata.status === 'BACK ORDER';

            $product
              .find('.product-list-sku').text(productData.sku)
              .end().find('.product-list-subscription-id').text(productData.subscription_details.option_id)
              .end().find('.savings-image').text('Save ' + productData.custom_discount + '% today')
              .end().find('.canx-price').text('$' + productData.cans.cans_x_price.toFixed(2))
              .end().find('.canx-discount-price').text('$' + productData.cans.cans_x_price_discount.toFixed(2))
              .end().find('.canx-btn').data('prod-id', productData.subscription_details.option_id)
              .data('prod-sku', productData.sku).data('prod-quantity', productData.cans.cans_x_number)
              .end().find('.cany-price').text('$' + productData.cans.cans_y_price.toFixed(2))
              .end().find('.cany-discount-price').text('$' + productData.cans.cans_y_price_discount.toFixed(2))
              .end().find('.cany-btn').data('prod-id', productData.subscription_details.option_id)
              .data('prod-sku', productData.sku).data('prod-quantity', productData.cans.cans_y_number);
            
            if(isBackorder) {
              $product.addClass('backorder');
            }
      }

      function pushSimilacGTM(products) {
        var data = {
          type: 'impressions',
          products: products.map(function (item) {
            var $product = jQuery('#sku-' + item.sku);
            var variants = [];

            // Add variants
            if (item.case_of_product && item.case_of_product !== 'null') {
                variants.push(item.case_of_product);
            }

            if (item.product_flavor && item.product_flavor !== 'null') {
                variants.push(item.product_flavor);
            }

            if (item.product_form && item.product_form !== 'null') {
                variants.push(item.product_form);
            }

            var gtm = {
              'name': item.name,
              'id': item.sku,
              'price': item.price.toString(),
              'brand': item.brand,
              'category': '',
              'variant': (variants.length) ? variants.join(' | ') : 'NA'
            };

            var canxData = {
              quantity: item.cans.cans_x_number
            };
            var canyData = {
              quantity: item.cans.cans_y_number
            };
            var listData = {
              list: 'Product List',
              position: $product.index() + 1
            };

            // Set data in can buttons for add to cart
            $product.find('.canx-btn').data('gtm', jQuery.extend({}, gtm, canxData));
            $product.find('.cany-btn').data('gtm', jQuery.extend({}, gtm, canyData));
            
            // Push data for product impression
            return jQuery.extend({}, gtm, listData);
          })
        };

        ABBOTT.gtm.push(data);
      }

      function pushGlucernaGTM() {
        var $products = jQuery('.glucerna-product-image-wrapper');
        var data = {
          type: 'impressions',
          products: []
        };

        $products.each(function (index, item) {
          var $product = jQuery(item);
          var productData = $product.data();
          var variants = [];

          // Add variants
          if (productData.flavor && productData.flavor !== 'null') {
            variants.push(productData.flavor);
          }

          if (productData.form && productData.form !== 'null') {
              variants.push(productData.form);
          }

          var gtm = {
            'name': productData.name,
            'id': productData.sku,
            'price': '',
            'brand': productData.brand,
            'category': '',
            'variant': (variants.length) ? variants.join(' | ') : 'NA',
            'list': 'Product List',
            'position': index + 1
          };

          // Set data item for Product Link Click
          $product.find('a').data('gtm', gtm);
          
          // Push data for product impression
          data.products.push(gtm);
        })

        ABBOTT.gtm.push(data);
      }

      function glucernaGtmClickUrl() {
        var data = jQuery(this).data('gtm');

        delete data.list;

        ABBOTT.gtm.push({
          type: 'productClick',
          products: data
        });
      }
      

      /**
       * @function
       * @description To toggle active class.
       */
      function toggleDescription() {
        jQuery(this).closest('.product-detail').toggleClass('active');
      }

      /**
       * @desc Set data-attribute to call Add to Cart
       * @param {object} e 
       */
      function addToCart(e){
        var $Img = jQuery(jQuery(e.currentTarget).closest('.product-list-card')).find('.product-image');
        var data = {
          sku: jQuery(e.target).data().prodSku,
          qty: jQuery(e.target).data().prodQuantity,
          aw_sarp2_subscription_type: jQuery(e.target).data().prodId
        };

        animate($Img);
        
        jQuery('#similac-cart-action').attr('data-product', JSON.stringify(data));
        ABBOTT.gtm.push({
          type: 'cartAdd',
          products: jQuery(e.target).data('gtm')
        });
      }

      function animate(elem) {
        var myClonedElement = elem.clone();
        
        elem.after(myClonedElement);
        myClonedElement.css({ position: 'fixed', top: elem.get(0).getBoundingClientRect().top, left: elem.offset().left });
        myClonedElement.addClass('animate');

        setTimeout(function(){ 
          myClonedElement.remove();  
        }, 1400);
      }

      // Execute this function only in similac store
      if($productListCard.length) {
        jQuery('.show-description, .hide-description').on('click', toggleDescription);
        jQuery(window).on('resize', setEllipse);
        jQuery('.action__container').on('click','.add-to-cart', addToCart);
    
        init();
      }

      // Execute this function only in Glucerna store
      if(ABBOTT.utils.isGlucerna)   {
        pushGlucernaGTM();
        jQuery('.glucerna-product-image-wrapper').on('click.gtm', 'a', glucernaGtmClickUrl)
      }
      
    });
})(window.ABBOTT || (window.ABBOTT = {}));
  