import React, { useState, useEffect, useContext } from 'react';
import { CommerceContext } from '../../context/CommerceContext';
import createConditionalEvent from '../../utils/conditional';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchESLservice } from '../../services/eslService';
import {
  addEventHandlers,
  removeEventHandlers,
  getLocalContextStoreName,
  prefillEditForm,
  isAddressDropdownFields,
  prefillAddressDropdowns,
  defaultPrefillFields,
  prefillAddAddressForm
} from '../../utils/common';
import commonConst from '../../constants/commonConts';
import { AuthContext } from '../../context/AuthContext';
import EnterAddressModal from './EnterAddressModal';
import LoadingIndicator from './LoadingIndicator';
import partialConfig from '../../config';

const MyAccountAddressForm = () => {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [authContext, setAuthContext] = useContext(AuthContext);
  const [allAddresses, setAllAddresses] = useState({});
  const [loading, setLoading] = useState(true);

  const { mountingPoints } = partialConfig;

  const authInfo =
    JSON.parse(
      localStorage.getItem(
        getLocalContextStoreName(commonConst.AUTH_LOCAL_STORAGE)
      ) || null
    ) || null;

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

  // Check this dataSource in commerceContext for corresponding address ID:
  const getAddressId = (dataSource) => {
    let data = commerceContext;
    const bracketRegex = '\\[.*]';

    if (data) {
      dataSource.split('.').forEach((chunk) => {
        const bracketMatch = chunk.match(bracketRegex);

        if (bracketMatch?.length) {
          // chunk is referencing an array index
          const index = bracketMatch[0].substring(
            1,
            bracketMatch[0].length - 1
          );
          const arr = chunk.replace(new RegExp(bracketRegex), '');

          data = data[arr][index];
        } else if (data[chunk]) {
          data = data[chunk];
        } else {
          data = {};
        }
      });
    } else {
      data = null;
    }

    return data?.id;
  };

  // Assign data attributes to form data elements for each address id:
  const assignAddressIds = () => {
    document
      .querySelectorAll('#my-account-address-form .formdata')
      .forEach((formDataEl) => {
        const addressId = getAddressId(
          formDataEl.querySelector('.checkout-form-data')?.dataset.source
        );

        if (addressId) {
          formDataEl.dataset.addressId = addressId;
        }
      });
  };

  const cleanModalInputs = (modal) => {
    const inputs = modal.querySelectorAll(
      "form input[type='text']:not([readonly])"
    );

    inputs.forEach((item) => {
      item.value = '';
    });
  };

  const prefilBasicDetails = (modal) => {
    const userInfo = authContext?.accountInfo?.userInfo;
    const prefilFields = defaultPrefillFields(userInfo);
    prefillAddAddressForm(prefilFields, modal);
  };

  const setAuthHeaderFields = (el) => {
    if (authInfo) {
      el.querySelector('input[name="x-id-token"]').value =
        authInfo.jwtToken?.id_token || null;
      el.querySelector('input[name="x-ecom-token"]').value =
        authInfo.accountInfo?.userInfo?.additionalProperties?.ecommToken ||
        null;
    } else {
      // No authInfo exists, user is likely not logged in. Reset these fields to avoid making changes to incorrect address anyway
      el.querySelector('input[name="x-id-token"]').value = null;
      el.querySelector('input[name="x-ecom-token"]').value = null;
    }
  };

  // Replaces ${} in given string with replacement value:
  const replacePlaceholder = (str, replacement) =>
    str.replace(/\$\{[^\}]*\}/g, replacement).replace(/^\s*[\r\n]/gm, '');

  const cloneAddress = (el, numOfCopies = 1) => {
    const dataSource = el.querySelector('.checkout-form-data')?.dataset?.source;
    for (let i = numOfCopies; i > 0; i--) {
      const clone = el.cloneNode(true);
      clone.classList.add(`other-address-${i}`);
      clone.querySelector(
        '.checkout-form-data'
      ).dataset.source = replacePlaceholder(dataSource, i);
      el.after(clone);
    }
  };

  const loadAddresses = async () => {
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
        (address) => !address.default_shipping && !address.default_billing
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

      setAllAddresses(
        addresses.reduce(
          (total, address) => ({
            ...total,
            [address.id]: address,
          }),
          {}
        )
      );

      return { defaultShippingAddress, defaultBillingAddress, otherAddresses };
    } catch (error) {
      let addressErrorEvent;

      switch (error?.message) {
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
    } finally {
      setLoading(false);
    }
  };

  const setDefaultAddress = async (addressId, billing) => {
    // Only attempt to reassign default if we have addresses in state and a new id
    if (allAddresses && addressId) {
      const existingDefaultIds = Object.keys(allAddresses).filter(
        (id) =>
          allAddresses[id][
            !billing ? 'default_shipping' : 'default_billing'
          ] === true
      );

      if (existingDefaultIds.length) {
        // If there are existing default shipping addresses, set their values to false:
        for (const oldDefaultId of existingDefaultIds) {
          const oldDefaultAddress = allAddresses[oldDefaultId];
          await fetchESLservice({
            service: ESL_EPT.editProfileAddress,
            data: {
              address: {
                ...oldDefaultAddress,
                default_shipping: !billing
                  ? false
                  : oldDefaultAddress.default_shipping,
                default_billing: billing
                  ? false
                  : oldDefaultAddress.default_billing,
              },
            },
            withRecaptcha: false,
            addAuthHeaders: true,
          });
        }
      }

      const newDefaultAddress = allAddresses[addressId];
      await fetchESLservice({
        service: ESL_EPT.editProfileAddress,
        data: {
          address: {
            ...newDefaultAddress,
            default_shipping: !billing
              ? true
              : newDefaultAddress.default_shipping,
            default_billing: billing ? true : newDefaultAddress.default_billing,
          },
        },
        withRecaptcha: false,
        addAuthHeaders: true,
      });

      if (commerceContext?.checkout?.stepOneFormData) {
        const newStepOneFormData = commerceContext.checkout.stepOneFormData;
        delete newStepOneFormData[billing ? 'billing' : 'shipping'];

        setCommerceContext({
          ...commerceContext,
          checkout: {
            ...commerceContext.checkout,
            stepOneFormData: newStepOneFormData,
          },
        });
      }

      // Reload page to display updated addresses:
      window.location.reload();
    }
  };

  const resetAccountData = () => {
    // Clean accountData in auth context
    if (authContext?.accountData) {
      setAuthContext({
        ...authContext,
        accountData: null,
      });
    }
  };

  useEffect(() => {
    if (!Object.keys(allAddresses).length) {
      // loadAddresses() has not completed yet
      return;
    }

    const defaultShippingAddress =
      commerceContext?.profile?.addresses?.default_shipping;
    const defaultBillingAddress =
      commerceContext?.profile?.addresses?.default_billing;
    const otherAddresses = commerceContext?.profile?.addresses?.other;

    if (defaultShippingAddress) {
      window.dispatchEvent(createConditionalEvent(true, 'hasDefaultAddress'));
    }

    if (defaultBillingAddress) {
      window.dispatchEvent(
        createConditionalEvent(true, 'hasDefaultBillingAddress')
      );
    }

    if (
      defaultShippingAddress &&
      defaultBillingAddress &&
      defaultShippingAddress?.id === defaultBillingAddress?.id
    ) {
      window.dispatchEvent(
        createConditionalEvent(true, 'hasSingleDefaultAddress')
      );
    }

    if (otherAddresses?.length) {
      window.dispatchEvent(createConditionalEvent(true, 'hasOtherAddresses'));

      if (otherAddresses.length > 1) {
        cloneAddress(
          document.querySelector(
            "[data-conditional-variable='hasOtherAddresses'] .formdata"
          ),
          otherAddresses.length - 1
        );
      }

      const firstFormDataEl = document.querySelectorAll(
        "[data-conditional-variable='hasOtherAddresses'] .formdata .checkout-form-data"
      )[0];

      // Change placeholder data source for first address:
      firstFormDataEl.dataset.source = replacePlaceholder(
        firstFormDataEl.dataset.source,
        0
      );

      // Portal will need to be re-rendered to bind FormData to the newly cloned selectors:
      window.dispatchEvent(
        new CustomEvent('rerenderPortal', {
          detail: {
            selector: '.checkout-form-data',
          },
        })
      );
    }

    assignAddressIds();
    window.dispatchEvent(createConditionalEvent(false, 'addressError'));
  }, [allAddresses]);

  useEffect(() => {
    const clickHandlers = [
      {
        selector: `#my-account-address-form #my-address-edit-default`,
        handler: async (e) => {
          const selectedAddressId = e.target.closest('.formdata')?.dataset
            ?.addressId;
          const modal = document.querySelector(
            '#my-address-edit-default-modal'
          );
          setAuthHeaderFields(modal);
          if (isAddressDropdownFields('#my-address-edit-default-modal')) {
            await prefillAddressDropdowns(allAddresses[selectedAddressId], '#my-address-edit-default-modal', $('[name="x-country-code"]').val());
          }
          prefillEditForm(allAddresses[selectedAddressId], modal);
        },
      },
      {
        selector: `#my-account-address-form #my-address-edit-other`,
        handler: async (e) => {
          const selectedAddressId = e.target.closest('.formdata')?.dataset
            ?.addressId;
          const modal = document.querySelector('#my-address-edit-other-modal');
          setAuthHeaderFields(modal);
          if (isAddressDropdownFields('#my-address-edit-other-modal')) {
            await prefillAddressDropdowns(allAddresses[selectedAddressId], '#my-address-edit-other-modal', $('[name="x-country-code"]').val());
          }
          prefillEditForm(allAddresses[selectedAddressId], modal);
          resetAccountData();
        },
      },
      {
        selector: `#my-account-address-form #my-address-delete`,
        handler: (e) => {
          const selectedAddressId = e.target.closest('.formdata')?.dataset
            ?.addressId;
          const modal = document.querySelector('#my-address-delete-modal');
          modal.querySelector(
            'input[name="address.addressId"]'
          ).value = selectedAddressId;
          setAuthHeaderFields(modal);
          resetAccountData();
        },
      },
      {
        selector: `#my-account-address-form #my-address-make-default`,
        handler: (e) => {
          const selectedAddressId = e.target.closest('.formdata')?.dataset
            ?.addressId;
          setDefaultAddress(selectedAddressId);
        },
      },
      {
        selector: `#my-account-address-form #my-address-make-default-billing`,
        handler: (e) => {
          const selectedAddressId = e.target.closest('.formdata')?.dataset
            ?.addressId;
          setDefaultAddress(selectedAddressId, true);
        },
      },
      {
        selector: `#my-account-address-form #my-address-add`,
        handler: () => {
          const modal = document.querySelector('#my-address-add-modal');
          // Reset id and default_shipping fields, as they're only used for editing an existing address:
          modal.querySelector('input[name="address.id"]').value = '';
          modal.querySelector(
            'input[name="address.default_shipping"]'
          ).value = false;
          setAuthHeaderFields(modal);
          resetAccountData();
          cleanModalInputs(modal);
          const shouldPrefillDefaultValues = modal.querySelector('input[name="shouldPrefillFields"]')?.value;
          if(shouldPrefillDefaultValues && shouldPrefillDefaultValues === '1'){
            prefilBasicDetails(modal);
          }
        },
      },
    ];

    addEventHandlers('click', clickHandlers);

    return () => {
      removeEventHandlers('click', clickHandlers);
    };
  }, [commerceContext, allAddresses]);

  useEffect(async () => {
    await loadAddresses();
  }, []);

  useEffect(() => {
    const parent = document.querySelector(mountingPoints.myAccountAddressForm);
    if (loading) {
      parent?.classList.remove('d-block');
    } else {
      parent?.classList.add('d-block');
    }
  }, [loading]);

  if (!loading && Object.keys(allAddresses).length) {
    return (
      <>
        <EnterAddressModal container="#my-address-edit-default-modal" />
        <EnterAddressModal container="#my-address-edit-other-modal" />
        <EnterAddressModal container="#my-address-add-modal" />
      </>
    );
  } else if (!loading) {
    return <EnterAddressModal container="#my-address-add-modal" />;
  } else if (loading) {
    return <LoadingIndicator />;
  }

  return null;
};

export default MyAccountAddressForm;
