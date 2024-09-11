$(() => {
  const activationKey = getUrlParameter('activationKey');
  const hasActivationKey = !!activationKey;

  if (hasActivationKey) {
    setCookie('activationKey', activationKey, '');
  }

  const myFreestyleSubscriptionVerify = $('#myfreestyle-subscription-verify');
  const myFreestyleSubscriptionVerifySuccess = $('#myfreestyle-subscription-verify-success');
  const myFreestyleSubscriptionVerifyError = $('#myfreestyle-subscription-verify-error');

  myFreestyleSubscriptionVerify.hide();
  myFreestyleSubscriptionVerifyError.hide();
  myFreestyleSubscriptionVerifySuccess.hide();

  if (myFreestyleSubscriptionVerify.length > 0 && hasActivationKey) {
    $('#page-spinner').show();

    setTimeout(() => {
      myFreestyleSubscriptionVerify.find('button.btn[type="submit"]').trigger('click');
    }, 500);
  } else if (!hasActivationKey && userHasConsents()) {
    myFreestyleSubscriptionVerifySuccess.show();
    myFreestyleSubscriptionVerify.hide();
  } else if (!hasActivationKey){
	  myFreestyleSubscriptionVerifySuccess.remove();
    myFreestyleSubscriptionVerifyError.remove();
  }
});

const userHasConsents = () => {
  if(isUserInLogedInState()){
  let userConsents = usCon && decryptData(usCon, pk, 'object');
    if (userConsents && userConsents.length) {
      for (const consent of userConsents) {
        if (consent.consentValue) {
          return true;
        }
      }
    }
  }
  return false;
};
