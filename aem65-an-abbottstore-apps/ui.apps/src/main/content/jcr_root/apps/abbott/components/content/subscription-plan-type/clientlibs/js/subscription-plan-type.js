
(function(ABBOTT) {

    ABBOTT.subscriptionPlan = (function() {

        jQuery(function() {
            var orderData,
                trialEligibleOrder,
                trialplanData,
                $planButton = jQuery('.product-plans__desc--btn'),
                $subContainer = jQuery('.product-container');
            
             /**
               * @function
               * @desc Select plan
            */
            function selectPlan() {
                var selectedPlanText = jQuery(this).children('.btn-heading').text();
                trialplanData.filter( function(trialplanDataSel) {
                    var planHeading = trialplanDataSel.plan.replace(" (Trial)","");
                    if(planHeading == selectedPlanText) {
                        var selectedPlan = trialplanDataSel;
                        $subContainer.trigger('plans.dataLoaded', [selectedPlan, orderData, trialEligibleOrder]);
                        return selectedPlan;
                    }
                });
            }

            /**
             * @function
             * @desc sort plan by quantity in ascending order
             * @param {Array} plans plans list
             * @return {Array} sorted plan list
             */
            function sortPlanByQuantity(plans) {
                var plan1Qty = parseInt(plans[0].plan.match(/\d{1,2}/g)[0]);
                var plan2Qty = parseInt(plans[1].plan.match(/\d{1,2}/g)[0]);
                var firstPlan;

                if(plan1Qty > plan2Qty) {
                    firstPlan = plans.shift();
                    plans.push(firstPlan);
                }

                return plans;
            }

            /**
               * @desc Getting data from flavour selection component and displaying data
            */
            jQuery(document).on('flavours.dataLoaded', function(event, planData, trialEligible) {
                orderData = planData;
                trialEligibleOrder = trialEligible;
                $planButton.attr('disabled', false);
                $planButton.removeClass('disable-btn');
                jQuery('html').animate({
                    scrollTop: $subContainer.offset().top - 250
                }, 2000);

                var $trialbtn = jQuery('.product-plans__desc--btn .btn-heading'),
                    $originalPrice = jQuery('.product-plans__desc--btn .original-price'),
                    $discountPrice = jQuery('.product-plans__desc--btn .discount-price'),
                    $subscriptionMsg = jQuery('.product-plans__desc--content'),
                    $bracket = jQuery('.product-plans__desc--btn .bracket'),
                    trialbtndata = planData.plans,
                    trialplan = [],
                    subsplan = [];

                trialbtndata.filter(function(trialbtndataSel){
                    if(trialEligible == 'yes' && trialbtndataSel.plan.indexOf("(Trial)") !== -1) {
                        trialplan.push(trialbtndataSel);
                    } 
                    if(trialEligible !== 'yes' && trialbtndataSel.plan.indexOf("(Trial)") === -1) {
                        subsplan.push(trialbtndataSel);
                    }
                });
                
                if(trialEligible == 'yes') {

                    // sort the plan
                    trialplan = sortPlanByQuantity(trialplan);

                    // print plan buttons on UI
                    trialplan.forEach(function(item, index) {
                        if ( $trialbtn && $trialbtn.length > 0 && $trialbtn[index]) {
                            $trialbtn[index].innerText = item.plan.replace(" (Trial)","");
                            $originalPrice[index].innerText = "$" + item.original_price;
                            $discountPrice[index].innerText = "$" + item.trial_price;
                            $subscriptionMsg[index].innerHTML = item.subscription_msg;
                        } 
                    });
                 } else {
                    $bracket.addClass('d-none');
                    $subscriptionMsg.addClass('d-none');

                    // sort the plan
                    subsplan = sortPlanByQuantity(subsplan);

                    // print plan buttons on UI
                    subsplan.forEach(function(item, index) {
                        if ( $trialbtn && $trialbtn.length > 0 && $trialbtn[index]) {
                            $trialbtn[index].innerText = item.plan;
                            $discountPrice[index].innerText = "$" + item.price.toFixed(2)+"/MONTH";
                        }
                    });
                }

                trialplanData = trialbtndata;
                
            });
            
            $planButton.on('click', selectPlan);

        }); 

    })();

})(window.ABBOTT || (window.ABBOTT = {}));