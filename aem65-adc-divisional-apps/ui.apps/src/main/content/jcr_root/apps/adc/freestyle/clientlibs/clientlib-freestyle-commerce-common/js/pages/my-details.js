/**
 * My Details Page (My Account > My Details)
 */
(function (document, $) {
  /*
   *  Dependencies in this code are managed via ClientLibs. Requires Fidelis
   *  version to be executed first. This code updates the Fidelis code adding
   *  previously absent options and targets.
   */

  const initialize = {};

  /*
   *  Include and initiate new sections (email and password as separate
   *  sections) that the Fidelis' `my-account-contact` code does not cover.
   *  Preferably this code should be merged into Fidelis and then refactored.
   *  This code tries to mimic the existing Fidelis code for readability.
   */
  initialize.newSections = () => {
    const myAccountPage = $(document).find('#myaccount-details');

    if (myAccountPage.length && typeof Granite.author === 'undefined') {
      const emailSection = myAccountPage.find('#myfreestyle-mydetails-email-update');
      const passwordSection = myAccountPage.find('#myfreestyle-mydetails-password-update');

      if (emailSection.length > 0) {
        initializeUserInfo(emailSection); // Assign initial values to the Email Section

        emailSection.on('click', '#mydetails-email-edit', function () {
          // On click of Edit link in read-only mode
          userInfoWriteMode(emailSection);
          enableEmailValidation(emailSection);
        });

        emailSection.on('click', '#mydetails-email-cancel', function () {
          // On click on Cancel Changes button in edit mode
          initializeUserInfo(emailSection);
        });
      }

      if (passwordSection.length > 0) {
        initializeUserInfo(passwordSection); // Assign initial values to the Email & Password Section

        passwordSection.on('click', '#mydetails-password-edit', function () {
          // On click of Edit link in read-only mode
          userInfoWriteMode(passwordSection);
        });

        passwordSection.on('click', '#mydetails-password-cancel', function () {
          // On click on Cancel Changes button in edit mode
          initializeUserInfo(passwordSection);
        });
      }
    }
  };

  /*
   *  User Info Section
   *  Executes prior to existing Fidelis function. Fidelis doesn't account for
   *  a dropdown menu. This code integrates the dropdown menu into the form to
   *  be functional both at initialization and/or submissions.
   */

  initialize.userInfoSection = () => {
    if (initializeUserInfo && typeof initializeUserInfo === 'function') {
      const fidelisInitializeUserInfo = initializeUserInfo;

      initializeUserInfo = function (formSection, readMode = 1) {
        const userInfo = getLocalUserInfo();

        if (userInfo) {
          const saluteDropdownSelector = '#salute-options .a-dropdown__field > span';
          const saluteDropdownList = '#salute-options ul.a-dropdown__menu li';
          const placeholderSalutation = 'Choose a salutation';
          const saluteDropdown = document.querySelector(saluteDropdownSelector);

          const initializeDropdown = (li) => {
            /* Initializes and updates the dropdown for salutation. */
            if (li.classList.contains('selected')) {
              li.classList.remove('selected');
              li.removeAttribute('aria-selected');
            }

            if (li.dataset.optionvalue && li.dataset.optionvalue === userInfo.title) {
              li.classList.add('selected');
              li.setAttribute('aria-selected', 'true');

              const selectedText = li.textContent?.trim();
              saluteDropdown.textContent = !!selectedText ? selectedText : placeholderSalutation;
            }
          };

          fidelisInitializeUserInfo(formSection, readMode);
          document.querySelectorAll(saluteDropdownList).forEach((li) => initializeDropdown(li));

          formSection.find('form input:not([type="hidden"])').each((inputIndex, inputElement) => {
            const nameAttribute = $(inputElement).attr('name');
            const inputName =
              nameAttribute && nameAttribute.includes('userInfo') ? nameAttribute.split('.')[1] : nameAttribute;

            if (inputName === 'fullName') {
              const nameParts = Object.values(
                (({ title, firstName, middleName, lastName }) => ({ title, firstName, middleName, lastName }))(
                  userInfo || {}
                )
              ).filter((part) => !!part);

              $(inputElement).val(`${nameParts.join(' ')}`);
            } else if (!!userInfo[inputName]) {
              $(inputElement).val(userInfo[inputName]);
            }
          });
        }
      };
    }
  };

  /* Email and Password Sections - Update read mode to have email and password as separate sections vs combined */

  initialize.userInfoReadMode = () => {
    if (initializeUserInfo && typeof initializeUserInfo === 'function') {
      userInfoReadMode = function (formSection) {
        let saluteEle = formSection.find('#salute-options');
        let section = saluteEle.length ? 'userMyInfo' : 'emailPassword';
        if (saluteEle.length) {
          saluteEle.hide();
        }
        formSection
          .find('.a-input-field input:not([type="hidden"]):not([type="radio"]):not([class*="hidden-"])')
          .each(function () {
            if ($(this).attr('readOnly') !== undefined) {
              $(this).parents('.a-input-field').show();
            } else {
              $(this).parents('.a-input-field').hide();
            }
          });

        [
          'myfreestyle-mydetails-email-required',
          'mydetails-password-disclaimer',
          'myfreestyle-mydetails-password-required',
        ].forEach((id) => {
          if (formSection.find(`#${id}`)) {
            formSection.find(`#${id}`).hide();
          }
        });

        ['mydetails-password-edit', 'mydetails-email-edit'].forEach((id) => {
          if (formSection.find(`#${id}`)) {
            formSection.find(`#${id}`).show();
          }
        });

        formSection.find(`#${section}-required`).hide();
        formSection.find(`#${section}-edit`).show();
        formSection.find('.button.a-button').hide();
        formSection.addClass('in-preview-state');
        formSection.find('.o-form-container__success-msg').text('');
      };
    }
  };

  initialize.userInfoWriteMode = () => {
    if (initializeUserInfo && typeof initializeUserInfo === 'function') {
      userInfoWriteMode = function (formSection) {
        let userInfo = getLocalUserInfo();
        let saluteEle = formSection.find('#salute-options');
        let section = saluteEle.length ? 'userMyInfo' : 'emailPassword';
        if (saluteEle.length) {
          saluteEle.show();
        }
        formSection
          .find('.a-input-field input:not([type="hidden"]):not([type="radio"]):not([class*="hidden-"])')
          .each(function () {
            if ($(this).attr('readOnly') !== undefined) {
              $(this).parents('.a-input-field').hide();
            } else {
              $(this).parents('.a-input-field').show();
              if (userInfo && $(this).attr('name') === 'userInfo.dateOfBirth') {
                $(this)
                  .parents('.input-group.a-input-grp.right-icon')
                  .next('.a-date-picker__input-hidden')
                  .find('input')
                  .val(userInfo['dateOfBirth']);
              }
              if (userInfo && $(this).attr('name') === 'userInfo.middleName') {
                $(this).val(userInfo['middleName']);
              }
              if (userInfo && $(this).attr('name') === 'userInfo.fiscalCode') {
                $(this).val(userInfo['fiscalCode']);
              }
            }
          });

        [
          'myfreestyle-mydetails-email-required',
          'mydetails-password-disclaimer',
          'myfreestyle-mydetails-password-required',
        ].forEach((id) => {
          if (formSection.find(`#${id}`)) {
            formSection.find(`#${id}`).show();
          }
        });

        ['mydetails-password-edit', 'mydetails-email-edit'].forEach((id) => {
          if (formSection.find(`#${id}`)) {
            formSection.find(`#${id}`).hide();
          }
        });

        formSection.find(`#${section}-required`).show();
        formSection.find(`#${section}-edit`).hide();
        formSection.removeClass('in-preview-state');
        formSection.find('.button.a-button').show();
      };
    }
  };

  var enableEmailValidation = (formSection) => {
    let submitButton = $('#mydetails-email-save');
    let emailField = $('#email');
    let validationField = $('#confirmEmail');

    if (!validationField) {
      return;
    }
    $(submitButton).attr('disabled', true);
    $(formSection).on('keyup focusout', '#email, #confirmEmail', function () {
      if (!validationField.val()) {
        $(validationField).parents('.form-group.a-form-grp').removeClass('custom-validation-error');
        return;
      }
      if (emailField.val() === validationField.val()) {
        $(submitButton).removeAttr('disabled');
        $(validationField).parents('.form-group.a-form-grp').removeClass('custom-validation-error');
      } else {
        $(submitButton).prop('disabled', true);
        $(validationField).parents('.form-group.a-form-grp').addClass('custom-validation-error');
      }
    });
  };

  initialize.userInfoReadMode();
  initialize.userInfoWriteMode();
  initialize.userInfoSection();

  $(() => initialize.newSections());
  
  
  //firstname issue on account overview 
	const accountTitlenewtext = document.querySelector('#myfreestyle-my-account-title h2');
	const accountTitleDevicenewtext = document.querySelector('#myfreestyle-my-account-title-mobile h2');
	if (accountTitlenewtext) {
	  accountTitlenewtext.innerHTML = accountTitlenewtext.innerHTML.replace('<!-- -->','');
	}
	if (accountTitleDevicenewtext) {
	  accountTitleDevicenewtext.innerHTML = accountTitleDevicenewtext.innerHTML.replace('<!-- -->','');
	}
  //firstname issue on account overview
  
  
})(document, jQuery);
