/**
 * My Profile -  page
 **/
$(document).ready(function () {
  let userData = usObj && decryptData(usObj, pk, "object");
  // **************************
  // My Profile Page
  // **************************

  const userAddr = getItemLocalStorage('usAddr', true);

  // get address if not available
  const getAddressSubmitButton = $('#mfs-get-address button.btn[type="submit"]');
  let isAddressInValid = !userAddr && getAddressSubmitButton.length && isOnPublish();
  //Trigger Address API
  if (isAddressInValid && mfsMyAccountsPage.length || isAddressInValid && mfsRewardsShopPage.length) {
    
    // add skeleton loader
    const loader = `<div class="skeleton-loader"></div><div class="skeleton-loader"></div>`;
    if($('#myProfileAddress').siblings('.skeleton-loader').length <= 0) {
      $(loader).insertBefore( $('#myProfileAddress'));
    }

    setTimeout(() => {
      getAddressSubmitButton.trigger('click');
    }, 500);
  }

  if (mfsMyAccountsPage.length > 0 && isOnPublish()) {
    hideEmptyAddressState();
    //showcasing first name on my profile page
    renderUserDetails(userData, mfsMyAccountsPage);
    // Assign initial values to my profile Section
    initializeUserInfo(mfsMyAccountsPage);
    // Get address from localstorage
    if (userAddr) {
      getAddressData();
    }
  }
})

/**
 * @function
 * Summary: Function to hide no address container at initial stage
 */
function hideEmptyAddressState() {
  $('#noAddressState').closest('.container').hide();
  $('#changeAddress').closest('.link').css('margin-bottom', '0px');
}

/**
 * @function
 * Summary: Function to show no-address container
 */
function showEmptyAddressState() {
  if (mfsMyAccountsPage.length > 0 && isOnPublish()) {
    $('#myProfileAddress').siblings('.skeleton-loader').hide();
    $('#noAddressState').closest('.container').show();
    $('#myProfileAddressTitle').closest('.text').hide();
    $('#changeAddress').closest('.link').hide().removeClass('d-flex');
  }
}

/**
 * @function
 * Summary: Function that assigns initial user values to the form fields.
 */
function initializeUserInfo(formSection) {
  let userData = usObj && decryptData(usObj, pk, 'object');
  formSection.find('input:not([type="hidden"])').each(function () {
    let $this = $(this);
    let nameAttr = $this.attr('name');
    let inputName = nameAttr?.includes('userInfo') ? nameAttr.split('.')[1] : nameAttr;
    if (userData) {
      switch (inputName) {
        case 'title': {
          let salCheck = userData.title && $this.attr('value').toLowerCase() === userData.title.toLowerCase();
          $this.prop('checked', salCheck);
          break;
        }
        case 'fullName': {
          if(userData.firstName && userData.lastName) {
            $this.val(userData.firstName + ' ' + userData.lastName);
          }
          break;
        }
        case 'dateOfBirth': {
          $this.parents('.input-group.a-input-grp.right-icon').addClass('selected');
          break;
        }
        case 'password':
          break;
        default: {
          if (userData[inputName] !== undefined) {
            $this.val(userData[inputName]);
          } else {
            $this.val('');
          }
          break;
        }
      }
    }
    if ($(this).attr('readOnly') !== undefined && $(this).hasClass('readonly-field') === false) {
      $(this).addClass('form-control-plaintext readonly-field');
    }
  });
}

/**
 * @function
 * Summary: Function that assigns address values to the required fields.
 */

function getAddressData() {
  if (mfsMyAccountsPage.length > 0 && isOnPublish()) {
    setSessionValues();
    let userAddress = usAddr && decryptData(usAddr, pk, "object");
    if (userAddress && userAddress !== "") {
      $('#myProfileAddress').siblings('.skeleton-loader').hide();
      let setAddressFromObj = userAddress.street + ' ' + userAddress.postalCode + ' ' + userAddress.city + ' ' + userAddress.country;
      $('#myProfileAddress').show().find('p').text(setAddressFromObj);
    }
    else {
      showEmptyAddressState();
    }
    setTimeout(() => {
      setEqualHeight(false, '.a-container--border-box','', '.my-profile-column');  
    }, 100);
  }
}