import React, { useEffect, useContext } from 'react';

import { isLoggedIn } from '../../../utils/common';
import createConditionalEvent from '../../../utils/conditional';
import { AuthContext } from '../../../context/AuthContext';
import { CommerceContext } from '../../../context/CommerceContext';

const OrderSummaryController = () => {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);

  /**
   *
   * @returns resend email form button
   */
  const getSubmitResendEmailFormButton = () =>
    document.querySelector(
      '#order-summary-page #resend-email-form button[type="submit"]'
    );

  /**
   * Function that is going to handle resend email form click from content
   * and will fire the loading state
   * @param {HTMLElement} e
   */
  const postPurchaseSendEmailAgain = (e) => {
    e.preventDefault();

    const submitBtnResendEmailForm = getSubmitResendEmailFormButton();
    submitBtnResendEmailForm?.click();
    window.dispatchEvent(
      createConditionalEvent('loading', 'resendEmailValidation')
    );
  };

  /**
   * When resend email validation is successful, show modal
   */
  const subscribeToSuccess = () => {
    window.addEventListener(
      'conditional-component-change',
      (e) => {
        const detail = e.detail;

        if (
          detail?.var === 'resendEmailValidation' &&
          detail?.value === 'success'
        ) {
          document.querySelector('#send-email-again-modal-btn')?.click();
        }
      },
      false
    );
  };

  /**
   * Hidding submit button on resend email form and adding event listener
   * to content anchor for resend email text
   */
  const resendEmailFormSetUp = () => {
    // Hide submit button in Resend Email Form
    const submitBtnResendEmailForm = getSubmitResendEmailFormButton();
    submitBtnResendEmailForm?.classList.add('d-none');

    // Add click event listener to resend email content link
    document
      .querySelector('#postPurchaseSendEmail a')
      ?.addEventListener('click', postPurchaseSendEmailAgain);

    // it will subscribe to event success on resend email form
    subscribeToSuccess();
  };

  useEffect(() => {
    const firstNameField = document.querySelector(
      '#order-summary-page input[name="userInfo.firstName"]'
    );
    const lastNameField = document.querySelector(
      '#order-summary-page input[name="userInfo.lastName"]'
    );
    const emailField = document.querySelector(
      '#order-summary-page input[name="userInfo.email"]'
    );
    const orderIdField = document.querySelector(
      '#order-summary-page input[name="userInfo.additionalProperties.orderId"]'
    );
    const protectCodeField = document.querySelector(
      '#order-summary-page input[name="userInfo.additionalProperties.protectCode"]'
    );
    const emailFieldResendForm = document.querySelector(
      '#order-summary-page #resend-email-form input[name="email"]'
    );

    const shippingAddress =
      commerceContext?.checkout?.stepOneFormData?.shipping?.address;

    const orderData = commerceContext?.checkout?.orderData?.response;

    if (shippingAddress) {
      firstNameField.value = shippingAddress.firstName;
      lastNameField.value = shippingAddress.lastName;
      emailField.value = shippingAddress.email;

      if (emailFieldResendForm) {
        emailFieldResendForm.value = shippingAddress.email;
      }
    }

    if (orderData && orderIdField && protectCodeField) {
      orderIdField.value = orderData.increment_id;
      protectCodeField.value = orderData.protect_code;
    }

    if (!userIsLoggedIn) {
      window.dispatchEvent(createConditionalEvent(true, 'showPasswordForm'));
    } else {
      window.dispatchEvent(createConditionalEvent(false, 'showPasswordForm'));
    }

    window.addEventListener('registrationSuccess', () => {
      // Registration was successful, display message in UI:
      window.dispatchEvent(
        createConditionalEvent('success', 'showPasswordForm')
      );
    });

    // set up resend email form
    resendEmailFormSetUp();
  }, []);

  return null;
};

export default OrderSummaryController;
