/**
 * User Registartion Page
 **/
$(document).ready(function () {

  //User Registartion select all checkbox code
  let myFSuserRegPage = $('#myfreestyle-signup');
  if (myFSuserRegPage.length > 0 && isOnPublish()) {
    selectAllCheckbox(myFSuserRegPage);
  }

  //User Registration Success page code start here
  let myFSuserRegSuccessPage = $('#userRegSuccessPage');

  if (myFSuserRegSuccessPage.length > 0 && isOnPublish()) {
    let userData = usObj && decryptData(usObj, pk, "object");
    //showcasing title and lastname on registration success
    renderUserDetails(userData, myFSuserRegSuccessPage)
  }
});


/**
 * @function
 * Summary: Function to check all consents status
 * Parameters: mfRegiConsents {Object} jQuery Object of all checkbox inputs
 */
function checkRegiConsents(mfRegiConsents) {
  let isCheckAll = true;
  mfRegiConsents.each(function () {
    if (!$(this).prop('checked')) {
      isCheckAll = false;
    }
  });
  return isCheckAll;
}

/**
 * @function
 * Summary: Function to select all consents
 * Parameters: form {Object} jQuery Object
 */
function selectAllCheckbox(form) {
  const mfRegiConsents = form.find('.a-checkbox__input:not([name="consentsAll"]):not([name="tncAgree"])');
  const mfRegiSelectAll = form.find('.a-checkbox__input[name="consentsAll"]');

  // assign on change event handler to consents checkbox
  mfRegiConsents.on('change', function () {
    if (!$(this).prop('checked')) {
      mfRegiSelectAll.prop("checked", false);
    } else if (checkRegiConsents(mfRegiConsents)) {
      mfRegiSelectAll.prop("checked", true);
    }
  });

  // assign on change event handler to selectAll checkbox
  mfRegiSelectAll.on('change', function () {
    if ($(this).prop('checked')) {
      mfRegiConsents.prop("checked", true);
    }
  });

}
