import React, { useState, useEffect } from 'react';
import RadioButton from '../atoms/RadioButton';
import { useTranslation } from 'react-i18next';
import DropDown from '../atoms/DropDown';
import { fetchESLservice } from '../../services/eslService';
import ESL_EPT from '../../data/eslEndpoints';
import createConditionalEvent from '../../utils/conditional';

export const AddressSuggestions = ({
  addresses,
  originalAddress,
  modalId,
  onSelectSuggestedAddress,
  onSelection,
  onSelectOriginalAddress,
  onCloseSuggestions,
  onKeepAddress,
  onSelectIsLoading,
  onSelectEditUnconfirmedAddress,
}) => {
  const { t } = useTranslation();
  const [selectedAddress, setSelectedAddress] = useState();
  const [selectOriginalAddress, setSelectOriginalAddress] = useState(false);
  const [radioForMultipleAddressSelected, setRadioForMultipleAddressSelected] = useState(false);
  const [radioForSingleAddressSelected, setRadioForSingleAddressSelected] = useState(true);

  const [isLoading, setIsLoading] = useState('');

  const formatAddresses = (addressesList) => {
    let formatedAddresses = [];
    addressesList.forEach((item, i) => {
      // Unformatted Address
      if (item?.globalAddressId) {
        formatedAddresses.push({
          label: item?.address,
          value: item?.globalAddressId,
        });
        // Formatted address, place it in one line
      } else if (item?.streetLine1 && item?.city && item?.zipCode) {
        formatedAddresses.push({
          label: `${item?.streetLine1} ${item?.streetLine2}, ${item?.city}, ${item?.zipCode}`,
          value: i,
        });
      }
    });

    return formatedAddresses;
  };

  useEffect(() => {
    if (selectedAddress) {
      onSelection(selectedAddress);
    }
  }, [selectedAddress]);

  const closeSuggestions = () => {
    window.dispatchEvent(createConditionalEvent(false, 'hasSuggestions'));
    const inputs = document.querySelectorAll(
      ".generic-modal.show form input[type='text']:not([readonly])"
    );

    inputs.forEach((item) => {
      item.value = '';
    });

    if (typeof onCloseSuggestions === 'function') {
      onCloseSuggestions();
    }
  };

  const closeSuggestionsOpenFilledForm = () => {
    window.dispatchEvent(createConditionalEvent(false, 'hasSuggestions'));

    if (typeof onCloseSuggestions === 'function') {
      onCloseSuggestions();
    }
  };

  const closeSuggestionsOnEdit = () => {
    onSelectEditUnconfirmedAddress();
  };

  const keepAddress = () => {
    window.dispatchEvent(createConditionalEvent(false, 'hasSuggestions'));

    if (typeof onKeepAddress === 'function') {
      onKeepAddress();
    }
  };

  const handleSelectChange = async (address) => {
    if (onSelectIsLoading) {
      onSelectIsLoading(true);
    } else {
      setIsLoading(true);
    }

    // Make call to retrieve formatted address
    const { data } = await fetchESLservice({
      service: ESL_EPT.formattedAddress,
      data: {
        addressGlobalId: address?.value,
      },
    });

    if (data?.response) {
      data.response.validation_id= address?.value;
      setSelectedAddress(data?.response);
    }

    if (onSelectIsLoading) {
      onSelectIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const setOriginalAddress = () =>{
    setSelectOriginalAddress(true);
    setRadioForMultipleAddressSelected(false)
    setRadioForSingleAddressSelected(false)
    onSelectOriginalAddress();
  }

  const setSingleAddress = (address)  => {
    address['validation_id'] = address['globalAddressId'];
    setSelectOriginalAddress(false)
    setRadioForSingleAddressSelected(true)
    setSelectedAddress(address)
    onSelectSuggestedAddress(address);
  }

  const setSuggestedAddress = () =>{
    setRadioForMultipleAddressSelected(true)
    setSelectOriginalAddress(false);
    selectedAddress.validation_id= selectedAddress?.globalAddressId;
    onSelectSuggestedAddress(selectedAddress);
  }

  return (
    <div className="m-address-suggestions">
      {addresses.length === 1 &&
        addresses.map((address, i) => {
          const selected = selectedAddress === address;
          return (
            <div
              key={i}
              className={`m-address-suggestions--address single-address-suggestion ${
                selected ? 'selected' : ''
              }`}
              onClick={() => setSingleAddress(address)}
            >
              <RadioButton
                name="address-suggestion"
                value={i}
                checked={selected}
              />
              <div className="m-address-suggestions--address__info">
                <p>{address.streetLine1}</p>
                <p>{address.streetLine2}</p>
                <p>
                  {address.city}, {address.zipCode}
                </p>
                <p>{address.countryId}</p>
              </div>
            </div>
          );
        })}

      {addresses.length === 1 &&
        addresses.map((address, i) => {
          return (
            <div
              key={i}
              className={`m-address-suggestions--address suggested-address-radio ${
                radioForSingleAddressSelected ? 'selected' : ''
              }`}
              onClick={() => setSingleAddress(address)}
            >
              <RadioButton
                name="address-suggestion"
                value={i}
                checked={radioForSingleAddressSelected}
              />
              <div>
                {t('suggested-address')}
              </div>
              <div className="m-address-suggestions--address__info">
                <p>{address.streetLine1}</p>
                <p>{address.streetLine2}</p>
                <p>
                  {address.city}, {address.zipCode}
                </p>
                <p>{address.countryId}</p>
              </div>
            </div>
          );
        })}

      {(addresses.length <= 1 || !addresses) && (
        <>
          <div
            className="m-address-suggestions--address continue-entered-address"
            onClick={keepAddress}
          >
            <RadioButton name="address-suggestion" value={null} />
            <div className="m-address-suggestions--address__info">
              <p>{t('continue-entered-address')}</p>
            </div>
          </div>
          <div
            className="m-address-suggestions--address enter-different-address"
            onClick={closeSuggestions}
          >
            <RadioButton name="address-suggestion" value={null} />
            <div className="m-address-suggestions--address__info">
              <p>{t('enter-different-address')}</p>
            </div>
          </div>
        </>
      )}
      {addresses.length > 1 && (
        <>
          <DropDown
            label={t('choose-an-address')}
            placeorder={t('choose-from-list')}
            options={formatAddresses(addresses)}
            onChange={handleSelectChange}
            isLoading={isLoading}
          />

          {!!document.querySelector(
            `${modalId} .m-address-suggestions li.selected`
          ) && (
            <div
              key={'suggestedAddressRadio'}
              className={`m-address-suggestions--address suggested-address-radio ${
                radioForMultipleAddressSelected ? 'selected' : ''
              }`}
              onClick={() => setSuggestedAddress()}
            >
              <RadioButton
                name="address-suggestion"
                value={'suggestedAddressRadio'}
                checked={radioForMultipleAddressSelected}
              />
              <div>
                {t('suggested-address')}
              </div>
              <div className="m-address-suggestions--address__info">
                <p>{selectedAddress?.streetLine1}</p>
                <p>{selectedAddress?.streetLine2}</p>
                <p>
                  {selectedAddress?.city}, {selectedAddress?.zipCode}
                </p>
                <p>{selectedAddress?.countryId}</p>
              </div>
            </div>
          )}

          {/* Radio button version for USE ENTERED ADDRESS - Won't display by default */}
          <div
            className="m-address-suggestions--address d-none radio-option"
            onClick={keepAddress}
          >
            <RadioButton name="address-suggestion" value={null} />
            <div className="m-address-suggestions--address__info">
              <p>{t('continue-entered-address')}</p>
            </div>
          </div>

          {/* Radio button version for ENTER DIFFERENT ADDRESS selection - Won't display by default */}
          <div
            className="m-address-suggestions--address d-none radio-option"
            onClick={closeSuggestionsOpenFilledForm}
          >
            <RadioButton name="address-suggestion" value={null} />
            <div className="m-address-suggestions--address__info">
              <p>{t('enter-different-address')}</p>
            </div>
          </div>

          <div className="mb-4 m-address-suggestions--dropdown-help">
            <strong>
              {t('is-this-your-address')}{' '}
              <a
                className="ml-3 text-decoration-none"
                href="javascript:void(0);"
                onClick={keepAddress}
              >
                {t('continue-entered-address')}{' '}
                <em class="abt-icon abt-icon-right-arrow align-middle d-inline-block float-none"></em>
              </a>
            </strong>
          </div>
          <div className="mb-4 m-address-suggestions--dropdown-help">
            <strong>
              {t('cant-find-right-address')}{' '}
              <a
                className="ml-3 text-decoration-none"
                href="javascript:void(0);"
                onClick={closeSuggestions}
              >
                {t('enter-different-address')}{' '}
                <em class="abt-icon abt-icon-right-arrow align-middle d-inline-block float-none"></em>
              </a>
            </strong>
          </div>
        </>
      )}

      {/* adding radio button to display original address */}
      <div
        key={'originalAddresss'}
        className={`m-address-suggestions--address original-address ${
          selectOriginalAddress ? 'selected' : ''
        }`}
        onClick={() => setOriginalAddress(originalAddress)}
      >
        <RadioButton
          name="address-suggestion"
          value={'originalAddress'}
          checked={selectOriginalAddress}
        />
        <div>
          {t('original-address')}
          <a id="my-address-edit-unconfirmed" class="btn" onClick={() => closeSuggestionsOnEdit()}>		
            <span>{t('edit-address')}</span><em class="abt-icon abt-icon-edit-2"></em>
          </a>
        </div>
        <div className="m-address-suggestions--address__info">
          <p>{originalAddress?.streetLine1}</p>
          <p>{originalAddress?.streetLine2}</p>
          <p>
            {originalAddress?.city}, {originalAddress?.zipCode}
          </p>
          <p>{originalAddress?.countryId}</p>
        </div>
      </div>
    </div>
  );
};
