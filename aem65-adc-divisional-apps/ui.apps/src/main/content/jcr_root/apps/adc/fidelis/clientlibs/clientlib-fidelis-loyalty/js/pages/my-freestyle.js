/**
 * REWARD PROFILE
 **/

$(document).ready(function () {

  // *****************************
  // Get User Reward Profile
  // *****************************

  //set reward profile api fetch interval default to 10sec
  let rewardProfileApiTime = $('[name="reward-profile-api-time"]').length > 0 ? Number($('[name="reward-profile-api-time"]').val()) : 0;

  // Disable all product cards at intial stage
  mfsRewardsShopPage.find('.product-card a.btn').addClass('disabled');
  
  //Trigger Reward Profile API
  if ((mfsMyPointsAndBadgesPage && mfsMyPointsAndBadgesPage.length > 0 || 
    mfsRewardsShopPage && mfsRewardsShopPage.length > 0 || 
    mfsElearningCoursePlayerIFrame && mfsElearningCoursePlayerIFrame.length > 0) && isOnPublish()) {
    enableDisableBadges();
    renderRewardPointsLevels();
    enableProductCards();

    getRewardProfileForm();

    // call get reward profille on defined interval
    if(rewardProfileApiTime > 0) {
      setInterval(() => {
        getRewardProfileForm();
      }, rewardProfileApiTime);
    }
  }

});


/**
 * @function
 * Summary: Function to Get User Reward Profile
 */
function getRewardProfileForm() {
  let cJwtToken = getItemLocalStorage('cJwt', true);
  let myFSGetRewardProfileForm = $('#mfs-get-rewards-profile button.btn[type="submit"]');
  if (myFSGetRewardProfileForm.length > 0 && cJwtToken && cJwtToken !== '' && isOnPublish()) {
    setTimeout(() => {
      myFSGetRewardProfileForm.trigger("click");
    }, 500);
  }
}


/**
 * @function
 * Summary: Function to render Reward Points and Level
 */
function renderRewardPointsLevels() {
  let usRwd = getItemLocalStorage('usRwd', true);
  let userRP = usRwd && decryptData(usRwd, pk, "object");

  //update points
  let currentPoint = userRP?.currentPoint && userRP?.currentPoint !== "" ? Number(userRP.currentPoint) : 0;
  $('[id*="userRewardPoints"] span.mfs-points').text(currentPoint);

  // **************************
  // EXPLORE ELEARNING BANNER - HIDE/SHOW
  // **************************
  let eLearningBanner = $('[id*="exploreElearningBanner"]');
  if (eLearningBanner.length > 0 && isOnPublish()) {
    setTimeout(() => {
      const setUserPointsEvent = createConditionalEvent(currentPoint == 0, "checkRewardsPointZero");
      window.dispatchEvent(setUserPointsEvent);
    }, 500);
  }

  // **************************
  // EXPLORE BADGES BANNER - HIDE/SHOW
  // **************************
  let usBdg = getItemLocalStorage('usBdg', true);
  let userBadges = usBdg && decryptData(usBdg, pk, "object");
  
  let badgesBanner = $('[id*="badgesBanner"]');
  let isBadgesAvailable = !!(userBadges && Array.isArray(userBadges) && userBadges.length > 0);
  if (badgesBanner.length > 0 && isOnPublish()) {
    setTimeout(() => {
      const setUserBadgesEvent = createConditionalEvent(isBadgesAvailable, "checkBadgesAvailable");
      window.dispatchEvent(setUserBadgesEvent);
    }, 500);
  }

  //update levels
  if ($('[id*="mfs-levels"]').length > 0) {
    let currentLevelId = (userRP?.currentLevelId && userRP?.currentLevelId !== "") ? userRP.currentLevelId.toUpperCase() : "";
    let mfsLevelLi = $('#mfs-levels li');
    if (currentLevelId && mfsLevelLi.length > 0) {
      mfsLevelLi.each(function () {
        let stepId = $(this).attr('data-wizardId').toUpperCase();
        if (currentLevelId == stepId) {
          $(this).removeClass('a-wizard__step--complete a-wizard-step--inactive').addClass('a-wizard__step--incomplete a-wizard-step--active');
          $(this).prevAll().removeClass('a-wizard__step--incomplete a-wizard-step--active').addClass('a-wizard__step--complete a-wizard-step--inactive');
          $(this).nextAll().removeClass('a-wizard__step--complete a-wizard-step--active a-wizard-step--inactive').addClass('a-wizard__step--incomplete');
        }
      });
    }
  }
}

/**
 * @function
 * Summary : Function to enable/disable badges
 */
function enableDisableBadges() {
  let usBdg = getItemLocalStorage('usBdg', true);
  let userBadges = usBdg && decryptData(usBdg, pk, "object");

  if (Array.isArray(userBadges) && userBadges.length > 0 && $('.mfs-badge').length > 0) {
    for (let key in userBadges) {
      $('.mfs-badge').each(function () {
        if ($(this).attr('id').toUpperCase() === userBadges[key].badgeId.toUpperCase()) {
          $(this).removeClass('mfs-badge--disabled').addClass('mfs-badge--enabled');
        }
      });
    }
  } else {
    $('.mfs-badge').removeClass('mfs-badge--enabled').addClass('mfs-badge--disabled');
  }

  // set equal height for Cards within .conatiner > .row
  setCardEqualHeight();
}

/**
 * @function
 * Summary: Function to show loader for points and levels when ESL call is in progress
 */
function showLoaderForPointsLevels(state) {
  if(state) {
    $('[id*="userRewardPoints"] span.mfs-points').hide();
    $('[id*="userRewardPoints"]').addClass('points-loading');
    $('[id*="userRewardPoints"] .a-spinner').addClass('a-spinner-show');

    $('[id*="mfs-levels"] .a-wizard__steps').addClass('skeleton-loader');
  } else {
    $('[id*="userRewardPoints"] span.mfs-points').show();
    $('[id*="userRewardPoints"]').removeClass('points-loading');
    $('[id*="userRewardPoints"] .a-spinner').removeClass('a-spinner-show');

    $('[id*="mfs-levels"] .a-wizard__steps').removeClass('skeleton-loader')
  }
}