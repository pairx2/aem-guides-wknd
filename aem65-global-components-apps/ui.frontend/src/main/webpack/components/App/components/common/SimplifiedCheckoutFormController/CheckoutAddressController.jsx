import { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';

import ESL_EPT from '../../../data/eslEndpoints';
import { fetchESLservice } from '../../../services/eslService';
import { CommerceContext } from '../../../context/CommerceContext';
import { ErrorContext } from '../../../context/ErrorContext';

import createConditionalEvent from '../../../utils/conditional';
import { paymentMethodCall, shippingCall  } from './SimplifiedCheckoutAPIs';
import {
  getCheckboxState,
  removeEmpty,
  isDuplicateEmail,
  validateAddress,
  isLoggedIn,
  addEventHandlers,
  getDataInfo,
  removeEventHandlers,
  cloneAddress,
  replacePlaceholder,
  prefillEditForm,
  setAuthHeaderFields,
  scrollToTop,
  isAddressDropdownFields,
  prefillAddressDropdowns,
  cleanDisplayString,
  findAddressById,
  formatAddresses,
  showTransparentLoader,
  hideTransparentLoader,
  cartContainsSubscription,
  compareObject
} from '../../../utils/common';

import checkoutFormConst from '../../../constants/checkoutFormConst';
import storeViews from '../../../constants/storeViewsConst';
import { AuthContext } from '../../../context/AuthContext';
import EnterAddressModal from '../EnterAddressModal';
import { AddressSuggestions } from '../../molecules/AddressSuggestions';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import LoadingIndicator from '../LoadingIndicator';

import {
  getSelectedPaymentType,
  setPaymentMethod,
} from '../../../utils/paymentTabs';

const { ADDRESS_STEP, CONTINUE_BUTTON } = checkoutFormConst;

const CheckoutAddressController = () => {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [errorContext, setErrorContext] = useContext(ErrorContext);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredStreetLine1, setEnteredStreetLine1] = useState('');
  const [enteredStreetLine2, setEnteredStreetLine2] = useState('');
  const [enteredZipCode, setEnteredZipCode] = useState('');
  const [enteredCity, setEnteredCity] = useState('');
  const [skipAddressSuggestion, setSkipAddressSuggestion] = useState(false);
  const [enteredBillingAddress, setEnteredBillingAddress] = useState({});
  const [addressHasError, setAddressHasError] = useState(false);
  const [showCheckingAddressLoader, setShowCheckingAddressLoader] = useState(
    false
  );
  const [proposedAddressList, setProposedAddressList] = useState(null);
  const [billingAddressHasError, setBillingAddressHasError] = useState(false);
  const [billingProposedAddressList, setBillingProposedAddressList] = useState(
    null
  );
  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);
  const [userHasAddresses, setUserHasAddresses] = useState(false);
  const [isShippingAsBilling, setIsShippingAsBilling] = useState(false);
  const [pendingAddressValidation, setPendingAddressValidation] = useState(
    true
  );
  const [addressErrorMessage, setAddressErrorMessage] = useState(null);
  const [availableShippingMethods, setAvailableShippingMethods] = useState(null);
  const [isBothAddressSame, setIsBothAddressSame] = useState(false);
  const { t } = useTranslation();

  const [vatExemptionStatus, setVatExemptionStatus] = useState(false);
  const [vatExemptionUncheck, setVatExemptionUncheck] = useState(false);
  const [isAddressIndex, setIsAddressIndex] = useState(null);
  const [isAddressEdit, setIsAddressEdit] = useState(null);
  const [isBillingAddressIndex, setIsBillingAddressIndex] = useState(null);
  const [isShippingAsBillingUpdate, setIsShippingAsBillingUpdate] = useState(false);

  const { storeView } =
    document.querySelector('#commerce-config')?.dataset || {};

  const addressModalSelectors = {
    streetLine1: 'input[name="address.streetLine1"]',
    streetLine2: 'input[name="address.streetLine2"]',
    zipCode: 'input[name="address.zipCode"]',
    city: 'input[name="address.city"]',
  };

  const addressSelectors = {
    streetLine1: 'input[name="shipping.address.streetLine1"]',
    streetLine2: 'input[name="shipping.address.streetLine2"]',
    zipCode: 'input[name="shipping.address.zipCode"]',
    city: 'input[name="shipping.address.city"]',
  };

  const billingAddressSelectors = {
    streetLine1: 'input[name="billing.address.streetLine1"]',
    streetLine2: 'input[name="billing.address.streetLine2"]',
    zipCode: 'input[name="billing.address.zipCode"]',
    city: 'input[name="billing.address.city"]',
  };

  const certificateAddressSelectors = {
    prefix: '.selected[data-optionvalue="address.prefix"]',
    firstName: 'input[name="address.firstName"]',
    middleName: 'input[name="address.middleName"]',
    lastName: 'input[name="address.lastName"]',
    telephone: 'input[name="address.telephone"]',
    streetLine1: 'input[name="address.streetLine1"]',
    streetLine2: 'input[name="address.streetLine2"]',
    zipCode: 'input[name="address.zipCode"]',
    city: 'input[name="address.city"]',
    dob: 'input[name="address.dob"]',
  };

  const formatAddress = (arr, email) =>
  arr.map((address) => ({
      prefix: address.prefix,
      region: address.region,
      nameOfAddress: address.nameOfAddress,
      id: address.id,
      default_shipping: address.default_shipping,
      default_billing: address.default_billing,
      firstName: address.firstName,
      ...(!!(address?.middleName) && {middleName: address.middleName}),
      lastName: address.lastName,
      streetLine1: address.streetLine1,
      streetLine2: address.streetLine2,
      city: address.city,
      country: address.countryId,
      zipCode: address.zipCode,
      telephone: address.telephone,
      email: email,
      countryId: address.countryId
    }));

  useEffect(() => {
    if (commerceContext?.checkout?.hasVatExemption) {
      const vatExemptionReliefElement = document.querySelector(
        '[name="vatExemption.isClaimingRelief"]'
      );

      if (!!vatExemptionReliefElement) {
        vatExemptionReliefElement.checked = 
          commerceContext.checkout.hasVatExemption;
      }
    }
  }, [commerceContext?.checkout?.hasVatExemption]);

  useEffect( async() => {
    if (isAddressIndex) {
      
      let commerceInfo = {
        ...commerceContext,
        paymentTabRender: false,
        shippingMethodsRender: false,
        shippingApiRender: false
      };
      let source = isAddressIndex
      let isEdit = isAddressEdit
      upDateStep1FormData([source], commerceInfo);
      const numIndex = /\d+/
      const addressIndex = source.match(numIndex)[0];
      
      if(!isEdit && source && source.includes('billing')){
        setIsShippingAsBillingUpdate(false)
        setIsBillingAddressIndex(commerceContext?.profile?.addresses?.billing[addressIndex]?.id)
      }
      else if(!isEdit && source && source.includes('shipping')){ 
        const sameAsBilling = getCheckboxState(
          document.querySelector(
            `input[type="checkbox"][name="shipping.address.sameAsBilling"]`
          )
        );
        if(sameAsBilling){
          const shippingAsBillingUpdate =true
          const billingAddress = commerceContext?.profile?.addresses?.billing
          const cId =commerceContext?.profile?.addresses?.shipping[addressIndex]?.id
          const billingIndex = billingAddress.findIndex(item => item.id === cId)  
          setIsShippingAsBillingUpdate(shippingAsBillingUpdate)
          setIsBillingAddressIndex(commerceContext?.profile?.addresses?.billing[billingIndex]?.id);
        }
        else{
          await setShippingMethodsCall(commerceContext?.profile?.addresses?.shipping[addressIndex]?.id);
        }
      }
      
    }
  }, [isAddressIndex]);

  useEffect(async () => {
    if (vatExemptionStatus) {
      const certificateAddressModal = document.querySelector(
        '#certificate-address-modal'
      );
      const createAddressPayload = () => {
        const addressEntered = {};

        Object.keys(certificateAddressSelectors).forEach((key) => {
          const addressElement = certificateAddressModal.querySelector(
            certificateAddressSelectors[key]
          );

          if (!!addressElement) {
            if (key === 'prefix') {
              addressEntered[key] =
                addressElement?.textContent?.trim() || '';
            } else {
              addressEntered[key] = addressElement?.value || '';
            }
          }
        });

        return addressEntered;
      };

      const vatExemptionPayload = {
        requestType: 'applyVatExemption',
        billing: {
          address: createAddressPayload(),
          vatExemption: {
            type: certificateAddressModal.querySelector(
              '[name="vatExemption.subject"]:checked'
            )?.value,
            apply: true,
          },
        },
        cartId: commerceContext?.cart?.id,
      };

      const vatExemptionParams = {
        service: userIsLoggedIn
          ? ESL_EPT.billingAuth
          : ESL_EPT.billing,
        data: vatExemptionPayload,
        addAuthHeaders: userIsLoggedIn,
        withRecaptcha: !userIsLoggedIn,
      };

      try {
        const {
          data: vatExemptionResponse,
          errorCode,
        } = await fetchESLservice(vatExemptionParams);

        if (errorCode || vatExemptionResponse?.errorCode) {
          window.dispatchEvent(
            createConditionalEvent(true, 'showVatExemptionError')
          );
        } else {
          window.dispatchEvent(
            createConditionalEvent(false, 'showVatExemptionError')
          );

          certificateAddressModal
            .querySelector('[data-dismiss]')
            ?.click();

          setCommerceContext({
            ...commerceContext,
            cart: vatExemptionResponse?.response?.data?.cart,
            checkout: {
              ...commerceContext?.checkout,
              hasVatExemption: true,
            },
            paymentTabRender: true,
          });
        }
      } catch (e) { }
    }
  }, [vatExemptionStatus]);

  useEffect(async () => {
    if (vatExemptionUncheck) {
      const certificateAddressModal = document.querySelector(
        '#certificate-address-modal'
      );
      const vatExemptionPayload = {
        requestType: 'removeVatExemption',
        billing: {
          vatExemption: {
            type: certificateAddressModal.querySelector(
              '[name="vatExemption.subject"]:checked'
            )?.value,
            apply: false,
          },
        },
        cartId: commerceContext?.cart?.id,
      };

      const vatExemptionParams = {
        service: userIsLoggedIn ? ESL_EPT.billingAuth : ESL_EPT.billing,
        data: vatExemptionPayload,
        addAuthHeaders: userIsLoggedIn,
        withRecaptcha: !userIsLoggedIn,
      };

      try {
        const { data: vatExemptionResponse } = await fetchESLservice(
          vatExemptionParams
        );

        if (!!vatExemptionResponse?.status) {
          setCommerceContext({
            ...commerceContext,
            cart: vatExemptionResponse?.response?.data?.cart,
            checkout: {
              ...commerceContext?.checkout,
              hasVatExemption: null,
            },
            paymentTabRender: true,
          });
        }
      } catch (e) { }
    }
  }, [vatExemptionUncheck]);

  useEffect(() => {
    if (isBothAddressSame) {
      setIsShippingAsBillingUpdate(true)
      setIsBillingAddressIndex(0)
      setIsBothAddressSame(false);
    }
  }, [isBothAddressSame]);

  const setDataInForm = (stepOneFormData) => {
    // eslint-disable-next-line
    if (Boolean(stepOneFormData)) {
      const initialFormData = {};

      const buildNamesRecursively = (k, v, path) => {
        if (typeof v === 'object') {
          for (const [key, value] of Object.entries(v)) {
            if(value){
              buildNamesRecursively(key, value, path ? `${path}.${k}` : k);
            }
          }
        } else {
          initialFormData[`${path}.${k}`] = v;
        }
      };

      for (const [key, value] of Object.entries(stepOneFormData)) {
        buildNamesRecursively(key, value, ``);
      }

      Object.keys(initialFormData).forEach((el, i) => {
        if (document.querySelector(`${ADDRESS_STEP} input[name="${el}"]`)) {
          document.querySelector(`${ADDRESS_STEP} input[name="${el}"]`).value =
            initialFormData[el];
        }

        if (el === 'billing.address.firstName') {
          document.querySelector(`${ADDRESS_STEP} input[name="firstName"]`).value =
            initialFormData[el];
        }

        if (el === 'billing.address.lastName') {
          document.querySelector(`${ADDRESS_STEP} input[name="lastName"]`).value =
            initialFormData[el];
        }

        if (el === 'billing.address.email') {
          document.querySelector(`${ADDRESS_STEP} input[name="email"]`).value =
            initialFormData[el];
        }

        // If address information already exist, don't validate it again on page reload since
        // that address was already validated before saving it on user local storage.
        // also set pendingAddressValidation to false
        if (
          initialFormData['shipping.address.streetLine1'] &&
          initialFormData['shipping.address.zipCode'] &&
          initialFormData['shipping.address.city']
        ) {
          setSkipAddressSuggestion(true);
          setPendingAddressValidation(false);
        }

        switch (el) {
          case 'shipping.address.streetLine1':
            setEnteredStreetLine1(initialFormData[el]);
            break;
          case 'shipping.address.streetLine2':
            setEnteredStreetLine2(initialFormData[el]);
            const address2ValidEvent = createConditionalEvent(
              true,
              'showShippingAddressLine2'
            );
            window.dispatchEvent(address2ValidEvent);
            break;
          case 'shipping.address.zipCode':
            setEnteredZipCode(initialFormData[el]);
            break;
          case 'shipping.address.city':
            setEnteredCity(initialFormData[el]);
            break;
        }
      });
    }
  };

  const getAllAddresses = async() => {
      const localAlladdresses = commerceContext?.profile?.addresses;
      let localaddressarr = []
      let localaddresslist = []
   
      if (localAlladdresses && Object.keys(localAlladdresses).length !== 0) {
        Object.keys(localAlladdresses).forEach(val => {
          if (localAlladdresses[val] === null) {
            delete localAlladdresses[val];
          }
        });
   
        Object.values(localAlladdresses).forEach(val => {
          if (Array.isArray(val)) {
            localaddressarr.push(...val)
          }
          else {
            localaddressarr.push(val)
          }
        })
   
        localaddresslist = localaddressarr.filter((elem, index, self) => self.findIndex(
          (valueArr) => { return (valueArr.id === elem.id) }) === index)
   
        localaddresslist = formatAddress(
          localaddresslist,
          commerceContext?.profile?.userInfo?.email
        );
      }
      //when there are no existing addresses in local storage 
      if(!localaddresslist.length) {
        const { data } = await fetchESLservice({
          service: ESL_EPT.getProfileAddress,
          addAuthHeaders: userIsLoggedIn,
          withRecaptcha: !userIsLoggedIn,
        });
   
        localaddresslist = formatAddresses(
          data?.response?.data?.customer?.addresses,
          data?.response?.data?.customer?.email
        );
      }
      return localaddresslist;
    }

  const checkRiskCheckPopUp = () => {
    try {
      const riskcheckBillingAddresses = JSON.parse(localStorage.getItem('riskcheckBillingAddresses'));
      const riskcheckShippingAddresses = JSON.parse(localStorage.getItem('riskcheckShippingAddresses'));
      const shippingAdd = commerceContext?.checkout?.stepOneFormData?.shipping?.address ? commerceContext?.checkout?.stepOneFormData?.shipping?.address : {};
      const billinggAdd = commerceContext?.checkout?.stepOneFormData?.billing?.address ? commerceContext?.checkout?.stepOneFormData?.billing?.address : {};

      let shippingVal = compareObject(riskcheckShippingAddresses, shippingAdd)
      let billingVal = compareObject(riskcheckBillingAddresses, billinggAdd)

      if ((!shippingVal || !billingVal) && Object.keys(riskcheckBillingAddresses).length != 0 && Object.keys(riskcheckShippingAddresses).length != 0) {
        localStorage.removeItem('riskcheckPopUpAccept');
        localStorage.removeItem('riskcheckBillingAddresses');
        localStorage.removeItem('riskcheckShippingAddresses');
      }
    }
    catch {
      // error in the above string (in this case, yes)!
    }
  }
  
  const upDateStep1FormData = (source, commerceInfo) => {
    let stepOneFormData = { ...commerceContext?.checkout?.stepOneFormData };

    const commerceData = commerceInfo || commerceContext;

    source?.forEach((sourceElement) => {
      const data = getDataInfo(commerceData, sourceElement);

      if (data) {
        data.countryId = data?.country;
      }

      if (!data?.streetLine2) {
        data.streetLine2 = '';
      }

      stepOneFormData = {
        ...stepOneFormData,
        [sourceElement.includes('shipping') ? 'shipping' : 'billing']: {
          address: data,
        },
      };
    });

    const newStepOneFormData = { ...stepOneFormData };
    const newCommerceData = {
      ...commerceData,
      checkout: {
        ...commerceData?.checkout,
        stepOneFormData: newStepOneFormData,
      },
    };
    setCommerceContext(newCommerceData);

    setDataInForm(stepOneFormData);
  };

  const removeReadOnlyAttribute = (modal) => {
    Object.keys(addressModalSelectors).forEach((key) => {
      modal
        .querySelector(addressModalSelectors[key])
        ?.removeAttribute('readonly');
    });
  };

  const showHideAddressesButton = (addresses) => {
    const hideShowAddBtn = document.querySelector('#hide-shipping-addresses');
    const hideShowBillingAddBtn = document.querySelector(
      '#hide-billing-addresses'
    );
    if (hideShowAddBtn !== null) {
      if(addresses.length > 1){
        hideShowAddBtn.parentElement.removeAttribute('style');
        hideShowAddBtn.parentElement.classList.add('show-addresses-block');
        let unselectedAddresses = $(hideShowAddBtn)
          .find('span')
          .text()
          .replace('X', addresses.length - 1);
        $(hideShowAddBtn).find('span').text(unselectedAddresses);
      } else {
        hideShowAddBtn.setAttribute(
          'style',
          'display: none;'
        );
      }
    }
    if (hideShowBillingAddBtn !== null) {
      if(addresses.length > 1){
        hideShowBillingAddBtn.parentElement.removeAttribute('style');
        hideShowBillingAddBtn.parentElement.classList.add(
          'show-billing-addresses-block'
        );
        let unselectedAddresses = $(hideShowBillingAddBtn)
          .find('span')
          .text()
          .replace('X', addresses.length - 1);
        $(hideShowBillingAddBtn).find('span').text(unselectedAddresses);
      } else {
        hideShowBillingAddBtn.setAttribute(
          'style',
          'display: none;'
        );
      }
    } 
  };

  useEffect(async () => {
    let stepOneFormData = commerceContext?.checkout?.stepOneFormData;
    setDataInForm(stepOneFormData);

    const onAEMeditor = window.top.location.href.indexOf('/editor.html') > -1;
    const checkoutStep1LoadedEvent = createConditionalEvent(
      true,
      'checkoutStep1Loaded'
    );

    if (!onAEMeditor) {
      // if order failure, go to step 3 and show error message
      if (
        commerceContext?.checkout?.orderFailure &&
        commerceContext?.cart?.id
      ) {
        // Show Error Message
        const placeOrderError = createConditionalEvent(
          'error',
          'placeOrderError'
        );
        window.dispatchEvent(placeOrderError);


        // Clean Order Failure
        setCommerceContext({
          ...commerceContext,
          checkout: {
            ...commerceContext?.checkout,
            orderFailure: null,
          },
        });
      }

      // if user is not logged in, show form right away
      if (!userIsLoggedIn) {
        window.dispatchEvent(checkoutStep1LoadedEvent);
      }
      // if user is logged in
      else {
        const userLoggedInEvent = createConditionalEvent(
          true,
          'userIsLoggedIn'
        );
        const userHasAddressesEvent = createConditionalEvent(
          true,
          'userHasAddresses'
        );
        window.dispatchEvent(userLoggedInEvent);

        // Replace text with user fisrt name
        const welcomeText = document.querySelector('#welcomeStep1 h3')
          .innerHTML;
        document.querySelector(
          '#welcomeStep1 h3'
        ).innerHTML = welcomeText.replace(
          '${name}',
          cleanDisplayString(authContext?.accountInfo?.userInfo?.firstName || '')
        );

        // Check and hide consents that aren't needed for customer user
        const consentsToHide = ['eula', 'age', 'subscription_payment', 'subscription_consent'];
        consentsToHide?.forEach((item) => {
          const consent = document.querySelector(
            `#checkout-consents-options .a-checkbox__input[value="${item}"]`
          );

          if (consent) {
            if ((item === 'subscription_payment' || item === 'subscription_consent') && cartContainsSubscription(commerceContext)) {
              return;
            } else {
              consent.checked = true;
              consent.closest('.a-checkbox').classList.add('d-none');
            }
          }
        });

        if (!stepOneFormData) {
          stepOneFormData = {
            billing: {
              address: {
                firstName: authContext?.accountInfo?.userInfo?.firstName,
                lastName: authContext?.accountInfo?.userInfo?.lastName,
                email: authContext?.accountInfo?.userInfo?.email,
              },
            },
          };

          setDataInForm(stepOneFormData);
        }

        try {
          const addresses = await getAllAddresses();
          const sortedShipping = [...addresses]?.sort((a, b) => {
            if (stepOneFormData?.shipping?.address?.id === a.id) return -1;
            if (stepOneFormData?.shipping?.address?.id === b.id) return 1;
            if (a.default_shipping > b.default_shipping) return -1;
            if (a.default_shipping < b.default_shipping) return 1;
            return 0;
          });

          const sortedBilling = [...addresses]?.sort((a, b) => {
            if (stepOneFormData?.billing?.address?.id === a.id) return -1;
            if (stepOneFormData?.billing?.address?.id === b.id) return 1;
            if (a.default_billing > b.default_billing) return -1;
            if (a.default_billing < b.default_billing) return 1;
            return 0;
          });
          // Info Test
          if(commerceContext?.cart?.billing_address){
            let cId = commerceContext?.cart?.billing_address?.customer_address_id;  
            sortedBilling.unshift(sortedBilling.splice(sortedBilling.findIndex(item => item.id === cId), 1)[0])
          }
          if(commerceContext?.cart?.shipping_addresses?.length > 0){
            let cId = commerceContext?.cart?.shipping_addresses[0]?.customer_address_id;  
            sortedShipping.unshift(sortedShipping.splice(sortedShipping.findIndex(item => item.id === cId), 1)[0])
         
          }

          let commerceInfo;

          if (addresses?.length > 0) {
            const sameAsBillingCheckbox = document.querySelector(
              'input[name="shipping.address.sameAsBilling"]'
            );

            if (sameAsBillingCheckbox && commerceContext?.cart?.shipping_addresses && commerceContext?.cart?.billing_address?.customer_address_id != commerceContext?.cart?.shipping_addresses[0]?.customer_address_id) {
              const defaultBilling = sortedBilling?.find(
                (address) => address.default_billing === true
              );

              // If default billing, show billing address list
              // unchecking "same as billing" checkbox
              if (defaultBilling && sameAsBillingCheckbox.checked) {
                sameAsBillingCheckbox.click();
              } else if (!sameAsBillingCheckbox.checked) {
                // Check "same as billing" checkbox
                sameAsBillingCheckbox.click();
              }
            }

            if (!sameAsBillingCheckbox.checked) {
              sameAsBillingCheckbox.parentElement.parentElement.classList.add(
                'shipping-as-billing-block'
              );
            }
            // If shipping and billing both addresses are same
            if (commerceContext?.cart?.shipping_addresses && commerceContext?.cart?.billing_address?.customer_address_id == commerceContext?.cart?.shipping_addresses[0]?.customer_address_id) {
              setIsShippingAsBilling(true)
              if (!sameAsBillingCheckbox.checked) {
                // Check "same as billing" checkbox
                document.querySelector('[name="shipping.address.sameAsBilling"]').value = 0
                sameAsBillingCheckbox.click();
              }
            }
            else if (commerceContext?.cart?.shipping_addresses && commerceContext?.cart?.billing_address?.customer_address_id != commerceContext?.cart?.shipping_addresses[0]?.customer_address_id) {
              setIsShippingAsBilling(false)
              if (sameAsBillingCheckbox.checked) {
                // Uncheck "same as billing" checkbox
                sameAsBillingCheckbox.click();
              }
            }

            setUserHasAddresses(true);
            setPendingAddressValidation(false);
            commerceInfo = {
              ...commerceContext,
              profile: {
                ...commerceContext?.profile,
                addresses: {
                  ...commerceContext?.profile?.addresses,
                  shipping: sortedShipping,
                  billing: sortedBilling,
                },
              },
            };

            window.dispatchEvent(userHasAddressesEvent);

            const allAddresses = document.querySelectorAll(
              "[data-conditional-variable='userHasAddresses'] .formdata .checkout-form-data"
            );

            const dataToUpdateForm = [];
            const addressTypeMap = {
              shipping: sortedShipping,
              billing: sortedBilling,
            };

            allAddresses.forEach((element) => {
              const firstFormDataEl = element;
              const addressType = firstFormDataEl.dataset.source.includes(
                'shipping'
              )
                ? 'shipping'
                : 'billing';

              firstFormDataEl.dataset.radioGroupName = `checkout.stepOneFormData.${addressType}.address`;

              firstFormDataEl
                .closest('.m-form-data')
                .classList.add('m-form-data--with-radio', 'js-formdata-radio');

              cloneAddress(element.closest('.formdata'), addresses.length - 1);

              firstFormDataEl.dataset.source = replacePlaceholder(
                firstFormDataEl.dataset.source,
                0
              );

              if (
                !stepOneFormData[addressType]?.address?.id ||
                !addressTypeMap[addressType].find(
                  ({ id }) => id === stepOneFormData[addressType].address.id
                )
              ) {
                dataToUpdateForm.push(firstFormDataEl.dataset.source);
              }
            });

            // Update Step1 Data
            upDateStep1FormData(dataToUpdateForm, commerceInfo);
            checkRiskCheckPopUp()
           
            // Portal will need to be re-rendered to bind FormData to the newly cloned selectors:
            window.dispatchEvent(
              new CustomEvent('rerenderPortal', {
                detail: {
                  selector: '.checkout-form-data',
                },
              })
            );

            if (addresses?.length > 1) {
              showHideAddressesButton(addresses);
            } else if(addresses?.length == 1) {
               showHideAddressesButton(addresses);
               setIsBothAddressSame(true);
            } else {
              throw new Error('No addresses found');
            }
        }
        } catch (e) {
          // In case there aren't any addresses, clear any data in profile
          setCommerceContext({
            ...commerceContext,
            profile: {
              ...commerceContext?.profile,
              addresses: {
                ...commerceContext?.profile?.addresses,
                shipping: null,
                billing: null,
              },
            },
          });
        }

        window.dispatchEvent(checkoutStep1LoadedEvent);
      }
    }
  }, []);

  useEffect(async()=>{
    if(isBillingAddressIndex || isBillingAddressIndex == '0'){

    const cartId = commerceContext?.cart?.id;
    const addressId = isBillingAddressIndex ? isBillingAddressIndex : commerceContext?.checkout?.stepOneFormData?.billing?.address?.id
    const shippingAsBilling = isShippingAsBillingUpdate

    if(!cartId){
      return;
    }
    let billingPayload = {
      cartId,
    };
    const sameAsBilling = getCheckboxState(
      document.querySelector(
        `input[type="checkbox"][name="shipping.address.sameAsBilling"]`
      )
    );
    if(sameAsBilling || shippingAsBilling){
      billingPayload = {
        ...billingPayload,
        use_for_shipping: true
      }
    }
    if (
      userIsLoggedIn &&
      addressId
    ) {
      //Check sameAsbilling and if sameAsBiling and change shipping address 
      const billingAddressId = sameAsBilling ? shippingAsBilling ? addressId :
        commerceContext?.checkout?.stepOneFormData?.shipping?.address?.id
        : addressId;

      billingPayload = {
        ...billingPayload,
        addressId: billingAddressId,
      };

      const matchedBillingAddress = findAddressById(
        commerceContext?.profile?.addresses?.billing,
        billingAddressId
      );
    
      const billingResponse = await fetchESLservice({
        service: userIsLoggedIn ? ESL_EPT.billingAuth : ESL_EPT.billing,
        data: billingPayload,
        addAuthHeaders: userIsLoggedIn,
        withRecaptcha: !userIsLoggedIn,
      });
    

      if (billingResponse?.data?.response?.data) {
        let selectedShippingMethodData = null
        let shippingResponse = null

        if (!billingResponse?.data?.response?.data?.cart?.shipping_addresses[0]?.selected_shipping_method && sameAsBilling) {
          showTransparentLoader()
          const newCommerceContext = {
            ...commerceContext,
            cart: billingResponse?.data?.response?.data?.cart || commerceContext?.cart,
            checkout: {
              ...commerceContext?.checkout,
            }
          }
          shippingResponse = await shippingCall(newCommerceContext, userIsLoggedIn, addressId)
          hideTransparentLoader()
          selectedShippingMethodData = shippingResponse?.data?.response?.data?.cart?.shipping_addresses[0]?.selected_shipping_method
        }
        else {
          selectedShippingMethodData = billingResponse?.data?.response?.data?.cart?.shipping_addresses[0]?.selected_shipping_method
        }
        
        const cartResp =  shippingResponse?.data?.response?.data?.cart || billingResponse?.data?.response?.data?.cart

        const newCommerceDataToSet = {
          ...commerceContext,
          cart: cartResp || commerceContext?.cart,
          checkout: {
            ...commerceContext?.checkout,
            availableShippingMethods: billingResponse?.data?.response?.data?.cart?.shipping_addresses[0]?.available_shipping_methods,
            billingResponse,
            selectedShippingMethod: selectedShippingMethodData,
            stepOneFormData: {
              ...commerceContext?.checkout?.stepOneFormData,
              billing: {
                address: findAddressById(commerceContext?.profile?.addresses?.billing, addressId),
              },
              shipping: sameAsBilling ? {
                address: findAddressById(commerceContext?.profile?.addresses?.shipping, addressId),
              } : commerceContext?.checkout?.stepOneFormData?.shipping
            },
          },
          shippingApiRender: false,
          paymentTabRender: true,
        };

        setCommerceContext(newCommerceDataToSet);
        setAvailableShippingMethods(billingResponse?.data?.response?.data?.cart?.shipping_addresses[0]?.available_shipping_methods);

      }


      return billingResponse;
    }
  }
  },[isBillingAddressIndex])

  const setShippingMethodsCall = async (addressID) => {

    const cartId = commerceContext?.cart?.id;
    const addressId = addressID ? addressID : commerceContext?.checkout?.stepOneFormData?.shipping?.address?.id
    
    if(!cartId){
      return;
    }

    if(userIsLoggedIn && addressId){
      const shippingMethodPayload = {
        address: findAddressById(commerceContext?.profile?.addresses?.shipping, addressId),
        cartId,
      };
      const shippingMethodsResponse = await fetchESLservice({
        service: userIsLoggedIn
          ? ESL_EPT.shippingMethodsAuth
          : ESL_EPT.shippingMethods,
        data: shippingMethodPayload,
        addAuthHeaders: userIsLoggedIn,
        withRecaptcha: !userIsLoggedIn,
      });

      const newCommerceDataToSet = {
        ...commerceContext,
        checkout: {
          ...commerceContext?.checkout,
          availableShippingMethods: shippingMethodsResponse?.data?.response?.shipping,
          shippingMethodsResponse: shippingMethodsResponse?.data,
          selectedShippingMethod: commerceContext?.cart?.shipping_addresses[0]?.selected_shipping_method,
          stepOneFormData: {
            ...commerceContext?.checkout?.stepOneFormData,
            shipping: {
              address: findAddressById(commerceContext?.profile?.addresses?.shipping, addressId),
            }
          },
        },
        shippingApiRender: true,
        shippingMethodsRender: false,
      };
      setCommerceContext(newCommerceDataToSet);
      setAvailableShippingMethods(shippingMethodsResponse?.data?.response?.shipping);
    }
  };

  useEffect(()=>{
    if(commerceContext?.shippingMethodsRender){
      setShippingMethodsCall(0);
    }
    },[commerceContext?.shippingMethodsRender])

  useEffect(() => {
    let shippingAddressTitle = document.querySelector(
      '#shipping-address-title'
    );
    let billingAddressTitle = document.querySelector('#billing-address-title');
    if (
      userHasAddresses &&
      shippingAddressTitle !== null &&
      billingAddressTitle !== null
    ) {
      if (shippingAddressTitle.querySelector('h4') !== null) {
        let sameAsBillingCheckbox = document.querySelector(
          `input[type="checkbox"][name="shipping.address.sameAsBilling"]`
        );
        if (sameAsBillingCheckbox !== null && sameAsBillingCheckbox.checked) {
          shippingAddressTitle.querySelector('h4').innerHTML = t('shipping-billing-address');
        }
        else {
          shippingAddressTitle.querySelector('h4').innerHTML = t('shipping-address');
        }
      }
      if (billingAddressTitle.querySelector('h4') !== null) {
        billingAddressTitle.querySelector('h4').innerHTML = t('billing-address');
      }
    }

    const hideShowAddBtn = document.querySelector('#hide-shipping-addresses');
    const hideShowBillingAddBtn = document.querySelector('#hide-billing-addresses');
    if (hideShowAddBtn !== null && hideShowBillingAddBtn !== null) {
      if (userHasAddresses === false) {
          hideShowAddBtn.parentElement.style.display = 'none';
          hideShowBillingAddBtn.parentElement.style.display = 'none';
      } else if(userHasAddresses === true) {
          hideShowAddBtn.parentElement.removeAttribute('style');
          hideShowBillingAddBtn.parentElement.removeAttribute('style');
      }
    }
  }, [userHasAddresses]);

  useEffect(() => {
    let clickHandlers;
    if (commerceContext?.profile) {
      clickHandlers = [
        {
          selector: `.js-formdata-radio`,
          handler: async (e) => {
            
            const parent = e.target.closest('.formdata');
            const formData = parent.querySelector('.checkout-form-data');
            const isEdit = e.target.closest('#my-address-edit');

            if(parent.querySelector('.a-radio__input').checked){
              return;
            }

            const { source } = formData.dataset;

            setIsAddressIndex(isEdit)
            setIsAddressIndex(source)
          },
        },
        {
          selector: `#my-address-edit`,
          handler: async (e) => {
            const parent = e.target.closest('.formdata');
            const formData = parent.querySelector('.checkout-form-data');
            const { source } = formData?.dataset;
            const modal = document.querySelector('#my-address-edit-modal');

            removeReadOnlyAttribute(modal);
            setAuthHeaderFields(modal);
            if (isAddressDropdownFields('#my-address-edit-modal')) {
              await prefillAddressDropdowns(getDataInfo(commerceContext, source), '#my-address-edit-modal', $('[name="x-country-code"]').val());
            }
            prefillEditForm(getDataInfo(commerceContext, source), modal);
          },
        },
        {
          selector: `#my-address-add`,
          handler: (e) => {
            const modal = document.querySelector('#my-address-add-modal');
            const fullFieldsModal = document.querySelector(
              '#my-address-add-full-fields-modal'
            );
            // Reset id and default_shipping fields, as they're only used for editing an existing address:
            modal.querySelector('input[name="address.id"]').value = '';
            //Set billing = true when adding a billing address and shipping = false
            if (e?.target?.textContent.toLowerCase().includes('billing')) {
              !!modal.querySelector('input[name="address.default_billing"]') &&
                (modal.querySelector(
                  'input[name="address.default_billing"]'
                ).value = true);
              modal.querySelector(
                'input[name="address.default_shipping"]'
              ).value = false;
              !!fullFieldsModal.querySelector(
                'input[name="address.default_billing"]'
              ) &&
                (fullFieldsModal.querySelector(
                  'input[name="address.default_billing"]'
                ).value = true);
              fullFieldsModal.querySelector(
                'input[name="address.default_shipping"]'
              ).value = false;
            } else {
              !!modal.querySelector('input[name="address.default_billing"]') &&
                (modal.querySelector(
                  'input[name="address.default_billing"]'
                ).value = false);
              modal.querySelector(
                'input[name="address.default_shipping"]'
              ).value = true;
              !!fullFieldsModal.querySelector(
                'input[name="address.default_billing"]'
              ) &&
                (fullFieldsModal.querySelector(
                  'input[name="address.default_billing"]'
                ).value = false);
              fullFieldsModal.querySelector(
                'input[name="address.default_shipping"]'
              ).value = true;
            }

            removeReadOnlyAttribute(modal);
            setAuthHeaderFields(modal);
          },
        },
        {
          selector: `#my-address-add-full-fields`,
          handler: (e) => {
            const modal = document.querySelector(
              '#my-address-add-full-fields-modal'
            );

            if (isAddressDropdownFields('#my-address-add-full-fields-modal')) {
              if (e?.target?.textContent.toLowerCase().includes('billing')) {
                !!modal.querySelector('input[name="address.default_billing"]') &&
                  (modal.querySelector(
                    'input[name="address.default_billing"]'
                  ).value = true);
                modal.querySelector(
                  'input[name="address.default_shipping"]'
                ).value = false;
              } else {
                !!modal.querySelector('input[name="address.default_billing"]') &&
                  (modal.querySelector(
                    'input[name="address.default_billing"]'
                  ).value = false);
                modal.querySelector(
                  'input[name="address.default_shipping"]'
                ).value = true;
              }
            }
            // Reset id and default_shipping fields, as they're only used for editing an existing address:
            modal.querySelector('input[name="address.id"]').value = '';

            removeReadOnlyAttribute(modal);
            setAuthHeaderFields(modal);
          },
        },
        {
          selector: `#hide-shipping-addresses`,
          handler: (e) => {
            let targetText = e.target.innerHTML;
            $('#shipping-addresses-form .formdata').each(function () {
              if (
                !$(this).find('.a-radio__input').is(':checked') &&
                $(this).is(':visible')
              ) {
                $(this).hide();
                let hideText = targetText.replace('Hide', 'Show');
                let addMore = hideText.replace(')', ') more');
                e.target.innerHTML = addMore;
                e.currentTarget.classList.remove('up-icon');
              } else {
                $(this).show();
                let showText = targetText.replace('Show', 'Hide');
                let removeMore = showText.replace('more', '');
                e.target.innerHTML = removeMore;
                e.currentTarget.classList.add('up-icon');
              }
            });
            $('#shipping-addresses-form .formdata').removeClass('_unselected');
          },
        },
        {
          selector: `#hide-billing-addresses`,
          handler: (e) => {
            let targetText = e.target.innerHTML;
            $('#billing-addresses-form .formdata').each(function () {
              if (
                !$(this).find('.a-radio__input').is(':checked') &&
                $(this).is(':visible')
              ) {
                $(this).hide();
                let hideText = targetText.replace('Hide', 'Show');
                let addMore = hideText.replace(')', ') more');
                e.target.innerHTML = addMore;
                e.currentTarget.classList.remove('up-icon');
              } else {
                $(this).show();
                let showText = targetText.replace('Show', 'Hide');
                let removeMore = showText.replace('more', '');
                e.target.innerHTML = removeMore;
                e.currentTarget.classList.add('up-icon');
              }
            });
            $('#billing-addresses-form .formdata').removeClass('_unselected');
          },
        },
        {
          selector: `[name="shipping.address.sameAsBilling"]`,
          handler: (e) => {
            let shippingAddressTitle = document.querySelector(
              '#shipping-address-title'
            );
            if (e !== null) {
              if (e.target.checked) {
                e.target.parentElement.parentElement.classList.remove(
                  'shipping-as-billing-block'
                );
                if (shippingAddressTitle !== null) {
                  shippingAddressTitle.querySelector('h4').innerHTML = t('shipping-billing-address');
                }
                if (e.target.value != 0) {
                  document.querySelector('[name="shipping.address.sameAsBilling"]').value = 1
                  const addressShippingId = commerceContext?.checkout?.stepOneFormData?.shipping?.address?.id ? commerceContext?.checkout?.stepOneFormData?.shipping?.address?.id : 0;
                  setIsBillingAddressIndex(addressShippingId)
                  setIsShippingAsBilling(true)
                }
              } else {
                e.target.parentElement.parentElement.classList.add(
                  'shipping-as-billing-block'
                );
                if (shippingAddressTitle !== null) {
                	shippingAddressTitle.querySelector('h4').innerHTML = t('shipping-address');
                }
                setIsShippingAsBilling(false)
              }
            }
          },
        },
        {
          selector: `[name="vatExemption.isClaimingRelief"]`,
          handler: async (e) => {
            const certificateAddressModal = document.querySelector(
              '#certificate-address-modal'
            );

            if (e.target.checked) {
              const certificateAddressButton = document.querySelector(
                '#certificate-address.btn'
              );

              if (certificateAddressButton && certificateAddressModal) {
                certificateAddressButton.click();
                certificateAddressModal
                  .querySelector('[name="vatExemption.subject"]')
                  ?.click();
              }
            } else {
                setVatExemptionUncheck(true)
                setVatExemptionStatus(false)
            }
          },
        },
        {
          selector: `[name="vatExemption.subject"]`,
          handler: (e) => {
            const certificateAddressModal = document.querySelector(
              '#certificate-address-modal'
            );

            if (certificateAddressModal) {
              const shippingAddress =
                e.target.value === 'self'
                  ? getDataInfo(
                      commerceContext,
                      'checkout.stepOneFormData.shipping.address'
                    )
                  : {};

              prefillEditForm(shippingAddress, certificateAddressModal);
              e.target.value !== 'self' &&
                (certificateAddressModal.querySelector(
                  'input[name="address.middleName"]'
                ).value = '');
            }
          },
        },
        {
          selector: `#certificate-address-submit`,
          handler: async (e) => {
            const certificateAddressModal = document.querySelector(
              '#certificate-address-modal'
            );

            if (certificateAddressModal) {
              certificateAddressModal
                .querySelector('#certificate-address-submit')
                ?.classList.add('disabled');

              const isValidCertificateAddress = () => {
                let validationFailed = false;

                Object.entries(certificateAddressSelectors).forEach(
                  ([key, selector]) => {
                    const addressElement = certificateAddressModal.querySelector(
                      selector
                    );
                    const formGroup = addressElement?.closest('.form-group');

                    if (
                      addressElement?.required &&
                      addressElement?.value === ''
                    ) {
                      formGroup?.classList.add('validation-require');
                      validationFailed = true;
                    } else if (
                      formGroup?.classList.contains('validation-regex')
                    ) {
                      validationFailed = true;
                    } else if (
                      key === 'prefix' &&
                      !(addressElement?.textContent?.trim() || '')
                    ) {
                      certificateAddressModal
                        .querySelector('[name="address.prefix"]')
                        ?.closest('.a-dropdown')
                        ?.classList.add('validation-require');
                      validationFailed = true;
                    }
                  }
                );

                return !validationFailed;
              };

              if (!isValidCertificateAddress()) {
                window.dispatchEvent(
                  createConditionalEvent(
                    true,
                    'showCertificateAddressValidationError'
                  )
                );
              } else {
                window.dispatchEvent(
                  createConditionalEvent(
                    false,
                    'showCertificateAddressValidationError'
                  )
                );     
                setVatExemptionStatus(true)
                setVatExemptionUncheck(false)       
              }

              certificateAddressModal
                .querySelector('#certificate-address-submit')
                ?.classList.remove('disabled');
            }
          },
        },
      ];

      addEventHandlers('click', clickHandlers);
    }

    return () => {
      if (commerceContext?.profile) {
        removeEventHandlers('click', clickHandlers);
      }
    };
  }, [commerceContext?.checkout?.stepOneFormData]);

  useEffect(async () => {
    if (enteredEmail) {
      switch (enteredEmail) {
        case 'test@test.com':
          const testDupeEvent = createConditionalEvent(
            'dupe',
            'guestEmailValidation'
          );
          window.dispatchEvent(testDupeEvent);
          break;
        case 'test2@test.com':
          const testErrorEvent = createConditionalEvent(
            'error',
            'guestEmailValidation'
          );
          window.dispatchEvent(testErrorEvent);
          break;
        case '':
          const initEvent = createConditionalEvent(
            false,
            'guestEmailValidation'
          );
          window.dispatchEvent(initEvent);
          break;
        default:
          let clearEvent;
          try {
            const emailExists = (await isDuplicateEmail(enteredEmail)) || false;
            clearEvent = createConditionalEvent(
              emailExists === true ? 'dupe' : false,
              'guestEmailValidation'
            );
          } catch (error) {
            clearEvent = createConditionalEvent(
              'error',
              'guestEmailValidation'
            );
          }
          window.dispatchEvent(clearEvent);
          break;
      }
    }
  }, [enteredEmail]);

  const handleCheckingAddressOverlay = (hide) => {
    const container = document.getElementById('shipping-container');
    if (container) {
      if (hide) {
        container
          .querySelector('.shipping-spinner-container')
          ?.classList.add('d-none');
      } else {
        const loaderContainer = container.querySelector(
          '.shipping-spinner-container'
        );
        if (loaderContainer) {
          loaderContainer.classList.remove('d-none');
        } else {
          const newLoaderContainer = document.createElement('div');
          newLoaderContainer.classList.add('shipping-spinner-container');
          container.append(newLoaderContainer);
          const loaderContainer = container.querySelector(
            '.shipping-spinner-container'
          );
          ReactDOM.render(<LoadingIndicator />, loaderContainer, () => {
            const loaderText = document.createElement('p');
            loaderText.innerHTML = t('checking-address');
            loaderContainer.append(loaderText);
          });
        }
      }
    }
  };

  useEffect(async () => {
    if (
      enteredStreetLine1 &&
      enteredZipCode &&
      enteredCity &&
      !skipAddressSuggestion &&
      !showCheckingAddressLoader
    ) {
      try {
        const country = document.querySelector('input[name="x-country-code"]')
          .value;
        setPendingAddressValidation(true);
        setShowCheckingAddressLoader(true);

        // Check if this is a valid address
        const { responseCode, proposedAddress } = await validateAddress({
          streetLine1: enteredStreetLine1,
          streetLine2: enteredStreetLine2,
          city: enteredCity,
          zipCode: enteredZipCode,
          countryId: country,
        });

        if (responseCode !== 'validaddress') {
          setProposedAddressList(proposedAddress);
          setAddressHasError(true);
        } else if (proposedAddress) {
          setProposedAddressList(proposedAddress);
        } else {
          setAddressHasError(false);
        }

        setAddressErrorMessage(false);
      } catch (e) {
        if (
          storeView === storeViews.LINGO_UK &&
          e.i18nMessageKey === 'ADDR-VALD-1001'
        ) {
          // Zip code is invalid, set error message
          setAddressErrorMessage(e.message);
        }
      } finally {
        setPendingAddressValidation(false);
        setShowCheckingAddressLoader(false);
      }
    }
  }, [
    enteredStreetLine1,
    enteredStreetLine2,
    enteredCity,
    enteredZipCode,
    skipAddressSuggestion,
  ]);

  useEffect(() => {
    if (addressErrorMessage) {
      setErrorContext(addressErrorMessage);
    } else {
      setErrorContext(false);
    }
  }, [addressErrorMessage]);

  useEffect(() => {
    let shippingMethods = availableShippingMethods || commerceContext?.cart?.shipping_addresses[0]?.available_shipping_methods;

    if (commerceContext?.checkout?.stepOneFormData?.shipping?.address 
      && commerceContext?.checkout?.stepOneFormData?.billing?.address
      && commerceContext?.profile?.addresses?.shipping
      && (shippingMethods && shippingMethods.length > 0)) {
        setCommerceContext({
          ...commerceContext,
          checkout: {
            ...commerceContext?.checkout,
            availableShippingMethods: shippingMethods,
          },
        });
    }
  }, [commerceContext?.checkout?.stepOneFormData, commerceContext?.profile?.addresses?.shipping, commerceContext?.availableShippingMethods]);

  useEffect(async () => {
    if (
      enteredBillingAddress?.streetLine1 &&
      enteredBillingAddress?.zipCode &&
      enteredBillingAddress?.city &&
      !skipAddressSuggestion &&
      !showCheckingAddressLoader
    ) {
      try {
        const country = document.querySelector('input[name="x-country-code"]')
          .value;
        setPendingAddressValidation(true);
        setShowCheckingAddressLoader(true);

        // Check if this is a valid address
        const { responseCode, proposedAddress } = await validateAddress({
          streetLine1: enteredBillingAddress?.streetLine1,
          streetLine2: enteredBillingAddress?.streetLine2,
          city: enteredBillingAddress?.city,
          zipCode: enteredBillingAddress?.zipCode,
          countryId: country,
        });

        if (responseCode !== 'validaddress') {
          setBillingProposedAddressList(proposedAddress);
          setBillingAddressHasError(true);
        } else if (proposedAddress) {
          setBillingProposedAddressList(proposedAddress);
        } else {
          setBillingAddressHasError(false);
        }
      } catch (e) {
        throw new Error(e);
      } finally {
        setPendingAddressValidation(false);
        setShowCheckingAddressLoader(false);
      }
    }
  }, [enteredBillingAddress, skipAddressSuggestion]);

  useEffect(() => {
    if (showCheckingAddressLoader) {
      handleCheckingAddressOverlay();
    } else {
      handleCheckingAddressOverlay(true);
    }
  }, [showCheckingAddressLoader]);

  const renderAddressSuggestions = (isBilling) => {
    const dataAddressSelector = isBilling
      ? billingAddressSelectors
      : addressSelectors;

    const dataAddressHasError = isBilling
      ? billingAddressHasError
      : addressHasError;

    const dataProposedAddressList = isBilling
      ? billingProposedAddressList
      : proposedAddressList;

    const conditionalVariable = isBilling
      ? 'billingAddressInvalid'
      : 'addressInvalid';

    const containerId = isBilling
      ? 'billing-checkout-address-invalid'
      : 'checkout-address-invalid';

    Object.values(dataAddressSelector).forEach((selector) => {
      if (dataAddressHasError) {
        // Add class to address inputs
        $(selector).closest('.form-group').addClass('validation-require');
      } else {
        // Remove class from address inputs
        $(selector).closest('.form-group').removeClass('validation-require');
      }
    });

    // Dispatch form conditional event
    let addressValidEvent = createConditionalEvent(
      dataAddressHasError,
      conditionalVariable
    );

    // Show Addresses Alternatives
    if (dataProposedAddressList) {
      let conditionalCase = dataAddressHasError;
      if (!conditionalCase) {
        conditionalCase = 'showList';
      }

      const oldSuggestionsContainer = document.querySelector(`#${containerId}`);
      if (oldSuggestionsContainer) {
        oldSuggestionsContainer.remove();
      }

      const addressInvalidContainer = document.querySelector(
        `div[data-conditional-variable="${conditionalVariable}"] div[data-conditional-case="${conditionalCase}"]`
      );
      const content = document.createElement('div');
      content.setAttribute('id', containerId);
      addressInvalidContainer.appendChild(content);
      const suggestionsContainer = document.querySelector(`#${containerId}`);

      const resetState = () => {
        if (isBilling) {
          setBillingAddressHasError(false);
          setBillingProposedAddressList(null);
        } else {
          setAddressHasError(false);
          setProposedAddressList(null);
        }
      };

      const onAddressSelection = (chosenAddress) => {
        Object.keys(chosenAddress).forEach((key) => {
          const input = document.querySelector(dataAddressSelector[key]);
          if (input) {
            input.value = chosenAddress[key];
          }
        });

        setSkipAddressSuggestion(true);

        if (isBilling) {
          setEnteredBillingAddress({
            streetLine1: chosenAddress.streetLine1,
            streetLine2: chosenAddress.streetLine2,
            zipCode: chosenAddress.zipCode,
            city: chosenAddress.city,
          });
        } else {
          setEnteredStreetLine1(chosenAddress.streetLine1);
          setEnteredStreetLine2(chosenAddress.streetLine2);
          setEnteredZipCode(chosenAddress.zipCode);
          setEnteredCity(chosenAddress.city);
        }

        let address2ValidEvent;
        if (document.querySelector(addressSelectors.streetLine2)?.value) {
          address2ValidEvent = createConditionalEvent(
            true,
            'showShippingAddressLine2'
          );
        }

        if (
          document.querySelector(billingAddressSelectors.streetLine2)?.value
        ) {
          address2ValidEvent = createConditionalEvent(
            true,
            'showBillingAddressLine2'
          );
        }

        if (address2ValidEvent) {
          window.dispatchEvent(address2ValidEvent);
        }

        resetState();
      };

      const onCloseSuggestions = () => {
        Object.values(dataAddressSelector).forEach((selector) => {
          const input = document.querySelector(selector);
          if (input) {
            input.value = '';
            input
              .closest('.form-group')
              ?.classList.remove('validation-require');
          }
        });
        if (isBilling) {
          setEnteredBillingAddress({});
        } else {
          setEnteredStreetLine1('');
          setEnteredStreetLine2('');
          setEnteredZipCode('');
          setEnteredCity('');
        }
        resetState();
      };

      const onKeepAddress = () => {
        resetState();
      };

      ReactDOM.render(
        <I18nextProvider i18n={i18n} defaultNS="common">
          <AddressSuggestions
            addresses={dataProposedAddressList}
            onSelection={onAddressSelection}
            onCloseSuggestions={onCloseSuggestions}
            onKeepAddress={onKeepAddress}
            onSelectIsLoading={(isloading) =>
              handleCheckingAddressOverlay(!isloading)
            }
          />
        </I18nextProvider>,
        suggestionsContainer
      );

      // Scroll to error
      setTimeout(() => {
        addressInvalidContainer.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 300);

      addressValidEvent = createConditionalEvent(
        conditionalCase,
        conditionalVariable
      );
    }

    window.dispatchEvent(addressValidEvent);
  };

  useEffect(() => {
    renderAddressSuggestions();
  }, [addressHasError, proposedAddressList]);

  useEffect(() => {
    renderAddressSuggestions(true);
  }, [billingAddressHasError, billingProposedAddressList]);

  useEffect(() => {
    const cart = commerceContext?.cart;
    const cartId = cart?.id;

    const resetSkipAddressSuggestion = (oldValue, newValue) => {
      if (oldValue !== newValue) {
        setSkipAddressSuggestion(false);
      }
    };

    const blurHandlers = [
      {
        selector: 'input[name="email"]',
        handler: (e) => {
          if (e.target.value !== enteredEmail) {
            setEnteredEmail(e.target.value);
          }
        },
      },
      {
        selector: addressSelectors.streetLine1,
        handler: (e) => {
          resetSkipAddressSuggestion(enteredStreetLine1, e.target.value);
          setEnteredStreetLine1(e.target.value);
        },
      },
      {
        selector: addressSelectors.streetLine2,
        handler: (e) => {
          resetSkipAddressSuggestion(enteredStreetLine2, e.target.value);
          setEnteredStreetLine2(e.target.value);
        },
      },
      {
        selector: addressSelectors.zipCode,
        handler: (e) => {
          resetSkipAddressSuggestion(enteredZipCode, e.target.value);
          setEnteredZipCode(e.target.value);
        },
      },
      {
        selector: addressSelectors.city,
        handler: (e) => {
          resetSkipAddressSuggestion(enteredCity, e.target.value);
          setEnteredCity(e.target.value);
        },
      },
      {
        selector: billingAddressSelectors.streetLine1,
        handler: (e) => {
          resetSkipAddressSuggestion(
            enteredBillingAddress?.streetLine1,
            e.target.value
          );
          setEnteredBillingAddress({
            ...enteredBillingAddress,
            streetLine1: e.target.value,
          });
        },
      },
      {
        selector: billingAddressSelectors.streetLine2,
        handler: (e) => {
          resetSkipAddressSuggestion(
            enteredBillingAddress?.streetLine2,
            e.target.value
          );
          setEnteredBillingAddress({
            ...enteredBillingAddress,
            streetLine2: e.target.value,
          });
        },
      },
      {
        selector: billingAddressSelectors.zipCode,
        handler: (e) => {
          resetSkipAddressSuggestion(
            enteredBillingAddress?.zipCode,
            e.target.value
          );
          setEnteredBillingAddress({
            ...enteredBillingAddress,
            zipCode: e.target.value,
          });
        },
      },
      {
        selector: billingAddressSelectors.city,
        handler: (e) => {
          resetSkipAddressSuggestion(
            enteredBillingAddress?.city,
            e.target.value
          );
          setEnteredBillingAddress({
            ...enteredBillingAddress,
            city: e.target.value,
          });
        },
      },
    ];

    const validateRequiredFields = (e) => {
      if (!cartId) {
        return;
      }

      const stepOneContinueButton = document.querySelector(
        `${ADDRESS_STEP} ${CONTINUE_BUTTON}`
      );
      // Input Validation
      const requiredInputs = $(`${ADDRESS_STEP} input[required]`).filter(
        ':visible'
      );
      let validInputs = 0;
      requiredInputs.each((i, el) => {
        const parent = el.closest('.form-group');
        const hasError =
          parent.classList.contains('validation-require') ||
          parent.classList.contains('validation-error') ||
          parent.classList.contains('validation-regex');

        if (el.value && !hasError) {
          validInputs++;
        }
      });

      // Checkbox Validation
      const requireCheckboxes = $(
        `${ADDRESS_STEP} input[type="checkbox"][data-required="true"]`
      );
      // Checkbox validations
      let validCheckboxes = 0;
      requireCheckboxes.each((i, el) => {
        validCheckboxes += getCheckboxState(el);
      });


    document.querySelectorAll(`${ADDRESS_STEP} input[required]`).forEach((el) => {
      el.addEventListener('keyup', validateRequiredFields);
    });

    // Target all checkboxes since their change could impact if it shows or hides required inputs
    document
      .querySelectorAll(`${ADDRESS_STEP} input[type="checkbox"]`)
      .forEach((el) => {
        el.addEventListener('change', validateRequiredFields);
      });

    // Re-validate fields on re-render (when useEffect's dependencies are changed)
    validateRequiredFields();

    };
  }, [
    enteredEmail,
    setEnteredEmail,
    addressHasError,
    commerceContext,
    setCommerceContext,
    enteredBillingAddress,
    pendingAddressValidation,
  ]);

  //removing if-condition userHasAddresses as for Gravity, user should be able to add address i
  //irrespective of userHasAddresses
  return (
    <>
      <EnterAddressModal 
        container="#my-address-edit-modal" 
      />
      <EnterAddressModal container="#my-address-add-modal" />
      {!!document.querySelector('#my-address-add-full-fields') && (
        <EnterAddressModal container="#my-address-add-full-fields-modal" />
      )}
    </>
  );

  //return null;
};

export default CheckoutAddressController;
