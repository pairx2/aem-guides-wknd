(function(ABBOTT) {
  ABBOTT.pdp = (function() {})();

  jQuery(function() {
    var $component = jQuery('#pdp-info');
    var $placeholder = jQuery('#placeholder');
    var $propFields = jQuery('select.is-prop-field');
    var product = {};
    var gtmProduct = {};

    /**
     * @function
     * @desc toggles one-time purchase vs schedule buy types
     */
    function toggleBuyType() {
      var $elm = jQuery(this);
      var $listPrice = jQuery('#list-price');
      var $currentPrice = jQuery('#current-price');

      //
      if($elm.attr('id') === 'radio-subscribe') {
		
		var defaultWeek = document.getElementById("pdp-Duration").children[1];
		defaultWeek.setAttribute("selected", "selected");
        
        $listPrice
          .text((product.price.group_price) ? product.price.regular.toFixed(2) : product.price.oneTime.toFixed(2));
        
          if(product.price.group_price !== product.price.regular) {
            $listPrice.closest('p').removeClass('d-none');
          }
          
          jQuery('#pdp-Duration').trigger('change');
      } else {
        if(product.price.group_price) {
          $currentPrice.text(product.price.oneTime.toFixed(2));
          $listPrice.text(product.price.regular.toFixed(2));
          $listPrice.closest('p').toggleClass('d-none', product.price.group_price === product.price.regular);
        } else {
          $listPrice.closest('p').addClass('d-none');
          $currentPrice.text(product.price.regular.toFixed(2));
        }
      }

      $elm
        .closest('.pdp-info__buy-type')
        .find('.pdp-info__buy-type-content')
        .removeClass('d-none')
        .end()
        .siblings('.pdp-info__buy-type')
        .find('.pdp-info__buy-type-content')
        .addClass('d-none');
    }

    /**
     * @function
     * @desc Adds one item to quantity
     */
    function addOneItem() {
      var $input = jQuery(this)
        .closest('.quanity-update-control')
        .find('.form-control');
      var currentQty = $input.val() - 0;

      $input.val(currentQty + 1);
    }

    /**
     * @function
     * @desc Removes one item to quantity
     */
    function removeOneItem() {
      var $input = jQuery(this)
        .closest('.quanity-update-control')
        .find('.form-control');
      var currentQty = $input.val() - 0;

      // Check for min quantity
      if (currentQty > 1) {
        $input.val(currentQty - 1);
      }
    }

    /**
     * @function
     * @desc switches page based on the property selected of the product
     */
    function updateProductVariation(e) {
      var $props = $propFields.filter(':visible');

      var data = {
        prodPath: location.pathname,
        store: ABBOTT.utils.storeName,
        currentSelection:jQuery(e.currentTarget).data('prop')
      };

      //
      $props.each(function(i, elm) {
        var $elm = jQuery(elm);
        
        /* if( jQuery(e.currentTarget).data('prop') === 'flavor' &&  $elm.data('prop') === 'size') {
          return
        }*/
        
        data[$elm.data('prop')] = $elm.val();
      });

      // Get product URL and redirect
      ABBOTT.http
        .makeAjaxCall({
          type: 'GET',
          url: '/bin/getVariation', // AEM URL
          data: jQuery.param(data),
          success: function (res) {
            var url;

            if(res && res.length) {
              url = res[0].path
              document.location.href = url;
            }
          }
        });
    }

    /**
     * @function
     * @description Check Url with Query Paramets and add psrid to cookie when available
     */
    function checkUrlParams() {
      var pageUrlParams = window.location.search.substring(1);
      var urlVariables = pageUrlParams.split('&');
      var parameterName;
      var cookieConfig = {
        path: '/',
        domain: ABBOTT.utils.storeDomain,
        secure: true,
        expires: 1 / 12 // set it for 1 hour
      };

      for (var i = 0; i < urlVariables.length; i++) {
        parameterName = urlVariables[i].split('=');

        if (parameterName[0] === 'psrid' && parameterName[1]) {
          jQuery.cookie('abt_psrid', parameterName[1], cookieConfig);
        }
      }
    }

    /**
     * @function
     * @desc Makes Ajax call to gets product info and updates the UI based on product availability
     */
    function getProductInfo() {
      var sku = jQuery("#pdp-sku").data('sku');
      var customerGroup = btoa(ABBOTT.utils.getCustomerGroup(true));
      jQuery('#case2').hide();
      jQuery('#case1').hide();
      
      // Set psrid to cookie if present in url
      checkUrlParams();

      // GraphQL query
      var query = '{ inventory(sku: "' + sku + '" custGrp: "' + customerGroup + '"){ products { qty item_id custom_order_on_call product_id is_in_stock backorders price group_price group_message subscription_price { id option_id name percent price } product_name product_brand categories forms flavors cases customizable_options { option_id metabolic_state option_values { option_type_id } } } } }';

      // Make ajax call
      ABBOTT.http.makeAjaxCall({
        url: ABBOTT.config.getEndpointUrl('GRAPH_QL'),
        data: {
          query: query
        },
        headers: {
          "Authorization" : "Bearer " + ABBOTT.utils.getSessionToken()
        }
      })
      .done(function(res) {

        if(res.errors) {
          return;
        }

        // Handle response
        var data = res.data.inventory.products[0];
        var isBackorder = data.backorders === 2 && data.qty <= 0 && data.is_in_stock;
        var isOutOfStock = !data.is_in_stock;
        var $stock = jQuery('#stock-status');
        var $cartButtons = jQuery('#btn-cart, #btn-schedule');
        var labels = jQuery('#stock-labels').data();
        var isCustomOrderOnCall = data.custom_order_on_call;

        // Save Product Info
        product = {
          id: data.product_id,
          name: data.product_name,
          brand: data.product_brand,
          categories: data.categories,
          isBackorder: isBackorder,
          cases: data.cases,
          flavors: data.flavors,
          forms: data.forms,
          price: {
            regular: data.price,
            oneTime: data.group_price || data.price,
            subsription: data.subscription_price,
            group_price: data.group_price
          },
          customizable_options: data.customizable_options
        };
		if(data.group_message != null && data.group_message != undefined && data.group_message != "") {
			 $('.pdp-info__price.mb-4').after('<div class="pdp-info_group-message">'+data.group_message+'</div>');
		}

		//show an hide div based on isCustomOrderOncall
        if(isCustomOrderOnCall == '1'){
            jQuery('#case1').show();
            jQuery('#case2').hide();
        }else if(isCustomOrderOnCall == '0'){
            jQuery('#case2').show();
            jQuery('#case1').hide();
        }

        // Update default subscription price
        jQuery('#pdp-Duration').trigger('change');

        // Set product max quantity that can be added to cart
        jQuery('.quanity-update-control').find('input').attr('max', data.qty);

        // Set product status to Backorders
        if(isBackorder) {
          $stock.text(labels.backorder).addClass('danger');
          $cartButtons.text(labels.backorder);
        }

        // Set back order status Out of Stock
        if(isOutOfStock) {
          $stock.text(labels.outOfStock).removeClass('danger');
          $cartButtons.remove();
        }

        // Update Metabolic Text if Metabolic_state Present
        if(product.customizable_options && product.customizable_options[0].metabolic_state) {
          var metabolicEl = jQuery('.pdp-info-medic .medic-confirmation-label').clone();

          jQuery('.pdp-info-medic')
            .html(product.customizable_options[0].metabolic_state)
            .append(metabolicEl);
        }

        // Toggle Placeholder and Actual Product Info component
        $component.removeClass('d-none').removeAttr('aria-label aria-hidden');
        $placeholder.remove();
        if(jQuery(':radio:checked').length) {
          jQuery(':radio:checked').trigger('click')
        } else {
          toggleBuyType();
        }
        pushAbbottGTM();
      });
    }

    /**
     * @function
     * @desc prepares and pushes the GTM data
     */
    function pushAbbottGTM() {
      var variants = [];
      var sku = jQuery('#pdp-sku').text().split(': ')[1];

      // Add Variants
      if (product.cases && product.cases !== 'null') {
        variants.push(product.cases);
      }

      if (product.flavors && product.flavors !== 'null') {
        variants.push(product.flavors);
      }

      if (product.forms && product.forms !== 'null') {
        variants.push(product.forms);
      }


      gtmProduct = {
        'name': $component.find('.pdp-info__title').text().trim(),
        'id': sku,
        'price': jQuery('#current-price').text(),
        'brand': product.brand,
        'category': '',
        'variant': (variants.length) ? variants.join(' | ') : 'NA'
      };

      ABBOTT.gtm.push({
        type: 'pdp',
        products: [gtmProduct]
      });
    }

    function pushGlucernaGTM() {
      var productData = jQuery('.gs-pdp').data();
      var variants = [productData.flavor || '', productData.form || ''];

      var gtmObj = {
        'name': productData.name,
        'id': productData.sku,
        'price': '',
        'brand': productData.brand,
        'category': '',
        'variant': (variants.length) ? variants.join(' | ') : 'NA'
      };

      ABBOTT.gtm.push({
        type: 'pdp',
        products: [gtmObj]
      });
    }

    /**
     * @function
     * @desc handles change event on subscription duration dropdown, update price
     * @param {Object} e Event Object 
     */
    function updateSubcriptionPrice(e) {
      var $percentValueEl = jQuery('#save-on-subscribe');
      var subscriptionId = jQuery(this).val();
      var $listPrice = jQuery('#list-price');
      var currentPrice = product.price.group_price || product.price.regular;
      var data = product.price.subsription.filter(function(item) {
        return item.id === +subscriptionId; // change to number before comparison
      });

      data = data.length && data[0];
      
      if(!data) {
        data = {price: 0};
      }
      
      if(data.percent) {
        $percentValueEl.text(data.percent + '% $' + data.price.toFixed(2));
      }
      if(currentPrice === data.price){
	    $('.abbott-radio__label:first').text('Schedule Delivery');
      }
      jQuery('#current-price').text(data.price.toFixed(2));
      $listPrice.closest('p').toggleClass('d-none', currentPrice === data.price);
    }

    /**
     * @function
     * @desc
     * @param
     */
    function addToCart(e){
      var $metabolicConfirm = jQuery('#medic-confirmation:visible');
      var buyType = jQuery(":radio[name=buy-type]:checked").val();

      // Check if metabolic checkbox is checked
      if($metabolicConfirm.length && !$metabolicConfirm.is(':checked')) {
        if(jQuery('.pdp-info-medic').find(".error.text-danger").length === 0) {
          $metabolicConfirm.parent().after('<div class="error text-danger">This is a required field.</div>');
        }
        return;
      } else {

        // remove error if checked and let it proceed to add to cart
        $metabolicConfirm.parent().siblings('.error').remove();
      }

      // Change Button cart sate after Validation
      ABBOTT.utils.changeCartButtonState(jQuery(e.target));
      
      var data = {
        sku: jQuery("#pdp-sku").data('sku'),
        qty: jQuery('.quanity-update-control:visible').find('input').val()
      };

      // @todo If subscription, add aw_sarp2_subscription_type to data obj
      if(buyType === 'schedule') {
        var subscribeId = product.price.subsription.filter(function(item) {
          return item.id == jQuery("#pdp-Duration").val();
        });
        data.aw_sarp2_subscription_type = subscribeId[0].option_id;
      }

      if(product.customizable_options) {
        data.customizable_options = {
          id: product.customizable_options[0].option_id,
          value_string: product.customizable_options[0].option_values[0].option_type_id
        }
      }

      // Set data attribute
     jQuery('#abbott-cart-action').attr('data-product', JSON.stringify(data));

      gtmProduct.quantity = data.qty;

      // GTM Push
      ABBOTT.gtm.push({
        type: 'cartAdd',
        products: [gtmProduct]
      });

      //Trigger BK Tag Event For Abbottstore
      if(ABBOTT.utils.isAbbottStore) {
          bk_addPageCtx('add_to_cart', true);
          bk_addPageCtx('product', jQuery("#pdp-sku").data('sku'));
          window.bk_async();
      }
    }

    // Fetch Product Info (only in PDP page)
    if($component.length) {
        var visibility = jQuery("#product-visibility").data('value');
        var wcmmode = jQuery("#wcmmode").data('value');
        var skuPrice = jQuery("#product-price").data('value');
        if(wcmmode !="EDIT" && wcmmode != "PREVIEW" && visibility == "1" && skuPrice == "0"){
            window.location.assign("/content/abbott/en/errors/404.html");
        } else {
            getProductInfo();
        }
    }

    //
    if(ABBOTT.utils.isGlucerna && jQuery('.gs-pdp').length) {
      pushGlucernaGTM();
    }

    // Event Bindings
    $propFields.on('change', updateProductVariation);
    $component
      .on('click', ':radio', toggleBuyType)
      .on('click', '.btn-add-one-item', addOneItem)
      .on('click', '.btn-remove-one-item', removeOneItem)
      .on('click', '#btn-cart, #btn-schedule', addToCart)
      .on('change', '#pdp-Duration', updateSubcriptionPrice);

    //Trigger BK Tag Event For Abbottstore & only for PDP pages
    if($component.length && ABBOTT.utils.isAbbottStore) {
      bk_addPageCtx('product', jQuery("#pdp-sku").data('sku'));
      window.bk_async();
    }
  });
})(window.ABBOTT || (window.ABBOTT = {}));
