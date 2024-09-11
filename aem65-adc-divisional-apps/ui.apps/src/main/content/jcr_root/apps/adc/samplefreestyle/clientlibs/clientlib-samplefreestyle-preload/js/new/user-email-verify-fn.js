// user email verify request form

function updateEmailVerifyRequestSample(data) {
  delete data.body["consentsAll"];
  let marketingObj1 = {
    consentName: "marketingeducationemail",
    consentValue: data.body["marketingeducationemail"]
  };
  let marketingObj2 = {
    consentName: "marketingsurveyemail",
    consentValue: data.body["marketingsurveyemail"]
  };

  data.body["consents"].push(marketingObj1, marketingObj2);
  delete data.body["marketingeducationemail"];
  delete data.body["marketingsurveyemail"];
  delete data.body["requestType"];
  delete data.body["node"];
  delete data["g-recaptcha-response"];
  let userData = data.body;
  data.body["consents"] = data.body["consents"].concat(data.body["requiredConsents"], data.body["addMarketingconsents"]);
  delete data.body["requiredConsents"];
  delete data.body["addMarketingconsents"];
  sessionStorage.setItem('userData', JSON.stringify(userData));
  delete data.body["consents"];
  delete data.body["password"];
  $('#page-spinner').show();
  return data;
}

function onRequestSuccessSampleEmailVerify(data) {
  if (data.errorCode == 0) {
    const emailStatus = data.response.userExists;
    if (emailStatus) {
      toggleUserEmailCheckEvent('userEmailcheck',true);
      $('.a-input-password-strength').removeClass('password-strong');
    } else {
      showNextStep();
      scrollToTop();
    }
  } else {
    onRequestErrorSampleEmailVerify(data);
  }
  $('#page-spinner').hide();
}

function onRequestErrorSampleEmailVerify(error) {
  showHideApiError(error);
  $('#page-spinner').hide();
}

function showNextStep() {
  let currElement = $('.o-wizard__container').find('li.a-wizard-step--active');
  currElement.removeClass('a-wizard-step--active a-wizard__step--incomplete').addClass('a-wizard__step--complete a-wizard-step--inactive');
  currElement.next().addClass('a-wizard-step--active');
  $("fieldset[data-wizarditem='0']").hide();
  $("fieldset[data-wizarditem='1']").css("display", "block");
}

function toggleUserEmailCheckEvent(val, isActive = true) {
  const userEmailRequestedEvent = new CustomEvent('conditional-component-change', {
    detail: {
      value: isActive,
      var: val,
    },
  });
  window.dispatchEvent(userEmailRequestedEvent);
}