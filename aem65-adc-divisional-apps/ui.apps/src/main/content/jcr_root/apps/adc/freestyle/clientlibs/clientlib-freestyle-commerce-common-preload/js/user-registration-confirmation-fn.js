function updateRequestMyFreestyleResendVerification (data) {
  const userData = usObj && decryptData(usObj, pk, 'object');

  if (userData) {
    data.body['email'] = userData.email;
  }

  return data;
}

function onSuccessMyFreestyleResendVerification (data) {
  if (data.errorCode == 0) {
    const resendVerificationEvent = new CustomEvent('conditional-component-change', {
      detail: {
        value: true,
        var: 'resendVerificationEmailSuccess',
      },
    });

    window.dispatchEvent(resendVerificationEvent);
  } else {
    onErrorMyFreestyleResendVerification(data);
  }
}

function onErrorMyFreestyleResendVerification (error) {
  showHideApiError(error);
}

