(function(ABBOTT) {

    ABBOTT.subscription = (function() {

        jQuery(function() {

            var $flvourBtn = jQuery('.flavour-section__desc--btn'),
                $closeButton = jQuery('.popup-close'),
                $selectFlavour = jQuery('.select-flavour'),
                $flavourContainer = jQuery('#flavour-container'),
                $subTtile = jQuery('.flavour-section--sub-title'),
                $document = jQuery(document),
                trialEligible,
                flavourArr = [],
                cookieVal = jQuery.cookie('abt_te'),
                planData,
                $subCompBtn = jQuery('.product-plans__desc--btn');

            if(!$flavourContainer.length) {
                return;
            }

            var dataStream = subscription().responseJSON,
                flavourData = dataStream.data.subscription.combinations;

            trialEligible = (ABBOTT.utils.isUserLoggedIn() && cookieVal && cookieVal !== '0') ? 'no' : 'yes';

            /**
               * @function
               * @desc Hide introductory title for subscribed users
            */
            function isSubscribed() {
                if(trialEligible !== 'yes') {
                    $subTtile.remove();
                } else {
                    $subTtile.removeClass('d-none');
                }
            }

            function setTrialButton() {
                var $trialBtnHeading = jQuery('.product-plans__desc--btn .btn-heading'),
                    $trialBtnOriginalPrice = jQuery('.product-plans__desc--btn .bracket'),
                    $trialBtnDiscountedPrice = jQuery('.product-plans__desc--btn .discount-price'),
                    $trialBtnContent = jQuery('.product-plans__desc--content');

                if(trialEligible !== 'yes') {
                    $trialBtnOriginalPrice.addClass('d-none');
                    $trialBtnContent.addClass('d-none');
                    $trialBtnHeading[0].innerText = 'Individual 30 bottles';
                    $trialBtnHeading[1].innerText = 'Family 60 Bottles';
                    $trialBtnDiscountedPrice[0].innerText = '$45.00/MONTH';
                    $trialBtnDiscountedPrice[1].innerText = '$85.00/MONTH';
                }

            }

            /**
               * @function
               * @desc flow data to next component based on flsvour selection
            */
            function flowData() {
                flavourData.filter( function(flavourDataSel) {
                    flavourDataSel.combination = flavourDataSel.combination.toString().split(',');
                    if ( flavourDataSel.combination.length == flavourArr.length && flavourArr.every(function (element) {
                        return flavourDataSel.combination.indexOf(element) != -1;
                      })) {
                        planData = flavourDataSel;
                        $flavourContainer.trigger('flavours.dataLoaded', [planData, trialEligible]);
                        return planData;
                    }
                });
            }

            /**
               * @function
               * @desc Remove flavour from flavourArr on deselecting the flavour
            */
            function flavourDeselect(removeFlavour) {
                if(flavourArr.length > 0) {

                    if(flavourArr.indexOf(removeFlavour) !== -1) {
                        flavourArr = jQuery.grep(flavourArr, function(val) {
                            return val != removeFlavour;
                        })
                    }

                    if(flavourArr.length < 1) {
                        $subCompBtn.attr('disabled', true);
                        $subCompBtn.addClass('disable-btn');
                    }

                    flowData();

                }
            }
            
            /**
               * @function
               * @desc Open Popup on click and scroll to top
            */
            function openPopup(e) {
                var $html = jQuery('html'),
                    $orderConatiner = jQuery('.order-container'),
                    $subscriptionSummaryContainer = jQuery('.subscription-summary-container'),
                    $popupText = jQuery('.popup-text'),
                    backorderMsg = dataStream.data.subscription.flavors,
                    clickedBtnText = jQuery(this).text(),
                    $popup = jQuery(this).siblings('.flavour-popup'),
                    $popupBackorder = jQuery(this).siblings('.flavour-popup').children('.popup-text');
                    

                $orderConatiner.removeClass('d-block').addClass('d-none');
                $subscriptionSummaryContainer.removeClass('d-block').addClass('d-none');

                if(jQuery(this).hasClass('active')) {
                    var isPopupMsg = $popupBackorder.text();

                    if(isPopupMsg) {
                        $popup.addClass('popup-open');
                    }
                    else {
                        jQuery(this).removeClass('active');
                        flavourDeselect(clickedBtnText);
                    }
                    
                }

                else {

                    if(flavourArr.indexOf(clickedBtnText) === -1) {
                        flavourArr.push(clickedBtnText);
                    }

                    if (dataStream && dataStream.data) {
                        backorderMsg.map(function (item, index) {
                            if ($popupText.length > 0 && $popupText[index] && item.backorder_message) {
                                $popupText[index].innerText = item.backorder_message;
                            }
                        });
                    }

                    var popupParaText = $popupBackorder.text();
                    
                    if(popupParaText) {
                        $popup.addClass('popup-open');
                        
                        $html.animate({
                            scrollTop: $html.offset().top
                        }, 1000);
                    }
                    else {
                        flowData();
                        jQuery(this).addClass('active');
                    }

                }

                e.stopPropagation();
            
            }
        
            /**
               * @function
               * @desc Closes Popup
            */
            function closePopup() {
                var selectFlavourBtnText = jQuery(this)
                                            .parents('.flavour-popup')
                                            .prev('.flavour-section__desc--btn')
                                            .text();
                                            
                flavourDeselect(selectFlavourBtnText);
                
                jQuery(this)
                .parents('.flavour-popup')
                .removeClass('popup-open');

                jQuery(this)
                .parents('.flavour-popup')
                .prev('.flavour-section__desc--btn').removeClass('active');
            }

            /**
               * @function
               * @desc Closes All Popup when clicked out
            */
            function closeAllPopup() {
                jQuery('.flavour-popup').removeClass('popup-open');
            }

            /**
               * @function
               * @desc Select flavour
            */
            function selectFlavour() {  
                var clickedFlavour = jQuery(this)
                                    .parents('.flavour-popup')
                                    .prev('.flavour-section__desc--btn')
                                    .text();

                    if(flavourArr.indexOf(clickedFlavour) === -1) {
                        flavourArr.push(clickedFlavour);
                    }

                    flowData();

                    jQuery(this)
                    .parents('.flavour-popup')
                    .removeClass('popup-open');
                    jQuery(this)
                    .parents('.flavour-popup')
                    .prev('.flavour-section__desc--btn').addClass('active');
                    
            }
            
            /**
             * @function
             * @desc method to make ajax call to select product flavour with given form data
             * @return {Object} jQuery ajax promise
            */
            function subscription() {

                var query = "{ subscription(sku: \"gcon001\") { flavors { flavor backorder_message } combinations { combination plans { plan name product_id sku aw_sarp2_subscription_type delivery_split { split_qty split_flavor } price subscription_msg subscription_sku is_trial trial_period trial_price original_price shipping_price plan_qty backorders qty } } } }";
                var ajaxObj = {
                    url: ABBOTT.config.getEndpointUrl('GRAPH_QL'),
                    method: 'POST',
                    async: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'store': 'glucerna',
                        'Authorization' : 'Bearer ' + ABBOTT.utils.getSessionToken()
                    },
                    data: JSON.stringify({
                        query: ABBOTT.utils.formatGraphQLQuery(query)
                    })
                };
                return ABBOTT.http.makeAjaxCall(ajaxObj);
            }

            
            /**
             * @function
             * @desc method to get and set flavour button text 
            */

            function dataFill() {
                var flavourName = dataStream.data.subscription.flavors,
                    $flavSectionBtn = jQuery('.flavour-section__desc--btn');
                if (dataStream && dataStream.data) {
                    flavourName.map(function (item, index) {
                        if ($flavSectionBtn.length > 0 && $flavSectionBtn[index]) {
                          $flavSectionBtn[index].innerText = item.flavor;
                        }
                    });
                }
                
            }

            dataFill();
            isSubscribed();
            setTrialButton();
            $flvourBtn.on('click', openPopup);
            $closeButton.on('click', closePopup);
            $selectFlavour.on('click', selectFlavour);
            $document.on('click', closeAllPopup);
            document.dispatchEvent(new CustomEvent('title.dataLoaded', {
                detail: {
                    trialEligible: trialEligible
                }
            }));
        }); 

    })();

  })(window.ABBOTT || (window.ABBOTT = {}));
    


