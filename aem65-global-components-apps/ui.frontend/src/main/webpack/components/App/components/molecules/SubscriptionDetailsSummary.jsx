import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CommerceContext } from '../../context/CommerceContext';
import { AuthContext } from '../../context/AuthContext';
import { fetchESLservice } from '../../services/eslService';
import LoadingIndicator from '../common/LoadingIndicator';
import EnterAddressModal from '../common/EnterAddressModal';
import createConditionalEvent from '../../utils/conditional';
import { addEventHandlers, getDateInPreferredLanguage, getLocalContextStoreName, isAddressDropdownFields, isToday, prefillAddressDropdowns, prefillEditForm, removeEventHandlers } from '../../utils/common';
import ESL_EPT from '../../data/eslEndpoints';

const SubscriptionDetailsSummary = ({ ...props }) => {
    const [commerceContext, setCommerceContext] = useContext(CommerceContext);
    const [authContext, setAuthContext] = useContext(AuthContext);
    const subscriptionId = new URLSearchParams(document.location.search).get('subscriptionId');
    const checkoutId = new URLSearchParams(document.location.search).get('id');
    const [loading, setLoading] = useState(true);
    const [isDataRetrieved, setIsDataRetrieved] = useState(false);
    const [savePaymentToken, setSavePaymentToken] = useState(checkoutId ? true : false);
    const [allAddresses, setAllAddresses] = useState({});
    const recentlyCancelledSubscription = JSON.parse(localStorage.getItem('recentlyCancelledSubscription'));
    const recentlySkippedSubscription = JSON.parse(localStorage.getItem('recentlySkippedSubscription'));
    const recentlyUpdatedSubscription = JSON.parse(localStorage.getItem('recentlyScheduleUpdateSubscription'));
    if(!!recentlyCancelledSubscription && recentlyCancelledSubscription.toString() === subscriptionId.toString()) {
      const cancelSubscriptionSuccess = createConditionalEvent(
        true,
        'showCancellationAlert'
      );
      window.dispatchEvent(cancelSubscriptionSuccess);
      localStorage.removeItem('recentlyCancelledSubscription');
      const CancelSubscriptionAlert = document.querySelector('#cancel-subscription-alert .m-alert__content .alert-title .cmp-title h5');
      if(CancelSubscriptionAlert) {
        const incrementId = commerceContext?.profile?.items?.subscriptionDetail?.increment_id;
        CancelSubscriptionAlert.innerHTML = CancelSubscriptionAlert.innerHTML?.replace('${increment_id}', `#${incrementId}`);
      }
    }

    if(!!recentlyUpdatedSubscription && recentlyUpdatedSubscription.toString() === subscriptionId.toString()) {
      const updateSubscriptionScheduleSuccess = createConditionalEvent(
        true,
        'showUpdateScheduleAlert'
      );
      window.dispatchEvent(updateSubscriptionScheduleSuccess);
      localStorage.removeItem('recentlyScheduleUpdateSubscription');
    }

    if(subscriptionId && !checkoutId) {
      localStorage.setItem('callBackUrl', window.location.href);
    }
 
    const authInfo =
    JSON.parse(
      localStorage.getItem(
        getLocalContextStoreName(commonConst.AUTH_LOCAL_STORAGE)
      ) || null
    ) || null;

    const formatAddresses = (arr) =>
      arr.map((address) => ({
        id: address?.id,
        nameOfAddress: address?.name_of_address,
        prefix: address?.prefix,
        firstName: address?.firstname,
        middleName: address?.middlename || '',
        lastName: address?.lastname,
        zipCode: address?.postcode,
        region: address?.region?.region,
        streetLine1: address?.street[0],
        streetLine2: address?.street[1] || '',
        telephone: address?.telephone,
        city: address?.city,
        countryId: address?.country_code || '',
        default_billing: address?.default_billing || '',
        default_shipping: address?.default_shipping || '',
        subscriptionId: address?.subscriptionId,
        addressType: address?.addressType,
      }));

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

    const formatDate = (timestamp) =>
      getDateInPreferredLanguage(timestamp, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      });

    const formatDateAndTime = (timestamp) => {
      if(timestamp) {
        const date = new Date(timestamp.split('/').reverse().join('-'));
        let yyyy = date.getUTCFullYear();
        let dd = date.getUTCDate();
        let mm = date.getUTCMonth() + 1;

        if (dd < 10) dd = '0' + dd;

        if (mm < 10) mm = '0' + mm;

        const formattedDate = yyyy + '-' + mm + '-' + dd;
        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();
        let seconds = date.getUTCSeconds();

        if (hours < 10) hours = '0' + hours;

        if (minutes < 10) minutes = '0' + minutes;

        if (seconds < 10) seconds = '0' + seconds;

        return formattedDate + ' ' + hours + ':' + minutes + ':' + seconds;
      }
      return '';
    };

    const getSelectedSubscriptionData = async (subscriptionNumber) => {
        try {
          const { data, errorCode } = await fetchESLservice({
            service: {
              method: 'GET',
              url: `/api/private/order/orders?subid=${subscriptionNumber}`,
            },
            withRecaptcha: false,
            addAuthHeaders: true,
          });

          if (!data) {
            throw new Error();
          }

          // assigned the id as 1 to shipping address
          const subscriptionShippingAddress = {
            ...data?.response?.data?.awSarp2Profile?.items[0]?.shipping_address,
            street: data?.response?.data?.awSarp2Profile?.items[0]?.shipping_address.street.split('\n'),
            id: 1,
            region: {
              region: data?.response?.data?.awSarp2Profile?.items[0]?.shipping_address?.region,
              region_code: data?.response?.data?.awSarp2Profile?.items[0]?.shipping_address?.region,
            },
            name_of_address: 'subscription_shipping_address',
            country_code: data?.response?.data?.awSarp2Profile?.items[0]?.shipping_address.country_id,
            subscriptionId: subscriptionId,
            addressType: 'shipping',
          };

          // assigned the id as 2 to Billing address
          const subscriptionBillingAddress = {
            ...data?.response?.data?.awSarp2Profile?.items[0]?.billing_address,
            street: data?.response?.data?.awSarp2Profile?.items[0]?.billing_address.street.split('\n'),
            id: 2,
            region: {
              region: data?.response?.data?.awSarp2Profile?.items[0]?.billing_address?.region,
              region_code: data?.response?.data?.awSarp2Profile?.items[0]?.billing_address?.region,
            },
            name_of_address: 'subscription_billing_address',
            country_code: data?.response?.data?.awSarp2Profile?.items[0]?.billing_address.country_id,
            subscriptionId: subscriptionId,
            addressType: 'billing',
          };

          const addresses = formatAddresses([subscriptionShippingAddress, subscriptionBillingAddress]);

          setCommerceContext({
            ...commerceContext,
            profile: {
              ...commerceContext.profile,
              items: {
                ...commerceContext.profile?.items,
                subscriptionDetail: {
                  ...data?.response?.data?.awSarp2Profile?.items[0],
                  next_payment_info: {
                    ...data?.response?.data?.awSarp2Profile?.items[0]?.next_payment_info,
                    formatted_payment_date:
                    data?.response?.data?.awSarp2Profile?.items[0]?.next_payment_info?.payment_date
                    ? formatDate(data?.response?.data?.awSarp2Profile?.items[0]?.next_payment_info?.payment_date) : '',
                  },
                  subscription_shipping: addresses[0],
                  subscription_billing: addresses[1],
                },
              },
            },
          });

          localStorage.setItem('dateRange', JSON.stringify({
            earliest: data?.response?.data?.awSarp2Profile?.items[0]?.next_payment_info?.reschedule_payment_range?.earliest,
            latest: data?.response?.data?.awSarp2Profile?.items[0]?.next_payment_info?.reschedule_payment_range?.latest,
            scheduledDate: data?.response?.data?.awSarp2Profile?.items[0]?.next_payment_info?.payment_date,
          }));

          setAllAddresses(
            addresses.reduce(
              (total, address) => ({
                ...total,
                [address.id]: address,
              }),
              {}
            )
          );

          setIsDataRetrieved(true);
          const subscriptionStatus = data?.response?.data?.awSarp2Profile?.items[0]?.status;
          if(subscriptionStatus && subscriptionStatus?.toLowerCase() === 'active') {
            const isActiveSubscription = createConditionalEvent(
              true,
              'isActiveSubscription'
            );
            window.dispatchEvent(isActiveSubscription);
            const nextOrderDate = data?.response?.data?.awSarp2Profile?.items[0]?.next_payment_info?.payment_date;
            if(nextOrderDate && !isToday(new Date(nextOrderDate))) {
              const displaySkipOptionEvent = createConditionalEvent(
                true,
                'displaySkipOption'
              );
              window.dispatchEvent(displaySkipOptionEvent);
            }
          }
          if(subscriptionStatus && subscriptionStatus?.toLowerCase() === 'suspended') {
            const suspendedAlert = createConditionalEvent(
              true,
              'showPaymentFailureAlert'
            );
            window.dispatchEvent(suspendedAlert);
            const paymentFailureAlert = document.querySelector('#payment-failure-alert .m-alert__content .alert-title .cmp-title h5');
            if(paymentFailureAlert) {
              const incrementId = data?.response?.data?.awSarp2Profile?.items[0]?.increment_id;
              paymentFailureAlert.innerHTML = paymentFailureAlert.innerHTML?.replace('${increment_id}', `#${incrementId}`);
            }
          }
          const subscriptionSubTitle = document.querySelector('#subscription-sub-title h2');
          if(subscriptionSubTitle) {
            const planName = data?.response?.data?.awSarp2Profile?.items[0]?.plan_name;
            const productName = data?.response?.data?.awSarp2Profile?.items[0]?.product_name ||
              data?.response?.data?.awSarp2Profile?.items[0]?.orders[0]?.items[0].product_name;
            subscriptionSubTitle.innerHTML = subscriptionSubTitle.innerHTML?.replace('${plan_name}', planName);
            subscriptionSubTitle.innerHTML = subscriptionSubTitle.innerHTML?.replace('${product_name}', productName);
          }
        } catch (error) {
        } finally {
          setLoading(false);
        }
    };

    const handleSavePaymentToken = async (id) => {
      try {
        const savePaymentTokenPayload = {
          checkoutId: id,
          type : "updateCardForSubscription"
        }
 
        const savePaymentTokenResponse = await fetchESLservice({
          service: ESL_EPT.productsSubscriptionsUpdate,
          addAuthHeaders: true,
          withRecaptcha: false,
          data: savePaymentTokenPayload,
        });
 
        if(!savePaymentTokenResponse?.data?.errorCode) {
          const callBackUrl = localStorage.getItem('callBackUrl');
          localStorage.removeItem('callBackUrl');
          window.location.href = callBackUrl;
        }
        
        if(savePaymentTokenResponse?.data?.errorCode) {
          throw new Error('Something went wrong while saving checkout Id');
        }
      } catch(err) {
        const callBackUrl = localStorage.getItem('callBackUrl');
        localStorage.removeItem('callBackUrl'); 
        const errorAlert = createConditionalEvent(
          true,
          'errorAlert'
        );
        window.dispatchEvent(errorAlert);
        window.location.href = callBackUrl;
      }
    }
  
    const handleStoredPayments = async (e) => {
      try {
        const subscriptionBillingAddress = commerceContext?.profile?.items?.subscriptionDetail?.billing_address;
        const storedPaymentsPayload = {
          address: {
            firstName: subscriptionBillingAddress?.firstname || '',
            lastName: subscriptionBillingAddress?.lastname || '',
            countryId: subscriptionBillingAddress?.country_id || '',
            street: subscriptionBillingAddress?.street?.split('\n') || [],
            city: subscriptionBillingAddress?.city || '',
            postCode: subscriptionBillingAddress?.postcode || '',
            telephone: subscriptionBillingAddress?.telephone || '',
            region: subscriptionBillingAddress?.region || '',
          },
          profileId: subscriptionId,
        }
        const storedPaymentsResponse = await fetchESLservice({
          service: ESL_EPT.storedPaymentsAddCard,
          addAuthHeaders: true,
          withRecaptcha: false,
          data: storedPaymentsPayload,
        });
        localStorage.setItem('storedPaymentsAPI', true);

        if(!storedPaymentsResponse?.data?.errorCode) {
          setCommerceContext({
            ...commerceContext,
            profile: {
              ...commerceContext.profile,
              items: {
                ...commerceContext.profile?.items,
                subscriptionPaymentDetails: {
                  ...storedPaymentsResponse?.data,
                },
              },
            },
          });
        }
        
        if(storedPaymentsResponse?.data?.errorCode) {
          throw new Error('Something went wrong while retreiving payments');
        }
      } catch(err) {
        const errorAlert = createConditionalEvent(
          true,
          'paymentsError'
        );
        window.dispatchEvent(errorAlert);
      }
    }

    const handleSkipNextDelivery = async (e) => {
      const skipNextDeliveryPayload = {
        subscriptionId: subscriptionId,
        type: 'skipNextOrder',
      }
      const resp = await fetchESLservice({
        service: ESL_EPT.productsSubscriptionsUpdate,
        addAuthHeaders: true,
        withRecaptcha: false,
        data: skipNextDeliveryPayload,
      });

      if(!resp?.data?.errorCode && resp?.data?.response?.data?.AwSarp2SkipNextOrder) {
        document.querySelector('#skip-next-delivery-date-modal .generic-modal--close')?.click();
        localStorage.setItem('recentlySkippedSubscription', JSON.stringify(subscriptionId));
        localStorage.removeItem('dateRange');
        window.location.reload();
      } else {
        document.querySelector('#skip-next-delivery-date-modal .generic-modal--close')?.click();
        // Show Error Message in case the API fails
        const skipFailureAlert = createConditionalEvent(
          false,
          'showSkipDeliveryAlert'
        );
        window.dispatchEvent(skipFailureAlert);
      }
    }

    const handleNextDeliveryDateChange = async (e) => {
      const updatedDate = document.getElementById('new-subscription-date').value;
      const nextDeliveryUpdatePayload = {
        subscriptionId: subscriptionId,
        nextPaymentDate: formatDateAndTime(updatedDate),
        type: 'updateNextPaymentDate',
      };
      const resp = await fetchESLservice({
        service: ESL_EPT.productsSubscriptionsUpdate,
        addAuthHeaders: true,
        withRecaptcha: false,
        data: nextDeliveryUpdatePayload,
      });
      if(!resp?.data?.errorCode && resp?.data?.response?.data?.awSarp2ProfileChangeNextPaymentDate) {
        document.querySelector('#edit-next-delivery-date-modal .generic-modal--close')?.click();
        localStorage.setItem('recentlyScheduleUpdateSubscription', JSON.stringify(subscriptionId));
        window.location.reload();
      } else {
        document.querySelector('#edit-next-delivery-date-modal .generic-modal--close')?.click();
        // Show Error Message in case the API fails
        const nextPaymentUpdateFailureAlert = createConditionalEvent(
          true,
          'errorAlert'
        );
        window.dispatchEvent(nextPaymentUpdateFailureAlert);
      }
    }

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
      // pick the latest next order date to display it on Success alert on UI
      if(isDataRetrieved && !!recentlySkippedSubscription && recentlySkippedSubscription.toString() === subscriptionId.toString()) {
        const skipSuccessAlert = createConditionalEvent(
          true,
          'showSkipDeliveryAlert'
        );
        window.dispatchEvent(skipSuccessAlert);
        localStorage.removeItem('recentlySkippedSubscription');
        const skipSubscriptionAlert = document.querySelector('#skip-subscription-delivery-alert .m-alert__content .m-alert__para .alert-text .cmp-text p');
        if(skipSubscriptionAlert) {
          const nextDeliveryDate = formatDate(commerceContext?.profile?.items?.subscriptionDetail?.next_payment_info?.payment_date) || '-';
          skipSubscriptionAlert.innerHTML = skipSubscriptionAlert.innerHTML?.replace('${next_delivery_date}', `${nextDeliveryDate}`);
        }
      }
      setIsDataRetrieved(false);
    }, [isDataRetrieved]);

    useEffect(async () => {
      if(savePaymentToken) {
        await handleSavePaymentToken(checkoutId);
        setSavePaymentToken(false);
      }
    }, [savePaymentToken]);

    useEffect(() => {
      const clickHandlers = [
        {
          selector: '#edit-subscription-payment',
          handler: (e) => {
            if (commerceContext?.profile?.items?.subscriptionPaymentDetails) {
              setCommerceContext({
                ...commerceContext,
                profile: {
                  ...commerceContext.profile,
                  items: {
                    ...commerceContext.profile?.items,
                    subscriptionPaymentDetails: null,
                  },
                },
              });
            }
            handleStoredPayments(e)
          }
        },
        {
          selector: '#skip-next-delivery-date-modal #skip-next-delivery-confirm',
          handler: (e) => handleSkipNextDelivery(e)
        },
        {
          selector: '#edit-next-delivery-date-modal #confirm-new-delivery-date',
          handler: (e) => handleNextDeliveryDateChange(e)
        },
        {
          selector: `#my-subscription-edit-shipping`,
          handler: async (e) => {
            const selectedAddressId = 1; // used the same id(1) which we assigned above
            const modal = document.getElementById(
              'my-subscription-edit-shipping-modal'
            );
            setAuthHeaderFields(modal);
            if (isAddressDropdownFields('#my-subscription-edit-shipping-modal')) {
              await prefillAddressDropdowns(allAddresses[selectedAddressId], '#my-subscription-edit-shipping-modal', $('[name="x-country-code"]').val());
            }
            prefillEditForm(allAddresses[selectedAddressId], modal);
            resetAccountData();
          },
        },
        {
          selector: `#my-subscription-edit-billing`,
          handler: async (e) => {
            const selectedAddressId = 2; // used the same id(1) which we assigned above
            const modal = document.getElementById(
              'my-subscription-edit-billing-modal'
            );
            setAuthHeaderFields(modal);
            if (isAddressDropdownFields('#my-subscription-edit-billing-modal')) {
              await prefillAddressDropdowns(allAddresses[selectedAddressId], '#my-subscription-edit-billing-modal', $('[name="x-country-code"]').val());
            }
            prefillEditForm(allAddresses[selectedAddressId], modal);
            resetAccountData();
          },
        }
      ];

      addEventHandlers('click', clickHandlers);

      return () => {
        removeEventHandlers('click', clickHandlers);
      };

    }, [commerceContext, setCommerceContext, allAddresses])

    useEffect(async () => {
        await getSelectedSubscriptionData(subscriptionId);
        return () => {
          localStorage.removeItem('dateRange');
        }
    }, []);

    if (!loading && Object.keys(allAddresses).length) {
      return (
        <>
          <EnterAddressModal container="#my-subscription-edit-shipping-modal" />
          <EnterAddressModal container="#my-subscription-edit-billing-modal" />
        </>
      );
    }

    if (loading || savePaymentToken) {
      return <LoadingIndicator />;
    }

    return null;
};

SubscriptionDetailsSummary.PropTypes = {};

export default SubscriptionDetailsSummary;
