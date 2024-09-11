function updateRequestMyFreestyleSubscriptionVerify (data) {
  $('#page-spinner').show();

  delete data.body['requestType'];
  delete data.body['node'];
  delete data.body['g-recaptcha-response'];

  return data;
}

function onSuccessMyFreestyleSubscriptionVerify (data) {
  if (data.errorCode == 0) {
    $('#myfreestyle-subscription-verify-error').hide();
    $('#page-spinner').hide();
    $('#myfreestyle-subscription-verify-success').show();
    deleteCookie('activationKey');
  } else {
    onErrorMyFreestyleSubscriptionVerify(data);
  }
}

function onErrorMyFreestyleSubscriptionVerify (error) {
  showHideApiError(error);
  $('#myfreestyle-subscription-verify-success').hide();
  $('#myfreestyle-subscription-verify-error').show();
  deleteCookie('activationKey');
}

