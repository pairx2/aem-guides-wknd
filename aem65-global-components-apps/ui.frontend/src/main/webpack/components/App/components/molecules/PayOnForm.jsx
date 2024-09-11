import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InnerHTML from 'dangerously-set-html-content';
import PropTypes from 'prop-types';
import { CommerceContext } from '../../context/CommerceContext';
import LoadingIndicator from '../common/LoadingIndicator';
import { i18nErrorLookup, isLoggedIn } from '../../utils/common';
import { AuthContext } from '../../context/AuthContext';
import Button from '../atoms/Button';
import checkoutFormConst from '../../constants/checkoutFormConst';

function PayOnForm(props) {
  const { checkoutSummaryPageUrl, consumerComponentOption } = props;
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);
  const { t } = useTranslation();
  const [totalPayment, setTotalPayment] = useState('');
  const storedPaymentsAPI = JSON.parse(localStorage.getItem('storedPaymentsAPI'));
  const [payOnFormReady, setPayOnFormReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [renderForm, setRenderForm] = useState(false);
  const [enablePayButton, setEnablePayButton] = useState(true);
  const payOnRef = useRef(null);
  const { PAYMENT_METHOD_CC, PAYMENT_METHOD_PAYPAL } = checkoutFormConst;

  /**
   *  Function to uncheck radio buttons from CC list in payon
   *  or in CC form when other one is selected, since both of them
   *  are not in the same form/radio group
   *  @param {bool} fromRegistration If function was called from a click from CC list
   */
  const unCheckRadioButton = (fromRegistration) => {
    const radioSelected = document.querySelector(
      '[name="registrationId"]:checked'
    );

    if (
      !radioSelected ||
      (fromRegistration &&
        radioSelected.getAttribute('data-action') === 'change-registration')
    ) {
      return;
    }

    if (radioSelected) {
      radioSelected.checked = false;
      radioSelected.removeAttribute('checked');
    }
  };

  /**
   *  When CC form is focused, it makes sure to check radio button in CC form
   */
  const handleFocusIframeCommunication = () => {
    unCheckRadioButton();
    const form = document.querySelector('.wpwl-container-card');
    const radioBtnInCCform = form.querySelector('#ccFormradio');
    if (radioBtnInCCform) {
      radioBtnInCCform.checked = true;
    }
  };

  /**
   *  Adds click handlers to the radio buttons in CC List
   *  and also adds the `Visa ending` string in CC List
   */
  const setRadioButtonsHandlersAndCCtypes = () => {
    if (userIsLoggedIn) {
      // Show custom form radios
      const formRadios = document.querySelectorAll('.wpwl-registration');
      for (let index = 0; index < formRadios.length; index++) {
        const element = formRadios[index];
        const brandElement = element.querySelector('.wpwl-brand');
        const registrationId = element.querySelector(
          '.wpwl-wrapper-registration-registrationId'
        );

        // Gets pay on brand name from CSS class
        let brandName = getStringBetween(
          brandElement.className,
          'wpwl-brand wpwl-brand-',
          ' '
        );
        // Maps it with AEM i18n brandname
        brandName = mapBrandName(brandName);

        // Set brandname before ending number in CC list
        const ccNumber = element.querySelector(
          '.wpwl-wrapper-registration-number'
        );
        if (ccNumber) {
          ccNumber.innerHTML =
            t(`${brandName.toLowerCase()}_card`) +
            ' ' +
            t('ending') +
            ' ' +
            `<strong>${ccNumber.innerHTML}</strong>`;
        }
        const span = document.createElement('span');
        span.classList.add('a-radio__custom');
        registrationId.classList.add('a-radio');
        registrationId.appendChild(span);
      }

      // Handle Radio buttons click
      const form = document.querySelector('.wpwl-container-card');
      form.addEventListener('click', (e) => {
        handleFocusIframeCommunication();
        setEnablePayButton(true);
      });

      const ccLabel = document.querySelectorAll('.wpwl-registration');
      ccLabel.forEach((element) => {
        element.addEventListener('click', (e) => {
          unCheckRadioButton(true);

          // Check if selected CC is expired - If so, disable the pay button
          setEnablePayButton(!checkIfCardIsExpired(e.currentTarget));
        });
      });
    }
  };

  /**
   * Function used in the eventListener for change in {#createRegistration} checkbox
   * @param {event} e
   */
  const onStorePaymentChange = (e) => {
    toggleSetDefaultPaymentCheckbox(!e.currentTarget.checked);
  };

  /**
   * Enables or disables set default payment checkbox
   * @param {bool} disable
   */
  const toggleSetDefaultPaymentCheckbox = (disable = false) => {
    const setDefaultPaymentCheckbox = document.getElementById(
      'customParameters[SHOPPER_SET_DEFAULT_SAVED_CARD]'
    );
    const checkboxParent = setDefaultPaymentCheckbox?.closest('.a-checkbox');

    if (setDefaultPaymentCheckbox) {
      if (disable) {
        setDefaultPaymentCheckbox.setAttribute('disabled', true);
        setDefaultPaymentCheckbox.classList.add('d-none');
        setDefaultPaymentCheckbox.checked = false;
        checkboxParent.classList?.add('a-checkbox--disabled');
      } else {
        setDefaultPaymentCheckbox.removeAttribute('disabled');
        setDefaultPaymentCheckbox.classList.remove('d-none');
        checkboxParent.classList?.remove('a-checkbox--disabled');
      }
    }
  };

  /**
   * Checks if parent of given element has registration-is-expired class name.
   * This would indicate that the card is expired
   * @param {HTMLElement} element - a child of .wpwl-group
   * @returns {bool} true if card is expired, false if not expired
   *
   */
  const checkIfCardIsExpired = (element) => {
    if (!element) {
      return false;
    }
    const parentEl = element.closest('.wpwl-group');
    return (
      parentEl && [...parentEl.classList].includes('registration-is-expired')
    );
  };

  /**
   *  Adds custom checkbox in CC form to follow grapich design
   */
  const setCheckBox = () => {
    if (userIsLoggedIn) {
      setTimeout(() => {
        const saveCardWrapper = document.querySelectorAll(
          '.wpwl-wrapper-saveCard'
        );
        saveCardWrapper?.forEach((item, index) => {
          const span = document.createElement('span');
          const labelText = item.parentElement.querySelector(
            '.wpwl-label-saveCard'
          );
          const checkboxInput = item.querySelector('.wpwl-control-saveCard');
          const checkboxId = `saveCheckbox_${index}`;
          const inputName = checkboxInput?.getAttribute('name');
          span.innerHTML = `
            <label id="${checkboxId}" class="a-checkbox__label" for="${inputName}">
                <span class="a-checkbox__text">${labelText?.innerHTML}</span>
                <span class="a-checkbox__custom"></span>
            </label>
          `;
          labelText?.classList.add('d-none');
          item.classList.add('a-checkbox');
          item.appendChild(span);
          checkboxInput?.setAttribute('id', inputName);
          const saveCardCheckContainer = item.querySelector(`#${checkboxId}`);
          saveCardCheckContainer?.insertBefore(
            checkboxInput,
            saveCardCheckContainer.firstChild
          );
        });

        // If store payment details is not checked and it is not a subscription,
        // set as default payment checkbox must be disabled
        const isSubscription = document.querySelector(
          '.m-payon-form .subscription-force-saved-card'
        );

        if (!isSubscription) {
          const storePayment = document.getElementById('createRegistration');
          const storePaymentChecked = storePayment?.checked;

          if (!storePaymentChecked) {
            toggleSetDefaultPaymentCheckbox(true);
          }

          // Subscribe to checkbox change
          storePayment?.addEventListener('change', onStorePaymentChange);
        }
      }, 100);
    }
  };

  /**
   *  CC form is hidden by default, this function shows it when form is ready
   */
  const showCreditCardForm = () => {
    if (userIsLoggedIn) {
      const ccForm = document.querySelector('.wpwl-container-card');
      ccForm?.classList.add('d-block');
      ccForm?.classList.add('wpwl-container-card--with-radio');
    }
  };

  /**
   *  When CC form is ready, it adds custom code to show CC icon types at the right
   *  of the form instead of a dropdown, activates brand detection on those icons
   *  and adds radio input on CC form on top/left to follow grapich design
   */
  const setCCform = () => {
    const allowedCCtypes = paymentMethod?.allowed_cc_types;
    const allowedCCtypesArray = allowedCCtypes.split(' ');
    const firstBrand = $('.wpwl-form-card .wpwl-brand:first')
      .clone()
      .removeAttr('class')
      .attr(
        'class',
        'wpwl-brand-card wpwl-brand-custom wpwl-brand-' + allowedCCtypesArray[0]
      );
    $('.wpwl-form-card .wpwl-brand:first').after($(firstBrand));
    for (let i = 1; i < allowedCCtypesArray.length; i++) {
      const brand = $(firstBrand)
        .clone()
        .addClass('wpwl-brand-' + allowedCCtypesArray[i])
        .removeClass('wpwl-brand-' + allowedCCtypesArray[0]);
      $('.wpwl-form-card .wpwl-brand:first').after($(brand));
    }

    // Add radio input in form
    if (userIsLoggedIn) {
      $('.wpwl-container-card').prepend(
        '<div class="m-payon-form__form-radio a-radio d-inline"><label for="ccFormradio"><input type="radio" id="ccFormradio" name="registrationId" value="formCard"><span class="a-radio__custom"></span></label></div>'
      );
    }

    // Add title in form
    $('.wpwl-form-card .wpwl-group-brand').prepend(
      `<h3 class='wpwl-title'>${t(
        userIsLoggedIn ? 'add-new-card' : 'secure-card-payment'
      )}</h3>`
    );
  };

  /**
   *  Put Icon on CVV input on CC form
   */
  const setCVVicon = () => {
    const html = `<em class="abt-icon abt-icon-lock-sheild"></em>`;
    const ccvInput = document.querySelector('.m-payon-form .wpwl-wrapper-cvv');
    const icon = document.createElement('div');
    icon.classList.add('m-payon-form__cvv-icon');
    icon.innerHTML = html;
    ccvInput?.appendChild(icon);
  };

  /**
   *  When user clicks pay button, handle click either on CC list buy now button
   *  or in CC form buy now button
   */
  const handlePayBtnClick = () => {
    const ispayOnPaypal = paymentMethod?.code === PAYMENT_METHOD_PAYPAL;

    if (ispayOnPaypal) {
      document.querySelector('.wpwl-form-virtualAccount .wpwl-button')?.click();
      return;
    }

    const radioSelected = document.querySelector(
      '[name="registrationId"]:checked'
    );

    if (userIsLoggedIn && radioSelected?.id !== 'ccFormradio') {
      document.querySelector('#wpwl-registrations .wpwl-button-pay')?.click();
    } else {
      document.querySelector('.wpwl-container-card .wpwl-button-pay')?.click();
    }
  };

  /**
   *  Setting the order total in pay button
   */
  const setOrderTotalInPayBtn = () => {
    const totalValueHtml = document.querySelector('.m-minicart__total-value');

    if (totalValueHtml) {
      let totalText = '';

      for (let i = 0; i < totalValueHtml.childNodes.length; ++i) {
        const element = totalValueHtml.childNodes[i];
        if (element.nodeType === Node.TEXT_NODE) {
          totalText += element.textContent;
        }
      }

      if (totalText) {
        setTotalPayment(totalText);
      }
    }
  };

  /**
   *  Hidding payon pay buttons since react is handling it
   */
  const hidePayOnPayBtns = () => {
    const payBtns = document.querySelectorAll(
      '.m-payon-form .wpwl-group-submit'
    );
    payBtns?.forEach((item) => {
      item?.classList.add('d-none');
    });
  };

  const getStringBetween = (string, beginning, end) => {
    return string.split(beginning).pop().split(end)[0];
  };

  // Map payon brand names with shortforms in i18n translation tags names
  const mapBrandName = (brandName) => {
    let mappedBrandName = brandName;
    switch (brandName) {
      case 'MASTER':
        mappedBrandName = 'MC';
        break;
      case 'VISA':
        mappedBrandName = 'VI';
        break;
    }

    return mappedBrandName;
  };

  const showPayBtn = () => {
    if(consumerComponentOption?.toLowerCase() !== "payonsubscription") {
      // Show order total in pay button
      setOrderTotalInPayBtn();
    }
    // Pay on form ready in order to show pay button
    setPayOnFormReady(true);
  };

  const handlePayOnReady = () => {
    // Set elements in CC form once ready
    setCCform();
    // Show credit card form by default
    showCreditCardForm();
    // Show custom form radios
    setRadioButtonsHandlersAndCCtypes();
    // Show custom checkbox
    setCheckBox();
    // Hide pay buttons since react is adding custom pay button
    hidePayOnPayBtns();
    // Show custom react pay button
    showPayBtn();
  };

  const handlePayOnFocusIframe = () => {
    handleFocusIframeCommunication();
  };

  const handlePayOnChangeBrand = (e) => {
    $('.wpwl-form-card .wpwl-brand-custom').css('opacity', '0.3');
    $('.wpwl-form-card .wpwl-brand-' + e?.detail).css('opacity', '1');
  };

  const handlePayOnReadyIframe = () => {
    // Show Icon on CVV
    setCVVicon();

    // Enable or disable pay button depending on default checked CC
    const radioSelected = document.querySelector(
      '[name="registrationId"]:checked'
    );

    setEnablePayButton(!checkIfCardIsExpired(radioSelected));
  };

  /**
   * Function to check if component is hidden or not
   * @param {ref} ref: Component reference
   * @returns {bool} true if hidden
   */
  function isHidden(ref) {
    if (!ref.current) return true;
    return ref.current.offsetParent === null;
  }

  useEffect(() => {
    if(storedPaymentsAPI){
      setIsLoading(false);
    }
  },[storedPaymentsAPI])

  useEffect(() => {
    const selectedPaymentMethodResponse = consumerComponentOption?.toLowerCase() === "payonsubscription"
      ? commerceContext?.profile?.items?.subscriptionPaymentDetails
      : commerceContext?.checkout?.setPaymentMethodResponse;

    // Reset states on response null

    if (!selectedPaymentMethodResponse) {
      setIsLoading(true);
      setErrorMsg('');
      setPaymentMethod('');
      setRenderForm(false);
    } else {
      if(!storedPaymentsAPI){
        setIsLoading(false);
      }
      localStorage.removeItem('storedPaymentsAPI');
      const paymentResponse = consumerComponentOption?.toLowerCase() === "payonsubscription"
        ? commerceContext?.profile?.items?.subscriptionPaymentDetails?.response?.data?.getFormHtml
        : commerceContext?.checkout?.setPaymentMethodResponse?.response?.data?.cart?.selected_payment_method;
      setPaymentMethod(
        paymentResponse
      );

      // if there is an error
      if (
        selectedPaymentMethodResponse?.errorCode > 0 ||
        selectedPaymentMethodResponse?.response?.errors?.length > 0
      ) {
        setErrorMsg(
          selectedPaymentMethodResponse?.message ||
            i18nErrorLookup(selectedPaymentMethodResponse)?.response?.statusReason ||
            selectedPaymentMethodResponse?.response?.errors[0]?.message
        );
      }
    }

    return () => {};
  }, [commerceContext?.profile?.items?.subscriptionPaymentDetails, commerceContext?.checkout?.setPaymentMethodResponse]);

  useEffect(() => {
    const ispayOnCreditCardForm = paymentMethod?.code === PAYMENT_METHOD_CC || paymentMethod?.code === 'payon_subscription_credit_card';
    const ispayOnPaypal = paymentMethod?.code === PAYMENT_METHOD_PAYPAL;
    setRenderForm(!isHidden(payOnRef));

    if (paymentMethod && !isHidden(payOnRef)) {
      if (ispayOnCreditCardForm) {
        window.addEventListener('payon:onReady', handlePayOnReady);
        window.addEventListener('payon:onFocusIFrame', handlePayOnFocusIframe);
        window.addEventListener('payon:onChangeBrand', handlePayOnChangeBrand);
        window.addEventListener('payon:onReadyIFrame', handlePayOnReadyIframe);
      }
      if (ispayOnPaypal) {
        showPayBtn();
      }
    }

    return () => {
      window.removeEventListener('payon:onReady', handlePayOnReady);
      window.removeEventListener('payon:onFocusIFrame', handlePayOnFocusIframe);
      window.removeEventListener('payon:onChangeBrand', handlePayOnChangeBrand);
      window.removeEventListener('payon:onReadyIFrame', handlePayOnReadyIframe);

      // Remove event listener for store payment checkbox if present
      const storePayment = document.getElementById('createRegistration');
      storePayment?.removeEventListener('change', onStorePaymentChange);
    };
  }, [paymentMethod]);

  useEffect(() => {
    localStorage.removeItem('sent_to_payon');

    if (renderForm) {
      let payonPaymentBlock = document.querySelector('.payon-payments-block');

      payonPaymentBlock.addEventListener('click', function (e) {
        const submitBtn = e.target.closest('button[type="submit"].wpwl-button');
        const GpaysubmitBtn = e.target.closest('button[type="button"].gpay-card-info-container');
        const ApplepaysubmitBtn = e.target.closest('button[type="button"].wpwl-apple-pay-button');
        if (submitBtn || GpaysubmitBtn || ApplepaysubmitBtn) {
          localStorage.setItem('sent_to_payon', true);
        }
      });
    }
  }, [renderForm]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (errorMsg) {
    return <span>{`${t('error')} : ${errorMsg}`}</span>;
  }

  return (
    <div className="m-payon-form__container" ref={payOnRef}>
      {renderForm && (
        <>
          {payOnFormReady && (
            <Button
              text={`${t('pay')} ${totalPayment} ${t('and-place-order')}`}
              iconPosition="left"
              iconClass="padlock"
              disabled={!enablePayButton}
              onClick={handlePayBtnClick}
            />
          )}
          <div className='payon-payments-block'>
            <InnerHTML html={consumerComponentOption?.toLowerCase() === "payonsubscription" ? paymentMethod?.html : paymentMethod?.payon_checkout_html} />
            <InnerHTML html={`<script src='${paymentMethod?.env_url}' />`} />
          </div>
        </>
      )}
    </div>
  );
}

PayOnForm.defaultProps = {
  checkoutSummaryPageUrl: null,
};

PayOnForm.propTypes = {
  checkoutSummaryPageUrl: PropTypes.string,
  consumerComponentOption: PropTypes.string,
};

export default PayOnForm;
