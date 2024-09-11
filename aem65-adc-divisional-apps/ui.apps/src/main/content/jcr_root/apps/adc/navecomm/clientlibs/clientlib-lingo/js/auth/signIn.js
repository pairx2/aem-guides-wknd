const signInBtn = document.querySelector("#sign-in-form button[type='submit']");

const OnNavEcommLoginBeforeRequest = () => {
  showLoadingSpinner(signInBtn);
};

const OnNavEcommLoginUpdateRequest = (data) => {
  let formatedData = { ...data };
  if (!getNestedObject(formatedData, "body.consents")) {
    formatedData = {
      ...formatedData,
      body: { ...formatedData.body, consents: [] },
    };
  }
  return formatedData;
};

const OnNaveCommLoginSuccess = async (data, reload) => {
  if (getNestedObject(data, "status") && getNestedObject(data, "response")) {
    // Save auth info in local storage
    const authContext = JSON.parse(
      localStorage.getItem(getLocalAuthContextName())
    );
    localStorage.setItem(
      getLocalAuthContextName(),
      JSON.stringify({
        ...authContext,
        ...data.response,
        timeStamp: Date.now(),
      })
    );

    try {
      if (getNestedObject(data.response.accountInfo, "userInfo")) {
        // Save user info in local storage
        const commerceContext =
          JSON.parse(localStorage.getItem(getLocalCommerceContextName())) || {};
        const {
          firstName = "",
          lastName = "",
          email = "",
        } = getNestedObject(data.response.accountInfo, "userInfo");

        // Update card id with card id sent by backend once merged
        const { cartId } = getNestedObject(
          data.response.accountInfo,
          "userInfo.additionalProperties"
        );

        let cart = { ...(getNestedObject(commerceContext, "cart") || {}) };
        if (cartId) {
          cart.id = cartId;
        }

        localStorage.setItem(
          getLocalCommerceContextName(),
          JSON.stringify({
            ...commerceContext,
            cart: cart,
            profile: {
              ...(commerceContext.profile || {}),
              userInfo: {
                firstName,
                lastName,
                email,
              },
            },
          })
        );
      }
    } catch (e) {
      // Do not fail login if this isn't set -- it will be done later
    }

    // On Login Success, set modal time stamp
    localStorage.setItem(commonConst.SESSION_EXPIRED_MODAL, Date.now());
    // and extend session timestamp
    localStorage.setItem(commonConst.EXTEND_SESSION_TIMESTAMP, Date.now());

    /*
     *  - If {reload} parameter, then reload page
     *  - If {document.referrer} is from the same host
     *  and it is not login page, then redirect user to that referrer
     */
    const { loginPage, checkoutPage } = getNestedObject(
      document.querySelector("body"),
      "dataset"
    );
    let urlRedirectTo;
    if (reload) {
      urlRedirectTo = window.location.href;
    } else if (
      document.referrer.indexOf(location.host) > -1 &&
      document.referrer.indexOf(loginPage) === -1
    ) {
      urlRedirectTo = document.referrer;
    }

    const updatedCommerceContext = JSON.parse(
      localStorage.getItem(getLocalCommerceContextName())
    );
    let items = getNestedObject(updatedCommerceContext, "cart.items");
    let cartContainsSubscription;

    if (items) {
      cartContainsSubscription = items.some((item) =>
        getNestedObject(item, "product.is_subscription")
      );
    }
    const guestSubscriptionFlowActive = localStorage.getItem(
      "guestSubscriptionFlow"
    );

    /**
     * Check if guest had a subscription in their cart prior to signing in
     */
    if (
      cartContainsSubscription &&
      guestSubscriptionFlowActive &&
      window.lessThanMinutesAgo(JSON.parse(guestSubscriptionFlowActive), 10)
    ) {
      if (localStorage.getItem("guestSubscriptionFlow")) {
        localStorage.removeItem("guestSubscriptionFlow");
      }

      // Change redirect path to checkout page:
      urlRedirectTo = checkoutPage || urlRedirectTo;
    }

    if (urlRedirectTo) {
      document.querySelector("#sign-in-form [name='thankyouPage']").value =
        urlRedirectTo;
    }

    // Set Session
    await setSession(true);

    // Get User Cart
    await getCustomerCart(true);
  }

  hideLoadingSpinner(signInBtn);
};

const OnNaveCommLogoutSuccess = async (redirect) => {
  // Remove session
  await setSession();

  // Log out
  await logoutUser({ sendExtToken: true });

  localStorage.removeItem(getLocalAuthContextName());
  // Delete cart since it wouldn't be usable after user logs out
  localStorage.removeItem(getLocalCommerceContextName());
  localStorage.removeItem(commonConst.SESSION_EXPIRED_MODAL);

  if (redirect) {
    const { logoutRedirectPage = "/" } = getNestedObject(
      document.querySelector("body"),
      "dataset"
    );
    window.location.replace(
      typeof redirect === "string" ? redirect : logoutRedirectPage
    );
  }
};

let loginAttempsErrors = 0;

const OnNavEcommLoginError = async (data) => {
  // On any login error, clean auth local storage
  localStorage.removeItem(getLocalAuthContextName());

  const errorKey = getNestedObject(data, "response.i18nMessageKey");
  const errorMessageFromAuthor = getNestedObject(
    document.querySelector(".o-form-container__error-msg"),
    "innerText"
  );
  const erroMessage = getNestedObject(
    window.i18nErrorLookup(data),
    "response.statusReason"
  );
  const verificationUrl = getNestedObject(
    document.querySelector("#verification-url"),
    "href"
  );

  // TODO: loginAttempsErrors should come from BE error response, it doesn't right now
  // hardcoding 11 attempts for test purposes
  loginAttempsErrors++;
  if (loginAttempsErrors == 11) {
    const loginAttempsErrorEvent = createConditionalEvent(true, "AttemptError");
    window.dispatchEvent(loginAttempsErrorEvent);
  }
  // When login crendentials are wrong
  else if (errorKey === "AUTH-1001") {
    const loginCredentialsErrorEvent = createConditionalEvent(
      "credentials",
      "LoginError"
    );
    window.dispatchEvent(loginCredentialsErrorEvent);
  } // When user email unverified
  else if (errorKey === "AUTH-1017" && verificationUrl) {
    saveEmailToValidate();
    window.location.replace(verificationUrl);
  } else if (errorKey === "AUTH-1019") {
    const missingConsents = getNestedObject(
      data,
      "response.additionalProperties.missingConsents"
    );
    window.dispatchEvent(createConditionalEvent(true, "TermHasChange"));
    window.dispatchEvent(
      new CustomEvent("missingConsents", {
        detail: missingConsents,
      })
    );
  }
  // Default error message
  else {
    document.querySelector(
      "#sign-in-form [data-conditional-case='server'] .m-alert__para"
    ).innerText = erroMessage || errorMessageFromAuthor;

    const loginServerErrorEvent = createConditionalEvent(
      "server",
      "LoginError"
    );
    window.dispatchEvent(loginServerErrorEvent);
  }

  hideLoadingSpinner(signInBtn);
};

const navEcommCartId = () => {
  const commerceContext = JSON.parse(
    localStorage.getItem(getLocalCommerceContextName()) || null
  );
  return getNestedObject(commerceContext, "cart.id");
};

window.navEcommCartId = navEcommCartId();
