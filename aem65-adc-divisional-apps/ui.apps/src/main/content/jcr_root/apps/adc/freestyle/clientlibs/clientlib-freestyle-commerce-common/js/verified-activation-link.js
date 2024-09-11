/**
 * Redirect previously activated account links for logged-in customers.
 * For this script to be effective Login Page field under page properties
 * needs to be authored for the redirect path logged-in customers with email
 * activation link will be taken to.
 *
 */
(function ($, document) {
  const activationKey = 'activationKey';
  const redirectPath = document.body.dataset.loginPage;
  const hasActivationKey = new RegExp(`[?&]${activationKey}=`, 'i').test(location.search);

  /* init */
  $(document).ready(() => init());

  const init = () => {
    const isVerifiedUser = getLocalAuthContext()?.accountInfo?.userInfo?.verified;

    if (hasActivationKey && isVerifiedUser && redirectPath) {
      location.href = new RegExp(/^(http|https):\/\//, 'i').test(redirectPath)
        ? redirectPath
        : location.origin + redirectPath;
    }
  };
})(jQuery, document);
