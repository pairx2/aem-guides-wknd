const getPageDataAttributes = () => {
  return {
    'x-preferred-language': document.getElementsByName('x-preferred-language')[0]?.value,
    'x-country-code': document.getElementsByName('x-country-code')[0]?.value,
    'x-application-id': document.getElementsByName('x-application-id')[0]?.value,
  };
};

const getLocalAuthContext = () => JSON.parse(getItemLocalStorage(getLocalAuthContextName()));

const getLocalCommerceContext = () => {
  if (typeof getMultilingualLocalStorageKey === 'function')
    return JSON.parse(getItemLocalStorage(getMultilingualLocalStorageKey(commonConst.COMMERCE_LOCAL_STORAGE)));
  return JSON.parse(getItemLocalStorage(getLocalCommerceContextName()));
}

const getLocalUserInfo = () => getLocalAuthContext()?.accountInfo?.userInfo;

const setLocalUserInfo = (userInfo) => {
  const authContext = getLocalAuthContext();

  setItemLocalStorage(
    getLocalAuthContextName(),
    JSON.stringify({
      ...authContext,
      accountInfo: {
        ...authContext?.accountInfo,
        userInfo: {
          ...authContext?.accountInfo?.userInfo,
          ...userInfo,
        },
      },
      timeStamp: Date.now(),
    })
  );
};

const removeCloseIconOnModal = (modalId) => {
  const closeOption = document.querySelector(`#${modalId} .generic-modal--close`);
  if(closeOption) {
    closeOption.style.display = 'none';
  }
}

const showHideApiErrorElements = (i18nKey) => {
  switch (i18nKey) {
    case 'LGN-USER-1001':
    case 'VRF-ACCT-1003':
      $('#myfreestyle-user-login').hide();
      break;

    case 'LGN-USER-1005':
    case 'PM-1013':
      $('#myfreestyle-user-login, #myfreestyle-contact-xf').hide();
      break;

    case 'PM-1007':
      $('#myfreestyle-set-password').hide();
      break;

    case 'LGN-USER-1013':
      const consentReviewTriggerBtn = document.getElementById('consent-review-button');
      if(consentReviewTriggerBtn) {
        consentReviewTriggerBtn.parentElement.style.visibility = 'hidden';
        consentReviewTriggerBtn.click();
      }
      // removing the default close icon on the consent review modal
      removeCloseIconOnModal('consent-review-button-modal');
      break;

    default:
      break;
  }
};

// Overwrite existing functions

function showHideApiError(error) {
  const { errorCode, response } = error;
  const i18nKey = response?.i18nMessageKey;

  const $apiErrorBlocks = $('#apierror, #apierror_400, #apierror_500, #invalidpass_apierror_400');
  const $apiErrorBlockElements = $apiErrorBlocks.find('> *');

  $apiErrorBlocks.hide();
  $apiErrorBlockElements.hide();
  $('#page-spinner').hide();

  if (i18nKey) {
    const $i18nKeyElements = $apiErrorBlocks.find(`#${i18nKey}`);

    showHideApiErrorElements(i18nKey);
    // if consents needs to be reviewed, then return from this function
    if(i18nKey === 'LGN-USER-1013') {
      return;
    } else {
      // clearing the stored loginDetails when error is not related to consents review
      localStorage.removeItem('loginDetails');
    }
    $apiErrorBlockElements.has($i18nKeyElements).show();
    $i18nKeyElements.show();

    if (errorCode == 400 && $i18nKeyElements.length > 0) {
      $('#apierror, #apierror_400, #invalidpass_apierror_400').show();

      return;
    }
  }

  $('#apierror_500').show();
  showhideModal('btnModalError500', 1);
}

async function updateSessionCookie(jwtToken, enable) {
  const myfreestylePageSecure = $('#redirect-buttons #myfreestylePageSecure')?.attr('href') || '/';
  const myfreestylePage = $('#redirect-buttons #myfreestylePage')?.attr('href') || '/';
  const urlRedirectTo = enable ? myfreestylePageSecure : myfreestylePage;

  $('#page-spinner').show();

  if (enable) {
    try {
      await Promise.all([getCustomerCart(), setSession(enable)]);

      setItemLocalStorage(commonConst.SESSION_EXPIRED_MODAL, Date.now());
      setItemLocalStorage(commonConst.EXTEND_SESSION_TIMESTAMP, Date.now());
    } catch (error) {}
  } else {
    try {
      await Promise.all([logoutUser(), setSession(enable)]);
    } catch (error) {}

    removeItemLocalStorage(commonConst.SESSION_EXPIRED_MODAL);
    removeItemLocalStorage(commonConst.EXTEND_SESSION_TIMESTAMP);
    removeItemLocalStorage(getLocalAuthContextName());
    removeItemLocalStorage(getLocalCommerceContextName());
  }

  window.location.href = urlRedirectTo;
}
