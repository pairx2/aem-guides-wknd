import React, { useEffect, useContext } from 'react';
import { CommerceContext } from '../../context/CommerceContext';
import createConditionalEvent from '../../utils/conditional';
import { cleanDisplayString } from '../../utils/common';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchESLservice } from '../../services/eslService';

const MyAccountOverview = () => {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);

  /**
   * Formats address from API response to include properties needed for
   * FormData component and "edit address" calls
   */
  const formatAddresses = (arr) =>
    arr.map((address) => ({
      id: address.id,
      nameOfAddress: address.name_of_address,
      prefix: address.prefix,
      firstName: address.firstname,
      middleName: address.middlename,
      lastName: address.lastname,
      zipCode: address.postcode,
      region: address.region?.region,
      streetLine1: address.street[0],
      streetLine2: address.street[1],
      telephone: address.telephone,
      city: address.city,
      countryId: address.country_code,
      default_billing: address.default_billing,
      default_shipping: address.default_shipping,
    }));

  const getAddresses = async () => {
    try {
      const { data, errorCode } = await fetchESLservice({
        service: ESL_EPT.getProfileAddress,
        withRecaptcha: false,
        addAuthHeaders: true,
      });

      if (errorCode) {
        throw new Error('Error');
      }

      const returnedAddresses = data?.response?.data?.customer?.addresses;

      if (!returnedAddresses.length) {
        throw new Error('No addresses found');
      }

      const addresses = formatAddresses(returnedAddresses);
      const defaultShippingAddress = addresses.find(
        (address) => address.default_shipping === true
      );
      const defaultBillingAddress = addresses.find(
        (address) => address.default_billing === true
      );
      const otherAddresses = addresses.filter(
        (address) => !address.default_shipping
      );

      // Set shipping addresses:
      setCommerceContext({
        ...commerceContext,
        profile: {
          ...commerceContext.profile,
          addresses: {
            other: otherAddresses,
            default_shipping: defaultShippingAddress,
            default_billing: defaultBillingAddress,
          },
        },
      });

      if (defaultShippingAddress) {
        window.dispatchEvent(
          createConditionalEvent(true, 'hasDefaultShippingAddress')
        );
      }

      if (defaultBillingAddress) {
        window.dispatchEvent(
          createConditionalEvent(true, 'hasDefaultBillingAddress')
        );
      }
    } catch (error) {
      let addressErrorEvent;

      switch (error) {
        case 'No addresses found':
          addressErrorEvent = createConditionalEvent(
            'noAddresses',
            'addressError'
          );
          break;
        case 'Error':
        default:
          addressErrorEvent = createConditionalEvent('error', 'addressError');
          break;
      }

      window.dispatchEvent(addressErrorEvent);
    }
  };

  useEffect(async () => {
    const accountTitle = document.querySelector(
      '#myfreestyle-my-account-title h2'
    );
    const accountTitleDevice = document.querySelector(
      '#myfreestyle-my-account-title-mobile h2'
    );
    const firstName = cleanDisplayString(
      commerceContext?.profile?.userInfo?.firstName || ''
    );

    if (accountTitle) {
      accountTitle.innerHTML = accountTitle.innerHTML.replace(
        '{{firstName}}',
        firstName
      );
    }

    if (accountTitleDevice) {
      accountTitleDevice.innerHTML = accountTitleDevice.innerHTML.replace(
        '{{firstName}}',
        firstName
      );
    }

    if (commerceContext?.profile?.addresses?.default_shipping) {
      window.dispatchEvent(
        createConditionalEvent(true, 'hasDefaultShippingAddress')
      );
    }

    if (commerceContext?.profile?.addresses?.default_billing) {
      window.dispatchEvent(
        createConditionalEvent(true, 'hasDefaultBillingAddress')
      );
    }

    await getAddresses();
  }, []);

  return null;
};

export default MyAccountOverview;
