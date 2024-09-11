$(() => {
  const pendingStockAlertKey = 'stockAlertPath';
  const pendingStockAlertPath = getItemLocalStorage(pendingStockAlertKey);
  const hasPendingStockAlertSubscription = !!pendingStockAlertPath;
  const isLoggedIn = !!getItemLocalStorage('cJwt', true);
  const securePageButtonId = 'myfreestylePageSecure';

  const removePendingStockAlertSubscription = () => {
    removeItemLocalStorage(pendingStockAlertKey);
  };

  const handleRedirect = () => {
    removePendingStockAlertSubscription();

    window.location.href = pendingStockAlertPath;
  };

  if (isLoggedIn && hasPendingStockAlertSubscription) {
    const securePagePath = document.querySelector(`#${securePageButtonId}`)?.pathname;
    const currentPath = window.location.pathname;

    if (securePagePath && currentPath === securePagePath) {
      handleRedirect();
    }
  }
});
