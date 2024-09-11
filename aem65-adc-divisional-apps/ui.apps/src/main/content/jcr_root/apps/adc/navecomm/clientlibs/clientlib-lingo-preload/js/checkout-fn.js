function handleAddressUpdate({data, formSelector, type}) {
  // Invalid address:
  if (data && data.response.responseCode !== 'validaddress') {
    throw new Error('Please enter a valid shipping address');
  }

  // Valid address:
  const formEl = document.querySelector(formSelector);
  if (formEl) {
    const inputs = formEl.querySelectorAll('input:not([type="hidden"], select');
    const formValues = {};

    inputs.forEach((input) => {
      formValues[input.name] = input.value;
    });

    const addressUpdateEvent = new CustomEvent('addressUpdate', {
      detail: {
        type,
        address: formValues,
      },
    });

    document.dispatchEvent(addressUpdateEvent);
  }
};

function onShippingAddressUpdateSuccess(data) {
  handleAddressUpdate({
    data,
    formSelector: '#shipping-address-edit-form form',
    type: 'shippingAddress'
  });
}

function onBillingAddressUpdateSuccess(data) {
  handleAddressUpdate({
    data,
    formSelector: '#billing-address-edit-form form',
    type: 'billingAddress'
  });
}

function onShippingAddressUpdateComplete(data) {
  const addressUpdateCallback = new CustomEvent('addressUpdateCallback');
  document.dispatchEvent(addressUpdateCallback);
};
