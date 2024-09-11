import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchESLservice } from '../../services/eslService';
import { AddressSuggestions } from '../molecules/AddressSuggestions';
import LoadingIndicator from './LoadingIndicator';
import {
  addEventHandlers,
  objsHaveSameData,
  prefillDropdownValues,
  removeEventHandlers,
  validateAddress,
  isAddressDropdownFields,
  getCities,
  setAddressDropdownToDefault,
} from '../../utils/common';
import { CommerceContext } from '../../context/CommerceContext';

import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../i18n';

import createConditionalEvent from '../../utils/conditional';

const EnterAddressModal = ({ container, onSuccess }) => {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);

  const modalId = `${container} #enter-address-modal`;

  if (!modalId) {
    return;
  }

  const shouldSkipAddressValidation =
    document.querySelector(`${modalId} [name="shouldSkipAddressValidation"]`)
      ?.value === 'true';
  const enableGoogleAddressCheck =
      document.querySelector(`${modalId} [name="enableGoogleAddressCheck"]`)
        ?.value === 'true';
  const enableManualAddressEntry =
      document.querySelector(`${modalId} [name="enableManualAddressEntry"]`)
        ?.value === 'true';      

  const [loading, setLoading] = useState(false);
  const [addressHasError, setAddressHasError] = useState(false);
  const [skipAddressValidation, setSkipAddressValidation] = useState(false);
  const [fromSelect, setFromSelect] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [oldAddress, setOldAddress] = useState();
  const [enteredAddress, setEnteredAddress] = useState({});
  const [isAddressSubmitted, setIsAddressSubmitted] = useState(null);
  const [unconfirmedEditAddress, setUnconfirmedEditAddress] = useState(false);

  const { t } = useTranslation();

  let addressSelectors = {
    id: `${modalId} input[name="address.id"]`,
    firstName: `${modalId} input[name="address.firstName"]`,
    middleName: `${modalId} input[name="address.middleName"]`,
    lastName: `${modalId} input[name="address.lastName"]`,
    streetLine1: `${modalId} input[name="address.streetLine1"]`,
    streetLine2: `${modalId} input[name="address.streetLine2"]`,
    zipCode: `${modalId} input[name="address.zipCode"]`,
    city: `${modalId} input[name="address.city"]`,
    prefix: `${modalId} .selected[data-optionvalue="address.prefix"]`,
    region: `${modalId} .selected[data-optionvalue="address.region.region_code"]`,
    name_of_address: `${modalId} input[name="address.nameOfAddress"]`,
    countryId: `${modalId} input[name="address.countryId"]`,
    telephone: `${modalId} input[name="address.telephone"]`,
    subscriptionId: `${modalId} input[name="address.subscriptionId"]`,
    addressType: `${modalId} input[name="address.addressType"]`,
    default_shipping: `${modalId} input[name="address.default_shipping"]`,
    default_billing: `${modalId} input[name="address.default_billing"]`,
    verification_status: `${modalId} input[name="address.verification_status"]`,
    validation_id: `${modalId} input[name="address.validation_id"]`,
  };

  if(!document.querySelector(addressSelectors['countryId']) ){
    addressSelectors['countryId']= `${modalId} .selected[data-optionvalue="address.countryId.value"]`
  }

  let dynamicAddressDropdownSelctorsName = [];
  if (isAddressDropdownFields(container)) {
    let dropDownAddressSelctors = {
      city: `${modalId} .selected[data-optionvalue="address.city.city_code"]`,
      region: `${modalId} .selected[data-optionvalue="address.district.district_code"]`,
      streetLine1: `${modalId} .selected[data-optionvalue="address.neighborhood.neighborhood_code"]`,
      streetLine2: `${modalId} input[name="address.openAddress"]`,
      zipCode: `${modalId} .selected[data-optionvalue="address.postcode.postcode_code"]`,
    };
    addressSelectors = {
      ...addressSelectors,
      ...dropDownAddressSelctors,
    };

    useEffect(async () => {
      if (container != '#my-address-edit-modal') {
        await getCities(container, $('[name="x-country-code"]').val());
      }
    }, []);

    dynamicAddressDropdownSelctorsName = ['streetLine1', 'zipCode', 'city'];
  }
  
  useEffect(async () => {
    if (unconfirmedEditAddress) {
      setSkipAddressValidation(false);
    }
  }, [unconfirmedEditAddress]);

  const addressDropdownSelectors = [
    'prefix',
    'region',
    ...dynamicAddressDropdownSelctorsName,
  ];
  let addressDropdownULSelectors = {
    county: document.querySelector(`${modalId} ul[name="address.region"]`),
    salutations: document.querySelector(
      `${modalId} ul[name="address.salutations"]`
    ),
    countryId: document.querySelector(
      `${modalId} ul[name="address.countryId"]`
    )
  };

  if (isAddressDropdownFields(container)) {
    let dynamicAddressDropdownULSelctors = {
      city: document.querySelector(`${modalId} ul[name="address.city"]`),
      district: document.querySelector(
        `${modalId} ul[name="address.district"]`
      ),
      neighborhood: document.querySelector(
        `${modalId} ul[name="address.neighborhood"]`
      ),
      postcode: document.querySelector(
        `${modalId} ul[name="address.postcode"]`
      ),
    };
    addressDropdownULSelectors = {
      ...addressDropdownULSelectors,
      ...dynamicAddressDropdownULSelctors,
    };
  }

  const minimumAddressFields = [
    'firstName',
    'middleName',
    'lastName',
    'streetLine1',
    'zipCode',
    'prefix',
    'telephone',
  ];
  
  const validateEnteredAddress = async (enteredAddress) => {
    const streetLine1 = enteredAddress.streetLine1;
    const streetLine2 = enteredAddress.streetLine2;
    const city = enteredAddress.city;
    const zipCode = enteredAddress.zipCode;
    const countryId = enteredAddress.countryId;
    const { responseCode, proposedAddress } = await validateAddress({
      streetLine1,
      streetLine2,
      city,
      zipCode,
      countryId,
    });
    window.dispatchEvent(createConditionalEvent(false, 'somethingWentWrong'));
    setSuggestions([]);
    window.dispatchEvent(createConditionalEvent(true, 'showSaveAddress'));
    const alertOnForm = document.querySelector(
      `${modalId} div[data-conditional-variable='hasSuggestions'] .formalert`
    );

    if (proposedAddress.length < 1)
    {
      window.dispatchEvent(createConditionalEvent(true, 'noAddressFound'));
      window.dispatchEvent(createConditionalEvent(false, 'singleAddressFound'));
      window.dispatchEvent(createConditionalEvent(false, 'showUnconfirmedAddressComponents'));
    }
    if (responseCode !== 'validaddress') {
      if (proposedAddress) {
        setSuggestions(proposedAddress);
        document.querySelector(`${modalId} .original-address`)?.click();
        window.dispatchEvent(createConditionalEvent(true, 'hasSuggestions'));
        alertOnForm.classList.remove('d-none');
      }

      throw new Error('Address invalid');
    } else if (proposedAddress) {
      setSuggestions(proposedAddress);
      window.dispatchEvent(createConditionalEvent(false, 'noAddressFound'));
      window.dispatchEvent(createConditionalEvent(true, 'hasSuggestions')); 
      if (proposedAddress.length === 1) {
          const streetline2pro = proposedAddress[0].streetLine2 ? proposedAddress[0].streetLine2 : '';
          const compareunConfirmedAddress = proposedAddress[0].streetLine1.toLowerCase()==streetLine1.toLowerCase() && proposedAddress[0].countryId==countryId && proposedAddress[0].zipCode==zipCode && proposedAddress[0].city.toLowerCase()==city.toLowerCase() && streetline2pro.toLowerCase()==streetLine2.toLowerCase();
          
          if(!proposedAddress[0]?.unconfirmedComponentArray && compareunConfirmedAddress)
          {            
            window.dispatchEvent(createConditionalEvent(false, 'hasSuggestions'));
            //To avoid setting old context from handler            
            setIsAddressSubmitted(enteredAddress);           
          }
          else if (compareunConfirmedAddress && proposedAddress[0]?.unconfirmedComponentArray) {            
            document.querySelector(`${modalId} .suggested-address-radio`).style.display = 'none';
            window.dispatchEvent(createConditionalEvent(false, 'singleAddressFound')); 
            document.querySelector(`${modalId} .original-address`)?.click();
          }
          else {
            document.querySelector(`${modalId} .suggested-address-radio`).style.display = 'block';
            window.dispatchEvent(createConditionalEvent(true, 'singleAddressFound'));   
            document.querySelector(`${modalId} .suggested-address-radio`)?.click();
          }
      } else {
        document.querySelector(`${modalId} .original-address`)?.click();
      }
      if (proposedAddress.length != 1) {
        alertOnForm.classList.add('d-none');
      }
      throw new Error('Address invalid');
    }
  };   

  const updateAddress = async (enteredAddress) => {
    window.dispatchEvent(createConditionalEvent(false, 'somethingWentWrong'));
    if(Object.keys(enteredAddress).includes('subscriptionId') && enteredAddress.subscriptionId !== 'null') {
      const updateSubscriptionAddressPayload = {
        address: enteredAddress,
        type: enteredAddress?.addressType?.toLowerCase() === 'shipping' ? 'updateSubscriptionShippingAddress' : 'updateSubscriptionBillingAddress',
        subscriptionId: enteredAddress.subscriptionId,
      }
      const { data, errorCode } = await fetchESLservice({
        service: ESL_EPT.productsSubscriptionsUpdate,
        addAuthHeaders: true,
        withRecaptcha: false,
        data: updateSubscriptionAddressPayload,
      });

      if(errorCode || data?.errorCode ||
        (enteredAddress?.addressType?.toLowerCase() === 'shipping' && !data?.response?.data?.awSarp2ProfileChangeShippingAddress) ||
        (enteredAddress?.addressType?.toLowerCase() === 'billing' && !data?.response?.data?.awSarp2ProfileChangeBillingAddress)) {
        window.dispatchEvent(
          createConditionalEvent(true, 'somethingWentWrong')
        );
        throw new Error(data?.response?.statusReason || 'Something went wrong');
      }
      else {
        return data?.response;
      }
    } else {
      const { data, errorCode } = await fetchESLservice({
        service: ESL_EPT.editProfileAddress,
        addAuthHeaders: true,
        data: {
          address: enteredAddress,
        },
      });

      if (errorCode || data?.errorCode) {
        // If address book is full, display alert and hide form:
        if (
          data?.response?.i18nMessageKey === 'MANAGE-ADDR-500' ||
          data?.response?.i18nMessageKey === 'ES-0002'
        ) {
          window.dispatchEvent(createConditionalEvent(true, 'addressBookFull'));
          document.querySelector(modalId).style.display = 'none';
        } else {
          window.dispatchEvent(
            createConditionalEvent(true, 'somethingWentWrong')
          );
        }

        throw new Error(data?.response?.statusReason);
      } else {
        return data?.response;
      }
    }
  };

  const clearStatesToDefault = () => {
    removeInputsValidationError();
    setLoading(false);
    setAddressHasError(false);
    setSkipAddressValidation(false);
    setFromSelect(false);
    setSuggestions([]);
    setOldAddress(null);
    cleanModalInputs(modalId);
    cleanModalDropdowns(modalId);
    if (isAddressDropdownFields(container)) {
      setAddressDropdownToDefault(
        ['district', 'neighborhood', 'postcode'],
        container
      );
    }
  };

  const cleanModalInputs = (modal) => {
    const inputs = document.querySelectorAll(
      `${modal} form input[type='text']:not([readonly])`
    );

    if (
      document.querySelector(`${modal} form input[type='tel']:not([readonly])`)
    ) {
      document.querySelector(
        `${modal} form input[type='tel']:not([readonly])`
      ).value = '';
    }

    inputs.forEach((item) => {
      item.value = '';
    });
  };

  const cleanModalDropdowns = (modal) => {
    const dropdowns = $(`${modal} form ul.a-dropdown__menu`);
    dropdowns.map((index, dropdown) => {
      dropdown.closest(`li.selected`)?.removeAttr('class aria-selected');
      dropdown.previousElementSibling.classList = 'a-dropdown__placeholder';
      dropdown.previousElementSibling.innerText =
        dropdown.getAttribute('name') == 'address.salutations' ? 'Mr.' : '';
    });
  };

  const createAddressPayload = () => {
    const addressEntered = {};
    Object.keys(addressSelectors).forEach((key) => {
      const addressElement = document.querySelector(addressSelectors[key]);
      if (!!addressElement) {
        if (addressDropdownSelectors.includes(key)) {
          addressEntered[key] =
            addressElement.getAttribute('data-value') ||
            addressElement?.textContent?.trim() ||
            '';
        } else {
          addressEntered[key] = addressElement?.value || '';
        }
      }
    });
    if(addressEntered['countryId']==''){
      addressEntered['countryId'] = document.querySelector(addressSelectors['countryId'])?.textContent?.trim();
    }
    if (commerceContext?.profile?.addresses == null)
    {
      addressEntered['default_shipping'] = true;
      addressEntered['default_billing'] = true;
    }
    return addressEntered;
  };

  const currentAddressForm = container;

  const handleCheckingAddressOverlay = (hide) => {
    const container = document.querySelector(modalId);
    const elemString = '.o-form-container__loader';

    if (!container) {
      return;
    }

    if (hide) {
      container.querySelector(elemString)?.classList.add('d-none');
    } else {
      const loaderContainer = container.querySelector(elemString);

      if (loaderContainer) {
        loaderContainer.classList.remove('d-none');
      } else {
        const newLoaderContainer = document.createElement('div');
        newLoaderContainer.classList.add('o-form-container__loader');
        container.append(newLoaderContainer);
        const loaderContainer = container.querySelector(elemString);
        ReactDOM.render(<LoadingIndicator />, loaderContainer, () => {
          const loaderText = document.createElement('p');
          if (!isAddressDropdownFields(currentAddressForm)) {
            loaderText.innerHTML = t('checking-address');
          }
          loaderContainer.append(loaderText);
        });
      }
    }
  };

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


  const validateAndSubmitAddress = async (enteredAddress) => {
    if (loading) {
      handleCheckingAddressOverlay(true);
    } else {
      handleCheckingAddressOverlay();
    }

    try {
      if (
        (!skipAddressValidation ||
          (skipAddressValidation &&
            !objsHaveSameData(oldAddress, enteredAddress) &&
            !fromSelect)) &&
        !isAddressDropdownFields(container)
      ) {
        setSkipAddressValidation(false);
        await validateEnteredAddress(enteredAddress);
      }

      //To avoid setting old context from handler
      setIsAddressSubmitted(enteredAddress);
    } catch (error) {
      switch (error.message) {
        case 'Address invalid':
          setAddressHasError(true);
          break;
        default:
          console.error(error.message);
          break;
      }
    } finally {
      setLoading(false);
      handleCheckingAddressOverlay(true);
      setOldAddress({ ...enteredAddress });
    }
  };

  const validateMinimumAddressFields = (validationFailed) => {
    Object.entries(addressSelectors).forEach(([key, selector]) => {
      const element = document.querySelector(selector);
      const $formGroup = $(selector)?.closest('.form-group');

      if (
        element?.required &&
        element?.value === '' &&
        element?.type !== 'hidden' &&
        minimumAddressFields.includes(key)
      ) {
        $(selector)?.closest('.form-group')?.addClass('validation-require');
        validationFailed = true;
      } else if ($formGroup.hasClass('validation-regex')) {
        validationFailed = true;
      }
    });
    if (
      !!addressDropdownULSelectors.salutations &&
      document.querySelector(addressSelectors['prefix']) === null
    ) {
      $(`${modalId} ul[name="address.salutations"]`)
        ?.closest('.a-dropdown')
        ?.addClass('validation-require');
      validationFailed = true;
    }
    return validationFailed;
  };

  const validateFullAddressFields = (
    validateNameOfAddrField,
    validationFailed
  ) => {
    Object.values(addressSelectors).forEach((selector) => {
      const element = document.querySelector(selector);
      const $formGroup = $(selector)?.closest('.form-group');

      if (
        element?.required &&
        element?.value === '' &&
        element?.type !== 'hidden' &&
        element?.name !== 'address.nameOfAddress'
      ) {
        $(selector)?.closest('.form-group')?.addClass('validation-require');
        validationFailed = true;
      } else if ($formGroup.hasClass('validation-regex')) {
        validationFailed = true;
      } else if (
        validateNameOfAddrField &&
        element?.name === 'address.nameOfAddress' &&
        element?.value === ''
      ) {
        $(selector)?.closest('.form-group')?.addClass('validation-require');
        validationFailed = true;
      }
    });
    if (
      !!addressDropdownULSelectors.salutations &&
      document.querySelector(addressSelectors['prefix']) === null
    ) {
      $(`${modalId} ul[name="address.salutations"]`)
        ?.closest('.a-dropdown')
        ?.addClass('validation-require');
      validationFailed = true;
    }
    if (
      !!addressDropdownULSelectors.county &&
      document.querySelector(addressSelectors['region']) === null
    ) {
      $(`${modalId} ul[name="address.region"]`)
        ?.closest('.a-dropdown')
        ?.addClass('validation-require');
      validationFailed = true;
    }
    if (
      addressDropdownULSelectors.countryId &&
      document.querySelector(addressSelectors['countryId']) === null
    ) {
      $(`${modalId} ul[name="address.countryId"]`)
        ?.closest('.a-dropdown')
        ?.addClass('validation-require');
      validationFailed = true;
    }
    if (isAddressDropdownFields(container)) {
      if (
        !!addressDropdownULSelectors.city &&
        document.querySelector(addressSelectors['city']) === null
      ) {
        $(`${modalId} ul[name="address.city"]`)
          ?.closest('.a-dropdown')
          ?.addClass('validation-require');
        validationFailed = true;
      }
      if (
        !!addressDropdownULSelectors.district &&
        document.querySelector(addressSelectors['region']) === null
      ) {
        $(`${modalId} ul[name="address.district"]`)
          ?.closest('.a-dropdown')
          ?.addClass('validation-require');
        validationFailed = true;
      }
      if (
        !!addressDropdownULSelectors.neighborhood &&
        document.querySelector(addressSelectors['streetLine1']) === null
      ) {
        $(`${modalId} ul[name="address.neighborhood"]`)
          ?.closest('.a-dropdown')
          ?.addClass('validation-require');
        validationFailed = true;
      }
      if (
        !!addressDropdownULSelectors.postcode &&
        document.querySelector(addressSelectors['zipCode']) === null
      ) {
        $(`${modalId} ul[name="address.postcode"]`)
          ?.closest('.a-dropdown')
          ?.addClass('validation-require');
        validationFailed = true;
      }
    }

    return validationFailed;
  };

  const removeInputsValidationError = () => {
    Object.values(addressSelectors).forEach((selector) => {
      const element = document.querySelector(selector);
      $(selector)
        ?.closest('.form-group')
        ?.removeClass('validation-require validation-regex');
    });
    $(`${modalId} ul[name="address.salutations"]`)
      ?.closest('.a-dropdown')
      ?.removeClass('validation-require');
    $(`${modalId} ul[name="address.region"]`)
      ?.closest('.a-dropdown')
      ?.removeClass('validation-require');

    if (isAddressDropdownFields(container)) {
      $(`${modalId} ul[name="address.city"]`)
        ?.closest('.a-dropdown')
        ?.removeClass('validation-require');
      $(`${modalId} ul[name="address.district"]`)
        ?.closest('.a-dropdown')
        ?.removeClass('validation-require');
      $(`${modalId} ul[name="address.neighborhood"]`)
        ?.closest('.a-dropdown')
        ?.removeClass('validation-require');
      $(`${modalId} ul[name="address.postcode"]`)
        ?.closest('.a-dropdown')
        ?.removeClass('validation-require');
    }
  };

  const setVerificationandValidation = (selectedAddress) => {
    !!document.querySelector(addressSelectors['verification_status']) &&
      (document.querySelector(addressSelectors['verification_status']).value =
        '1');
    !!document.querySelector(addressSelectors['validation_id']) &&
      (document.querySelector(addressSelectors['validation_id']).value =
        selectedAddress?.globalAddressId);
  };

  const unsetVerificationAndValidation = () => {
    !!document.querySelector(addressSelectors['verification_status']) &&
      (document.querySelector(addressSelectors['verification_status']).value =
        '0');
    !!document.querySelector(addressSelectors['validation_id']) &&
      (document.querySelector(addressSelectors['validation_id']).value = '');
  };

  const suggestedAddressSelected = (selectedAddress) => {
    setVerificationandValidation(selectedAddress);
    populateFieldsFromSelectedSuggestion(selectedAddress, false);
  };

  const originalAddressSelected = () => {
    populateFieldsFromSelectedSuggestion(enteredAddress, true);
    unsetVerificationAndValidation();
    setFromSelect(true);
    if(unconfirmedEditAddress)
    {
      setSkipAddressValidation(false);
      setUnconfirmedEditAddress(false);
    } else {setSkipAddressValidation(true);}
  };

  const unconfirmedAddressSelected = () => {
    window.dispatchEvent(createConditionalEvent(false, 'hasSuggestions'));     
    setSkipAddressValidation(false);
    setUnconfirmedEditAddress(true);
  };
  const populateFieldsFromSelectedSuggestion = (
    selectedSuggestion,
    originalAddressSelected
  ) => {
    let unsetVerficationAndValidationFlags = false;
    Object.keys(selectedSuggestion).forEach((key) => {
      document.querySelector(addressSelectors[key]) &&
        (document.querySelector(addressSelectors[key]).value =
          selectedSuggestion[key]);
      key === 'region' &&
        !!document.querySelectorAll(
          `${modalId} li[data-optionvalue="address.region.region_code"]`
        ) &&
        prefillDropdownValues(
          document.querySelectorAll(
            `${modalId} li[data-optionvalue="address.region.region_code"]`
          ),
          selectedSuggestion[key],
          document.querySelector(`${modalId} ul[name="address.region"]`)
        );
      if (originalAddressSelected && key !== 'countryId') {
        $(addressSelectors[key])?.removeAttr('readonly');
      } else {
        if (selectedSuggestion[key] !== '') {
          if (key === 'countryId') {
            $(addressSelectors[key])?.attr('readonly', 'readonly');
          }
        } else {
          unsetVerficationAndValidationFlags = true;
        }
      }
    });
    unsetVerficationAndValidationFlags && unsetVerificationAndValidation();
  };

  const validateRequiredAddressFields = (
    addressType,
    validateNameOfAddrField,
    validationFailed
  ) => {
    if (
      container === '#my-address-add-modal' &&
      addressType === 'findAddress'
    ) {
      return validateMinimumAddressFields(validationFailed);
    } else {
      return validateFullAddressFields(
        validateNameOfAddrField,
        validationFailed
      );
    }
  };  

  useEffect( async () => {
    if (isAddressSubmitted && isAddressSubmitted) {
        const enteredAddress = isAddressSubmitted;
        const updatedAddressData = await updateAddress(enteredAddress);
        setAddressHasError(false);
    
        const isDefaultShipping =
          enteredAddress.default_shipping === 'true' ||
          enteredAddress.default_shipping === true;
    
        const isDefaultBilling =
          enteredAddress.default_billing === 'true' ||
          enteredAddress.default_billing === true;
    
          const returnedAddresses = updatedAddressData?.data?.customer?.addresses;
          const returnedSubshippingAdd = updatedAddressData?.data?.awSarp2ProfileChangeShippingAddress;
          const returnedSubBillingAdd = updatedAddressData?.data?.awSarp2ProfileChangeBillingAddress; 
    
          if((!returnedSubshippingAdd || !returnedSubBillingAdd) && returnedAddresses)  {
    
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
    
        let newStepOneFormData = null;
        if (
          (isDefaultShipping || isDefaultBilling) &&
          commerceContext?.checkout?.stepOneFormData
        ) {
          newStepOneFormData = commerceContext.checkout.stepOneFormData;
          delete newStepOneFormData[isDefaultShipping ? 'shipping' : 'billing'];
        }
    
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
          checkout: {
            ...commerceContext.checkout,
            stepOneFormData: newStepOneFormData,
          },
        });
      }
    
        if (typeof onSuccess === 'function') {
          onSuccess(enteredAddress);
        } else {
          // Success - reload page to display changes:
          window.location.reload();
        }
        setIsAddressSubmitted(null);
      
    }
  }, [isAddressSubmitted]);

  useEffect(() => {
    const saveAddressBtn = document.querySelector(
      `${modalId} #save-address-btn`
    );
    const findAddressBtn = document.querySelector(
      `${modalId} #find-address-btn`
    );

    if (!saveAddressBtn && !findAddressBtn) {
      return;
    }

    if (loading) {
      saveAddressBtn.disabled = true;
      const btnSpinner = saveAddressBtn.closest('.a-button');
      btnSpinner.classList.add('a-button--spinner');

      if (!!findAddressBtn) {
        const findBtnSpinner = findAddressBtn.closest('.a-button');
        findBtnSpinner.classList.add('a-button--spinner');
        findAddressBtn.disabled = true;
      }
    } else {
      saveAddressBtn.disabled = false;
      const btnSpinner = saveAddressBtn.closest('.a-button');
      btnSpinner.classList.remove('a-button--spinner');

      if (!!findAddressBtn) {
        const findBtnSpinner = findAddressBtn.closest('.a-button');
        findBtnSpinner.classList.remove('a-button--spinner');
        findAddressBtn.disabled = false;
      }
    }
  }, [loading]);

  const setUnconfirmedFields = () => {
    const unconfirmedvalues = suggestions[0].unconfirmedComponentArray; 
    let unconfirmedfieldnames = [];
    for (const uncofirmedval in unconfirmedvalues) {                   
      const addfieldval = unconfirmedvalues[uncofirmedval]
        switch (addfieldval) {
          case "postal_code": {
            const arialabel = document.querySelector(addressSelectors['zipCode']);
            unconfirmedfieldnames.push(arialabel.getAttribute('aria-label'));            
            break;
          }
          case "locality":
          case "postal_town":
            {
              const arialabel = document.querySelector(addressSelectors['city']);
              unconfirmedfieldnames.push(arialabel.getAttribute('aria-label'));
              break;
            }
          case "street_number":
          case "route":
            {
              const arialabel = document.querySelector(addressSelectors['streetLine1']);
              unconfirmedfieldnames.push(arialabel.getAttribute('aria-label'));
              break;
            }   
        }
    }
    document.querySelector(`${modalId} .uncomfirmedAddressFields`).innerHTML = unconfirmedfieldnames.toString();
  };

  useEffect(() => {        
    if (shouldSkipAddressValidation) return;

    const suggestionsContainer = document.querySelector(
      `${modalId} #section-address-suggestions`
    );

    //removing if-elseif condition to check for suggestion length before renderig Address Suggestions
    // as Original Address suggestion needs to be rendered all the time for Gravity

    const alertOnForm = document.querySelector(
      `${modalId} div[data-conditional-variable='hasSuggestions'] .formalert`
    );

    const checkUnconfirmedAddress =  document.querySelector(`${modalId} div[data-conditional-variable="showUnconfirmedAddressComponents"]`);
    
    if (suggestions.length > 1 && suggestions.length <= 20) {
      alertOnForm.classList.remove('d-none');
      window.dispatchEvent(
        createConditionalEvent(true, 'multipleAddressesFound')
      );
    }
    if (suggestions.length > 20) {
      alertOnForm.classList.remove('d-none');
      window.dispatchEvent(createConditionalEvent(true, 'largeAddressesFound'));
    }
    if (suggestions.length === 1) {
      alertOnForm.classList.remove('d-none');
      window.dispatchEvent(createConditionalEvent(true, 'singleAddressFound'));      
      if(checkUnconfirmedAddress && (suggestions[0]?.unconfirmedComponentArray))
        {
          setUnconfirmedFields();
          window.dispatchEvent(createConditionalEvent(true, 'showUnconfirmedAddressComponents'));
        } else{
          window.dispatchEvent(createConditionalEvent(false, 'showUnconfirmedAddressComponents'));
        }    
    }

    setSkipAddressValidation(false);

    const onKeepAddress = () => {
      setSkipAddressValidation(true);
    };

    ReactDOM.render(
      <I18nextProvider i18n={i18n} defaultNS="common">
        <AddressSuggestions
          addresses={suggestions}
          originalAddress={enteredAddress}
          modalId={modalId}
          onSelectSuggestedAddress={(selectedAddress) => {
            suggestedAddressSelected(selectedAddress);
          }}
          onSelectOriginalAddress={() => {
            originalAddressSelected();
          }}
          onSelection={(chosenAddress) => {
            if (chosenAddress) {
              setFromSelect(true);
              setSkipAddressValidation(true);
              let unsetVerficationAndValidationFlags = false;
              Object.keys(chosenAddress).forEach((key) => {
                if (document.querySelector(addressSelectors[key])) {
                  document.querySelector(addressSelectors[key]).value =
                    chosenAddress[key];
                  key === 'region' &&
                    !!document.querySelectorAll(
                      `${modalId} li[data-optionvalue="address.region.region_code"]`
                    ) &&
                    prefillDropdownValues(
                      document.querySelectorAll(
                        `${modalId} li[data-optionvalue="address.region.region_code"]`
                      ),
                      chosenAddress[key],
                      document.querySelector(
                        `${modalId} ul[name="address.region"]`
                      )
                    );
                  if (chosenAddress[key] !== '') {
                    if (key === 'countryId') {
                      $(addressSelectors[key]).attr('readonly', 'readonly');
                    }
                  } else {
                    unsetVerficationAndValidationFlags = true;
                  }
                }
              });

              unsetVerficationAndValidationFlags
                ? unsetVerificationAndValidation()
                : setVerificationandValidation(chosenAddress);
              document
                .querySelector(`${modalId} .suggested-address-radio`)
                ?.click();
            }
          }}
          onKeepAddress={onKeepAddress}
          onSelectEditUnconfirmedAddress={() => {
            unconfirmedAddressSelected();
          }}
        />
      </I18nextProvider>,
      suggestionsContainer
    );
  }, [suggestions]);

  useEffect(() => {
    const clickHandlers = [
      {
        selector: `${modalId} [data-conditional-variable="modalAddLine2"]`,
        handler: () => {
          window.dispatchEvent(createConditionalEvent(true, 'modalAddLine2'));
        },
      },
      {
        selector: `${modalId} #save-address-btn`,
        handler: async (e) => {
          e.preventDefault();
          setLoading(true);

          $(`${addressSelectors.name_of_address}`)?.val()?.length > 0 &&
            window.dispatchEvent(
              createConditionalEvent(false, 'hasSuggestions')
            );

          if (validateRequiredAddressFields('saveAddress', true, false)) {
            setLoading(false);
            window.dispatchEvent(
              createConditionalEvent(true, 'showRequiredFieldsMessage')
            );
            window.dispatchEvent(
              createConditionalEvent(true, 'hasCompleteAddress')
            );
            if (container === '#my-address-add-modal') {
              window.dispatchEvent(
                createConditionalEvent(true, 'showFullAddressFields')
              );
            }
            return;
          }
          window.dispatchEvent(
            createConditionalEvent(false, 'showRequiredFieldsMessage')
          );
          window.dispatchEvent(
            createConditionalEvent(false, 'showFullAddressFields')
          );

          // Gather entered form values:
          const addressEntered = createAddressPayload();
          setEnteredAddress(addressEntered);

          if (shouldSkipAddressValidation) {
            //To avoid setting old context from handler
            setIsAddressSubmitted(addressEntered);
          } else {
            validateAndSubmitAddress(addressEntered);
          }
        },
      },
      {
        selector: `${modalId} #find-address-btn`,
        handler: async (e) => {
          e.preventDefault();
          setLoading(true);

          if (validateRequiredAddressFields('findAddress', false, false)) {
            setLoading(false);
            window.dispatchEvent(
              createConditionalEvent(true, 'showRequiredFieldsMessage')
            );
            return;
          }
          window.dispatchEvent(
            createConditionalEvent(false, 'showRequiredFieldsMessage')
          );

          // Gather entered form values:
          const addressEntered = createAddressPayload();
          setEnteredAddress(addressEntered);
          validateAndSubmitAddress(addressEntered);
        },
      },
      {
        selector: `${container} #address-book-full__close`,
        handler: () => {
          const closeButton = document.querySelector(
            `${container} #address-book-full__close`
          );
          closeButton
            .closest('.modal-dialog')
            ?.querySelector('.generic-modal--close')
            ?.click();
        },
      },
      {
        selector: `${container} #search-another-address`,
        handler: () => {
          window.dispatchEvent(createConditionalEvent(false, 'noAddressFound'));
          window.dispatchEvent(
            createConditionalEvent(false, 'singleAddressFound')
          );
          window.dispatchEvent(
            createConditionalEvent(false, 'multipleAddressesFound')
          );
          window.dispatchEvent(
            createConditionalEvent(false, 'largeAddressesFound')
          );
          window.dispatchEvent(
            createConditionalEvent(false, 'somethingWentWrong')
          );
          window.dispatchEvent(createConditionalEvent(false, 'hasSuggestions'));
          window.dispatchEvent(
            createConditionalEvent(false, 'hasCompleteAddress')
          );
          window.dispatchEvent(
            createConditionalEvent(false, 'showSaveAddress')
          );
          window.dispatchEvent(
            createConditionalEvent(false, 'showUnconfirmedAddressComponents')
          );
          setSkipAddressValidation(false);
          $(addressSelectors['streetLine1']).removeAttr('readonly');
          if (container === '#my-address-add-full-fields-modal') {
            document
              .querySelector(
                `#my-address-add-full-fields-modal #enter-address-modal #search-another-address`
              )
              .closest('.modal-dialog')
              ?.querySelector('.generic-modal--close')
              ?.click();
            document.querySelector(`#my-address-add`)?.click();
          }
        },
      },
      {
        selector: `${container} #enter-address-manually`,
        handler: () => {
          window.dispatchEvent(createConditionalEvent(false, 'noAddressFound'));
          window.dispatchEvent(
            createConditionalEvent(false, 'singleAddressFound')
          );
          window.dispatchEvent(
            createConditionalEvent(false, 'multipleAddressesFound')
          );
          window.dispatchEvent(
            createConditionalEvent(false, 'largeAddressesFound')
          );
          window.dispatchEvent(
            createConditionalEvent(false, 'somethingWentWrong')
          );
          window.dispatchEvent(createConditionalEvent(false, 'hasSuggestions'));
          window.dispatchEvent(
            createConditionalEvent(false, 'hasCompleteAddress')
          );
          window.dispatchEvent(
            createConditionalEvent(false, 'showUnconfirmedAddressComponents')
          );
          document
            .querySelector(
              `${modalId} #enter-address-manually`
            )
            .closest('.modal-dialog')
            ?.querySelector('.generic-modal--close')
            ?.click();
          document.querySelector(`#my-address-add-full-fields`)?.click();
        },
      },      
    ];

    addEventHandlers('click', clickHandlers);

    const minCharsAllowed = document.querySelector(`${modalId} [name="minCharsToEnableGoogleSuggestions"]`)?.value
    const minChars = minCharsAllowed ? minCharsAllowed : 0;
    const regionMappingConfig = document.querySelector(`${modalId} [name="googleSuggestionsMappingRegion"]`)?.value;
    const addressValObj = {
      'administrative_area_level_1': `${modalId} input[name="address.streetLine2"]`,
      'postal_code': `${modalId} input[name="address.zipCode"]`,
      'administrative_area_level_2': `${modalId} input[name="address.streetLine2"]`,
      'locality': `${modalId} input[name="address.city"]`,
      'country': null,
      'enableGoogleAddressCheck' : enableGoogleAddressCheck,
      'enableManualAddressEntry' : enableManualAddressEntry,
      'county' : `${modalId} .options ul[name="address.region"]`,
      'enableDropDownVal': "address.region.region_code",
    }

    const streetHandlers = [{
      selector: `${modalId}`,
      handler: e => {
        if (e.target?.name == 'address.streetLine1' && enableGoogleAddressCheck) {
          const addressElement = `${modalId} input[name="address.streetLine1"]`; 
          window.onAddessSuggestion(addressElement, addressValObj, minChars, regionMappingConfig);
        }
      }
    }];

    if (!minChars) {
      addEventHandlers('click', streetHandlers);
    } else {
      addEventHandlers('keyup', streetHandlers);
    }

    const modalHideObserver = new MutationObserver((mutations) => {
      const modalHidden = mutations.some(
        (mutation) =>
          mutation.type === 'attributes' &&
          mutation.attributeName === 'aria-hidden' &&
          mutation.target.getAttribute('aria-hidden') === 'true'
      );

      if (modalHidden) {
        /**
         * When the modal is hidden, we need to remove the suggestions
         * so they don't persist on other modals
         */
        window.dispatchEvent(createConditionalEvent(false, 'hasSuggestions'));
        window.dispatchEvent(createConditionalEvent(false, 'addressBookFull'));
        window.dispatchEvent(
          createConditionalEvent(false, 'showRequiredFieldsMessage')
        );
        window.dispatchEvent(createConditionalEvent(false, 'noAddressFound'));
        window.dispatchEvent(
          createConditionalEvent(false, 'singleAddressFound')
        );
        window.dispatchEvent(
          createConditionalEvent(false, 'multipleAddressesFound')
        );
        window.dispatchEvent(
          createConditionalEvent(false, 'largeAddressesFound')
        );
        window.dispatchEvent(
          createConditionalEvent(false, 'somethingWentWrong')
        );
        window.dispatchEvent(
          createConditionalEvent(false, 'hasCompleteAddress')
        );
        window.dispatchEvent(
          createConditionalEvent(false, 'showUnconfirmedAddressComponents')
        );  
        document.querySelector(modalId).style.display = 'block';
        clearStatesToDefault();
      }
    });

    if (document.querySelector(container)) {
      modalHideObserver.observe(document.querySelector(container), {
        attributes: true,
      });
    }

    return () => {
      removeEventHandlers('click', clickHandlers);
      modalHideObserver.disconnect();
    };
  }, [skipAddressValidation]);

  return null;
};

export default EnterAddressModal;