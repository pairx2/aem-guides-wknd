function onAccountUpdateRequest(data) {
  let formatedData = { ...data };

  formatedData = {
    ...formatedData,
    body: { ...formatedData.body, action: "changeEmail" },
  };

  return formatedData;
};

function onAccountDetailSuccess(data) {
  const addressUpdateSuccessEvent = new CustomEvent(
    "conditional-component-change",
    {
      detail: {
        value: "success",
        var: "detailsUpdated",
      },
    }
  );

  window.dispatchEvent(addressUpdateSuccessEvent);
};

const reloadPage = () => {
  window.location.reload();
};

function onAccountDetailFailure(data) {
  const errorContainer = document.querySelector(
    "[data-conditional-variable='detailsUpdated'] [data-conditional-case='error'] .m-alert__para p"
  );
  const errorMessageFromAuthor = getNestedObject(errorContainer, "innerText");
  const erroMessage = getNestedObject(
    window.i18nErrorLookup(data),
    "response.statusReason"
  );
  const addressUpdateFailureEvent = new CustomEvent(
    "conditional-component-change",
    {
      detail: {
        value: "error",
        var: "detailsUpdated",
      },
    }
  );

  window.dispatchEvent(addressUpdateFailureEvent);
  if (errorContainer) {
    errorContainer.innerHTML = erroMessage || errorMessageFromAuthor;
  }
};
