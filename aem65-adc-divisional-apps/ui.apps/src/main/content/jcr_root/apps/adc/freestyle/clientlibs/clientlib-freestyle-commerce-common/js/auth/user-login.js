const OnNaveCommLogoutSuccess = async (redirect) => {
  removeItemLocalStorage('cJwt', true);
  removeItemLocalStorage('mJwt', true);
  deleteCookie('usFn', true);
  deleteCookie('usObj', true);
  deleteCookie('usCon', true);
  deleteCookie('pk', true);
  removeItemLocalStorage('mrdObj', true);
  deleteCookie('mfDynRem', true);
  removeItemLocalStorage('paymentMethodsResponse', true);
  removeItemLocalStorage('paymentMethodsPayload', true);
  removeItemLocalStorage('riskcheckPopUpAccept', true);
  removeItemLocalStorage('riskcheckBillingAddresses', true);
  removeItemLocalStorage('riskcheckShippingAddresses', true);
  removeItemLocalStorage('riskCheckCommunicationToken', true);
  if (typeof redirect === 'string') {
    $('#redirect-buttons #myfreestylePage')?.attr('href', redirect);
  }

  let updateSessionVar = Promise.resolve(updateSessionCookie(null, false));
  await updateSessionVar;

};

$(() => {
  const isLoggedIn = !!(usObj && usObj.length > 0);
  const userIsLoggedInEvent = new CustomEvent('conditional-component-change', {
    detail: {
      value: isLoggedIn,
      var: 'userIsLoggedIn',
    },
  });

  setTimeout(() => {
    window.dispatchEvent(userIsLoggedInEvent);
  }, 500);
});

window.myFreestyleCartId = myFreestyleCartId();
