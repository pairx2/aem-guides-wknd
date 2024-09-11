import React, { useState, useEffect, useContext } from 'react';

import { CommerceContext } from '../../../context/CommerceContext';
import createConditionalEvent from '../../../utils/conditional';

import { ErrorBoundary } from '../../../context/ErrorContext';
import StepOneController from './StepOneController';
import StepTwoController from './StepTwoController';
import StepThreeController from './StepThreeController';

const CheckoutFormController = () => {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [checkoutBlocked, setCheckoutBlocked] = useState(false);

  useEffect(() => {
    // Reset Checkout Form Context on Mount
    // Don't reset form if we are going to show order failure error
    // Since we need to use the data to resubmit form
    if (!commerceContext?.checkout?.orderFailure  && (!commerceContext?.checkoutStep || commerceContext?.checkoutStep == 1)) {
      setCommerceContext({
        ...commerceContext,
        checkoutStep: 1,
        checkout: {
          ...commerceContext?.checkout,
          billingResponse: null,
          shippingMethodsResponse: null,
          shippingResponse: null,
          paymentMethodsResponse: null,
          setPaymentMethodResponse: null,
          selectedShippingMethod: null,
        },
      });
      localStorage.removeItem('paymentMethodsResponse');
      localStorage.removeItem('paymentMethodsPayload');
    }
  }, []);

  useEffect(() => {
    const prefillEditAddressForms = () => {
      const forms = {
        shipping: '#shipping-address-edit-form form',
        billing: '#billing-address-edit-form form',
      };

      Object.keys(forms).forEach((formType) => {
        const form = document.querySelector(forms[formType]);
        const stepOneFormData = commerceContext?.checkout?.stepOneFormData;
        if (!stepOneFormData) {
          return;
        }

        const addressInformation = stepOneFormData[formType]?.address;

        if (form && addressInformation) {
          const addressFields = [
            {
              input: form.querySelector('input[name="firstName"]'),
              contextValue: addressInformation.firstName,
            },
            {
              input: form.querySelector('input[name="lastName"]'),
              contextValue: addressInformation.lastName,
            },
            {
              input: form.querySelector('input[name="address1"]'),
              contextValue: addressInformation.streetLine1,
            },
            {
              input: form.querySelector('input[name="address2"]'),
              contextValue: addressInformation.streetLine2,
            },
            {
              input: form.querySelector('input[name="zipCode"]'),
              contextValue: addressInformation.zipCode,
            },
            {
              input: form.querySelector('input[name="city"]'),
              contextValue: addressInformation.city,
            },
            {
              input: form.querySelector('input[name="telephone"]'),
              contextValue: addressInformation.telephone,
            },
          ];

          addressFields.forEach(({ input, contextValue }) => {
            if (input && contextValue) {
              input.value = contextValue;
            }
          });
        }
      });
    };

    const updateAddressHandler = (event) => {
      if (!event?.detail?.address) {
        console.error('No address was returned');
      }

      const updatedAddress = {
        firstName: event.detail.address.firstName,
        lastName: event.detail.address.lastName,
        streetLine1: event.detail.address.address1,
        streetLine2: event.detail.address.address2,
        zipCode: event.detail.address.zipCode,
        city: event.detail.address.city,
        telephone: event.detail.address.telephone,
      };

      if (event.detail.type === 'shippingAddress') {
        setCommerceContext({
          ...commerceContext,
          checkout: {
            ...commerceContext.checkout,
            stepOneFormData: {
              ...commerceContext.checkout.stepOneFormData,
              shipping: {
                ...commerceContext.checkout.stepOneFormData.shipping,
                address: {
                  ...commerceContext.checkout.stepOneFormData.shipping.address,
                  ...updatedAddress,
                },
              },
            },
          },
        });
        $('#shipping-address-edit-form')
          .closest('.generic-modal.show')
          .find('.generic-modal--close')
          .click();
      } else if (event.detail.type === 'billingAddress') {
        setCommerceContext({
          ...commerceContext,
          checkout: {
            ...commerceContext.checkout,
            stepOneFormData: {
              ...commerceContext.checkout.stepOneFormData,
              billing: {
                ...commerceContext.checkout.stepOneFormData.billing,
                address: {
                  ...commerceContext.checkout.stepOneFormData.billing.address,
                  ...updatedAddress,
                },
              },
            },
          },
        });
        $('#billing-address-edit-form')
          .closest('.generic-modal.show')
          .find('.generic-modal--close')
          .click();
      } else {
        console.error(`Unsupported address form type ${event.detail.type}`);
      }
    };

    setCheckoutBlocked(commerceContext?.cart?.gated_checkout?.checkout_blocked);
    prefillEditAddressForms();
    document.addEventListener('addressUpdate', updateAddressHandler);
    document.addEventListener('addressUpdateCallback', prefillEditAddressForms);

    return () => {
      document.removeEventListener('addressUpdate', updateAddressHandler);
      document.removeEventListener(
        'addressUpdateCallback',
        prefillEditAddressForms
      );
    };
  }, [commerceContext, setCommerceContext]);

  useEffect(() => {
    const checkoutWizard = document.querySelector('.o-wizard__container');

    window.dispatchEvent(
      createConditionalEvent(checkoutBlocked, 'preventCheckout')
    );

    if (checkoutWizard) {
      // Show or hide checkout wizard depending on if user is permitted to checkout:
      checkoutWizard.style.display = checkoutBlocked ? 'none' : 'block';
    }
  }, [checkoutBlocked]);

  return (
    <ErrorBoundary>
      <StepOneController />
      <StepTwoController />
      <StepThreeController />
    </ErrorBoundary>
  );
};

export default CheckoutFormController;
