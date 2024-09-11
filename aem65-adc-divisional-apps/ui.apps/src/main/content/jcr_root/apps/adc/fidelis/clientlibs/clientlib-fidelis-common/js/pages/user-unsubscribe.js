/**
 * User myFreestyleUnsubscribeFlow Page
 **/

// Global Element variables
let myFSConsentForm;
let myFSConsentFormSubmit;
let mfUnsubConsents;
let initialCheckedBox;

$(document).ready(function () {

  /** check unsubscribeToken **/
  const unsubscribeToken = getUrlParameter('unsubscribeToken');
  if (unsubscribeToken && unsubscribeToken !== "") {
    setCookie('unsubscribeToken', unsubscribeToken, '');
  }

  /** My Freestyle User Unsubscribe - Get User consents **/
  const myFreestyleUnsubscribeFlow = $('#myfreestyle-unsubscribe-form');
  if (myFreestyleUnsubscribeFlow.length > 0 && unsubscribeToken !== '' && isOnPublish()) {
    $('#page-spinner').css('display', 'block');

    setTimeout(function () {
      $('#myfreestyle-unsubscribe-form').find('button.btn[type="submit"]').trigger('click');
    }, 500);

  } else if (unsubscribeToken == '' && isOnPublish()) {
    $('#page-spinner').css('display', 'none');
  }


  /** My Freestyle User Unsubscribe - Update User consents **/
  let myFSuserUnsubPage = $(document).find('#myfreestyle-unsubscribe');
  if (myFSuserUnsubPage.length > 0 && isOnPublish()) {

    /** function for selecting all checkbox **/
    myFSConsentForm = myFSuserUnsubPage.find('#myfreestyle-marketingConsent-form');
    if (myFSConsentForm.length > 0) {
      
      myFSConsentFormSubmit = myFSConsentForm.find('button.btn[type="submit"]');
      
      selectAllCheckbox(myFSConsentForm);

      // call to cancel unsubscribe button
      $('#myfreestyle-marketingConsent-form button[name="cancel"]').on('click', function () {
        const consents = JSON.parse(getItemSessionStorage('consents'));
        if (consents) {
          loadUnsubscribeConsentCheckList(consents);
        }
      });

      //call to save button 
      mfUnsubConsents = myFSConsentForm.find('.a-checkbox__input:not([name="consentsAll"]):not([name="tncAgree"])');
      mfUnsubConsents.on('change', function (e) {
        enableDisableUnsubscribeSubmit();
      });

    }

  }
});


/** function to load UnsubscribeConsentCheckList **/
function loadUnsubscribeConsentCheckList(data) {

  let userConsents = data;
  let formEl = $('#myfreestyle-marketingConsent-form');

  if (userConsents && formEl.length > 0) {
    for (const consent of userConsents) {
      let checkEle = formEl.find(`input[value=${consent.consentName}]`);
      if (consent.consentValue) {
        checkEle.prop('checked', true);
      } else {
        checkEle.prop('checked', false);
      }
    }

    //Function to handle selectAll checkbox
    checkUnsubscribrConsents();

    //function call to enable/disable submit button
    setInitialConsents();
  }
}


/** Function to check/unchecked selectAll checkbox **/
function checkUnsubscribrConsents() {
  const formConsentsAll = myFSConsentForm.find('.a-checkbox__input[name="consentsAll"]');
  if (checkRegiConsents(mfUnsubConsents)) {
      formConsentsAll.prop("checked", true);
  } else {
      formConsentsAll.prop("checked", false);
  }
}


/** function for setting default user consents.**/
function setInitialConsents() {
  myFSConsentFormSubmit.prop('disabled', true);

  initialCheckedBox = mfUnsubConsents.map(function () {
    return this.checked;
  }).get();

}

/** function for comparing the default consents with user selected change consents. **/
function enableDisableUnsubscribeSubmit() {
  setTimeout(function () {

    let changedCheckBox = mfUnsubConsents.map(function () {
      return this.checked;
    }).get();
  
    let isMatch = JSON.stringify(changedCheckBox) !== JSON.stringify(initialCheckedBox);

    if (isMatch) {
      myFSConsentFormSubmit.prop('disabled', false);
    } else {
      myFSConsentFormSubmit.prop('disabled', true);
    }
  }, 500);

}
