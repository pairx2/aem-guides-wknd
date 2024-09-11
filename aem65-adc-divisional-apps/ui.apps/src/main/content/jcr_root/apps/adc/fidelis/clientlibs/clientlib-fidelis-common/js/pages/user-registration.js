/**
 * User Registration Page
 **/
$(document).ready(function () {

  //User Registration & My Account select all checkbox code
  let myFSuserRegPage = $('#myfreestyle-signup');
  const myAccountConsentForm = $('#myfreestyle-marketingConsent-form');
  let formOnPage;
  if (myFSuserRegPage.length) {
    formOnPage = myFSuserRegPage;
  } else {
    formOnPage = myAccountConsentForm.length ? myAccountConsentForm : null  
  }

  if (formOnPage && isOnPublish()) {
    if (hasSelectAllCheckedInDialog(formOnPage)) {
      /* Executed when the newer Select All option is used in the dialog under constraints tab */
      executeDialogCheckboxRules(formOnPage);
    }
    else {
      /* Older function executes when dialog is not used and `consentAll` is typed in the `Name` field as used to be */
      selectAllCheckbox(formOnPage);
    }
  }

  //User Registration Success page code start here
  let myFSuserRegSuccessPage = $('#userRegSuccessPage');

  if (myFSuserRegSuccessPage.length > 0 && isOnPublish()) {
    let userData = usObj && decryptData(usObj, pk, "object");
    //showcasing title and lastname on registration success
    renderUserDetails(userData, myFSuserRegSuccessPage)
  }
});

const hasSelectAllCheckedInDialog = form => form.find('.a-checkbox__input[data-select-all=true]').length > 0;

/**
 * @function
 * @desc executes optional grouping and select all rules for checkbox types chosen in the dialog
 * @param {Object} form form object
 */
const executeDialogCheckboxRules = form => {

  const $selectAllCheckbox = form.find('.a-checkbox__input[data-select-all=true]');
  const hasGroup = !!$selectAllCheckbox.data('group');
  const groupName = hasGroup ? $selectAllCheckbox.data('group-name') : null;
  const $formCheckboxes = hasGroup ? form.find('.a-checkbox__input[data-group=true][data-group-name='+groupName+']:not([data-select-all=true])') : form.find('.a-checkbox__input:not([data-select-all=true])');

  $selectAllCheckbox.on('change', function () { $formCheckboxes.prop('checked', !!$(this).prop('checked')) });

  $formCheckboxes.on('change', function () {
    if (!$(this).prop('checked')) {
      $selectAllCheckbox.prop("checked", false);
    } else if (checkRegiConsents($formCheckboxes)) {
      $selectAllCheckbox.prop("checked", true);
    }
  });
};

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
    else {
      mfRegiConsents.prop("checked", false);
    }
  });

}
