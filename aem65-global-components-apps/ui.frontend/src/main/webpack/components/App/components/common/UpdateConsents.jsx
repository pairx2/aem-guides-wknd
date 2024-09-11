import { useState, useEffect } from 'react';
import {
  addEventHandlers,
  removeEventHandlers,
  getCheckboxState,
  cartContainsSubscription,
  lessThanMinutesAgo,
} from '../../utils/common';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchESLservice } from '../../services/eslService';

const UpdateConsents = () => {
  const [missingConsents, setMissingConsents] = useState([]);
  const consentFormSelector = '#section-update-consents-form';
  const { checkoutPage } = document.querySelector('body')?.dataset;
  const consentForm = document.querySelector(consentFormSelector);
  const submitConsentsButton = document.getElementById('submitConsentsBtn');
  const redirectUrl = submitConsentsButton.href;
  const checkboxes = consentForm.querySelectorAll(
    '.options .checkbox .a-checkbox'
  );

  /**
   * @description - Takes input value and returns on object with the separated name and version values
   * @param {string} consentStr Consent string expected in format consentName|consentVersion
   * @returns {obj} Consent name and version
   */
  const getConsentNameAndVersion = (consentStr) => {
    let consentName;
    let consentVersion;

    if (!consentStr.includes('|')) {
      consentName = consentStr;
      consentVersion = null;
    } else {
      consentName = consentStr.split('|')[0];
      consentVersion = consentStr.split('|')[1];
    }

    return {
      consentName,
      consentVersion,
    };
  };

  /**
   * @description - Validates whether all required consents are checked
   */
  const validateRequiredCheckboxes = () => {
    const requiredCheckboxes = $(
      `${consentFormSelector} input[type="checkbox"][data-required="true"]`
    ).filter(':visible');

    let validCheckboxes = 0;

    requiredCheckboxes.each((i, el) => {
      validCheckboxes += getCheckboxState(el);
    });

    if (validCheckboxes === requiredCheckboxes.length) {
      // Valid -- all boxes are checked
      submitConsentsButton.removeAttribute('disabled');
    } else {
      // Invalid
      submitConsentsButton.setAttribute('disabled', true);
    }
  };

  const fillHiddenFields = () => {
    const emailValue = document.querySelector('#userName')?.value;
    const passwordValue = document.querySelector('#password')?.value;
    document.querySelector('#termsUserName').value = emailValue;
    document.querySelector('#termsPassword').value = passwordValue;
    document.querySelector('#loginTitle')?.classList.add('d-none');
  };

  /**
   * @description - Reassigns checkbox values to reflect the desired consent versions
   * - The format is consentName|consentVersion
   */
  const setConsentInputVersion = () => {
    missingConsents.forEach((missingConsent) => {
      for (let j = 0; j < checkboxes.length; j++) {
        const input = checkboxes[j].querySelector('input[type="checkbox"]');

        if (!input) {
          continue;
        }

        const { consentName, consentVersion } = getConsentNameAndVersion(
          input?.value
        );

        if (
          consentName === missingConsent.consentName &&
          consentVersion !== missingConsent.consentVersion
        ) {
          input.value = `${consentName}|${missingConsent.consentVersion}`;
        }
      }
    });
  };

  /**
   * @description - Shows the consents that are missing, and hides the ones that are not
   * - Only 'required' inputs will be submitted on login
   */
  const displayCorrectInputs = () => {
    const missingConsentNames = missingConsents?.map(
      (consent) => consent.consentName
    );

    for (let i = 0; i < checkboxes.length; i++) {
      const input = checkboxes[i].querySelector('input[type="checkbox"]');
      const inputValue = input?.value.split('|')[0];
      input.checked = false;

      if (!missingConsentNames.includes(inputValue)) {
        // This consent has already been accepted, hide it
        input.dataset.required = 'false';
        checkboxes[i].style.display = 'none';
      } else {
        // This consent is missing, show its checkbox
        input.dataset.required = 'true';
        checkboxes[i].style.display = 'block';
      }
    }
  };

  /**
   * @description - Attempts to log user in with the updated consents
   */
  const submitForm = async () => {
    let errorObj;

    try {
      let consentValues = [];
      submitConsentsButton.setAttribute('disabled', true);

      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].querySelector('input[type="checkbox"]')?.checked) {
          consentValues.push({
            ...getConsentNameAndVersion(
              checkboxes[i].querySelector('input[type="checkbox"]')?.value
            ),
            consentValue: true,
          });
        }
      }

      const cartId = JSON.parse(
        localStorage.getItem(getLocalCommerceContextName())
      )?.cart?.id;

      const { data } = await fetchESLservice({
        service: ESL_EPT.login,
        data: {
          loginID: document.getElementById('userName')?.value,
          password: document.getElementById('password')?.value,
          consents: consentValues,
          cartId,
        },
      });

      if (data.status && !data.errorCode) {
        const guestSubscriptionFlowActive = localStorage.getItem(
          'guestSubscriptionFlow'
        );

        await OnNaveCommLoginSuccess(data);

        const commerceContext = JSON.parse(
          localStorage.getItem(getLocalCommerceContextName())
        );

        if (
          cartContainsSubscription(commerceContext) &&
          guestSubscriptionFlowActive &&
          lessThanMinutesAgo(JSON.parse(guestSubscriptionFlowActive), 10) &&
          checkoutPage
        ) {
          // Redirect to checkout
          window.location.href = checkoutPage;
        } else {
          // Redirect to account dashboard or referrer:
          window.location.href = redirectUrl || document.referrer;
        }
      } else {
        errorObj = data;
        throw new Error();
      }
    } catch (e) {
      await OnNavEcommLoginError(errorObj);
      submitConsentsButton.removeAttribute('disabled');
    }
  };

  useEffect(() => {
    if (missingConsents.length) {
      fillHiddenFields();
      setConsentInputVersion();
      displayCorrectInputs();
      validateRequiredCheckboxes();
    }
  }, [missingConsents]);

  useEffect(() => {
    const changeHandlers = [
      {
        selector: `${consentFormSelector} input[type="checkbox"]`,
        handler: (e) => {
          validateRequiredCheckboxes();
        },
      },
    ];

    const clickHandlers = [
      {
        selector: `#submitConsentsBtn`,
        handler: async (e) => {
          e.preventDefault();
          if (!submitConsentsButton.hasAttribute('disabled')) {
            await submitForm();
          }
        },
      },
      {
        selector: `#dontAgreeTermsBtn`,
        handler: (e) => {
          const termHasChangedEvent = createConditionalEvent(
            'dontAgree',
            'TermHasChange'
          );
          window.dispatchEvent(termHasChangedEvent);
        },
      },
      {
        selector: `#logOutDontAgree`,
        handler: (e) => {
          OnNaveCommLogoutSuccess(true);
        },
      },
      {
        selector: `#goBackdontAgree`,
        handler: (e) => {
          const termHasChangedEvent = createConditionalEvent(
            true,
            'TermHasChange'
          );
          window.dispatchEvent(termHasChangedEvent);
        },
      },
    ];

    // The 'missingConsents' event will be fired from signIn.js
    window.addEventListener('missingConsents', (val) => {
      setMissingConsents(val?.detail);
    });

    addEventHandlers('change', changeHandlers);
    addEventHandlers('click', clickHandlers);

    return () => {
      removeEventHandlers('change', changeHandlers);
      removeEventHandlers('click', clickHandlers);
    };
  }, []);

  return null;
};

export default UpdateConsents;
