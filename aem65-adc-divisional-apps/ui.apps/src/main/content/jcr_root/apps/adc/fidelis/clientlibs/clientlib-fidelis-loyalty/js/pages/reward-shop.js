let productsArr = [];
$(document).ready(function () {
  // **************************
  // Reward Shop Page
  // **************************
  let userData = usObj && decryptData(usObj, pk, "object");

  // Create product mapping array
  if(mfsMyPointsAndBadgesPage.length || mfsRewardsShopPage.length){
    $('#productMappingList-options li').each(function(){
      productsArr.push({
          "product_id": $(this).attr("data-optionvalue"),
          "product_name": $(this).find('span').text().trim()
      });
    })
  }
  
  if (mfsRewardsShopPage.length > 0 && isOnPublish()) {
    $('.redeem-no-address-state').closest('.container').hide();
    $('.redeem-popup').closest('.container').css('padding', '0px');
    orderPopupSkeletonLoader();

    // Fetch user adrress & other user info in popup on redeem button click
    $(document).on('click', '[id*="rewardProductCards"] .product-card .button .btn', function () {
      
      showhideModal('btnModalCreateOrder', 1);
      
      let modalID = '.redeem-popup';
      let productCardPoints = Number($(this).closest('.featurescard').find('.product-value').text());
      let productCardId = $(this).closest('.product-card').attr('id');
      let productCardTitle = $(this).closest('.product-card').find('.title').text().trim();
      
      // Window variable to pass product is in create order API
      window.productOrderId = productCardId;

      // Reset wizard container
      resetWizardSteps();

      // Assign initial values to my profile Section
      initializeUserInfo($(modalID));
      renderUserDetails(userData, $(modalID));

      // Assign address and name in the popup
      getRedeemAddress($(modalID));

      // Append product details in redeem popup
      appendRewardInfo($(modalID), productCardPoints, productCardId, productCardTitle)
    })
  }
})

/**
 * @function
 * Summary: Function to get address in redeem popup
 */

const addressRedirectUrl = $('[name="addressRedirectUrl"]').val();
function getRedeemAddress(redeemformsection) {
  if (mfsRewardsShopPage.length > 0 && isOnPublish()) {
    setSessionValues();
    let userAddress = usAddr && decryptData(usAddr, pk, "object");
    if (userAddress && userAddress !== "") {

      // Reset no-address state
      $('.redeem-popup input[name*="userAddress."]').show();
      $('.redeem-popup .skeleton-loader').hide();
      redeemformsection.find('#addressWizardNext').removeAttr('disabled');
      
      redeemformsection.find('form input:not([type="hidden"])').each(function () {
        let nameAttr = $(this).attr('name');
        let inputName = nameAttr?.includes('userAddress') ? nameAttr.split('.')[1] : nameAttr;
        if (nameAttr.includes('userAddress')) {
          $(this).val(userAddress[inputName]);
        }
      })

      // Fetch details for confirmation wizard
      let confirmationAddress = userAddress.street + ' ' + userAddress.postalCode + ' ' + userAddress.city + ' ' + userAddress.country;
      redeemformsection.find('.user-address').text(confirmationAddress);

      // Apppend change address button if address is present
      let changeAddrTxt = redeemformsection.find('[name="changeAddressTxt"]').val();
      appendAddressBtn(redeemformsection, changeAddrTxt, addressRedirectUrl);

    }
  }
}

/**
 * @function
 * Summary: Function to append skeleton loader in order popup
 */

function orderPopupSkeletonLoader(){
  const loader = '<div class="skeleton-loader"></div>';
  let addressFields = $('.redeem-popup input[name*="userAddress."]');
  addressFields.each(function(){
    if($(this).closest('.form-group').find('.skeleton-loader').length <= 0) {
      $(this).hide();
      $(loader).insertBefore($(this).closest('.input-group'));
    }
  })
}

/**
 * @function
 * Summary: Function to show empty address container in redeem popup
 */
function redeemEmptyAddressState(redeemformsection) {
  if (mfsRewardsShopPage.length > 0 && isOnPublish()) {
    redeemformsection.find('.redeem-no-address-state').closest('.container').show();
    redeemformsection.find('.redeem-address-state').closest('.container').hide();
    redeemformsection.find('#addressWizardNext').prop('disabled', 'true');

    // Apppend create address button if address is not present
    let createAddrTxt = redeemformsection.find('[name="createAddressTxt"]').val();
    appendAddressBtn(redeemformsection, createAddrTxt, addressRedirectUrl);
  }
}


function appendAddressBtn(redeemformsection, addressBtnTxt, addressBtnUrl) {
  if (addressBtnTxt && addressBtnTxt != "") {
    let btnMarkup = '<div class="button-div justify-content-end custom-button-address"><div class="button link a-button a-button--secondary a-button--rounded"><a class="btn" target="_blank" href="' + addressBtnUrl + '"><span>' + addressBtnTxt + '</span></a></div></div>';
    let closestWizard = redeemformsection.find('#addressWizardNext').closest('.o-wizard__btn');
    if (closestWizard.find('.custom-button-address').length == 0) {
      closestWizard.prepend(btnMarkup).removeClass('justify-content-end').addClass('justify-content-between');
    }
    else{
      closestWizard.find('.custom-button-address').remove();
      closestWizard.prepend(btnMarkup).removeClass('justify-content-end').addClass('justify-content-between');
    }
  }
}

/**
 * @function
 * Summary: Function to calculate points in redeem popup
 */
function appendRewardInfo(redeemformsection, productPoints, productCardId, productCardTitle){
  let usReward = getItemLocalStorage('usRwd', true);
  let userRP = usReward && decryptData(usReward, pk, "object");

  //update points
  let currentPoints = userRP?.currentPoint && userRP?.currentPoint !== "" ? Number(userRP.currentPoint) : 0;
  redeemformsection.find('.product-redeem-value').text(productPoints);
  redeemformsection.find('.product-remaining-point').text(currentPoints - productPoints);
  
  // Get the product name using product id from an array
  let productCardName = productCardTitle;
  for (const element of productsArr) {
    if(element.product_id == productCardId){
      productCardName = element.product_name;
    }
  }
  redeemformsection.find('.product-redeem-title').text(productCardName);
}

/**
 * @function
 * Summary: Function to Enable/Disable product cards based on reward points
 */
function enableProductCards(){
  if(mfsRewardsShopPage.length > 0 && isOnPublish()){
    let usReward = getItemLocalStorage('usRwd', true);
    let userRP = usReward && decryptData(usReward, pk, "object");

    //update points
    let currentPoints = userRP?.currentPoint && userRP?.currentPoint !== "" ? Number(userRP.currentPoint) : 0;

    // Disable all product cards initially
    let productCard = $('[id*="rewardProductCards"] .product-card');
    productCard.find('a.btn').addClass('disabled');
    
    // Enable specific cards based on available points
    productCard.each(function(){
      let itemPoints = Number($(this).find('.product-value').text());
      if(itemPoints <= currentPoints){
        $(this).addClass('enabled-card').find('a.btn').removeClass('disabled');
      }
    })
  }
}

/**
 * @function
 * Summary: Function to navigate order popup to last wizard when order is placed
 */

function updateWizardSteps(){
  $(".redeem-popup [data-wizarditem]").hide();
  $(".redeem-popup [data-wizarditem='2']").show();

  $(".redeem-popup .wizard-step")
    .addClass("a-wizard__step--complete")
    .addClass("a-wizard-step--inactive")
    .removeClass("a-wizard__step--incomplete");
}

/**
 * @function
 * Summary: Function to reset order popup wizards
 */
function resetWizardSteps(){
  $(".redeem-popup [data-wizarditem]").hide();
  $(".redeem-popup [data-wizarditem='0']").show().css({'position':'relative', 'opacity':'1'});

  $(".redeem-popup .wizard-step")
    .addClass("a-wizard__step--incomplete")
    .removeClass("a-wizard__step--complete a-wizard-step--inactive a-wizard-step--active");
    $(".redeem-popup .wizard-step[data-wizard=0]").addClass("a-wizard-step--active");

    // Reset error state
    $(".redeem-popup").closest(".modal-content").find(".modal-footer").hide();
    $(".redeem-popup #apierror_400").hide();
    $(".redeem-popup button[type=submit]").removeAttr('disabled');
}