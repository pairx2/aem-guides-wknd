(function ($, document) {
  const pendingCartKey = 'pendingCheckoutCart';
  const checkoutButtonId = 'mini-cart-checkout-button';
  const loginAnchorId = 'header-login-sign-up-link';
  const securePageButtonId = 'myfreestylePageSecure';

  /* init */
  $(document).ready(() => init());

  const init = () => {
    const userLoggedIn = !!(usObj && usObj.length > 0);
    const hasPendingCheckout = localStorage.getItem(pendingCartKey) !== null;
    const isVerifiedUser = getLocalAuthContext()?.accountInfo?.userInfo?.verified;

    if (isVerifiedUser) {
      if (userLoggedIn && hasPendingCheckout) {
        const securePagePath = document.querySelector(`#${securePageButtonId}`)?.pathname;
        const currentPath = location.pathname;
        if (securePagePath && currentPath === securePagePath) {
          handleRedirect();
        }
      }
    } else {
      handleMiniCartCheckoutButton();
    }
  };

  const handleRedirect = () => {
    const checkoutPath = getPendingCheckoutStatus()?.checkoutPath;
    removePendingCheckoutStatus();
    location.pathname = checkoutPath;
  };

  const handleMiniCartCheckoutButton = () => {
    const checkoutButton = document.querySelector(`#${checkoutButtonId}`);
    const loginAnchor = document.querySelector(`#${loginAnchorId}`);
    const checkoutPath = checkoutButton?.pathname;
    const loginPath = loginAnchor?.pathname;

    checkoutButton?.addEventListener('click', (event) => {
      event.preventDefault();
      setPendingCheckoutStatus(checkoutPath);
      location.pathname = loginPath;
    });
  };

  const setPendingCheckoutStatus = (checkoutPath) => {
    localStorage.setItem(
      pendingCartKey,
      JSON.stringify({
        checkoutPending: true,
        checkoutPath: checkoutPath,
      })
    );
  };

  const getPendingCheckoutStatus = () => {
    return JSON.parse(localStorage.getItem(pendingCartKey));
  };

  const removePendingCheckoutStatus = () => {
    localStorage.removeItem(pendingCartKey);
  };
})(jQuery, document);
