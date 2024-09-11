import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import InnerHTML from 'dangerously-set-html-content';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/AuthContext';
import { CommerceContext } from '../../context/CommerceContext';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchESLservice } from '../../services/eslService';
import {
  addEventHandlers,
  cloneAddress,
  formatAddresses,
  getDataInfo,
  removeEventHandlers,
  replacePlaceholder,
} from '../../utils/common';
import Button from '../atoms/Button';
import LoadingIndicator from './LoadingIndicator';

function AddCardModal() {
  const { t } = useTranslation();
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [authContext, setAuthContext] = useContext(AuthContext);

  const [getAddresses, setGetAddresses] = useState(false);
  const [billingAddresses, setBillingAddresses] = useState();
  const [selectedBillingAddress, setSelectedBillingAddress] = useState();

  const [getCardForm, setGetCardForm] = useState(false);
  const [saveCardForm, setSaveCardForm] = useState(false);

  const [showFormData, setShowFormData] = useState(false);

  const [hasError, setHasError] = useState(false);

  const getAddressParams = {
    service: ESL_EPT.getProfileAddress,
    addAuthHeaders: true,
  };

  // Get Addresses
  const { data: addressesData, error, isFetching } = useQuery(
    [`modal_addresses`, getAddressParams],
    () => fetchESLservice(getAddressParams),
    {
      enabled: Boolean(getAddresses),
    }
  );

  const cardFormParams = {
    service: ESL_EPT.storedPaymentsAddCard,
    addAuthHeaders: true,
    withRecaptcha: false,
    data: {
      address: selectedBillingAddress,
    },
  };

  // Get PayOnForm
  const {
    data: cardFormData,
    error: cardFormError,
    isFetching: cardFormLoading,
  } = useQuery(
    [`getPayonForm`, cardFormParams],
    () => fetchESLservice(cardFormParams),
    {
      enabled: Boolean(getCardForm),
    }
  );

  const saveCardFormParams = {
    service: ESL_EPT.storedPaymentsAddCard,
    addAuthHeaders: true,
    withRecaptcha: false,
    data: {
      quoteId: cardFormData?.data?.response?.quote_id,
    },
  };

  // Save card
  const {
    data: saveCardFormData,
    error: saveCardFormError,
    isFetching: saveCardFormLoading,
  } = useQuery(
    [`saveCard`, saveCardFormParams],
    () => fetchESLservice(saveCardFormParams),
    {
      enabled: Boolean(saveCardForm),
    }
  );

  const handleSelectAddress = (source) => {
    const data = getDataInfo(commerceContext, source);
    setCardBillingAddressData(data);
  };

  const setCardBillingAddressData = (data) => {
    if (data) {
      let street = [data.streetLine1];
      if (data.streetLine2) {
        street.push(data.streetLine2);
      }

      setSelectedBillingAddress({
        firstname: data.firstName,
        lastname: data.lastName,
        country_id: data.country || data.countryId,
        street: street,
        city: data.city,
        postcode: data.zipCode,
      });

      setCommerceContext({
        ...commerceContext,
        profile: {
          ...commerceContext?.profile,
          addresses: {
            ...commerceContext?.profile?.addresses,
            selectedBilling: data,
            recentlyAddedAddress: null,
          },
        },
      });
    }
  };

  const dismissVisibleModal = () => {
    document
      .querySelector('.generic-modal.show .generic-modal--close')
      ?.click();
  };

  const resetState = () => {
    setGetAddresses(false);
    setGetCardForm(false);
    setSaveCardForm(false);
    setSaveCardForm(false);
    setShowFormData(false);
    setHasError(false);

    document
      .querySelector('#my-card-add-btn-modal')
      .classList.remove('card-form-submitted', 'card-form-loaded');
  };

  const handleCancelClick = () => {
    dismissVisibleModal();
  };

  const handleNextClick = () => {
    setShowFormData(false);
    setGetCardForm(true);
  };

  const handleAddCardClick = () => {
    const continueButton = document.querySelector('.wpwl-button-pay');
    if (continueButton) {
      continueButton.click();
    }
  };

  const handleAddNewAddressClick = () => {
    dismissVisibleModal();

    const addNewAddressButton = document.querySelector('#my-address-add');
    if (addNewAddressButton) {
      addNewAddressButton.click();
    }
  };

  const addIconToForm = () => {
    const html = `<em class="abt-icon abt-icon-lock-sheild"></em>`;
    const ccvInput = document.querySelector(
      '.m-payon-form--my-cards .wpwl-wrapper-cvv'
    );
    const icon = document.createElement('div');
    icon.classList.add('m-payon-form__cvv-icon');
    icon.innerHTML = html;
    ccvInput?.appendChild(icon);
  };

  useEffect(() => {
    if (selectedBillingAddress) {
      const hasOtherCardsEvant = createConditionalEvent(
        false,
        'cardsAddressesError'
      );
      window.dispatchEvent(hasOtherCardsEvant);
    }
  }, [selectedBillingAddress]);

  useEffect(() => {
    const newAddress =
      commerceContext?.profile?.addresses?.recentlyAddedAddress;

    if (newAddress) {
      setBillingAddresses(null);
      setCardBillingAddressData(newAddress);
      dismissVisibleModal();
      const addNewCardButton = document.querySelector('#my-card-add-btn');

      if (addNewCardButton) {
        addNewCardButton.click();
        handleNextClick();
      }
    }
  }, [commerceContext?.profile?.addresses?.recentlyAddedAddress]);

  useEffect(() => {
    if (saveCardFormData?.data?.status) {
      // Reload page to display updated cards:
      window.location.reload();
    }
  }, [saveCardFormData]);

  useEffect(() => {
    const formDatas = document.querySelectorAll(
      '#my-card-add-btn-modal .formdata'
    );
    if (formDatas.length > 0) {
      formDatas.forEach((item) => {
        if (showFormData && !getCardForm) {
          item.classList.remove('d-none');
        } else {
          item.classList.add('d-none');
        }
      });
    }
  }, [showFormData]);

  useEffect(() => {
    if (!isFetching && addressesData) {
      const addresses = formatAddresses(
        addressesData?.data?.response?.data?.customer?.addresses,
        addressesData?.data?.response?.data?.customer?.email
      );

      const sortedBilling = [...addresses]?.sort((a, b) => {
        if (a.default_billing > b.default_billing) return -1;
        if (a.default_billing < b.default_billing) return 1;
        return 0;
      });

      setCommerceContext({
        ...commerceContext,
        profile: {
          ...commerceContext?.profile,
          addresses: {
            ...commerceContext?.profile?.addresses,
            billing: sortedBilling,
          },
        },
      });

      setBillingAddresses(sortedBilling);
    }
  }, [addressesData]);

  useEffect(() => {
    let clickHandlers;

    if (
      billingAddresses &&
      commerceContext?.profile?.addresses?.billing &&
      !getCardForm &&
      !commerceContext?.profile?.addresses?.recentlyAddedAddress
    ) {
      if (billingAddresses.length > 0) {
        // setting info for first cards box
        const firstFormDataEl = document.querySelectorAll(
          '#my-card-add-btn-modal .formdata .checkout-form-data'
        )[0];

        // setting radio buttons to addresses cards
        firstFormDataEl.dataset.radioGroupName = `profile.addresses.selectedBilling`;
        firstFormDataEl
          .closest('.m-form-data')
          .classList.add('m-form-data--with-radio', 'js-formdata-radio');

        // clone boxes
        cloneAddress(
          document.querySelector('#my-card-add-btn-modal .formdata'),
          billingAddresses?.length - 1
        );

        // Change placeholder data source for first  cards box
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

        handleSelectAddress(firstFormDataEl.dataset.source);
        setShowFormData(true);
      } else {
        const hasOtherCardsEvant = createConditionalEvent(
          'noCards',
          'cardsAddressesError'
        );
        window.dispatchEvent(hasOtherCardsEvant);

        setShowFormData(false);
      }

      clickHandlers = [
        {
          selector: `.js-formdata-radio`,
          handler: async (e) => {
            const parent = e.target.closest('.formdata');
            const formData = parent.querySelector('.checkout-form-data');
            const source = formData.dataset.source;

            if (source) {
              handleSelectAddress(source);
            }
          },
        },
      ];

      addEventHandlers('click', clickHandlers);
    }

    return () => {
      if (billingAddresses && commerceContext?.profile?.addresses?.billing) {
        removeEventHandlers('click', clickHandlers);
      }
    };
  }, [billingAddresses, commerceContext?.profile?.addresses?.billing]);

  useEffect(() => {
    const modalHideObserver = new MutationObserver((mutations) => {
      const showingModal = mutations[0]?.target?.classList.contains('show');
      const cardSubmitted = mutations[0]?.target?.classList.contains(
        'card-form-submitted'
      );
      const cardFormLoaded = mutations[0]?.target?.classList.contains(
        'card-form-loaded'
      );

      if (showingModal) {
        if (!billingAddresses) {
          setShowFormData(false);
          setGetAddresses(true);
        } else {
          setBillingAddresses(commerceContext.profile.addresses.billing);

          if (!cardSubmitted && !cardFormLoaded) {
            setShowFormData(true);
          }
        }

        if (cardSubmitted) {
          setSaveCardForm(true);
        }

        if (cardFormLoaded) {
          addIconToForm();
        }
      } else {
        modalHideObserver.disconnect();
        resetState();
        mutationObserve();
      }
    });

    function mutationObserve() {
      if (document.querySelector('#my-card-add-btn-modal')) {
        modalHideObserver.observe(
          document.querySelector('#my-card-add-btn-modal'),
          {
            attributes: true,
            attributeFilter: ['class'],
          }
        );
      }
    }
    mutationObserve();

    return () => {
      modalHideObserver.disconnect();
    };
  }, [commerceContext?.profile?.addresses?.billing]);

  useEffect(() => {
    const callError = error || cardFormError || saveCardFormError;
    if (callError) {
      setHasError(callError);
    }
  }, [error, cardFormError, saveCardFormError]);

  // Overwriting payOn options sent by BE
  const wpwlOptions = `{
    style: 'plain',
    showCVVHint: true,
    maskCvv: false,
    useSummaryPage: true,
    onSaveTransactionData: (data)=> {
      document
        .querySelector('#my-card-add-btn-modal')
        .classList.add('card-form-submitted');
    },
    onReadyIframeCommunication: function(){
      document
      .querySelector('#my-card-add-btn-modal')
      .classList.add('card-form-loaded');
    }
  }`;

  let payOnForm = cardFormData;
  if (cardFormData?.data?.response?.html) {
    payOnForm.data.response.html = payOnForm.data.response.html.replace(
      'wpwlOptions',
      'wpwlOptionsOld'
    );
  }

  if (
    isFetching ||
    cardFormLoading ||
    saveCardFormLoading ||
    saveCardFormData
  ) {
    return <LoadingIndicator />;
  }

  if (hasError) {
    return <> {hasError?.message} </>;
  }

  return (
    <>
      {cardFormData && getCardForm && (
        <div className="m-payon-form m-payon-form--my-cards m-0">
          <InnerHTML
            html={`<script> var wpwlOptions = ${wpwlOptions}</script>`}
          />
          <InnerHTML html={cardFormData?.data?.response?.html} />
        </div>
      )}

      {!getCardForm && (
        <div className="d-flex justify-content-end m-0">
          <Button
            onClick={handleAddNewAddressClick}
            text={t('add-new-address')}
            buttonStyle="secondary"
          />
          <Button
            onClick={handleNextClick}
            text={t('next')}
            buttonStyle="primary"
            buttonClasses="ml-3"
            disabled={!selectedBillingAddress}
          />
        </div>
      )}

      {getCardForm && (
        <div className="d-flex justify-content-end m-0">
          <Button
            onClick={handleCancelClick}
            text={t('cancel')}
            buttonStyle="secondary"
          />
          <Button
            onClick={handleAddCardClick}
            text={t('add-card')}
            buttonStyle="primary"
            buttonClasses="ml-3"
          />
        </div>
      )}
    </>
  );
}

export default AddCardModal;
