(function(ABBOTT) {

    ABBOTT.order = (function() {

        jQuery(function() {

            var $orderConatiner = jQuery('.order-container'),
                $subscriptionSummaryContainer = jQuery('.subscription-summary-container'),
                $orderTrialTitle = jQuery('.trial-show'),
                $orderSubscribedTitle = jQuery('.subscribe-show'),
                $orderSummaryBtn = jQuery('.order-summary--btn'),
                $trialSection = jQuery('.trial-section'),
                $subsTitle = jQuery('.subscription-summary--title'),
                $subsText = jQuery('.subscription-summary--text'),
                $startPlanBtn = jQuery('.start-plan'),
                $subscribeBtn = jQuery('.subscribe'),
                finalSelectedOrderPlan;

            /**
            * @function
            * @desc method to redirect to respective urls on click 
            */
            function startPlan() {
                    
                if(ABBOTT.utils.isUserLoggedIn()) {
                    $startPlanBtn.remove();
                }
                else {
                    $subscribeBtn.remove();
                }

            }

            startPlan();

            /**
            * @desc Getting data from subscription type component and displaying data
            */
            jQuery(document).on('plans.dataLoaded', function(event, selectedPlan, orderData, trialEligibleOrder) {
                $orderConatiner.removeClass('d-none').addClass('d-block');
                $subscriptionSummaryContainer.removeClass('d-none').addClass('d-block');
                finalSelectedOrderPlan = selectedPlan;

                jQuery('html').animate({
                    scrollTop: $orderConatiner.offset().top -100
                }, 2000);

                if (trialEligibleOrder === 'yes') {
                    $orderSubscribedTitle.remove();
                    $orderSummaryBtn.text('Start my introductory trial');
                }
                else {
                    $orderTrialTitle.remove();
                    $trialSection.addClass('d-none');
                    $subsTitle.text('Your Plan');
                    $subsText.addClass('d-none');
                    $orderSummaryBtn.text('Subscribe Now');
                }
                
                var $priceQty = jQuery('.plan-qty'),
                    $trialPrice = jQuery('.trial-price'),
                    $shippingPrice = jQuery('.shipping-price'),
                    $totalPrice = jQuery('.total-price'),
                    $skuData = jQuery('.sku-data'),
                    $subscriptionPrice = jQuery('.subscription-price'),
                    $distribution = jQuery('.subscription-summary--item'),
                    subscriptionSku = selectedPlan.subscription_sku,
                    skuPlan,
                    finalOrder = orderData.plans;
                $priceQty.text(selectedPlan.plan_qty);
                
                $shippingPrice.text(selectedPlan.shipping_price.toFixed(2));
                if(trialEligibleOrder !== 'yes') {
                    $totalPrice.text(selectedPlan.price.toFixed(2));
                    skuPlan = selectedPlan;
                    $trialPrice.remove();
                }

                if(trialEligibleOrder === 'yes') {
                    var totalCalPrice = Number(selectedPlan.trial_price) + Number(selectedPlan.shipping_price);
                    $totalPrice.text(totalCalPrice.toFixed(2));
                    $trialPrice.text(selectedPlan.trial_price.toFixed(2));
                    finalOrder.filter( function(finalOrderSel) {
                        if(subscriptionSku == finalOrderSel.sku) {
                            skuPlan = finalOrderSel;
                        }
                    });
                }

                $skuData.text(skuPlan.plan_qty);
                $subscriptionPrice.text(skuPlan.price.toFixed(2));
                var distributionData = [];

                for (var i = 0; i < skuPlan.delivery_split.length; i++){
                    distributionData[i] = skuPlan.delivery_split[i].split_qty+ " " + skuPlan.delivery_split[i].split_flavor + '<br/>'
                    $distribution.html(distributionData);
                }
            });

            /**
                * @function
                * @desc generates formated GraphQL query for Add-to-cart request
                */
               function addItemQuery(data) {
                var query = "mutation { addSimpleProductsToCart( input: { cart_id: \"".concat(data.cartID, "\" cart_items: [ { data: { quantity: 1 sku: \"").concat(data.selectedPlanFinal.sku, "\" aw_sarp2_subscription_type: ").concat(data.selectedPlanFinal.aw_sarp2_subscription_type, " } } ] } ) { cart { success items { id product { sku stock_status } quantity } } } }");
            
                  query = JSON.stringify({
                    query:query
                });

                var product = data.selectedPlanFinal;
                var variants = [];
                
                product.delivery_split.forEach(function(item) {
                  if (item.split_flavor && item.split_flavor !== 'null') {
                    variants.push(item.split_flavor);
                  }
                });

                ABBOTT.gtm.push({
                  type: 'cartAdd',
                  products: [{
                    name: product.name,
                    id: product.sku,
                    price: product.price.toString(),
                    category: '',
                    variant: (variants.length) ? variants.join(' | ') : 'NA',
                    quantity: 1
                  }]
                });
            
                return ABBOTT.utils.formatGraphQLQuery(query);
            }

            /**
            * @function
            * @desc generates formated GraphQL query for create-empty-cart request
            */
            function createEmptyCartQuery() {
                var query = "mutation { createEmptyCart }";
                query = JSON.stringify({
                    query:query
                });
            
                return ABBOTT.utils.formatGraphQLQuery(query);
            }

            /**
            * @function
            * @desc creates Empty Cart for the session and returns the cartID
            */
            function createEmptyCart() {
                return ABBOTT.http.makeAjaxCall({
                  url: ABBOTT.config.getEndpointUrl('GRAPH_QL'),
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'store': 'glucerna'
                  },
                  
                  data: createEmptyCartQuery()
                })
                .done( function(res) {
                  var cookieConfig = {
                    path: '/',
                    domain: ABBOTT.utils.storeDomain,
                    secure: true
                  };
                  jQuery.cookie('abt_cartKey', res.data.createEmptyCart, cookieConfig);
                  return res;
                });
              }

             /**
             * @function
             * @desc Make ajax call to Magento to Add Item to Cart
             * @param {object} selectedPlan 
             */
              function addToCart(selectedPlanFinal) {
                var ajaxObj = {
                  url : ABBOTT.config.getEndpointUrl('GRAPH_QL'),
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'store': 'glucerna',
                    'Authorization' : 'Bearer ' + ABBOTT.utils.getSessionToken()
                  }
                }
            
                var cartID = ABBOTT.utils.getCartKey();
            
                if(!cartID) {
                  createEmptyCart()
                    .done( function (cart) {
                      cartID = cart.data.createEmptyCart;
                      ajaxObj.data = addItemQuery({cartID: cartID, selectedPlanFinal: selectedPlanFinal});
                      ABBOTT.http.makeAjaxCall(ajaxObj)
                      .done(function(res) {

                        // @todo Handle Errors
                        if(res && res.errors) {
                          
                          if(res.errors[0].message.match(/could not find a cart with id/gi)) {
                            jQuery.removeCookie('abt_cartKey', {
                              path: '/',
                              domain: 'glucernastore.com'
                            });
                          } else if (res.errors[0].message.match(/the current user cannot perform operations on cart/gi)){
                            location.href = jQuery('#logout-link').attr('href') + '?redirect=1';
                          }
                          
                          return;
                        }

                        redirect();
                      });
                    });
                } else {
                  ajaxObj.data = addItemQuery({cartID: cartID, selectedPlanFinal: selectedPlanFinal});
                  ABBOTT.http.makeAjaxCall(ajaxObj)
                  .done(function(res) {

                    // @todo Handle Errors
                    if(res && res.errors) {
                      
                      if(res.errors[0].message.match(/could not find a cart with id/gi)) {
                        jQuery.removeCookie('abt_cartKey', {
                          path: '/',
                          domain: 'glucernastore.com'
                        });
                      } else if (res.errors[0].message.match(/the current user cannot perform operations on cart/gi)){
                        location.href = jQuery('#logout-link').attr('href') + '?redirect=1';
                      }
                      
                      return;
                    }

                    redirect();
                  });
                }

              }

             /**
             * @function
             * @desc after ajax call redirect to checkout or registeration page
             */
              function redirect () {
                var redirectPage = ABBOTT.config.getEndpointUrl('BASE') + '/checkout';

                window.location.href = redirectPage;
              }

             /**
             * @function
             * @desc button click redirection
             */
              function checkout() {
                addToCart(finalSelectedOrderPlan);
              }
              
              $orderSummaryBtn.on('click', checkout);

        }); 

    })();

})(window.ABBOTT || (window.ABBOTT = {}));