const onNavEcommChangePassSuccess = () => {
  const changePassEvent = createConditionalEvent(true, "changePasswordSuccess");
  window.dispatchEvent(changePassEvent);
};

const onNavEcommChangePassError = (data) => {
  const changePassEvent = createConditionalEvent(true, "changePasswordError");
  window.dispatchEvent(changePassEvent);
  const errorCode = getNestedObject(data, "response.i18nMessageKey");

  // If token is expired, show "Forgot Password" link:
  const showForgotPasswordEvent = createConditionalEvent(
    errorCode && errorCode === "PM-1007",
    "changePasswordTokenExpired"
  );
  window.dispatchEvent(showForgotPasswordEvent);

  const erroMessage = getNestedObject(
    window.i18nErrorLookup(data),
    "response.statusReason"
  );
  if (erroMessage) {
    document.querySelector(
      "#change-password-form [data-conditional-variable='changePasswordError'] .m-alert__para"
    ).innerHTML = erroMessage;
  }
};

const onNavEcommChangePassUpdateReq = (data) => {
  let formatedData = { ...data };
  const headers = {
    ...getNestedObject(formatedData, "headers"),
  };
  const body = {
    ...getNestedObject(formatedData, "body"),
  };

  const authContext = JSON.parse(
    localStorage.getItem(getLocalAuthContextName())
  );

  const idToken = getNestedObject(authContext, "jwtToken.id_token");
  const ecomToken = getNestedObject(
    authContext,
    "accountInfo.userInfo.additionalProperties.ecommToken"
  );
  const extToken = getNestedObject(
    authContext,
    "accountInfo.userInfo.additionalProperties.extToken"
  );

  if (idToken && ecomToken && extToken) {
    headers["x-id-token"] = idToken;
    headers["x-ecom-token"] = ecomToken;
    headers["x-ext-token"] = extToken;
  }

  // Fill Hidden inputs
  const form = document.querySelector("#change-password-form form");
  const queryParams = window.getURLParams(window.location.search);
  const hiddenRequestInputs =
    form && form.querySelectorAll('input[type="hidden"][data-request]');

  if (hiddenRequestInputs) {
    for (let i = 0; i < hiddenRequestInputs.length; i++) {
      const inputEl = hiddenRequestInputs[i];
      if (inputEl.name && inputEl.dataset.request === "body") {
        body[inputEl.name] = decodeURIComponent(
          queryParams[inputEl.dataset.keyName]
        );
      }
      if (inputEl.name && inputEl.dataset.request === "header") {
        headers[inputEl.name] = decodeURIComponent(
          queryParams[inputEl.dataset.keyName]
        );
      }
    }
  }

  formatedData = {
    ...formatedData,
    headers,
    body,
  };

  return formatedData;
};
